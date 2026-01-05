from fastapi import APIRouter, HTTPException
from ..models import LoginRequest, RegisterRequest, UserResponse
from ..utils import read_json, write_json, get_next_id, get_today_date

router = APIRouter()

@router.post("/login")
async def login(request: LoginRequest):
    """Login endpoint"""
    users = read_json("users.json")
    user_list = users.get("users", [])
    
    # Find user by email
    user = next((u for u in user_list if u["email"] == request.email), None)
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Check if role matches
    if user["role"] != request.userType:
        raise HTTPException(status_code=401, detail="Invalid role for this user")
    
    # In production, verify password hash here
    # For demo purposes, we'll accept any password
    
    return {
        "success": True,
        "user": {
            "id": user["id"],
            "email": user["email"],
            "name": user["name"],
            "role": user["role"],
            "shgCode": user.get("shgCode"),
            "state": user.get("state"),
            "district": user.get("district")
        },
        "message": "Login successful"
    }

@router.post("/register")
async def register(request: RegisterRequest):
    """Register new user"""
    users = read_json("users.json")
    user_list = users.get("users", [])
    
    # Check if user already exists
    if any(u["email"] == request.email for u in user_list):
        raise HTTPException(status_code=400, detail="User already exists")
    
    # Create new user
    new_user = {
        "id": get_next_id(user_list),
        "email": request.email,
        "password": "$2a$10$5K5.8K8E5K5E5K5E5K5E5K5E5K5E5K5E5K5E5K5E5K5E5",  # Hashed password placeholder
        "role": request.userType,
        "name": request.name,
        "shgCode": request.shgCode,
        "state": request.state,
        "district": request.district,
        "createdAt": get_today_date()
    }
    
    user_list.append(new_user)
    users["users"] = user_list
    write_json("users.json", users)
    
    return {
        "success": True,
        "user": {
            "id": new_user["id"],
            "email": new_user["email"],
            "name": new_user["name"],
            "role": new_user["role"]
        },
        "message": "Registration successful"
    }

@router.get("/profile/{user_id}")
async def get_profile(user_id: int):
    """Get user profile"""
    users = read_json("users.json")
    user_list = users.get("users", [])
    
    user = next((u for u in user_list if u["id"] == user_id), None)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "id": user["id"],
        "email": user["email"],
        "name": user["name"],
        "role": user["role"],
        "shgCode": user.get("shgCode"),
        "state": user.get("state"),
        "district": user.get("district"),
        "createdAt": user.get("createdAt")
    }
    
