@echo off
REM SHG Digital Platform - FastAPI Backend Startup Script

echo ========================================
echo SHG Digital Platform Backend
echo FastAPI with Uvicorn
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    pause
    exit /b 1
)

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
    echo Virtual environment created.
    echo.
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install/upgrade dependencies
echo.
echo Installing dependencies...
pip install -q -r requirements.txt

REM Start the server
echo.
echo ========================================
echo Starting FastAPI Server...
echo ========================================
echo.
echo API Documentation: http://localhost:5000/docs
echo Health Check: http://localhost:5000/api/health
echo.

uvicorn app.main:app --reload --host 0.0.0.0 --port 5000

pause
