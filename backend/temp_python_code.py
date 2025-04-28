# /// script
# dependencies = [
#    "duckdb",
#    "google-generativeai"
# ]
# ///
import duckdb
import os
import google.generativeai as genai
import json

# Set up Gemini API
genai.configure(api_key=os.getenv('GEMINI_KEY'))
model = genai.GenerativeModel('gemini-2.0-flash')

# SQL query to execute
sql_query = """SELECT deliveries.match_id, SUM(deliveries.runs_total) AS total_runs FROM deliveries JOIN matches ON deliveries.match_id = matches.match_id WHERE matches.season = '2016' AND deliveries.match_id IN (SELECT match_id FROM teams WHERE team_name = 'Sunrisers Hyderabad') GROUP BY deliveries.match_id ORDER BY total_runs DESC LIMIT 1;"""

# Connect to DuckDB
con = duckdb.connect(database='ipl_data.db', read_only=True)

# Execute the query
result = con.execute(sql_query).fetchdf()

# Close the connection
con.close()

# Summarize the result for Gemini
if not result.empty:
    match_id = result['match_id'][0]
    total_runs = result['total_runs'][0]
    summary = f"In the 2016 IPL season, the highest total runs scored by Sunrisers Hyderabad was {total_runs} in the match with match_id {match_id}."
else:
    summary = "No matches found for Sunrisers Hyderabad in 2016."

# Generate natural language explanation using Gemini
response = model.generate_content(f"Summarize the following cricket match data: {summary}")
nl_explanation = response.text

# Save the response to a file
with open('natural_language_response.txt', 'w') as f:
    f.write(nl_explanation)

print(f"Natural language explanation saved to natural_language_response.txt")