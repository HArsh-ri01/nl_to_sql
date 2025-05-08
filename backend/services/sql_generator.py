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
        # Default settings for SQL validation
        self.max_subquery_depth = 2

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
        is_valid, error_message = SQLValidator.validate(
            sql_query, self.max_subquery_depth
        )
        if not is_valid:
            logger.error(f"SQL validation failed: {error_message}")
            raise ValueError(f"SQL validation failed: {error_message}")

        try:
            # Use read_only connection for added security
            con = duckdb.connect(database=self.db_path, read_only=True)
            df = con.execute(sql_query).fetchdf()
            con.close()
            logger.info(f"Query executed successfully: {sql_query[:50]}...")
            return df
        except Exception as e:
            logger.error(f"Error executing query: {str(e)}")
            raise

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
                is_valid, error_message = SQLValidator.validate(
                    sql_query, self.max_subquery_depth
                )
                if not is_valid:
                    logger.warning(f"Generated SQL failed validation: {error_message}")
                    # Create a new response with the error message
                    error_response = {"sql_query": f"ERROR: {error_message}"}
                    return json.dumps(error_response)

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
