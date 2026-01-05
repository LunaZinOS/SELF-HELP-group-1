import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/MemberDashboard.css';

// Toast Notification Component
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      {type === 'success' && '✓'} {type === 'error' && '✗'} {message}
    </div>
  );
}

export default function MemberDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [visibleSections, setVisibleSections] = useState({});
  const [loans, setLoans] = useState([
    { id: 1, amount: 50000, purpose: 'Business expansion', date: '2024-12-15', status: 'approved', interestRate: '7%' },
    { id: 2, amount: 30000, purpose: 'Equipment purchase', date: '2024-11-10', status: 'approved', interestRate: '7%' },
  ]);
  const [toasts, setToasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  // Form Validation
  const validateLoanForm = () => {
    const errors = [];
    
    if (!loanAmount || loanAmount.trim() === '') {
      errors.push('Loan amount is required');
    } else if (isNaN(loanAmount) || parseFloat(loanAmount) <= 0) {
      errors.push('Loan amount must be a positive number');
    } else if (parseFloat(loanAmount) < 5000) {
      errors.push('Minimum loan amount is ₹5,000');
    } else if (parseFloat(loanAmount) > 500000) {
      errors.push('Maximum loan amount is ₹5,00,000');
    }
    
    if (!loanPurpose || loanPurpose.trim() === '') {
      errors.push('Please select a loan purpose');
    }
    
    return errors;
  };

  // Show Toast Notification
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  // Handle Loan Submission
  const handleLoanSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setFormErrors([]);
    
    // Validate form
    const errors = validateLoanForm();
    if (errors.length > 0) {
      setFormErrors(errors);
      showToast(errors[0], 'error');
      return;
    }

    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Add new loan
      setLoans([
        ...loans,
        {
          id: loans.length + 1,
          amount: parseFloat(loanAmount),
          purpose: loanPurpose,
          date: new Date().toISOString().split('T')[0],
          status: 'pending',
          interestRate: 'TBD',
        },
      ]);
      
      // Reset form
      setLoanAmount('');
      setLoanPurpose('');
      setFormErrors([]);
      
      showToast('Loan request submitted successfully!', 'success');
    } catch (error) {
      showToast('Failed to submit loan request. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset Form
  const handleResetForm = () => {
    setLoanAmount('');
    setLoanPurpose('');
    setFormErrors([]);
  };

  const stats = [
    { label: 'Group Savings', value: '₹2,50,000', icon: '💰' },
    { label: 'Your Contribution', value: '₹12,500', icon: '💳' },
    { label: 'Total Loans Taken', value: '₹80,000', icon: '📊' },
    { label: 'Outstanding Dues', value: '₹45,000', icon: '⏳' },
  ];

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    document.querySelectorAll('[id^="section-"]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="member-dashboard-wrapper">
      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast 
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
          />
        ))}
      </div>

      {/* Header */}
      <header className="member-header">
        <div className="member-header-content">
          <div>
            <h1>Member Dashboard</h1>
            <p className="header-subtitle">Mahila Vikas SHG - Indore, MP</p>
          </div>
          <button className="btn btn-secondary btn-small" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="member-container">
        {/* Stats */}
        <section 
          id="section-stats" 
          className={`stats-section ${visibleSections['section-stats'] ? 'visible' : ''}`}
        >
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <p className="stat-label">{stat.label}</p>
                  <p className="stat-value">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tabs */}
        <div className="member-tabs">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
            aria-selected={activeTab === 'overview'}
          >
            Group Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'loans' ? 'active' : ''}`}
            onClick={() => setActiveTab('loans')}
            aria-selected={activeTab === 'loans'}
          >
            Loan Management
          </button>
          <button
            className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
            aria-selected={activeTab === 'resources'}
          >
            Resources
          </button>
        </div>

        {/* Content */}
        <section className="member-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="tab-content">
              <h2>Group Information</h2>
              
              <div className="info-grid">
                <div className="info-box">
                  <h3>Group Details</h3>
                  <div className="info-item">
                    <label>Group Name:</label>
                    <p>Mahila Vikas SHG</p>
                  </div>
                  <div className="info-item">
                    <label>Group Code:</label>
                    <p>SHG-MP-001</p>
                  </div>
                  <div className="info-item">
                    <label>Established:</label>
                    <p>January 2018</p>
                  </div>
                  <div className="info-item">
                    <label>Location:</label>
                    <p>Indore, Madhya Pradesh</p>
                  </div>
                </div>

                <div className="info-box">
                  <h3>Membership</h3>
                  <div className="info-item">
                    <label>Total Members:</label>
                    <p>15</p>
                  </div>
                  <div className="info-item">
                    <label>Group Head:</label>
                    <p>Meera Sharma</p>
                  </div>
                  <div className="info-item">
                    <label>Your Status:</label>
                    <p>✅ Active Member</p>
                  </div>
                  <div className="info-item">
                    <label>Join Date:</label>
                    <p>March 2018</p>
                  </div>
                </div>

                <div className="info-box">
                  <h3>Financial Overview</h3>
                  <div className="info-item">
                    <label>Group Savings:</label>
                    <p>₹2,50,000</p>
                  </div>
                  <div className="info-item">
                    <label>Monthly Savings Target:</label>
                    <p>₹500 per member</p>
                  </div>
                  <div className="info-item">
                    <label>Your Savings:</label>
                    <p>₹12,500</p>
                  </div>
                  <div className="info-item">
                    <label>Interest Rate on Savings:</label>
                    <p>8% per annum</p>
                  </div>
                </div>
              </div>

              <div className="announcement-section">
                <h3>📢 Recent Announcements</h3>
                <div className="announcements">
                  <div className="announcement-item">
                    <p className="announcement-date">Jan 5, 2025</p>
                    <p className="announcement-text">Monthly group meeting scheduled for January 10, 2025 at 3:00 PM</p>
                  </div>
                  <div className="announcement-item">
                    <p className="announcement-date">Dec 28, 2024</p>
                    <p className="announcement-text">Congratulations! New interest-free loan scheme launched by government</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loans Tab */}
          {activeTab === 'loans' && (
            <div className="tab-content">
              <h2>Loan Management</h2>

              {/* Submit Loan Form */}
              <div className="loan-form-box">
                <h3>Request a New Loan</h3>
                {formErrors.length > 0 && (
                  <div className="form-errors">
                    {formErrors.map((error, idx) => (
                      <p key={idx} className="error-message">• {error}</p>
                    ))}
                  </div>
                )}
                <form onSubmit={handleLoanSubmit} className="loan-form" noValidate>
                  <div className="form-group">
                    <label htmlFor="amount">Loan Amount (₹) <span className="required">*</span></label>
                    <input
                      id="amount"
                      type="number"
                      placeholder="Enter amount (₹5,000 - ₹5,00,000)"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      disabled={isLoading}
                      aria-invalid={formErrors.some(e => e.includes('amount'))}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="purpose">Loan Purpose <span className="required">*</span></label>
                    <select
                      id="purpose"
                      value={loanPurpose}
                      onChange={(e) => setLoanPurpose(e.target.value)}
                      disabled={isLoading}
                      aria-invalid={formErrors.some(e => e.includes('purpose'))}
                    >
                      <option value="">Select a purpose</option>
                      <option value="Business expansion">Business Expansion</option>
                      <option value="Equipment purchase">Equipment Purchase</option>
                      <option value="Agricultural tools">Agricultural Tools</option>
                      <option value="Home improvement">Home Improvement</option>
                      <option value="Education">Education</option>
                      <option value="Medical">Medical</option>
                    </select>
                  </div>

                  <div className="form-actions">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Submitting...' : 'Submit Loan Request'}
                    </button>
                    <button 
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleResetForm}
                      disabled={isLoading}
                    >
                      Clear Form
                    </button>
                  </div>
                </form>
              </div>

              {/* Loan History */}
              <div className="loan-history">
                <h3>Loan History ({loans.length})</h3>
                {loans.length === 0 ? (
                  <div className="empty-state">
                    <p>No loans yet. Submit your first loan request above!</p>
                  </div>
                ) : (
                  loans.map((loan) => (
                    <div key={loan.id} className={`loan-item loan-${loan.status}`}>
                      <div className="loan-details">
                        <div className="loan-amount-box">₹{loan.amount.toLocaleString()}</div>
                        <div className="loan-info">
                          <p className="loan-purpose">{loan.purpose}</p>
                          <p className="loan-date">Requested: {loan.date}</p>
                          <p className="loan-interest">Interest Rate: {loan.interestRate}</p>
                        </div>
                      </div>
                      <div className={`loan-status-badge status-${loan.status}`}>
                        {loan.status === 'pending' ? '⏳ Pending' : '✅ Approved'}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div className="tab-content">
              <h2>Resources & Training</h2>
              <div className="resources-grid">
                <div className="resource-card">
                  <div className="resource-icon">📚</div>
                  <h3>Best Practices Guide</h3>
                  <p>Learn proven strategies for SHG management and success</p>
                  <button className="btn btn-secondary btn-small">Download</button>
                </div>

                <div className="resource-card">
                  <div className="resource-icon">🎓</div>
                  <h3>Skill Development</h3>
                  <p>Free training programs on business and digital literacy</p>
                  <button className="btn btn-secondary btn-small">Enroll</button>
                </div>

                <div className="resource-card">
                  <div className="resource-icon">💡</div>
                  <h3>Business Ideas</h3>
                  <p>Explore micro-business ideas suited to rural areas</p>
                  <button className="btn btn-secondary btn-small">Explore</button>
                </div>

                <div className="resource-card">
                  <div className="resource-icon">🏛️</div>
                  <h3>Government Schemes</h3>
                  <p>Information on subsidies and schemes for SHGs</p>
                  <button className="btn btn-secondary btn-small">Learn More</button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
