import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shgCode, setShgCode] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Store user session
    const userData = { userType, email, shgCode };
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    
    // Navigate based on role
    if (userType === 'member') {
      navigate('/member-dashboard');
    } else if (userType === 'admin') {
      navigate('/admin-panel');
    } else if (userType === 'volunteer') {
      navigate('/volunteer-dashboard');
    }
  };

  if (!userType) {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="role-selection">
            <h1>National SHG Digital Platform</h1>
            <p className="role-subtitle">Select your role to continue</p>
            
            <div className="role-cards">
              <div className="role-card member-card" onClick={() => setUserType('member')}>
                <div className="role-icon">👩‍🌾</div>
                <h3>SHG Member</h3>
                <p>View group information, announcements, and submit loan requests</p>
              </div>
              
              <div className="role-card admin-card" onClick={() => setUserType('admin')}>
                <div className="role-icon">👔</div>
                <h3>SHG Head / Administrator</h3>
                <p>Manage group data, approve loans, and monitor activities</p>
              </div>
              
              <div className="role-card volunteer-card" onClick={() => setUserType('volunteer')}>
                <div className="role-icon">🤝</div>
                <h3>Volunteer</h3>
                <p>Connect with SHGs, view activities, and support communities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-wrapper">
          <button className="back-btn" onClick={() => setUserType(null)}>← Back</button>
          
          <form onSubmit={handleLogin} className="login-form">
            <h2>
              {isLogin ? 'Login' : 'Register'} as{' '}
              {userType === 'member'
                ? 'SHG Member'
                : userType === 'admin'
                  ? 'Administrator'
                  : 'Volunteer'}
            </h2>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {userType !== 'volunteer' && (
              <div className="form-group">
                <label htmlFor="shgCode">
                  {userType === 'member' ? 'SHG Code' : 'SHG Code (for registration)'}
                </label>
                <input
                  id="shgCode"
                  type="text"
                  placeholder="Enter SHG code"
                  value={shgCode}
                  onChange={(e) => setShgCode(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-large">
              {isLogin ? 'Login' : 'Register'}
            </button>

            <p className="form-toggle">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="toggle-btn"
              >
                {isLogin ? 'Register' : 'Login'}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
