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


from fastapi import FastAPI, Form, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import duckdb
import httpx
import os
import pickle
import faiss
import numpy as np
import pandas as pd
import subprocess
from openai import OpenAI
from google import genai
from google.genai import types
from dotenv import load_dotenv
from datetime import datetime, date, timedelta
import json
import sqlite3  # Add SQLite for IP tracking

# Load environment variables
load_dotenv()

# Fetch the Gpt API key from the .env file
API_KEY = os.getenv("API_KEY")

# Initialize gpt client
client = OpenAI(api_key=API_KEY)

# Define the FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)


# Explicitly specify the encoding when opening the file to avoid UnicodeDecodeError
with open("system_prompt.txt", "r", encoding="utf-8") as f:
    system_prompt = f.read()

# ─── 0. CONFIG ────────────────────────────────────────────────────────────────
DB_PATH = "ipl_data.db"
IP_TRACKING_DB_PATH = "ip_tracking.db"  # Separate database for IP tracking

# models & settings
EMB_MODEL = "gemini-embedding-exp-03-07"
EMB_CONFIG = types.EmbedContentConfig(task_type="SEMANTIC_SIMILARITY")
SIM_THRESHOLD = 0.90

# persistence files
INDEX_PATH = "sql_queries.faiss"
CACHE_PATH = "sql_cache.pkl"

# Request limits
MAX_DAILY_REQUESTS_PER_IP = 100  # Increased from 5 to 40 as requested
MAX_TOTAL_DAILY_REQUESTS = 5000  # Overall daily limit


