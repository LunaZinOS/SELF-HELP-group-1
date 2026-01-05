from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from .routers import auth, loans, shgs, volunteers, dashboard

app = FastAPI(
    title="SHG Digital Platform Backend",
    description="FastAPI backend for SHG Digital Platform",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(loans.router, prefix="/api/loans", tags=["loans"])
app.include_router(shgs.router, prefix="/api/shgs", tags=["shgs"])
app.include_router(volunteers.router, prefix="/api/volunteers", tags=["volunteers"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])

# Health check endpoint
@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "Server is running",
        "timestamp": datetime.now().isoformat()
    }

# Root endpoint
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "SHG Digital Platform Backend API",
        "version": "1.0.0",
        "docs": "/docs"
    }

# 404 handler
@app.get("/api/404")
async def not_found():
    """Not found endpoint"""
    return {"error": "Route not found"}

if __name__ == "__main__":
    import uvicorn
    import os
    from dotenv import load_dotenv
    
    load_dotenv()
    port = int(os.getenv("PORT", 5000))
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=port,
        reload=True
    )
