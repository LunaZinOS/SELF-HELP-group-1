from fastapi import APIRouter, HTTPException
from ..utils import read_json

router = APIRouter()

@router.get("/national-overview")
async def get_national_overview():
    """Get national overview statistics"""
    shgs = read_json("shgs.json")
    loans = read_json("loans.json")
    volunteers = read_json("volunteers.json")
    
    shg_list = shgs.get("shgs", [])
    loan_list = loans.get("loans", [])
    volunteer_list = volunteers.get("volunteers", [])
    
    total_members = sum(s["members"] for s in shg_list)
    total_savings = sum(s["savings"] for s in shg_list)
    pending_loans = len([l for l in loan_list if l["status"] == "pending"])
    approved_loans = len([l for l in loan_list if l["status"] == "approved"])
    
    # Calculate top states
    state_data = {}
    for shg in shg_list:
        state = shg["state"]
        if state not in state_data:
            state_data[state] = {
                "name": state,
                "shgs": 0,
                "funds": 0,
                "volunteers": 0
            }
        state_data[state]["shgs"] += 1
        state_data[state]["funds"] += shg["savings"]
    
    # Add volunteer counts
    for volunteer in volunteer_list:
        state = volunteer["state"]
        if state in state_data:
            state_data[state]["volunteers"] += 1
    
    top_states = sorted(state_data.values(), key=lambda x: x["shgs"], reverse=True)[:5]
    
    # Recent activities
    recent_loans = sorted(loan_list, key=lambda x: x["date"], reverse=True)[:10]
    recent_activities = []
    
    for loan in recent_loans:
        shg = next((s for s in shg_list if s["code"] == loan["shgCode"]), None)
        location = f"{shg['district']}, {shg['state']}" if shg else "Unknown"
        
        activity = {
            "id": loan["id"],
            "type": "loan" if loan["status"] == "pending" else "approval",
            "description": f"{'New loan request' if loan['status'] == 'pending' else 'Loan approved'} from {shg['name'] if shg else 'Unknown SHG'}, {location}",
            "amount": f"₹{loan['amount']:,}",
            "status": loan["status"],
            "date": loan["date"]
        }
        recent_activities.append(activity)
    
    return {
        "stats": {
            "totalFundsManaged": total_savings,
            "activeSHGs": len(shg_list),
            "activeVolunteers": len(volunteer_list),
            "pendingLoans": pending_loans,
            "approvedLoans": approved_loans,
            "totalMembers": total_members
        },
        "topStates": top_states,
        "recentActivities": recent_activities
    }

@router.get("/shg/{shg_code}")
async def get_shg_dashboard(shg_code: str):
    """Get dashboard data for a specific SHG"""
    shgs = read_json("shgs.json")
    loans = read_json("loans.json")
    
    shg_list = shgs.get("shgs", [])
    loan_list = loans.get("loans", [])
    
    shg = next((s for s in shg_list if s["code"] == shg_code), None)
    
    if not shg:
        raise HTTPException(status_code=404, detail="SHG not found")
    
    # Get SHG loans
    shg_loans = [l for l in loan_list if l["shgCode"] == shg_code]
    total_loans_disbursed = sum(l["amount"] for l in shg_loans if l["status"] == "approved")
    pending_loan_count = len([l for l in shg_loans if l["status"] == "pending"])
    
    # Recent activities
    recent_loans = sorted(shg_loans, key=lambda x: x["date"], reverse=True)[:5]
    activities = [
        {
            "id": l["id"],
            "activity": f"Loan {'Approved' if l['status'] == 'approved' else 'Requested'} - {l['purpose']}",
            "date": l["date"],
            "amount": f"₹{l['amount']:,}"
        }
        for l in recent_loans
    ]
    
    return {
        "shgInfo": shg,
        "stats": {
            "totalMembers": shg["members"],
            "totalSavings": shg["savings"],
            "loansDisbursed": total_loans_disbursed,
            "activeLoanAccounts": shg["loans"],
            "pendingLoans": pending_loan_count
        },
        "recentActivities": activities,
        "loans": shg_loans
    }

@router.get("/admin")
async def get_admin_dashboard():
    """Get admin dashboard data"""
    shgs = read_json("shgs.json")
    loans = read_json("loans.json")
    
    shg_list = shgs.get("shgs", [])
    loan_list = loans.get("loans", [])
    
    total_members = sum(s["members"] for s in shg_list)
    total_savings = sum(s["savings"] for s in shg_list)
    pending_loans = [l for l in loan_list if l["status"] == "pending"]
    
    return {
        "stats": {
            "totalSHGs": len(shg_list),
            "totalMembers": total_members,
            "totalSavings": total_savings,
            "pendingLoans": len(pending_loans)
        },
        "pendingLoanRequests": pending_loans,
        "shgs": shg_list,
        "recentLoans": sorted(loan_list, key=lambda x: x["date"], reverse=True)[:10]
    }

@router.get("/volunteer/{volunteer_id}")
async def get_volunteer_dashboard(volunteer_id: int):
    """Get volunteer dashboard data"""
    volunteers = read_json("volunteers.json")
    shgs = read_json("shgs.json")
    
    volunteer_list = volunteers.get("volunteers", [])
    shg_list = shgs.get("shgs", [])
    
    volunteer = next((v for v in volunteer_list if v["id"] == volunteer_id), None)
    
    if not volunteer:
        raise HTTPException(status_code=404, detail="Volunteer not found")
    
    # Get SHGs in volunteer's location
    nearby_shgs = [
        s for s in shg_list 
        if s["state"] == volunteer["state"] and s["district"] == volunteer["district"]
    ]
    
    return {
        "volunteerInfo": volunteer,
        "stats": {
            "shgsInRegion": len(nearby_shgs),
            "hoursVolunteered": volunteer["hoursVolunteered"],
            "activitiesJoined": volunteer["activitiesJoined"],
            "shgsSupported": volunteer["shgsSupported"]
        },
        "nearbySHGs": nearby_shgs,
        "activities": []  # Can be extended with actual activities data
    }

@router.get("/member/{shg_code}/{member_name}")
async def get_member_dashboard(shg_code: str, member_name: str):
    """Get member dashboard data"""
    shgs = read_json("shgs.json")
    loans = read_json("loans.json")
    
    shg_list = shgs.get("shgs", [])
    loan_list = loans.get("loans", [])
    
    shg = next((s for s in shg_list if s["code"] == shg_code), None)
    
    if not shg:
        raise HTTPException(status_code=404, detail="SHG not found")
    
    # Get member's loans
    member_loans = [
        l for l in loan_list 
        if l["shgCode"] == shg_code and l["memberName"] == member_name
    ]
    
    total_loans_taken = sum(l["amount"] for l in member_loans if l["status"] == "approved")
    
    return {
        "shgInfo": shg,
        "memberLoans": member_loans,
        "stats": {
            "groupSavings": shg["savings"],
            "yourContribution": shg["savings"] // shg["members"] if shg["members"] > 0 else 0,
            "totalLoansTaken": total_loans_taken,
            "outstandingDues": int(total_loans_taken * 0.6)  # Simplified calculation
        }
    }