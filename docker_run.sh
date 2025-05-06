#!/bin/bash
# Run backend with volume for SQLite DB
docker run -d -e API_KEY=$API_KEY -p 8000:8000 --name nl_to_sql_backend jivraj18/nl_to_sql_backend
# Run frontend
docker run -d -p 3000:3000 --name nl_to_sql_frontend jivraj18/nl_to_sql_frontend
