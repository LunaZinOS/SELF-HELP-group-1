import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/VolunteerDashboard.css';

export default function VolunteerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('nearby-shgs');
  const [selectedState, setSelectedState] = useState('Madhya Pradesh');
  const [selectedDistrict, setSelectedDistrict] = useState('Indore');

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const states = ['Madhya Pradesh', 'Maharashtra', 'Karnataka', 'Rajasthan', 'Odisha'];
  const districts = {
    'Madhya Pradesh': ['Indore', 'Ujjain', 'Jabalpur', 'Gwalior'],
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
    Karnataka: ['Bangalore', 'Mysore', 'Mangalore'],
    Rajasthan: ['Jaipur', 'Jodhpur', 'Udaipur'],
    Odisha: ['Bhubaneswar', 'Cuttack', 'Rourkela'],
  };

  const nearbySHGs = [
    {
      id: 1,
      name: 'Mahila Vikas SHG',
      location: 'Indore, MP',
      members: 15,
      established: 2018,
      focus: 'Handicrafts, Dairy',
      needsSupport: 'Training in digital skills',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop',
    },
    {
      id: 2,
      name: 'Shakti Nari SHG',
      location: 'Ujjain, MP',
      members: 12,
      established: 2019,
      focus: 'Agriculture, Animal Husbandry',
      needsSupport: 'Market linkage assistance',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop',
    },
    {
      id: 3,
      name: 'Naari Shakti SHG',
      location: 'Indore, MP',
      members: 18,
      established: 2017,
      focus: 'Textile, Handicrafts',
      needsSupport: 'Business mentorship',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
    },
  ];

  const activities = [
    {
      id: 1,
      title: 'Digital Literacy Training',
      shg: 'Mahila Vikas SHG',
      date: '2025-01-10',
      time: '2:00 PM - 4:00 PM',
      location: 'Community Center, Indore',
      description: 'Training on using digital platforms for business and communication',
      volunteersNeeded: 2,
      volunteersJoined: 1,
    },
    {
      id: 2,
      title: 'Business Planning Workshop',
      shg: 'Shakti Nari SHG',
      date: '2025-01-12',
      time: '10:00 AM - 12:30 PM',
      location: 'SHG Office, Ujjain',
      description: 'Help SHG members create business plans and identify market opportunities',
      volunteersNeeded: 3,
      volunteersJoined: 2,
    },
    {
      id: 3,
      title: 'Skill Enhancement Session',
      shg: 'Naari Shakti SHG',
      date: '2025-01-15',
      time: '3:00 PM - 5:00 PM',
      location: 'Training Hall, Indore',
      description: 'Advanced training on textile techniques and design',
      volunteersNeeded: 1,
      volunteersJoined: 0,
    },
  ];

  const stats = [
    { label: 'SHGs in Your Region', value: nearbySHGs.length, icon: '👥' },
    { label: 'Available Activities', value: activities.length, icon: '📅' },
    { label: 'Total Members Supported', value: nearbySHGs.reduce((sum, shg) => sum + shg.members, 0), icon: '👩‍🤝‍👩' },
    { label: 'Hours Volunteered', value: '24', icon: '⏱️' },
  ];

  return (
    <div className="volunteer-dashboard-wrapper">
      {/* Header */}
      <header className="volunteer-header">
        <div className="volunteer-header-content">
          <div>
            <h1>Volunteer Dashboard</h1>
            <p className="header-subtitle">Connect and support SHGs in your region</p>
          </div>
          <button className="btn btn-secondary btn-small" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="volunteer-container">
        {/* Stats */}
        <section className="stats-section">
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <p className="stat-value">{stat.value}</p>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tabs */}
        <div className="volunteer-tabs">
          <button
            className={`tab-btn ${activeTab === 'nearby-shgs' ? 'active' : ''}`}
            onClick={() => setActiveTab('nearby-shgs')}
          >
            Nearby SHGs
          </button>
          <button
            className={`tab-btn ${activeTab === 'activities' ? 'active' : ''}`}
            onClick={() => setActiveTab('activities')}
          >
            Activities & Events
          </button>
          <button
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            My Profile
          </button>
        </div>

        {/* Content */}
        <section className="volunteer-content">
          {/* Nearby SHGs Tab */}
          {activeTab === 'nearby-shgs' && (
            <div className="tab-content">
              <h2>Discover SHGs Near You</h2>
              
              <div className="location-filters">
                <div className="filter-group">
                  <label htmlFor="state">State:</label>
                  <select
                    id="state"
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedDistrict(districts[e.target.value][0]);
                    }}
                  >
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label htmlFor="district">District:</label>
                  <select
                    id="district"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                  >
                    {districts[selectedState].map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="shgs-grid">
                {nearbySHGs.map((shg) => (
                  <div key={shg.id} className="shg-card">
                    <img src={shg.image} alt={shg.name} className="shg-image" />
                    <div className="shg-content">
                      <h3>{shg.name}</h3>
                      <p className="shg-location">📍 {shg.location}</p>
                      <div className="shg-info">
                        <span>👥 {shg.members} members</span>
                        <span>📅 Est. {shg.established}</span>
                      </div>
                      <p className="shg-focus">
                        <strong>Focus:</strong> {shg.focus}
                      </p>
                      <p className="shg-need">
                        <strong>Needs:</strong> {shg.needsSupport}
                      </p>
                      <button className="btn btn-primary btn-small btn-full">
                        Learn More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activities Tab */}
          {activeTab === 'activities' && (
            <div className="tab-content">
              <h2>Upcoming Activities & Events</h2>
              <div className="activities-list">
                {activities.map((activity) => (
                  <div key={activity.id} className="activity-card">
                    <div className="activity-header">
                      <div>
                        <h3>{activity.title}</h3>
                        <p className="activity-shg">SHG: {activity.shg}</p>
                      </div>
                      <div className="activity-date">
                        <div className="date-value">{activity.date}</div>
                        <div className="date-time">{activity.time}</div>
                      </div>
                    </div>

                    <div className="activity-details">
                      <p className="activity-description">{activity.description}</p>
                      <p className="activity-location">📍 {activity.location}</p>
                      <div className="volunteers-info">
                        <span className="volunteers-needed">
                          {activity.volunteersNeeded - activity.volunteersJoined} volunteers needed
                        </span>
                        <span className="volunteers-joined">
                          {activity.volunteersJoined} already joined
                        </span>
                      </div>
                    </div>

                    <button className="btn btn-primary btn-small">Join Activity</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="tab-content">
              <h2>My Volunteer Profile</h2>
              <div className="profile-card">
                <div className="profile-section">
                  <h3>Personal Information</h3>
                  <div className="profile-grid">
                    <div className="profile-item">
                      <label>Name:</label>
                      <p>Rajesh Kumar</p>
                    </div>
                    <div className="profile-item">
                      <label>Email:</label>
                      <p>rajesh@example.com</p>
                    </div>
                    <div className="profile-item">
                      <label>Phone:</label>
                      <p>+91-9876543210</p>
                    </div>
                    <div className="profile-item">
                      <label>Region:</label>
                      <p>Madhya Pradesh</p>
                    </div>
                  </div>
                </div>

                <div className="profile-section">
                  <h3>Interests & Skills</h3>
                  <div className="skills-tags">
                    <span className="skill-tag">Business Mentorship</span>
                    <span className="skill-tag">Digital Training</span>
                    <span className="skill-tag">Marketing</span>
                    <span className="skill-tag">Agriculture</span>
                  </div>
                </div>

                <div className="profile-section">
                  <h3>Volunteer Statistics</h3>
                  <div className="profile-grid">
                    <div className="profile-item">
                      <label>Total Hours:</label>
                      <p>24 hours</p>
                    </div>
                    <div className="profile-item">
                      <label>Activities Joined:</label>
                      <p>5 activities</p>
                    </div>
                    <div className="profile-item">
                      <label>SHGs Supported:</label>
                      <p>3 groups</p>
                    </div>
                    <div className="profile-item">
                      <label>Member Impact:</label>
                      <p>45+ members</p>
                    </div>
                  </div>
                </div>

                <button className="btn btn-secondary btn-small">Edit Profile</button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
