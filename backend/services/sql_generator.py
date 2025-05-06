import pandas as pd
import duckdb
from openai import OpenAI
from utils.logger import logger
from models.db_models import DB_PATH


class SQLGenerator:
    def __init__(self, api_key):
        self.client = OpenAI(api_key=api_key)

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

    def fetch_data(self, query: str) -> pd.DataFrame:
        """Execute SQL query and return results as DataFrame"""
        try:
            con = duckdb.connect(DB_PATH)
            df = con.execute(query).fetchdf()
            con.close()
            logger.info(f"Query executed successfully: {query[:50]}...")
            return df
        except Exception as e:
            logger.error(f"Error executing query: {str(e)}")
            raise

    def get_sql_for_query(self, user_query: str, system_prompt: str) -> str:
        """Main method to get SQL for a user query"""
        # In future, can implement caching here
        return self.generate_sql_via_llm(user_query, system_prompt)

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
