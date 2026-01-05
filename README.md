# SHG Digital Platform

A comprehensive digital platform for Self Help Group (SHG) management with React frontend and FastAPI backend.

## Project Structure

```
├── frontend/           # React + Vite frontend application
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── backend/            # FastAPI backend application
│   ├── app/
│   ├── requirements.txt
│   └── run.bat
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 18+ (for frontend)
- Python 3.10+ (for backend)
- Git

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173/
```

### Backend Setup
```bash
cd backend
python -m venv venv

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 5000
# Backend runs on http://localhost:5000/
```

## Deployment

### GitHub Pages (Frontend Only)
```bash
cd frontend
npm run deploy
```

This will:
1. Build the React app
2. Deploy to GitHub Pages
3. Available at: https://LunaZinOS.github.io/SELF-HELP-group-1/

### API Documentation
When backend is running, visit:
- **Swagger UI**: http://localhost:5000/docs
- **ReDoc**: http://localhost:5000/redoc
- **Health Check**: http://localhost:5000/api/health

## Key Features

- **Dashboard**: Real-time overview of SHG data
- **Member Management**: Track and manage members
- **Loan Management**: Monitor loans and repayments
- **Volunteer Tracking**: Manage volunteer assignments
- **Announcements**: Share updates with the community
- **Role-based Access**: Different views for admin, members, and volunteers

## Technologies

### Frontend
- React 19.2
- Vite 7.2
- React Router 7.0
- CSS3

### Backend
- FastAPI 0.104.1
- Uvicorn 0.24.0
- Pydantic 2.4.2
- Python 3.10+

## Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

**Backend:**
- `python -m uvicorn app.main:app --reload` - Start development server

## Project Features

### Authentication
- User login and role-based access
- Session management with localStorage

### Dashboard
- Admin Panel: Full system overview
- Member Dashboard: Personal information
- Volunteer Dashboard: Assigned tasks and activities
- National Overview: Country-wide statistics

### Data Management
- Members, Loans, SHGs, Volunteers data
- JSON-based data storage
- RESTful API endpoints

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Push to GitHub
5. Create a pull request

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub.
