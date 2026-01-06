from fastapi import APIRouter, HTTPException
from typing import Dict, List
from ..models import LoanRequest, LoanApprovalRequest
from ..utils import read_json, write_json, get_next_id, get_today_date

router = APIRouter()

@router.get("/")
async def get_all_loans() -> Dict:
    """Get all loans"""
    data = read_json("loans.json")
    loans = data.get("loans", [])
    return {"success": True, "loans": loans}

@router.get("/status/{status}")
async def get_loans_by_status(status: str) -> Dict:
    """Get loans by status"""
    data = read_json("loans.json")
    loans = data.get("loans", [])
    filtered = [l for l in loans if l["status"] == status]
    return {"success": True, "loans": filtered}

@router.get("/shg/{shg_code}")
async def get_loans_by_shg(shg_code: str) -> Dict:
    """Get loans for specific SHG"""
    data = read_json("loans.json")
    loans = data.get("loans", [])
    filtered = [l for l in loans if l["shgCode"] == shg_code]
    return {"success": True, "loans": filtered}

@router.post("/")
async def submit_loan(request: LoanRequest) -> Dict:
    """Submit new loan request"""
    if not all([request.shgCode, request.memberName, request.amount, request.purpose]):
        raise HTTPException(status_code=400, detail="Missing required fields")
    
    data = read_json("loans.json")
    loans = data.get("loans", [])
    
    new_loan = {
        "id": get_next_id(loans),
        "shgCode": request.shgCode,
        "memberName": request.memberName,
        "amount": request.amount,
        "purpose": request.purpose,
        "status": "pending",
        "date": get_today_date(),
        "interestRate": "TBD",
        "approvalDate": None,
        "approvedBy": None,
    }
    
    loans.append(new_loan)
    write_json("loans.json", {"loans": loans})
    
    return {
        "success": True,
        "message": "Loan request submitted successfully",
        "loan": new_loan,
    }

@router.put("/{loan_id}/approve")
async def approve_loan(loan_id: int, request: LoanApprovalRequest) -> Dict:
    """Approve loan"""
    data = read_json("loans.json")
    loans = data.get("loans", [])
    
    loan = next((l for l in loans if l["id"] == loan_id), None)
    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")
    
    loan["status"] = "approved"
    loan["approvalDate"] = get_today_date()
    loan["approvedBy"] = request.approvedBy
    loan["interestRate"] = request.interestRate or "7%"
    
    write_json("loans.json", {"loans": loans})
    
    return {"success": True, "message": "Loan approved", "loan": loan}

@router.put("/{loan_id}/reject")
async def reject_loan(loan_id: int) -> Dict:
    """Reject loan"""
    data = read_json("loans.json")
    loans = data.get("loans", [])
    
    loan = next((l for l in loans if l["id"] == loan_id), None)
    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")
    
    loan["status"] = "rejected"
    write_json("loans.json", {"loans": loans})
    
    return {"success": True, "message": "Loan rejected", "loan": loan}
