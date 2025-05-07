# /// script
# dependencies = [
#   "fastapi",
#   "uvicorn",
#   "httpx",
#   "duckdb",
#   "faiss-cpu",
#   "pandas",
#   "python-multipart",
#   "google-genai",
#   "python-dotenv",
#   "openai",
# ]
# ///


from fastapi import FastAPI, Form, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import json
from pydantic import BaseModel
from openai import OpenAI
from google import genai
from google.genai import types
from dotenv import load_dotenv

# Import our modularized components
from utils.logger import logger
from models.db_models import DatabaseManager, LogManager, LogLevel
from services.ip_tracker import IPTracker
from services.sql_generator import SQLGenerator
from routes import log_routes, debug_routes
from middleware.error_handler import ErrorLoggingMiddleware

# Load environment variables
load_dotenv()

# Fetch the API key from the .env file
API_KEY = os.getenv("API_KEY")

# Initialize FastAPI app
app = FastAPI(title="Natural Language to SQL API")

# Add our error logging middleware
app.add_middleware(ErrorLoggingMiddleware)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include the log routes
app.include_router(log_routes.router)
app.include_router(debug_routes.router)

# Initialize databases
DatabaseManager.init_databases()

# Initialize SQL generator
sql_generator = SQLGenerator(API_KEY)

# Load system prompt
try:
    with open("system_prompt.txt", "r", encoding="utf-8") as f:
        system_prompt = f.read()
    logger.info("System prompt loaded successfully")
except Exception as e:
    logger.error(f"Failed to load system prompt: {str(e)}")
    system_prompt = "You are an assistant that translates natural language to SQL queries for an IPL database."

# Log application startup
logger.info("Application starting up")
LogManager.log_app_activity(LogLevel.INFO, "Application started")

# Define base request model
class BaseQueryRequest(BaseModel):
    """Base model for all query requests"""

    def get_query(self) -> str:
        """Method to retrieve the query string from the request.
        All subclasses must implement this method."""
        raise NotImplementedError("Subclasses must implement get_query()")

# Define request model for standard JSON input
class QueryRequest(BaseQueryRequest):
    """Standard query request with a user_query field"""
    user_query: str

    def get_query(self) -> str:
        return self.user_query
    
