#!/bin/bash
# Build backend image
docker build -t jivraj18/nl_to_sql_backend ./backend
# Build frontend image
docker build -t jivraj18/nl_to_sql_frontend ./frontend
