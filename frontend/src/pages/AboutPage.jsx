import { useState, useEffect } from 'react';
import '../styles/pages/AboutPage.css';

export default function AboutPage() {
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

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>National Self Help Group Digital Platform</h1>
          <p className="hero-subtitle">Empowering Rural Communities Through Digital Connectivity</p>
        </div>
      </section>

      {/* What is SHG Section */}
      <section id="what-is-shg" className={`fade-section content-section ${visibleSections['what-is-shg'] ? 'visible' : ''}`}>
        <div className="container">
          <h2>Understanding Self Help Groups (SHGs)</h2>
          <div className="section-content">
            <p className="intro-text">
              Self Help Groups are small communities of 10-20 members, mostly women, who come together with a common goal: to improve their economic situation and support each other's growth. They operate on simple principles of trust, mutual aid, and collective action.
            </p>
            <div className="content-grid">
              <div className="content-block">
                <h3>What SHGs Do</h3>
                <ul className="feature-list">
                  <li>Members save small amounts regularly</li>
                  <li>Create a common fund for lending</li>
                  <li>Provide loans to members at fair interest rates</li>
                  <li>Develop skills and knowledge together</li>
                  <li>Support women's economic independence</li>
                </ul>
              </div>
              <div className="content-block">
                <h3>The Challenge Today</h3>
                <p>
                  While SHGs have transformed lives across rural India, they face significant challenges:
                </p>
                <ul className="feature-list">
                  <li>Limited communication between groups</li>
                  <li>Lack of access to training and best practices</li>
                  <li>Difficulty connecting with authorities and support</li>
                  <li>No unified system for transparency and records</li>
                  <li>Isolated from national opportunities and insights</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Solution Section */}
      <section id="platform-solution" className={`fade-section content-section alternate ${visibleSections['platform-solution'] ? 'visible' : ''}`}>
        <div className="container">
          <h2>How This Platform Helps SHGs</h2>
          <p className="section-intro">Our digital platform connects Self Help Groups across India, breaking barriers and creating opportunities for growth.</p>
          <div className="solutions-grid">
            <div className="solution-card">
              <div className="card-number">1</div>
              <h3>National Connectivity</h3>
              <p>SHGs from different districts and states connect on a single platform, share experiences, and learn from each other's success stories.</p>
            </div>
            <div className="solution-card">
              <div className="card-number">2</div>
              <h3>Direct Authority Access</h3>
              <p>Improved communication with government authorities and NGOs. Announcements, policies, and opportunities reach SHGs instantly.</p>
            </div>
            <div className="solution-card">
              <div className="card-number">3</div>
              <h3>Knowledge & Training</h3>
              <p>Access training materials, best practices, and resources developed by successful SHGs and experts.</p>
            </div>
            <div className="solution-card">
              <div className="card-number">4</div>
              <h3>Digital Transparency</h3>
              <p>All records, loan approvals, and member details are digitally maintained with secure, role-based access.</p>
            </div>
            <div className="solution-card">
              <div className="card-number">5</div>
              <h3>National Insights</h3>
              <p>View real-time data on total funds mobilized, volunteers engaged, loan disbursement, and impact across the nation.</p>
            </div>
            <div className="solution-card">
              <div className="card-number">6</div>
              <h3>AI-Powered Support</h3>
              <p>An intelligent chatbot guide available 24/7 to answer questions about SHGs and help navigate the platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section id="user-roles" className={`fade-section content-section ${visibleSections['user-roles'] ? 'visible' : ''}`}>
        <div className="container">
          <h2>Different Roles on the Platform</h2>
          <p className="section-intro">Each user plays an important role in the SHG ecosystem. Here's how the platform supports them.</p>
          <div className="roles-grid">
            <div className="role-card">
              <div className="role-icon">👥</div>
              <h3>SHG Members</h3>
              <p>Members access their group's dashboard, track savings and loans, participate in decisions, and access training resources. They can view announcements relevant to their group and connect with other members.</p>
            </div>
            <div className="role-card">
              <div className="role-icon">👔</div>
              <h3>SHG Administrators/Heads</h3>
              <p>Group heads manage member details, approve loans, track group finances, file reports with authorities, and communicate with administration. They have complete control over their group's data and operations.</p>
            </div>
            <div className="role-card">
              <div className="role-icon">🤝</div>
              <h3>Volunteers</h3>
              <p>Volunteers connect with nearby SHGs based on location, provide guidance on best practices, facilitate training, and support group development. They cannot access financial or administrative controls.</p>
            </div>
            <div className="role-card">
              <div className="role-icon">🏛️</div>
              <h3>Administrators & Authorities</h3>
              <p>Government officials and NGO staff monitor SHG performance, approve loans, issue announcements, verify groups, and access national-level insights for policy making.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Program Section */}
      <section id="volunteer-program" className={`fade-section content-section alternate ${visibleSections['volunteer-program'] ? 'visible' : ''}`}>
        <div className="container">
          <h2>The Volunteer Program</h2>
          <div className="volunteer-content">
            <div className="volunteer-block">
              <h3>Who Are Volunteers?</h3>
              <p>
                Volunteers are dedicated individuals who believe in rural development and women empowerment. They come from various backgrounds—educators, entrepreneurs, social workers, and concerned citizens—and dedicate their time to support Self Help Groups.
              </p>
            </div>
            <div className="volunteer-block">
              <h3>How Volunteers Work</h3>
              <ul className="feature-list">
                <li  id='box1'><strong>Registration:</strong> Volunteers register through a separate portal, providing their skills and location preferences</li>
                <li  id='box1'><strong>Local Connection:</strong> The platform matches volunteers with SHGs in their area based on location and expertise</li>
                <li  id='box1'><strong>Support Activities:</strong> They conduct training sessions, share business ideas, help with skill development, and provide mentorship</li>
                <li  id='box1'><strong>No Financial Access:</strong> Volunteers cannot access loan details, financial records, or administrative controls—ensuring transparency and security</li>
                <li  id='box1'><strong>Community Impact:</strong> They are part of the development ecosystem without interfering in group governance</li>
              </ul>
            </div>
            <div className="volunteer-block">
              <h3>Why Volunteer?</h3>
              <p>
                By volunteering, you directly impact rural communities. You help women gain economic independence, build sustainable livelihoods, and create positive social change. Your work contributes to the success of Self Help Groups and strengthens the entire rural ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section id="transparency" className={`fade-section content-section ${visibleSections['transparency'] ? 'visible' : ''}`}>
        <div className="container">
          <h2>Transparency & Trust</h2>
          <p className="section-intro">Trust is the foundation of the SHG ecosystem. Our platform ensures complete transparency through secure digital systems.</p>
          <div className="transparency-features">
            <div className="feature-item">
              <div className="feature-number">✓</div>
              <h4>Verified SHGs</h4>
              <p>All SHGs are verified and registered on the platform with authentic member details and group information.</p>
            </div>
            <div className="feature-item">
              <div className="feature-number">✓</div>
              <h4>Controlled Loan Approvals</h4>
              <p>Loans are approved through a structured process with clear documentation, ensuring fair and transparent lending.</p>
            </div>
            <div className="feature-item">
              <div className="feature-number">✓</div>
              <h4>National Visibility</h4>
              <p>Real-time insights into total funds mobilized, volunteers engaged, loans disbursed, and community impact across the nation.</p>
            </div>
            <div className="feature-item">
              <div className="feature-number">✓</div>
              <h4>Role-Based Access</h4>
              <p>Each user sees only what they need to see. Members see member data, heads see administrative data, authorities see national insights.</p>
            </div>
            <div className="feature-item">
              <div className="feature-number">✓</div>
              <h4>Secure Digital Records</h4>
              <p>All records are maintained digitally and securely, preventing data loss and ensuring easy access for authorized users.</p>
            </div>
            <div className="feature-item">
              <div className="feature-number">✓</div>
              <h4>Audit Trail</h4>
              <p>All actions and transactions are logged, maintaining a complete audit trail for accountability and transparency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section id="ai-assistant" className={`fade-section content-section alternate ${visibleSections['ai-assistant'] ? 'visible' : ''}`}>
        <div className="container">
          <h2>Your AI-Powered Digital Guide</h2>
          <div className="assistant-content">
            <div className="assistant-text">
              <h3>Meet Your Chatbot Guide</h3>
              <p>
                Our platform includes an intelligent AI chatbot available 24/7 to help you navigate the platform and understand Self Help Groups.
              </p>
              <h4>What Can the Chatbot Do?</h4>
              <ul className="feature-list">
                <li>Answer questions about Self Help Groups and how they work</li>
                <li>Explain platform features and how to use them</li>
                <li>Provide guidance on SHG management and best practices</li>
                <li>Help troubleshoot issues and find information</li>
                <li>Respond in simple, easy-to-understand language</li>
                <li>Available anytime—no waiting for support staff</li>
              </ul>
              <p className="highlight">
                Look for the chat bubble (💬) on the screen—click it anytime to chat with your AI guide!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Join the SHG Digital Movement</h2>
          <p>
            Whether you're an SHG member seeking growth, a volunteer wanting to contribute, or an authority supporting rural development, this platform is built for you.
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