# Define the POST endpoint with support for both form and JSON
@app.post("/process_query/")
async def process_query(
    request: Request,
    user_query: str = Form(None),  # Make it optional
    query_request: QueryRequest = None,  # Add JSON body support
):
    # Extract query from either form or JSON body
    if user_query is None and query_request is None:
        logger.error("No query provided in request")
        return {"error": "No query provided. Please submit a 'user_query' parameter."}

    # Use the query from the appropriate source
    if user_query is None:
        user_query = query_request.get_query()

    try:
        # Step 1: Log the incoming request
        logger.info(f"Received query: {user_query}")

        # Step 2: Check if the query is related to IPL
        if not any(
            keyword in user_query.lower()
            for keyword in [
                "ipl",
                "match",
                "player",
                "team",
                "runs",
                "wickets",
                "overs",
                "sixes",
                "fours",
                "score",
                "points",
                "ranking",
                "history",
                "statistics",
                "records",
                "innings",
                "performance",
                "average",
                "strike rate",
                "economy",
                "highest",
                "lowest",
                "best",
                "worst",
            ]
        ):
            logger.warning(f"Non-IPL related query rejected: {user_query}")
            return {"error": "Please ask a specific question related to IPL data."}

        # Step 3: Get the real client IP address
        forwarded_for = request.headers.get("X-Forwarded-For")
        if forwarded_for:
            client_ip = forwarded_for.split(",")[0].strip()
        else:
            client_ip = request.client.host

        logger.info(f"Request from IP: {client_ip}")

        # Step 4: Check global daily limit
        global_remaining = IPTracker.get_global_remaining_requests()
        if global_remaining <= 0:
            logger.warning("Global daily limit reached")
            LogManager.log_to_db(
                LogLevel.WARNING, "Global daily limit reached", ip_address=client_ip
            )
            return {
                "error": f"The service has reached its daily request limit. Please try again tomorrow."
            }

        # Step 5: Check individual IP request limit
        if not IPTracker.check_ip_limit(client_ip):
            ip_remaining = IPTracker.get_ip_remaining_requests(client_ip)
            logger.warning(f"IP {client_ip} exceeded request limit")
            LogManager.log_to_db(
                LogLevel.WARNING,
                f"IP exceeded request limit: {client_ip}",
                ip_address=client_ip,
            )
            return {
                "error": f"You have exceeded your daily limit. You have {ip_remaining} requests remaining for today."
            }

        # Step 6: Generate SQL query
        try:
            response = json.loads(
                sql_generator.get_sql_for_query(user_query, system_prompt)
            )
            sql_query = response["sql_query"]
            logger.info(f"SQL query generated: {sql_query[:50]}...")
        except Exception as e:
            error_msg = f"Failed to generate SQL: {str(e)}"
            logger.error(error_msg)
            LogManager.log_to_db(
                LogLevel.ERROR, error_msg, source="SQL generation", ip_address=client_ip
            )
            return {
                "error": "Failed to generate SQL query",
                "remaining_requests": {
                    "user_remaining": IPTracker.get_ip_remaining_requests(client_ip),
                    "global_remaining": IPTracker.get_global_remaining_requests(),
                },
            }

        # Step 7: Check if the SQL query is actually an error message
        if sql_query.startswith("ERROR:"):
            # Record the failed query in history
            IPTracker.record_query_history(client_ip, user_query, sql_query, False)

            error_msg = sql_query.replace("ERROR:", "").strip()
            logger.warning(f"SQL generation returned error: {error_msg}")
            LogManager.log_to_db(
                LogLevel.WARNING,
                f"SQL generation error: {error_msg}",
                source="SQL generation",
                ip_address=client_ip,
            )

            # Return the error message without trying to execute it
            return {
                "sql_query": sql_query,
                "error": error_msg,
                "remaining_requests": {
                    "user_remaining": IPTracker.get_ip_remaining_requests(client_ip),
                    "global_remaining": IPTracker.get_global_remaining_requests(),
                },
            }

        # Step 8: Execute and get results
        try:
            df = sql_generator.fetch_data(sql_query)
            json_result = df.to_dict(orient="records")

            # Record the successful query in history
            IPTracker.record_query_history(client_ip, user_query, sql_query, True)

            logger.info(f"Query executed successfully with {len(json_result)} results")
            LogManager.log_app_activity(
                LogLevel.INFO,
                f"Successful query from {client_ip}: {user_query[:50]}...",
            )

            response = {
                "sql_query": sql_query,
                "result": json_result,
                "remaining_requests": {
                    "user_remaining": IPTracker.get_ip_remaining_requests(client_ip),
                    "global_remaining": IPTracker.get_global_remaining_requests(),
                },
            }
            return response
        except Exception as e:
            # Record the failed query in history
            IPTracker.record_query_history(client_ip, user_query, sql_query, False)

            # Log the error
            error_msg = f"Error executing query: {str(e)}"
            logger.error(error_msg)
            LogManager.log_to_db(
                LogLevel.ERROR, error_msg, source="SQL execution", ip_address=client_ip
            )

            return {
                "sql_query": sql_query,
                "error": "Oops! Something went wrong while trying to get your answer.",
                "remaining_requests": {
                    "user_remaining": IPTracker.get_ip_remaining_requests(client_ip),
                    "global_remaining": IPTracker.get_global_remaining_requests(),
                },
            }
    except Exception as e:
        logger.error(f"Validation error in process_query: {str(e)}")
        LogManager.log_to_db(
            LogLevel.ERROR,
            f"Validation error: {str(e)}",
            source="API endpoint",
            ip_address=getattr(request.client, "host", "unknown"),
        )
        return {
            "error": "Invalid request format. Please ensure you're sending the correct form data.",
            "details": str(e),
        }


# Create simple home route
@app.get("/")
async def root():
    logger.info("Home route accessed")
    return {"message": "Welcome to the Natural Language to SQL API"}


# Run the server using uvicorn
if __name__ == "__main__":
    logger.info("Starting server on port 8000")
    LogManager.log_app_activity(LogLevel.INFO, "Server starting")

    uvicorn.run(app, host="0.0.0.0", port=8000)