# Initialize the IP tracking table in a separate database
def init_ip_tracking():
    """Initialize the database table for tracking IP addresses and request counts"""
    conn = sqlite3.connect(IP_TRACKING_DB_PATH)

    # Create IP tracking table
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS ip_tracking (
            ip_address TEXT PRIMARY KEY,
            request_count INTEGER,
            last_request_date DATE
        )
    """
    )

    # Create global counter table
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS global_counter (
            counter_id TEXT PRIMARY KEY,
            total_count INTEGER,
            last_date DATE
        )
    """
    )

    # Create query history table
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS query_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ip_address TEXT,
            user_query TEXT,
            sql_query TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            success BOOLEAN
        )
    """
    )

    # Initialize global counter if it doesn't exist
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM global_counter WHERE counter_id = 'daily_total'")
    if not cursor.fetchone():
        today = date.today()
        cursor.execute(
            "INSERT INTO global_counter (counter_id, total_count, last_date) VALUES (?, ?, ?)",
            ("daily_total", 0, today),
        )
        conn.commit()

    conn.close()


# Call it to ensure the table exists
init_ip_tracking()


# ─── IP TRACKING FUNCTIONS ────────────────────────────────────────────────────
def check_ip_limit(ip_address: str) -> bool:
    """
    Check if an IP address has exceeded the daily request limit
    Returns True if the IP is allowed to make a request, False otherwise
    """
    conn = sqlite3.connect(IP_TRACKING_DB_PATH)
    cursor = conn.cursor()

    # Check if IP exists in tracking table
    cursor.execute(
        "SELECT request_count, last_request_date FROM ip_tracking WHERE ip_address = ?",
        (ip_address,),
    )
    result = cursor.fetchone()

    today = date.today()

    if not result:
        # New IP - add to tracking table
        cursor.execute(
            "INSERT INTO ip_tracking (ip_address, request_count, last_request_date) VALUES (?, 1, ?)",
            (ip_address, today),
        )
        conn.commit()
    else:
        count, last_date = result

        # Convert string date to date object if needed
        if isinstance(last_date, str):
            last_date = datetime.strptime(last_date, "%Y-%m-%d").date()

        # If it's a new day, reset the counter
        if last_date < today:
            cursor.execute(
                "UPDATE ip_tracking SET request_count = 1, last_request_date = ? WHERE ip_address = ?",
                (today, ip_address),
            )
            conn.commit()
        elif count >= MAX_DAILY_REQUESTS_PER_IP:
            conn.close()
            return False
        else:
            # Increment count
            cursor.execute(
                "UPDATE ip_tracking SET request_count = request_count + 1 WHERE ip_address = ?",
                (ip_address,),
            )
            conn.commit()

    # Check global daily limit
    cursor.execute(
        "SELECT total_count, last_date FROM global_counter WHERE counter_id = 'daily_total'"
    )
    global_result = cursor.fetchone()

    if global_result:
        global_count, global_last_date = global_result

        if isinstance(global_last_date, str):
            global_last_date = datetime.strptime(global_last_date, "%Y-%m-%d").date()

        if global_last_date < today:
            cursor.execute(
                "UPDATE global_counter SET total_count = 1, last_date = ? WHERE counter_id = 'daily_total'",
                (today,),
            )
            conn.commit()
        elif global_count >= MAX_TOTAL_DAILY_REQUESTS:
            conn.close()
            return False
        else:
            cursor.execute(
                "UPDATE global_counter SET total_count = total_count + 1 WHERE counter_id = 'daily_total'"
            )
            conn.commit()

    conn.close()
    return True


def get_ip_remaining_requests(ip_address: str) -> int:
    """Get the number of remaining requests for an IP address"""
    conn = sqlite3.connect(IP_TRACKING_DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT request_count, last_request_date FROM ip_tracking WHERE ip_address = ?",
        (ip_address,),
    )
    result = cursor.fetchone()

    if not result:
        conn.close()
        return MAX_DAILY_REQUESTS_PER_IP

    count, last_date = result

    # Convert string date to date object if needed
    if isinstance(last_date, str):
        last_date = datetime.strptime(last_date, "%Y-%m-%d").date()

    # If it's a new day, they have max requests
    if last_date < date.today():
        conn.close()
        return MAX_DAILY_REQUESTS_PER_IP

    conn.close()
    remaining = max(0, MAX_DAILY_REQUESTS_PER_IP - count)
    return remaining


def get_global_remaining_requests() -> int:
    """Get the number of remaining global requests for the day"""
    conn = sqlite3.connect(IP_TRACKING_DB_PATH)
    cursor = conn.cursor()

    cursor.execute(
        "SELECT total_count, last_date FROM global_counter WHERE counter_id = 'daily_total'"
    )
    result = cursor.fetchone()

    if not result:
        # Initialize if not exists
        today = date.today()
        cursor.execute(
            "INSERT INTO global_counter (counter_id, total_count, last_date) VALUES (?, ?, ?)",
            ("daily_total", 0, today),
        )
        conn.commit()
        conn.close()
        return MAX_TOTAL_DAILY_REQUESTS

    count, last_date = result

    # Convert string date to date object if needed
    if isinstance(last_date, str):
        last_date = datetime.strptime(last_date, "%Y-%m-%d").date()

    # If it's a new day, reset the counter
    if last_date < date.today():
        conn.close()
        return MAX_TOTAL_DAILY_REQUESTS

    conn.close()
    remaining = max(0, MAX_TOTAL_DAILY_REQUESTS - count)
    return remaining


# Add new function to record query history
def record_query_history(
    ip_address: str, user_query: str, sql_query: str, success: bool
):
    """Record a query in the history table"""
    conn = sqlite3.connect(IP_TRACKING_DB_PATH)
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO query_history (ip_address, user_query, sql_query, success)
        VALUES (?, ?, ?, ?)
        """,
        (ip_address, user_query, sql_query, success),
    )

    conn.commit()
    conn.close()


# ─── 3. LLM & SQL PIPELINE ────────────────────────────────────────────────────
def generate_sql_via_llm(user_query: str, system_prompt: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4.1",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_query},
        ],
        temperature=0.5,
    )
    print(response.choices[0].message.content.strip())
    # Assuming the response is a JSON with a 'sql_query' key
    return response.choices[0].message.content.strip()


