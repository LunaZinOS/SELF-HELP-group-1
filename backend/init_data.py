"""
Initialize data files for SHG Digital Platform
Run this script from the backend directory: python init_data.py
"""

import json
import os
from pathlib import Path

# Sample data
USERS_DATA = {
    "users": [
        {
            "id": 1,
            "email": "member@shg.com",
            "password": "$2a$10$5K5.8K8E5K5E5K5E5K5E5K5E5K5E5K5E5K5E5K5E5K5E5",
            "role": "member",
            "shgCode": "SHG-MP-001",
            "name": "Priya Sharma",
            "createdAt": "2024-01-15"
        },
        {
            "id": 2,
            "email": "admin@shg.com",
            "password": "$2a$10$5K5.8K8E5K5E5K5E5K5E5K5E5K5E5K5E5K5E5K5E5K5E5",
            "role": "admin",
            "shgCode": "SHG-MP-001",
            "name": "Meera Sharma",
            "createdAt": "2024-01-10"
        },
        {
            "id": 3,
            "email": "volunteer@shg.com",
            "password": "$2a$10$5K5.8K8E5K5E5K5E5K5E5K5E5K5E5K5E5K5E5K5E5K5E5",
            "role": "volunteer",
            "name": "Rajesh Kumar",
            "state": "Madhya Pradesh",
            "district": "Indore",
            "createdAt": "2024-02-01"
        }
    ]
}

SHGS_DATA = {
    "shgs": [
        {
            "id": 1,
            "code": "SHG-MP-001",
            "name": "Mahila Vikas SHG",
            "state": "Madhya Pradesh",
            "district": "Indore",
            "block": "Indore Urban",
            "members": 15,
            "savings": 250000,
            "loans": 8,
            "foundedYear": 2018,
            "head": "Meera Sharma",
            "contact": "9876543210",
            "email": "mahila.vikas@shg.com"
        },
        {
            "id": 2,
            "code": "SHG-MP-002",
            "name": "Shakti Nari SHG",
            "state": "Madhya Pradesh",
            "district": "Ujjain",
            "block": "Ujjain Urban",
            "members": 12,
            "savings": 180000,
            "loans": 5,
            "foundedYear": 2019,
            "head": "Anjali Verma",
            "contact": "9876543211",
            "email": "shakti.nari@shg.com"
        },
        {
            "id": 3,
            "code": "SHG-MP-003",
            "name": "Naari Shakti SHG",
            "state": "Madhya Pradesh",
            "district": "Indore",
            "block": "Indore",
            "members": 18,
            "savings": 320000,
            "loans": 10,
            "foundedYear": 2017,
            "head": "Sunita Patel",
            "contact": "9876543212",
            "email": "naari.shakti@shg.com"
        }
    ]
}

LOANS_DATA = {
    "loans": [
        {
            "id": 1,
            "shgCode": "SHG-MP-001",
            "memberName": "Priya Sharma",
            "amount": 50000,
            "purpose": "Business expansion",
            "status": "approved",
            "date": "2025-01-04",
            "interestRate": "7%",
            "approvalDate": "2025-01-05",
            "approvedBy": "admin"
        },
        {
            "id": 2,
            "shgCode": "SHG-MP-002",
            "memberName": "Anjali Verma",
            "amount": 30000,
            "purpose": "Agricultural tools",
            "status": "pending",
            "date": "2025-01-03",
            "interestRate": "TBD",
            "approvalDate": None,
            "approvedBy": None
        },
        {
            "id": 3,
            "shgCode": "SHG-MP-003",
            "memberName": "Sunita Patel",
            "amount": 75000,
            "purpose": "Dairy setup",
            "status": "approved",
            "date": "2025-01-01",
            "interestRate": "7%",
            "approvalDate": "2025-01-02",
            "approvedBy": "admin"
        }
    ]
}

VOLUNTEERS_DATA = {
    "volunteers": [
        {
            "id": 1,
            "name": "Rajesh Kumar",
            "email": "rajesh@example.com",
            "phone": "9876543210",
            "state": "Madhya Pradesh",
            "district": "Indore",
            "skills": ["Business Mentorship", "Digital Training", "Marketing"],
            "hoursVolunteered": 24,
            "activitiesJoined": 5,
            "shgsSupported": 3,
            "status": "active",
            "registrationDate": "2024-10-15"
        },
        {
            "id": 2,
            "name": "Neha Singh",
            "email": "neha@example.com",
            "phone": "9876543211",
            "state": "Maharashtra",
            "district": "Pune",
            "skills": ["Agriculture", "Women Empowerment", "Training"],
            "hoursVolunteered": 18,
            "activitiesJoined": 4,
            "shgsSupported": 2,
            "status": "active",
            "registrationDate": "2024-11-05"
        }
    ]
}

def create_data_directory():
    """Create data directory if it doesn't exist"""
    data_dir = Path("app/data")
    data_dir.mkdir(parents=True, exist_ok=True)
    return data_dir

def write_json_file(filepath, data):
    """Write data to JSON file"""
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"✅ Created: {filepath}")

def main():
    """Initialize all data files"""
    print("🚀 Initializing SHG Platform Data Files...")
    print("-" * 50)
    
    # Create data directory
    data_dir = create_data_directory()
    print(f"📁 Data directory: {data_dir.absolute()}")
    print("-" * 50)
    
    # Create each data file
    files = [
        ("users.json", USERS_DATA),
        ("shgs.json", SHGS_DATA),
        ("loans.json", LOANS_DATA),
        ("volunteers.json", VOLUNTEERS_DATA)
    ]
    
    for filename, data in files:
        filepath = data_dir / filename
        write_json_file(filepath, data)
    
    print("-" * 50)
    print("✨ Data initialization complete!")
    print("\n📝 Demo Credentials:")
    print("  Member:    member@shg.com")
    print("  Admin:     admin@shg.com")
    print("  Volunteer: volunteer@shg.com")
    print("\n🚀 You can now start the server:")
    print("  uvicorn app.main:app --reload --port 5000")

if __name__ == "__main__":
    main()
