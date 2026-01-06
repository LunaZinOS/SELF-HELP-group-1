import { useState, useEffect } from 'react';
import '../styles/pages/NationalOverviewPage.css';

export default function NationalOverviewPage() {
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-section').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      id: 1,
      label: 'Total Funds Managed',
      value: '₹485 Crores',
      icon: '💰',
      description: 'Across all connected SHGs in India',
    },
    {
      id: 2,
      label: 'Active SHGs',
      value: '12,450',
      icon: '👥',
      description: 'Self Help Groups connected nationwide',
    },
    {
      id: 3,
      label: 'Active Volunteers',
      value: '3,280',
      icon: '🤝',
      description: 'Supporting local communities',
    },
    {
      id: 4,
      label: 'Pending Loans',
      value: '234',
      icon: '⏳',
      description: 'Awaiting approval',
    },
    {
      id: 5,
      label: 'Approved Loans',
      value: '8,932',
      icon: '✅',
      description: 'Total loans approved this year',
    },
    {
      id: 6,
      label: 'Total Members',
      value: '289,450',
      icon: '👩‍🤝‍👩',
      description: 'SHG members nationwide',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'loan',
      description: 'New loan request from Mahila Vikas SHG, Maharashtra',
      amount: '₹50,000',
      status: 'pending',
      date: '2025-01-04',
    },
    {
      id: 2,
      type: 'approval',
      description: 'Loan approved for Shakti Nari SHG, Madhya Pradesh',
      amount: '₹75,000',
      status: 'approved',
      date: '2025-01-03',
    },
    {
      id: 3,
      type: 'volunteer',
      description: 'New volunteer registered from Delhi',
      amount: 'N/A',
      status: 'new',
      date: '2025-01-02',
    },
    {
      id: 4,
      type: 'approval',
      description: 'Loan approved for Naari Shakti SHG, Karnataka',
      amount: '₹100,000',
      status: 'approved',
      date: '2025-01-01',
    },
  ];

  const topStates = [
    { name: 'Madhya Pradesh', shgs: 1250, funds: '₹45 Cr', volunteers: 320 },
    { name: 'Maharashtra', shgs: 1100, funds: '₹42 Cr', volunteers: 285 },
    { name: 'Karnataka', shgs: 950, funds: '₹38 Cr', volunteers: 245 },
    { name: 'Rajasthan', shgs: 880, funds: '₹35 Cr', volunteers: 210 },
    { name: 'Odisha', shgs: 760, funds: '₹30 Cr', volunteers: 185 },
  ];

  return (
    <div className="national-overview-page">
      {/* Header */}
      <section className="overview-header">
        <div className="header-content">
          <h1>National SHG Overview</h1>
          <p className="header-subtitle">
            Real-time monitoring of Self Help Groups across India
          </p>
        </div>
      </section>

      {/* Statistics Cards */}
      <section id="stats" className={`stats-section fade-section ${visibleSections['stats'] ? 'visible' : ''}`}>
        <div className="container">
          <h2>National Statistics at a Glance</h2>
          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.id} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-label">{stat.label}</p>
                  <p className="stat-description">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Performing States */}
      <section id="top-states" className={`top-states-section fade-section ${visibleSections['top-states'] ? 'visible' : ''}`}>
        <div className="container">
          <h2>Top Performing States</h2>
          <p className="section-intro">Leading states driving SHG growth and engagement across India.</p>
          <div className="states-table-wrapper">
            <table className="states-table">
              <thead>
                <tr>
                  <th>State</th>
                  <th>Active SHGs</th>
                  <th>Total Funds</th>
                  <th>Volunteers</th>
                </tr>
              </thead>
              <tbody>
                {topStates.map((state, idx) => (
                  <tr key={idx}>
                    <td className="state-name">
                      <span className="rank">#{idx + 1}</span>
                      {state.name}
                    </td>
                    <td>{state.shgs}</td>
                    <td className="funds-cell">{state.funds}</td>
                    <td>{state.volunteers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Recent Activities */}
      <section id="activities" className={`activities-section fade-section ${visibleSections['activities'] ? 'visible' : ''}`}>
        <div className="container">
          <h2>Recent Activities</h2>
          <p className="section-intro">Latest updates from Self Help Groups across the nation.</p>
          <div className="activities-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className={`activity-item activity-${activity.status}`}>
                <div className="activity-icon">
                  {activity.type === 'loan'
                    ? '📝'
                    : activity.type === 'approval'
                      ? '✅'
                      : '👤'}
                </div>
                <div className="activity-content">
                  <p className="activity-description">{activity.description}</p>
                  <span className="activity-date">
                    {new Date(activity.date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="activity-amount">
                  {activity.amount !== 'N/A' && <span>{activity.amount}</span>}
                  <span className={`status-badge status-${activity.status}`}>
                    {activity.status === 'pending'
                      ? 'Pending'
                      : activity.status === 'approved'
                        ? 'Approved'
                        : 'New'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <h2>Be Part of the National SHG Movement</h2>
          <p>
            Whether you're an SHG member, administrator, or volunteer, join India's largest digital platform for Self Help Groups. Connect, grow, and make an impact together.
          </p>
          <div className="cta-buttons">
            <button className="cta-button primary">Get Started</button>
            <button className="cta-button secondary">Learn More</button>
          </div>
        </div>
      </section>
    </div>
  );
}
