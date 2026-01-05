# GitHub Pages Deployment Guide

## Overview
Your SHG Digital Platform is now configured for GitHub Pages deployment. The project uses HashRouter for client-side routing and automatic GitHub Actions for deployment.

## What Changed
1. **Vite Configuration** - Added `base: '/SELF-HELP-group-1/'` to support GitHub Pages subdirectory
2. **React Router** - Changed from `BrowserRouter` to `HashRouter` for GitHub Pages compatibility
3. **GitHub Actions** - Created automatic deployment workflow (`.github/workflows/deploy.yml`)
4. **Package.json** - Added `deploy` script
5. **index.html** - Fixed hardcoded asset references

## How It Works
1. When you push to `main` branch, GitHub Actions automatically:
   - Builds the React frontend
   - Publishes to `gh-pages` branch
2. GitHub Pages serves the site from `https://LunaZinOS.github.io/SELF-HELP-group-1/`

## Access Your Live Site
Once deployed, visit: **https://LunaZinOS.github.io/SELF-HELP-group-1/**

## Local Development
```bash
# Frontend only (React app)
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173/

# Backend (FastAPI)
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 5000
# API runs on http://localhost:5000/docs
```

## Manual Deployment (if needed)
```bash
cd frontend
npm install
npm run build
npm run deploy
```

## Important Notes
- **GitHub Pages Only**: The current setup only serves the frontend (React) on GitHub Pages
- **Backend Limitations**: The FastAPI backend cannot run on GitHub Pages (static hosting only)
- **HashRouter**: URLs use hash format: `/#/dashboard` instead of `/dashboard`
- **API Calls**: Frontend API calls to backend will only work locally

## Next Steps
1. **Backend Deployment**: For a full-stack deployment, consider:
   - Heroku, Railway, Render, or DigitalOcean for the backend
   - Update API URLs in frontend to point to deployed backend
2. **Environment Variables**: Store API URLs in frontend environment variables
3. **Testing**: Verify all features work at the GitHub Pages URL

## Files Changed
- `frontend/vite.config.js` - Added base path
- `frontend/src/App.jsx` - Changed to HashRouter
- `frontend/index.html` - Fixed assets
- `frontend/package.json` - Added deploy script
- `.github/workflows/deploy.yml` - New deployment workflow
- `.gitignore` - Exclude node_modules and build files
