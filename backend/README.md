# SHG Digital Platform - FastAPI Backend

A Python/FastAPI backend for the SHG Digital Platform providing REST APIs for role-based access management.

## Installation

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## Running the Server

```bash
# Run with uvicorn
uvicorn app.main:app --reload --host 0.0.0.0 --port 5000

# Or using the main.py file
python -m app.main
```

The API will be available at `http://localhost:5000`

## API Documentation

- **Swagger UI**: http://localhost:5000/docs
- **ReDoc**: http://localhost:5000/redoc

## Project Structure

```
backend/
├── app/
│   ├── routers/           # API route modules
│   │   ├── auth.py       # Authentication endpoints
│   │   ├── loans.py      # Loan management endpoints
│   │   ├── shgs.py       # SHG management endpoints
│   │   ├── volunteers.py # Volunteer endpoints
│   │   └── dashboard.py  # Dashboard endpoints
│   ├── data/             # JSON data storage
│   │   ├── users.json
│   │   ├── shgs.json
│   │   ├── loans.json
│   │   └── volunteers.json
│   ├── models.py         # Pydantic models
│   ├── utils.py          # Utility functions
│   └── main.py           # FastAPI app initialization
├── requirements.txt      # Python dependencies
├── .env                  # Environment variables
└── README.md             # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user
- `GET /api/auth/profile/{user_id}` - Get user profile

### Loans
- `GET /api/loans` - Get all loans
- `GET /api/loans/status/{status}` - Get loans by status
- `GET /api/loans/shg/{shg_code}` - Get SHG loans
- `POST /api/loans` - Submit loan request
- `PUT /api/loans/{loan_id}/approve` - Approve loan
- `PUT /api/loans/{loan_id}/reject` - Reject loan

### SHGs
- `GET /api/shgs` - Get all SHGs
- `GET /api/shgs/{shg_code}` - Get SHG details
- `GET /api/shgs/location/{state}/{district}` - Get SHGs by location
- `GET /api/shgs/by-state/{state}` - Get SHGs by state
- `POST /api/shgs` - Create new SHG
- `PUT /api/shgs/{shg_code}` - Update SHG

### Volunteers
- `GET /api/volunteers` - Get all volunteers
- `GET /api/volunteers/location/{state}/{district}` - Get volunteers by location
- `GET /api/volunteers/{volunteer_id}` - Get volunteer profile
- `POST /api/volunteers/register` - Register volunteer
- `PUT /api/volunteers/{volunteer_id}` - Update volunteer

### Dashboard
- `GET /api/dashboard/national-overview` - National statistics
- `GET /api/dashboard/shg/{shg_code}` - SHG dashboard
- `GET /api/dashboard/admin` - Admin dashboard
- `GET /api/dashboard/volunteer/{volunteer_id}` - Volunteer dashboard

### Health
- `GET /api/health` - Health check

## Demo Credentials

**Member**
- Email: `member@shg.com`
- Role: member
- SHG Code: SHG-MP-001

**Admin**
- Email: `admin@shg.com`
- Role: admin
- SHG Code: SHG-MP-001

**Volunteer**
- Email: `volunteer@shg.com`
- Role: volunteer
- Location: Madhya Pradesh, Indore

## Environment Variables

```
PORT=5000
DEBUG=True
```

## Features

✅ Role-based access control (Member, Admin, Volunteer)
✅ Loan management with approval workflow
✅ SHG (Self Help Group) management
✅ Volunteer management and location-based filtering
✅ Comprehensive dashboard for all roles
✅ JSON file-based data storage (easy to migrate to database)
✅ CORS enabled for frontend integration
✅ Pydantic models for data validation
✅ Auto-generated API documentation

## Technologies Used

- **Framework**: FastAPI
- **Server**: Uvicorn
- **Validation**: Pydantic
- **Data**: JSON files (easily upgradeable to MongoDB/PostgreSQL)

## Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] JWT authentication
- [ ] Email notifications
- [ ] File uploads
- [ ] Advanced analytics
- [ ] Rate limiting
- [ ] Caching

## License

MIT License
