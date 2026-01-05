# SHG Digital Platform - Complete Project Structure

## Project Overview

The National Self Help Group (SHG) Digital Platform is a comprehensive web application designed to connect and manage Self Help Groups across India. It features role-based access, transparent loan management, volunteer connectivity, and AI-powered guidance.

## Technology Stack

### Frontend
- **Framework**: React 19.2.0
- **Routing**: React Router v7.0.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Vanilla CSS (organized in separate folder structure)
- **AI Integration**: Google Gemini API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Data Storage**: JSON files (easily upgradeable to MongoDB/PostgreSQL)
- **Environment**: Dotenv for configuration

## Project Directory Structure

```
d:\Shaurya/
├── frontend/
│   ├── src/
│   │   ├── styles/                 # Organized CSS files
│   │   │   ├── components/
│   │   │   │   ├── Navigation.css
│   │   │   │   └── Chatbot.css
│   │   │   ├── pages/
│   │   │   │   ├── LandingPage.css
│   │   │   │   ├── DashboardPage.css
│   │   │   │   ├── AnnouncementsPage.css
│   │   │   │   ├── LoginPage.css
│   │   │   │   ├── NationalOverviewPage.css
│   │   │   │   ├── AboutPage.css
│   │   │   │   ├── AdminPanel.css
│   │   │   │   ├── VolunteerDashboard.css
│   │   │   │   └── MemberDashboard.css
│   │   │   └── index.css           # Global styles
│   │   ├── components/
│   │   │   ├── Navigation.jsx
│   │   │   └── Chatbot.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── AnnouncementsPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── NationalOverviewPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── VolunteerDashboard.jsx
│   │   │   └── MemberDashboard.jsx
│   │   ├── services/
│   │   │   └── geminiService.js    # Gemini AI integration
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── backend/
│   ├── routes/
│   │   ├── auth.js                 # Authentication endpoints
│   │   ├── loans.js                # Loan management endpoints
│   │   ├── shgs.js                 # SHG management endpoints
│   │   ├── volunteers.js           # Volunteer endpoints
│   │   └── dashboard.js            # Dashboard/overview endpoints
│   ├── data/
│   │   ├── users.json              # User credentials
│   │   ├── shgs.json               # SHG information
│   │   ├── loans.json              # Loan requests
│   │   └── volunteers.json         # Volunteer data
│   ├── server.js                   # Main server file
│   ├── package.json
│   ├── .env                        # Environment variables
│   └── README.md                   # Backend documentation
```

## Frontend Features

### 1. Public Pages
- **Landing Page**: Hero section, platform features, benefits, interactive videos
- **Dashboard Page**: SHG information, member management, training videos
- **Announcements Page**: News, resources, success stories with videos
- **National Overview**: Real-time statistics, top-performing states, recent activities
- **About Page**: Information about SHGs, platform purpose, how different users contribute

### 2. Authentication & Role-Based Access
- **Login Page**: Three role selection (Member, Admin, Volunteer)
- **Protected Routes**: Role-based access control
- **Session Management**: localStorage-based authentication

### 3. Role-Specific Dashboards

#### SHG Member Dashboard
- View group information
- Check savings and contributions
- Submit loan requests
- Track loan status
- Access training resources

#### Admin Panel (SHG Head/Administrator)
- Manage SHG data
- Review and approve/reject loan requests
- View management statistics
- Track member information
- Generate reports

#### Volunteer Dashboard
- Discover nearby SHGs by location
- View volunteer opportunities and activities
- Access volunteer profile
- Track volunteer hours and impact
- View SHGs needing support

### 4. Components
- **Navigation**: Sticky header with role-based logout
- **Chatbot**: AI-powered (Gemini) floating assistant for guidance

### 5. Technology Features
- **Gemini AI Integration**: Intelligent chatbot for SHG-related queries
- **Responsive Design**: Mobile, tablet, desktop support
- **Videos**: Embedded training and informational videos
- **Color Theme**: Green (#2d5016) and Orange (#f59e0b) agricultural theme

## Backend Features

### API Routes

#### Authentication (`/api/auth`)
- User login with role-based authentication
- User registration
- Profile retrieval

#### Loans (`/api/loans`)
- Get all loans
- Filter by status (pending, approved, rejected)
- Submit new loan requests
- Approve/reject loans
- Get loans by SHG

#### SHGs (`/api/shgs`)
- Retrieve all SHGs
- Get SHG by code or location
- Create new SHG
- Update SHG information
- Location-based filtering

#### Volunteers (`/api/volunteers`)
- Get all volunteers
- Register new volunteer
- Get volunteers by location
- Update volunteer profile

#### Dashboard (`/api/dashboard`)
- National overview statistics
- SHG-specific dashboard
- Admin dashboard
- Volunteer dashboard

## CSS Organization

All CSS files are organized in `frontend/src/styles/`:
- `styles/components/` - Component-specific styles
- `styles/pages/` - Page-specific styles
- `styles/index.css` - Global styles

## Data Schema

### Users
```json
{
  "id": number,
  "email": string,
  "password": string,
  "role": "member|admin|volunteer",
  "name": string,
  "shgCode": string (optional),
  "state": string (optional),
  "district": string (optional)
}
```

### SHGs
```json
{
  "id": number,
  "code": string,
  "name": string,
  "state": string,
  "district": string,
  "block": string,
  "members": number,
  "savings": number,
  "loans": number,
  "foundedYear": number,
  "head": string,
  "contact": string,
  "email": string
}
```

### Loans
```json
{
  "id": number,
  "shgCode": string,
  "memberName": string,
  "amount": number,
  "purpose": string,
  "status": "pending|approved|rejected",
  "date": string,
  "interestRate": string,
  "approvalDate": string,
  "approvedBy": string
}
```

### Volunteers
```json
{
  "id": number,
  "name": string,
  "email": string,
  "phone": string,
  "state": string,
  "district": string,
  "skills": string[],
  "hoursVolunteered": number,
  "activitiesJoined": number,
  "shgsSupported": number,
  "status": "active|inactive",
  "registrationDate": string
}
```

## Setup Instructions

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Runs on: http://localhost:5173

### Backend Setup
```bash
cd backend
npm install
npm run dev
```
Runs on: http://localhost:5000

## Demo Credentials

**SHG Member**
- Email: member@shg.com
- Password: password123

**Administrator**
- Email: admin@shg.com
- Password: password123

**Volunteer**
- Email: volunteer@shg.com
- Password: password123

## Color Palette

- **Primary Green**: #2d5016 (Agricultural theme)
- **Accent Orange**: #f59e0b (Highlights, CTAs)
- **Secondary Green**: #10b981 (Volunteer theme)
- **Light Green**: #f0fdf4 (Backgrounds)
- **Neutral Gray**: #4b5563 (Text)

## Key Features Implemented

✅ Role-based login system
✅ Member dashboard with loan management
✅ Admin panel for loan approvals
✅ Volunteer registration and dashboard
✅ National overview with statistics
✅ Location-based connectivity
✅ Gemini AI chatbot integration
✅ Responsive design
✅ Video integration
✅ SHG information management
✅ Loan request workflow
✅ Volunteer activity tracking

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Advanced analytics and reporting
- Email notifications
- SMS alerts
- File uploads and document management
- Video call integration
- Payment gateway integration
- Mobile app (React Native)
- Advanced search and filtering
- User activity logging
