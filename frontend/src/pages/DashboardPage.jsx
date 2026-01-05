import { useState } from 'react';
import '../styles/pages/DashboardPage.css';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const shgData = {
    name: 'Mahila Vikas SHG',
    location: 'Rajpur Village, Madhya Pradesh',
    district: 'Indore',
    state: 'Madhya Pradesh',
    established: '2015',
    members: 25,
    totalSavings: '₹2,50,000',
    loansDisbursed: '₹5,00,000',
    activeLoanAccounts: 12,
    status: 'Active',
  };

  const members = [
    { id: 1, name: 'Priya Sharma', role: 'President', joinDate: '2015' },
    { id: 2, name: 'Anjali Singh', role: 'Vice President', joinDate: '2015' },
    { id: 3, name: 'Meera Patel', role: 'Treasurer', joinDate: '2016' },
    { id: 4, name: 'Deepa Kumari', role: 'Member', joinDate: '2017' },
    { id: 5, name: 'Rekha Yadav', role: 'Member', joinDate: '2018' },
  ];

  const recentActivities = [
    {
      id: 1,
      activity: 'Monthly Savings Collection',
      date: '2025-01-02',
      amount: '₹12,500',
    },
    {
      id: 2,
      activity: 'Loan Disbursement - Business Setup',
      date: '2024-12-28',
      amount: '₹50,000',
    },
    {
      id: 3,
      activity: 'Training Session: Digital Marketing',
      date: '2024-12-20',
      amount: 'Free',
    },
    {
      id: 4,
      activity: 'Meeting with District Officer',
      date: '2024-12-15',
      amount: '-',
    },
    {
      id: 5,
      activity: 'Loan Repayment',
      date: '2024-12-10',
      amount: '₹8,000',
    },
  ];

  return (
    <div className="dashboard-page">
      {/* Header */}
      <section className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="header-text">
              <h1>{shgData.name}</h1>
              <p className="header-subtitle">{shgData.location}</p>
              <div className="status-badge">Active</div>
            </div>
            <div className="header-image">
              <img
                src="https://media.istockphoto.com/id/157573665/photo/rice-harvest.webp?a=1&b=1&s=612x612&w=0&k=20&c=Q913NgydIlYqKoGLz-q9XwUuwd20PwVCWakyQv4OSEA="
                alt="SHG Group"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="dashboard-content">
        <div className="container">
          <div className="dashboard-grid">
            {/* Sidebar Navigation */}
            <aside className="dashboard-sidebar">
              <nav className="sidebar-nav">
                <button
                  className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={`nav-item ${activeTab === 'members' ? 'active' : ''}`}
                  onClick={() => setActiveTab('members')}
                >
                  Members
                </button>
                <button
                  className={`nav-item ${activeTab === 'activities' ? 'active' : ''}`}
                  onClick={() => setActiveTab('activities')}
                >
                  Activities
                </button>
                <button
                  className={`nav-item ${activeTab === 'financials' ? 'active' : ''}`}
                  onClick={() => setActiveTab('financials')}
                >
                  Financials
                </button>
              </nav>
            </aside>

            {/* Main Content Area */}
            <main className="dashboard-main">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="tab-content fade-in">
                  <h2>SHG Overview</h2>

                  {/* Key Metrics */}
                  <div className="metrics-grid">
                    <div className="metric-card">
                      <div className="metric-label">Total Members</div>
                      <div className="metric-value">{shgData.members}</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-label">Total Savings</div>
                      <div className="metric-value">{shgData.totalSavings}</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-label">Loans Disbursed</div>
                      <div className="metric-value">
                        {shgData.loansDisbursed}
                      </div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-label">Active Loans</div>
                      <div className="metric-value">
                        {shgData.activeLoanAccounts}
                      </div>
                    </div>
                  </div>

                  {/* Details Cards */}
                  <div className="details-section">
                    <h3>Basic Information</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>SHG Name:</label>
                        <p>{shgData.name}</p>
                      </div>
                      <div className="info-item">
                        <label>Location:</label>
                        <p>{shgData.location}</p>
                      </div>
                      <div className="info-item">
                        <label>District:</label>
                        <p>{shgData.district}</p>
                      </div>
                      <div className="info-item">
                        <label>State:</label>
                        <p>{shgData.state}</p>
                      </div>
                      <div className="info-item">
                        <label>Established:</label>
                        <p>{shgData.established}</p>
                      </div>
                      <div className="info-item">
                        <label>Status:</label>
                        <p className="status-text">{shgData.status}</p>
                      </div>
                    </div>
                  </div>

                  {/* Video Section */}
                  <div className="video-section">
                    <h3>SHG Training Video</h3>
                    <video
                      width="100%"
                      height="auto"
                      controls
                      poster="https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=600&h=300&fit=crop"
                    >
                      <source
                        src="https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}

              {/* Members Tab */}
              {activeTab === 'members' && (
                <div className="tab-content fade-in">
                  <h2>SHG Members</h2>
                  <div className="members-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Role</th>
                          <th>Join Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {members.map((member) => (
                          <tr key={member.id}>
                            <td>{member.name}</td>
                            <td>{member.role}</td>
                            <td>{member.joinDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Activities Tab */}
              {activeTab === 'activities' && (
                <div className="tab-content fade-in">
                  <h2>Recent Activities</h2>
                  <div className="activities-list">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="activity-item card">
                        <div className="activity-header">
                          <h4>{activity.activity}</h4>
                          <span className="activity-amount">{activity.amount}</span>
                        </div>
                        <p className="activity-date">{activity.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Financials Tab */}
              {activeTab === 'financials' && (
                <div className="tab-content fade-in">
                  <h2>Financial Summary</h2>
                  <div className="financial-cards">
                    <div className="fin-card">
                      <h4>Savings Pool</h4>
                      <div className="fin-value">{shgData.totalSavings}</div>
                      <p className="fin-description">
                        Total accumulated savings from all members
                      </p>
                    </div>
                    <div className="fin-card">
                      <h4>Total Loans Issued</h4>
                      <div className="fin-value">{shgData.loansDisbursed}</div>
                      <p className="fin-description">
                        Cumulative amount disbursed as loans
                      </p>
                    </div>
                    <div className="fin-card">
                      <h4>Outstanding Loans</h4>
                      <div className="fin-value">₹2,45,000</div>
                      <p className="fin-description">
                        Loans still being repaid by members
                      </p>
                    </div>
                    <div className="fin-card">
                      <h4>Loan Recovery Rate</h4>
                      <div className="fin-value">99.2%</div>
                      <p className="fin-description">
                        Percentage of loans successfully repaid
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
