@echo off
REM GitHub Pages Deployment Troubleshooting Script

echo.
echo ===================================
echo GitHub Pages Deployment Checker
echo ===================================
echo.

REM Check if we're in the right directory
if not exist "frontend\dist\index.html" (
    echo ERROR: dist/index.html not found!
    echo Run: cd frontend && npm run build
    pause
    exit /b 1
)

echo [OK] dist/index.html found
echo.

REM Check if git is available
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed or not in PATH
    pause
    exit /b 1
)

echo [OK] Git is available
echo.

REM Check branches
echo Checking git branches...
git branch -a
echo.

REM Check if gh-pages branch exists
git rev-parse --verify gh-pages >nul 2>&1
if errorlevel 1 (
    echo WARNING: gh-pages branch does not exist locally
    echo This is normal - it will be created by npm run deploy
    echo.
) else (
    echo [OK] gh-pages branch exists
    echo.
)

REM Show current main branch status
echo Current commits:
git log --oneline -5
echo.

REM Check dist contents
echo Checking dist folder contents:
dir frontend\dist\
echo.

REM Check dist/index.html paths
echo Checking index.html asset paths:
findstr "SELF-HELP-group-1" frontend\dist\index.html
echo.

REM Final instructions
echo ===================================
echo NEXT STEPS:
echo ===================================
echo.
echo 1. Run deployment:
echo    cd frontend
echo    npm run deploy
echo.
echo 2. Go to GitHub Pages settings:
echo    https://github.com/LunaZinOS/SELF-HELP-group-1/settings/pages
echo.
echo 3. Make sure:
echo    - Source: Deploy from a branch
echo    - Branch: gh-pages (/)
echo    - Click Save
echo.
echo 4. Visit your site (after 2-3 minutes):
echo    https://LunaZinOS.github.io/SELF-HELP-group-1/
echo.
echo ===================================

pause