def fetch_data(query: str) -> pd.DataFrame:
    con = duckdb.connect(DB_PATH)
    df = con.execute(query).fetchdf()
    con.close()
    return df


def get_sql_for_query(user_query: str, system_prompt: str) -> str:
    # cached = get_cached_sql(user_query)
    cached = None
    if cached:
        print("🔁 Using cached SQL")
        return cached
    import json

    sql = generate_sql_via_llm(user_query, system_prompt)
    print(type(sql))
    print(sql)
    # cache_query(user_query, sql)
    return sql


def get_gpt_response(prompt):
    resp = response = client.chat.completions.create(
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


# Define the POST endpoint
@app.post("/process_query/")
async def process_query(request: Request, user_query: str = Form(...)):
    import json

    # Step 1: Check if the query is related to IPL
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
            "innings" "performance",
            "average",
            "strike rate",
            "economy",
            "highest",
            "lowest",
            "best",
            "worst",
        ]
    ):
        return {"error": "Please ask a specific question related to IPL data."}

    # Step 2: Get the real client IP address
    # Check for X-Forwarded-For header that contains the original client IP
    forwarded_for = request.headers.get("X-Forwarded-For")
    if forwarded_for:
        # Use the first IP in the X-Forwarded-For header (client's original IP)
        client_ip = forwarded_for.split(",")[0].strip()
    else:
        # Fall back to direct client connection IP
        client_ip = request.client.host

    print(f"Request from IP: {client_ip}")

    # Step 3: Check global daily limit first
    global_remaining = get_global_remaining_requests()
    if global_remaining <= 0:
        return {
            "error": f"The service has reached its daily request limit of {MAX_TOTAL_DAILY_REQUESTS}. Please try again tomorrow."
        }

    # Step 4: Check individual IP request limit
    if not check_ip_limit(client_ip):
        ip_remaining = get_ip_remaining_requests(client_ip)
        return {
            "error": f"You have exceeded your daily limit. You have {ip_remaining} requests remaining for today."
        }

    response = json.loads(get_sql_for_query(user_query, system_prompt))
    sql_query = response["sql_query"]

    ## TODO : Store sql_query, result and user query in database or json file.
    # with open("temp_sql_query", "w") as f:
    #     f.write(sql_query)

    # Check if the SQL query is actually an error message
    if sql_query.startswith("ERROR:"):
        # Record the failed query in history
        record_query_history(client_ip, user_query, sql_query, False)

        # Return the error message without trying to execute it
        return {
            "sql_query": sql_query,
            "error": sql_query.replace("ERROR:", "").strip(),
            "remaining_requests": {
                "user_remaining": get_ip_remaining_requests(client_ip),
                "global_remaining": get_global_remaining_requests(),
            },
        }

    # Execute and get results
    try:
        df = fetch_data(sql_query)
        json_result = df.to_dict(orient="records")

        # Record the successful query in history
        record_query_history(client_ip, user_query, sql_query, True)

        print("Result:", json_result)
        response = {
            "sql_query": sql_query,
            "result": json_result,
            "remaining_requests": {
                "user_remaining": get_ip_remaining_requests(client_ip),
                "global_remaining": get_global_remaining_requests(),
            },
        }
        return response
    except Exception as e:
        # Record the failed query in history
        record_query_history(client_ip, user_query, sql_query, False)

        # Handle execution errors
        # Log the actual error to terminal for debugging
        print(f"ERROR: {str(e)}")
        return {
            "sql_query": sql_query,
            # "error": f"Error executing query: {str(e)}",
            "error": "Oops! Something went wrong while trying to get your answer.",
            "remaining_requests": {
                "user_remaining": get_ip_remaining_requests(client_ip),
                "global_remaining": get_global_remaining_requests(),
            },
        }


# Run the server using uvicorn
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
