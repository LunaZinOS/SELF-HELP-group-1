from pydantic import BaseModel
from typing import Optional, List

# ==================== Auth Models ====================
class LoginRequest(BaseModel):
    email: str
    password: str
    userType: str

class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str
    userType: str
    shgCode: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    role: str
    shgCode: Optional[str] = None

# ==================== Loan Models ====================
class LoanRequest(BaseModel):
    shgCode: str
    memberName: str
    amount: float
    purpose: str

class LoanApprovalRequest(BaseModel):
    approvedBy: str
    interestRate: Optional[str] = "7%"

class Loan(BaseModel):
    id: int
    shgCode: str
    memberName: str
    amount: float
    purpose: str
    status: str
    date: str
    interestRate: str
    approvalDate: Optional[str] = None
    approvedBy: Optional[str] = None

# ==================== SHG Models ====================
class SHGRequest(BaseModel):
    code: str
    name: str
    state: str
    district: str
    block: Optional[str] = None
    head: Optional[str] = None
    contact: Optional[str] = None
    email: Optional[str] = None

class SHGUpdate(BaseModel):
    members: Optional[int] = None
    savings: Optional[int] = None
    loans: Optional[int] = None
    foundedYear: Optional[int] = None
    head: Optional[str] = None
    contact: Optional[str] = None
    email: Optional[str] = None

class SHG(BaseModel):
    id: int
    code: str
    name: str
    state: str
    district: str
    block: str
    members: int
    savings: int
    loans: int
    foundedYear: int
    head: str
    contact: str
    email: str

# ==================== Volunteer Models ====================
class VolunteerRegisterRequest(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    state: str
    district: str
    skills: Optional[List[str]] = []

class VolunteerUpdateRequest(BaseModel):
    hoursVolunteered: Optional[int] = None
    activitiesJoined: Optional[int] = None
    shgsSupported: Optional[int] = None
    skills: Optional[List[str]] = None

class Volunteer(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    state: str
    district: str
    skills: List[str]
    hoursVolunteered: int
    activitiesJoined: int
    shgsSupported: int
    status: str
    registrationDate: str
