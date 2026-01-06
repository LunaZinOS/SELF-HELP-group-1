from fastapi import APIRouter, HTTPException
from typing import Dict
from ..models import SHGRequest, SHGUpdate
from ..utils import read_json, write_json, get_next_id

router = APIRouter()

@router.get("/")
async def get_all_shgs() -> Dict:
    """Get all SHGs"""
    data = read_json("shgs.json")
    shgs = data.get("shgs", [])
    return {"success": True, "shgs": shgs}

@router.get("/{shg_code}")
async def get_shg_by_code(shg_code: str) -> Dict:
    """Get SHG by code"""
    data = read_json("shgs.json")
    shgs = data.get("shgs", [])
    
    shg = next((s for s in shgs if s["code"] == shg_code), None)
    if not shg:
        raise HTTPException(status_code=404, detail="SHG not found")
    
    return {"success": True, "shg": shg}

@router.get("/location/{state}/{district}")
async def get_shgs_by_location(state: str, district: str) -> Dict:
    """Get SHGs by location"""
    data = read_json("shgs.json")
    shgs = data.get("shgs", [])
    
    filtered = [s for s in shgs if s["state"] == state and s["district"] == district]
    return {"success": True, "shgs": filtered}

@router.get("/by-state/{state}")
async def get_shgs_by_state(state: str) -> Dict:
    """Get SHGs by state"""
    data = read_json("shgs.json")
    shgs = data.get("shgs", [])
    
    filtered = [s for s in shgs if s["state"] == state]
    return {"success": True, "shgs": filtered}

@router.post("/")
async def create_shg(request: SHGRequest) -> Dict:
    """Create new SHG"""
    if not all([request.code, request.name, request.state, request.district]):
        raise HTTPException(status_code=400, detail="Missing required fields")
    
    data = read_json("shgs.json")
    shgs = data.get("shgs", [])
    
    if any(s["code"] == request.code for s in shgs):
        raise HTTPException(status_code=400, detail="SHG with this code already exists")
    
    new_shg = {
        "id": get_next_id(shgs),
        "code": request.code,
        "name": request.name,
        "state": request.state,
        "district": request.district,
        "block": request.block or "",
        "members": 0,
        "savings": 0,
        "loans": 0,
        "foundedYear": 2024,
        "head": request.head or "",
        "contact": request.contact or "",
        "email": request.email or "",
    }
    
    shgs.append(new_shg)
    write_json("shgs.json", {"shgs": shgs})
    
    return {
        "success": True,
        "message": "SHG created successfully",
        "shg": new_shg,
    }

@router.put("/{shg_code}")
async def update_shg(shg_code: str, request: SHGUpdate) -> Dict:
    """Update SHG information"""
    data = read_json("shgs.json")
    shgs = data.get("shgs", [])
    
    shg = next((s for s in shgs if s["code"] == shg_code), None)
    if not shg:
        raise HTTPException(status_code=404, detail="SHG not found")
    
    update_data = request.dict(exclude_unset=True)
    shg.update(update_data)
    
    write_json("shgs.json", {"shgs": shgs})
    
    return {"success": True, "message": "SHG updated", "shg": shg}
