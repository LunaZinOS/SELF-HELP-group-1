#!/bin/bash

# SHG Digital Platform - FastAPI Backend Startup Script

echo "========================================"
echo "SHG Digital Platform Backend"
echo "FastAPI with Uvicorn"
echo "========================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed or not in PATH"
    exit 1
fi

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    echo "Virtual environment created."
    echo ""
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install/upgrade dependencies
echo ""
echo "Installing dependencies..."
pip install -q -r requirements.txt

# Start the server
echo ""
echo "========================================"
echo "Starting FastAPI Server..."
echo "========================================"
echo ""
echo "API Documentation: http://localhost:5000/docs"
echo "Health Check: http://localhost:5000/api/health"
echo ""

uvicorn app.main:app --reload --host 0.0.0.0 --port 5000
