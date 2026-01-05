from fastapi import APIRouter, HTTPException
from typing import Dict
from ..models import VolunteerRegisterRequest, VolunteerUpdateRequest
from ..utils import read_json, write_json, get_next_id, get_today_date

router = APIRouter()

@router.get("/")
async def get_all_volunteers() -> Dict:
    """Get all volunteers"""
    data = read_json("volunteers.json")
    volunteers = data.get("volunteers", [])
    return {"success": True, "volunteers": volunteers}

@router.get("/location/{state}/{district}")
async def get_volunteers_by_location(state: str, district: str) -> Dict:
    """Get volunteers by location"""
    data = read_json("volunteers.json")
    volunteers = data.get("volunteers", [])
    
    filtered = [v for v in volunteers if v["state"] == state and v["district"] == district]
    return {"success": True, "volunteers": filtered}

@router.get("/{volunteer_id}")
async def get_volunteer(volunteer_id: int) -> Dict:
    """Get volunteer profile"""
    data = read_json("volunteers.json")
    volunteers = data.get("volunteers", [])
    
    volunteer = next((v for v in volunteers if v["id"] == volunteer_id), None)
    if not volunteer:
        raise HTTPException(status_code=404, detail="Volunteer not found")
    
    return {"success": True, "volunteer": volunteer}

@router.post("/register")
async def register_volunteer(request: VolunteerRegisterRequest) -> Dict:
    """Register new volunteer"""
    if not all([request.name, request.email, request.state, request.district]):
        raise HTTPException(status_code=400, detail="Missing required fields")
    
    data = read_json("volunteers.json")
    volunteers = data.get("volunteers", [])
    
    if any(v["email"] == request.email for v in volunteers):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_volunteer = {
        "id": get_next_id(volunteers),
        "name": request.name,
        "email": request.email,
        "phone": request.phone or "",
        "state": request.state,
        "district": request.district,
        "skills": request.skills or [],
        "hoursVolunteered": 0,
        "activitiesJoined": 0,
        "shgsSupported": 0,
        "status": "active",
        "registrationDate": get_today_date(),
    }
    
    volunteers.append(new_volunteer)
    write_json("volunteers.json", {"volunteers": volunteers})
    
    return {
        "success": True,
        "message": "Volunteer registered successfully",
        "volunteer": new_volunteer,
    }

@router.put("/{volunteer_id}")
async def update_volunteer(volunteer_id: int, request: VolunteerUpdateRequest) -> Dict:
    """Update volunteer profile"""
    data = read_json("volunteers.json")
    volunteers = data.get("volunteers", [])
    
    volunteer = next((v for v in volunteers if v["id"] == volunteer_id), None)
    if not volunteer:
        raise HTTPException(status_code=404, detail="Volunteer not found")
    
    update_data = request.dict(exclude_unset=True)
    volunteer.update(update_data)
    
    write_json("volunteers.json", {"volunteers": volunteers})
    
    return {
        "success": True,
        "message": "Volunteer profile updated",
        "volunteer": volunteer,
    }
