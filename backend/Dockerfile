FROM python:3.12-slim-bookworm

# Use uv from ghcr
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

COPY . /app/


# Default command
CMD ["uv", "run" ,"main.py"]