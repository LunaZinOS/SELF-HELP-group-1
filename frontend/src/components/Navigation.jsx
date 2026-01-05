import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/components/Navigation.css';

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        setUser(null);
      }
    }
  }, []);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    setUser(null);
    navigate('/login');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🌾 SHG Platform
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/announcements"
              className={`nav-link ${isActive('/announcements')}`}
            >
              Announcements
            </Link>
          </li>
          <li>
            <Link
              to="/national-overview"
              className={`nav-link ${isActive('/national-overview')}`}
            >
              Overview
            </Link>
          </li>
          <li>
            <Link to="/about" className={`nav-link ${isActive('/about')}`}>
              About
            </Link>
          </li>
        </ul>

        <div className="nav-auth">
          {user ? (
            <div className="user-menu">
              <span className="user-name">👤 {user.name}</span>
              <span className="user-role">({user.role})</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button className="logout-btn" onClick={handleLoginClick}>
              LogIn
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
