import pandas as pd
import duckdb
from openai import OpenAI
from utils.logger import logger
from models.db_models import DB_PATH
from services.sql_validator import SQLValidator


class SQLGenerator:
    def __init__(self, api_key):
        self.client = OpenAI(api_key=api_key)
        self.db_path = DB_PATH

    def generate_sql_via_llm(self, user_query: str, system_prompt: str) -> str:
        """Generate SQL using OpenAI GPT model"""
        try:
            response = self.client.chat.completions.create(
                model="gpt-4.1",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_query},
                ],
                temperature=0.5,
            )
            sql_result = response.choices[0].message.content.strip()
            logger.info(f"SQL generated successfully for query: {user_query[:50]}...")
            return sql_result
        except Exception as e:
            logger.error(f"Error generating SQL: {str(e)}")
            raise

    def fetch_data(self, sql_query: str) -> pd.DataFrame:
        """Execute SQL query and return results as DataFrame"""
        # Validate SQL query before execution
        is_valid, error_message = SQLValidator.validate(sql_query)
        if not is_valid:
            logger.error(f"SQL validation failed: {error_message}")
            raise ValueError(f"SQL validation failed: {error_message}")

        # Clean up SQL query to handle potential issues
        sql_query = self._sanitize_sql_query(sql_query)

        try:
            # Use read_only connection for added security
            con = duckdb.connect(database=self.db_path, read_only=True)
            df = con.execute(sql_query).fetchdf()
            con.close()
            logger.info(f"Query executed successfully: {sql_query[:50]}...")

            # Format numeric columns to 2 decimal places
            df = self._format_numeric_columns(df)

            return df
        except Exception as e:
            logger.error(f"Error executing query: {str(e)}")
            raise

    def _format_numeric_columns(self, df: pd.DataFrame) -> pd.DataFrame:
        """Format numeric columns in DataFrame to 2 decimal places"""
        # Create a copy of the DataFrame to avoid modifying the original
        formatted_df = df.copy()

        # Identify numeric columns (float or numeric types)
        numeric_columns = formatted_df.select_dtypes(
            include=["float", "float64", "float32", "int64", "int32"]
        ).columns

        # Format each numeric column to 2 decimal places
        for col in numeric_columns:
            # Check if the column contains decimal values that need rounding
            if (
                formatted_df[col].dtype == "float64"
                or formatted_df[col].dtype == "float32"
                or formatted_df[col].dtype == "float"
            ):
                # Convert to Python native float to ensure consistent handling
                formatted_df[col] = formatted_df[col].astype(float).round(2)
                # Convert to string with fixed precision to avoid floating point issues
                formatted_df[col] = formatted_df[col].apply(lambda x: float(f"{x:.2f}"))

        return formatted_df

    def _sanitize_sql_query(self, sql_query: str) -> str:
        """Sanitize SQL query to handle common issues like duplicate entries in IN clauses"""
        import re

        # Find IN clauses with potential duplicates
        in_clauses = re.findall(r"IN\s*\(([^)]+)\)", sql_query, re.IGNORECASE)

        for clause in in_clauses:
            # Check if this is a list of quoted strings
            if "'" in clause or '"' in clause:
                # Extract all quoted items
                if "'" in clause:
                    items = re.findall(r"'([^']*)'", clause)
                else:
                    items = re.findall(r'"([^"]*)"', clause)

                # Remove duplicates while preserving order
                unique_items = []
                for item in items:
                    if item not in unique_items:
                        unique_items.append(item)

                # If we found duplicates, replace the clause
                if len(unique_items) < len(items):
                    # Format new list with the original quote style
                    quote = "'" if "'" in clause else '"'
                    new_list = ", ".join(
                        [f"{quote}{item}{quote}" for item in unique_items]
                    )
                    old_list = clause
                    sql_query = sql_query.replace(
                        f"IN ({old_list})", f"IN ({new_list})"
                    )

        # Handle potential WITH clause issues
        # Make sure WITH clauses are properly formatted
        if sql_query.upper().strip().startswith("WITH "):
            # Check for balanced parentheses in CTE definitions
            open_parens = 0
            for char in sql_query:
                if char == "(":
                    open_parens += 1
                elif char == ")":
                    open_parens -= 1

            # If parentheses are unbalanced, try to fix common issues
            if open_parens != 0:
                logger.warning(f"Query has unbalanced parentheses. Attempting to fix.")
                # Add missing closing parentheses if needed
                if open_parens > 0:
                    sql_query = sql_query + (")" * open_parens)

        return sql_query

    def get_sql_for_query(self, user_query: str, system_prompt: str) -> str:
        """Main method to get SQL for a user query"""
        sql_result = self.generate_sql_via_llm(user_query, system_prompt)

        # Extract just the SQL query from the JSON response
        # This assumes the LLM returns a JSON object with a sql_query key
        import json

        try:
            # Check if the result is JSON and extract the SQL query
            parsed_result = json.loads(sql_result)
            if "sql_query" in parsed_result:
                sql_query = parsed_result["sql_query"]

                # If it's an error message from the LLM, pass it through
                if sql_query.startswith("ERROR:"):
                    return sql_result

                # Validate the SQL query before returning it
                is_valid, error_message = SQLValidator.validate(sql_query)
                if not is_valid:
                    logger.warning(f"Generated SQL failed validation: {error_message}")
                    # Create a new response with the error message
                    error_response = {"sql_query": f"ERROR: {error_message}"}
                    return json.dumps(error_response)

                # Sanitize the SQL query to handle common issues
                sanitized_sql = self._sanitize_sql_query(sql_query)
                if sanitized_sql != sql_query:
                    logger.info("SQL query was sanitized to fix potential issues")
                    parsed_result["sql_query"] = sanitized_sql
                    return json.dumps(parsed_result)

            # The validation passed, return the original result
            return sql_result
        except json.JSONDecodeError:
            # If the result is not valid JSON, log a warning and return as is
            logger.warning(f"LLM did not return valid JSON: {sql_result[:100]}")
            return sql_result
        except Exception as e:
            logger.error(f"Error processing SQL validation: {str(e)}")
            # Create an error response
            error_response = {"sql_query": f"ERROR: Failed to validate SQL: {str(e)}"}
            return json.dumps(error_response)

    def get_gpt_response(self, prompt: str) -> str:
        """Get a general response from GPT"""
        try:
            response = self.client.chat.completions.create(
                model="gpt-4.1",
                messages=[
                    {
                        "role": "user",
                        "content": prompt,
                    },
                ],
                temperature=0.5,
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            logger.error(f"Error getting GPT response: {str(e)}")
            raise
