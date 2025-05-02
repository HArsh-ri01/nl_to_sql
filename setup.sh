#!/bin/bash

# Setup script for NL to SQL Project
echo "Setting up NL to SQL development environment..."

# Install Python dependencies
echo "Installing Python dependencies..."
uv venv
source .venv/bin/activate
uv pip install black pre-commit

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Set up pre-commit hooks
echo "Setting up pre-commit hooks..."
pre-commit install

# Run initial linting
echo "Running initial linting..."
black backend/
cd frontend
npm run lint
cd ..

echo "Setup complete! Your development environment is ready."
echo "Now whenever you commit code, it will be automatically linted."
