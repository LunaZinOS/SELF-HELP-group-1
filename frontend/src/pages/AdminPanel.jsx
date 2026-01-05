import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/AdminPanel.css';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loans, setLoans] = useState([
    {
      id: 1,
      shgName: 'Mahila Vikas SHG',
      memberName: 'Priya Sharma',
      amount: 50000,
      purpose: 'Business expansion',
      status: 'pending',
      date: '2025-01-04',
      location: 'Indore, MP',
    },
    {
      id: 2,
      shgName: 'Shakti Nari SHG',
      memberName: 'Anjali Verma',
      amount: 30000,
      purpose: 'Agricultural tools',
      status: 'pending',
      date: '2025-01-03',
      location: 'Ujjain, MP',
    },
    {
      id: 3,
      shgName: 'Naari Shakti SHG',
      memberName: 'Sunita Patel',
      amount: 75000,
      purpose: 'Dairy setup',
      status: 'approved',
      date: '2025-01-01',
      location: 'Jabalpur, MP',
    },
  ]);

  const [shgData, setShgData] = useState([
    {
      id: 1,
      name: 'Mahila Vikas SHG',
      code: 'SHG-MP-001',
      members: 15,
      savings: 250000,
      loans: 8,
      state: 'Madhya Pradesh',
      district: 'Indore',
      block: 'Indore Urban',
      foundedYear: 2018,
    },
    {
      id: 2,
      name: 'Shakti Nari SHG',
      code: 'SHG-MP-002',
      members: 12,
      savings: 180000,
      loans: 5,
      state: 'Madhya Pradesh',
      district: 'Ujjain',
      block: 'Ujjain Urban',
      foundedYear: 2019,
    },
  ]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const handleLoanDecision = (loanId, decision) => {
    setLoans(
      loans.map((loan) =>
        loan.id === loanId ? { ...loan, status: decision } : loan
      )
    );
  };

  const stats = [
    { label: 'Total SHGs Managed', value: shgData.length, icon: '👥' },
    { label: 'Total Members', value: shgData.reduce((sum, s) => sum + s.members, 0), icon: '👩‍🤝‍👩' },
    {
      label: 'Total Savings',
      value: `₹${(shgData.reduce((sum, s) => sum + s.savings, 0) / 100000).toFixed(1)}L`,
      icon: '💰',
    },
    { label: 'Pending Loans', value: loans.filter((l) => l.status === 'pending').length, icon: '⏳' },
  ];

  return (
    <div className="admin-panel-wrapper">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>Administrator Panel</h1>
          <button className="btn btn-secondary btn-small" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="admin-container">
        {/* Sidebar Navigation */}
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <button
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Dashboard
            </button>
            <button
              className={`nav-item ${activeTab === 'loans' ? 'active' : ''}`}
              onClick={() => setActiveTab('loans')}
            >
              💳 Loan Approvals
            </button>
            <button
              className={`nav-item ${activeTab === 'shgs' ? 'active' : ''}`}
              onClick={() => setActiveTab('shgs')}
            >
              👥 Manage SHGs
            </button>
            <button
              className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              📈 Reports
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="admin-content">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <section className="admin-section">
              <h2>Dashboard Overview</h2>
              <div className="stats-grid">
                {stats.map((stat, idx) => (
                  <div key={idx} className="stat-box">
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-info">
                      <p className="stat-value">{stat.value}</p>
                      <p className="stat-label">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="section-box">
                <h3>Recent Loan Requests</h3>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>SHG Name</th>
                      <th>Member Name</th>
                      <th>Amount</th>
                      <th>Purpose</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loans.slice(0, 5).map((loan) => (
                      <tr key={loan.id} className={`status-${loan.status}`}>
                        <td>{loan.shgName}</td>
                        <td>{loan.memberName}</td>
                        <td>₹{loan.amount.toLocaleString()}</td>
                        <td>{loan.purpose}</td>
                        <td>
                          <span className={`badge badge-${loan.status}`}>
                            {loan.status === 'pending'
                              ? 'Pending'
                              : loan.status === 'approved'
                                ? 'Approved'
                                : 'Rejected'}
                          </span>
                        </td>
                        <td>{loan.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Loan Approvals Tab */}
          {activeTab === 'loans' && (
            <section className="admin-section">
              <h2>Loan Approval Management</h2>
              <div className="loan-requests">
                {loans.map((loan) => (
                  <div key={loan.id} className={`loan-card loan-${loan.status}`}>
                    <div className="loan-header">
                      <div className="loan-info">
                        <h3>{loan.shgName}</h3>
                        <p className="loan-member">Member: {loan.memberName}</p>
                        <p className="loan-location">📍 {loan.location}</p>
                      </div>
                      <div className="loan-amount">
                        <div className="amount-value">₹{loan.amount.toLocaleString()}</div>
                        <div className={`badge badge-${loan.status}`}>
                          {loan.status === 'pending'
                            ? 'Pending'
                            : loan.status === 'approved'
                              ? 'Approved'
                              : 'Rejected'}
                        </div>
                      </div>
                    </div>

                    <div className="loan-details">
                      <div className="detail-item">
                        <span className="detail-label">Purpose:</span>
                        <span className="detail-value">{loan.purpose}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Requested on:</span>
                        <span className="detail-value">{loan.date}</span>
                      </div>
                    </div>

                    {loan.status === 'pending' && (
                      <div className="loan-actions">
                        <button
                          className="btn btn-primary btn-small"
                          onClick={() => handleLoanDecision(loan.id, 'approved')}
                        >
                          ✅ Approve
                        </button>
                        <button
                          className="btn btn-secondary btn-small"
                          onClick={() => handleLoanDecision(loan.id, 'rejected')}
                        >
                          ❌ Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Manage SHGs Tab */}
          {activeTab === 'shgs' && (
            <section className="admin-section">
              <h2>Manage Self Help Groups</h2>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>SHG Name</th>
                    <th>Code</th>
                    <th>Members</th>
                    <th>Savings</th>
                    <th>State</th>
                    <th>District</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {shgData.map((shg) => (
                    <tr key={shg.id}>
                      <td>
                        <strong>{shg.name}</strong>
                      </td>
                      <td>{shg.code}</td>
                      <td>{shg.members}</td>
                      <td>₹{(shg.savings / 100000).toFixed(1)}L</td>
                      <td>{shg.state}</td>
                      <td>{shg.district}</td>
                      <td>
                        <button className="btn btn-primary btn-tiny">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <section className="admin-section">
              <h2>Reports & Analytics</h2>
              <div className="reports-grid">
                <div className="report-box">
                  <h3>Total Funds Managed</h3>
                  <p className="report-value">₹{(shgData.reduce((sum, s) => sum + s.savings, 0) / 10000000).toFixed(2)} Cr</p>
                  <p className="report-description">Across all managed SHGs</p>
                </div>
                <div className="report-box">
                  <h3>Loan Approval Rate</h3>
                  <p className="report-value">
                    {(
                      (loans.filter((l) => l.status === 'approved').length /
                        loans.length) *
                      100
                    ).toFixed(1)}
                    %
                  </p>
                  <p className="report-description">Year-to-date approval rate</p>
                </div>
                <div className="report-box">
                  <h3>Active Borrowers</h3>
                  <p className="report-value">
                    {shgData.reduce((sum, s) => sum + s.loans, 0)}
                  </p>
                  <p className="report-description">Total active loans</p>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
