import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Chatbot from './components/Chatbot';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import LoginPage from './pages/LoginPage';
import NationalOverviewPage from './pages/NationalOverviewPage';
import AboutPage from './pages/AboutPage';
import AdminPanel from './pages/AdminPanel';
import VolunteerDashboard from './pages/VolunteerDashboard';
import MemberDashboard from './pages/MemberDashboard';
import './App.css';

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/national-overview" element={<NationalOverviewPage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Protected Routes */}
          <Route
            path="/admin-panel"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/volunteer-dashboard"
            element={
              <ProtectedRoute>
                <VolunteerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/member-dashboard"
            element={
              <ProtectedRoute>
                <MemberDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Chatbot />
      </div>
    </Router>
  );
}