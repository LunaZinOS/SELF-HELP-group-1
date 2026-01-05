import { useState, useEffect } from 'react';
import '../styles/pages/LandingPage.css';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(Array(5).fill(false));

  useEffect(() => {
    const timers = Array(5)
      .fill(null)
      .map((_, i) =>
        setTimeout(() => {
          setIsVisible((prev) => {
            const newVisible = [...prev];
            newVisible[i] = true;
            return newVisible;
          });
        }, i * 200)
      );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className={`hero-content ${isVisible[0] ? 'slide-up' : ''}`}>
              <h1>National Self Help Group Digital Platform</h1>
              <p className="hero-subtitle">
                Connecting, Empowering, and Transforming Rural Communities
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary">Explore the Platform</button>
                <button className="btn btn-secondary">Learn More</button>
              </div>
            </div>
            <div className={`hero-image ${isVisible[0] ? 'slide-left' : ''}`}>
              <img
                src="https://images.unsplash.com/photo-1707721690626-10e5f0366bcb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwd29tZW4lMjBmYXJtZXJzfGVufDB8fDB8fHww"
                alt="Women farmers working together"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What are SHGs Section */}
      <section className={`section ${isVisible[1] ? 'fade-in' : ''}`}>
        <div className="container-sm">
          <h2>What are Self Help Groups?</h2>
          <p>
            Self Help Groups (SHGs) are informal associations of individuals,
            typically women, who band together to achieve a common socio-economic
            objective. They focus on savings, credit, skill development, and
            community welfare.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h4>Community Focus</h4>
              <p>Built on principles of mutual support and collective action</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h4>Economic Empowerment</h4>
              <p>Enable members to save, borrow, and grow their income</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h4>Skill Development</h4>
              <p>Training and knowledge sharing for sustainable growth</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Digital Platform Section */}
      <section className={`section why-digital-section ${isVisible[2] ? 'fade-in' : ''}`}>
        <div className="why-digital-overlay"></div>
        <div className="container-sm">
          <div className="why-digital-content">
            <h2>Why a Digital Platform?</h2>
            <p>
              Traditional SHGs face challenges in communication, resource sharing,
              and coordination. A digital platform bridges these gaps by providing:
            </p>
            <ul className="benefits-list">
              <li>
                <strong>Seamless Communication</strong> - Connect with SHGs across
                districts and states
              </li>
              <li>
                <strong>Resource Sharing</strong> - Access announcements, training
                materials, and success stories
              </li>
              <li>
                <strong>Better Coordination</strong> - Authorities can reach SHGs
                efficiently
              </li>
              <li>
                <strong>Knowledge Hub</strong> - Learn from experiences of other
                groups
              </li>
              <li>
                <strong>Real-time Support</strong> - AI-powered guidance 24/7
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className={`section ${isVisible[3] ? 'fade-in' : ''}`}>
        <div className="container-sm">
          <h2 className="text-center">How This Platform Helps</h2>
          <div className="benefits-card-grid">
            <div className="benefit-card">
              <div className="benefit-image">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=250&fit=crop"
                  alt="SHG Dashboard"
                />
              </div>
              <h3>📊 SHG Dashboard</h3>
              <p>
                View SHG profiles, member details, and activities in one place.
                Track progress and celebrate milestones together.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-image">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=250&fit=crop"
                  alt="Announcements"
                />
              </div>
              <h3>📢 Announcements</h3>
              <p>
                Receive official updates from district, state, and national
                levels. Stay informed about policies, programs, and opportunities.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-image">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=250&fit=crop"
                  alt="Learning resources"
                />
              </div>
              <h3>📚 Resources</h3>
              <p>
                Access training materials, success stories, and best practices.
                Learn from others and improve your SHG operations.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-image">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=250&fit=crop"
                  alt="AI Guide"
                />
              </div>
              <h3>🤖 AI Guide</h3>
              <p>
                Chat with our intelligent assistant anytime. Get personalized
                guidance on using the platform and SHG management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className={`section bg-gradient ${isVisible[4] ? 'fade-in' : ''}`}>
        <div className="container-sm text-center">
          <h2>Creating Real Impact</h2>
          <p>
            By connecting rural communities digitally, we're building a stronger,
            more resilient SHG ecosystem that empowers millions.
          </p>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>1000+</h3>
              <p>SHGs Connected</p>
            </div>
            <div className="stat-card">
              <h3>50K+</h3>
              <p>Members Reached</p>
            </div>
            <div className="stat-card">
              <h3>10+</h3>
              <p>States Participating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container-sm text-center">
          <h2>Ready to Transform Your SHG?</h2>
          <p>Join thousands of SHGs already using our platform</p>
          <button className="btn btn-large">Get Started Now</button>
        </div>
      </section>
    </div>
  );
}
