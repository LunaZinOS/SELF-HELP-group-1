import { useState } from 'react';
import '../styles/pages/AnnouncementsPage.css';

export default function AnnouncementsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedItem, setExpandedItem] = useState(null);

  const announcements = [
    {
      id: 1,
      type: 'announcement',
      title: 'New SHG Loan Scheme 2025',
      category: 'National',
      date: '2025-01-05',
      description:
        'Ministry of Rural Development launches new loan scheme for SHGs with reduced interest rates.',
      fullContent:
        'The government has announced a new loan scheme with 6% interest rate for all registered SHGs across India. This initiative aims to boost economic activities in rural communities. Eligible SHGs can apply through their district offices starting from January 15, 2025.',
      imageUrl: 'https://images.unsplash.com/photo-1659451336016-00d62d32f677?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VsZiUyMGhlbHAlMjBncm91cHMlMjBpbmRpYXxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      id: 2,
      type: 'resource',
      title: 'Digital Financial Literacy Training',
      category: 'Training',
      date: '2025-01-02',
      description:
        'Free online training sessions on basic banking and financial management for SHG leaders.',
      fullContent:
        'Join our comprehensive training program covering digital banking, savings management, loan documentation, and financial planning. Sessions are held twice a week on Wednesdays and Fridays at 3 PM IST. Register now with your SHG ID.',
      imageUrl: 'https://images.unsplash.com/photo-1728584388081-819a78aa30ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2VsZiUyMGhlbHAlMjBncm91cHMlMjBpbmRpYXxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      id: 3,
      type: 'success-story',
      title: 'Success Story: Mahila Vikas SHG',
      category: 'Success Stories',
      date: '2024-12-28',
      description:
        'How a small SHG in Madhya Pradesh grew from 10 to 50 members in 5 years.',
      fullContent:
        'Starting with just 10 members and ₹5,000 in savings, Mahila Vikas SHG is now a thriving community with 50 members and ₹25 lakhs in savings. Their success came through consistent savings, skill development, and micro-entrepreneurship. Read their full story on our resources page.',
      imageUrl: 'https://images.unsplash.com/photo-1716832948999-9654668a58d2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNlbGYlMjBoZWxwJTIwZ3JvdXBzJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: 4,
      type: 'announcement',
      title: 'State-Level SHG Convention 2025',
      category: 'State',
      date: '2024-12-25',
      description:
        'Annual convention for SHG leaders in Madhya Pradesh. Two-day event with workshops and networking.',
      fullContent:
        'The 5th Annual SHG Convention will be held in Indore on February 15-16, 2025. Participate in interactive workshops, meet other SHG leaders, and learn about latest government schemes. Register your SHG by January 31st. Limited seats available.',
      imageUrl: 'https://images.unsplash.com/photo-1622183526757-7aac23115ffb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNlbGYlMjBoZWxwJTIwZ3JvdXBzJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: 5,
      type: 'resource',
      title: 'Best Practices in SHG Management',
      category: 'Training',
      date: '2024-12-20',
      description:
        'Comprehensive guide on maintaining records, managing funds, and conducting meetings.',
      fullContent:
        'This detailed guide covers all aspects of SHG management including record-keeping, meeting procedures, member communication, and financial reporting. Download the PDF guide with templates and checklists that you can use immediately in your SHG.',
      imageUrl: 'https://images.unsplash.com/photo-1592290897024-e3772c2b5cae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHNlbGYlMjBoZWxwJTIwZ3JvdXBzJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: 6,
      type: 'announcement',
      title: 'District Awareness Camp on Women Empowerment',
      category: 'District',
      date: '2024-12-15',
      description:
        'District administration organizing awareness camps on government schemes for women.',
      fullContent:
        'The District Administration will conduct awareness camps in all blocks in January 2025. Learn about skill development schemes, loan programs, and subsidies available for SHG members. Your SHG members are welcome to attend.',
      imageUrl: 'https://images.unsplash.com/photo-1632999874274-aea6b950a53f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHNlbGYlMjBoZWxwJTIwZ3JvdXBzJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: 7,
      type: 'resource',
      title: 'E-Book: SHG Success Manual',
      category: 'Resources',
      date: '2024-12-10',
      description: 'Complete guide for starting and managing a successful SHG.',
      fullContent:
        'A comprehensive e-book covering everything from forming an SHG to scaling its operations. Includes case studies, templates, and action plans. Free download for all registered members.',
      imageUrl: 'https://images.unsplash.com/photo-1603484688317-e72abe038269?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHNlbGYlMjBoZWxwJTIwZ3JvdXBzJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: 8,
      type: 'success-story',
      title: 'From Savings to Entrepreneurship',
      category: 'Success Stories',
      date: '2024-12-05',
      description:
        'How SHG members started their own businesses using group savings.',
      fullContent:
        'Members of Shakti Nari SHG pooled their savings and started a dairy business that now generates ₹2 lakhs monthly. This success story showcases how collective effort leads to economic independence.',
      imageUrl: 'https://images.unsplash.com/photo-1622739350042-e3ba12956bb7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHNlbGYlMjBoZWxwJTIwZ3JvdXBzJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D',
    },
  ];

  const filters = [
    { id: 'all', label: 'All', type: null },
    { id: 'announcement', label: 'Announcements', type: 'announcement' },
    { id: 'resource', label: 'Resources', type: 'resource' },
    { id: 'success-story', label: 'Success Stories', type: 'success-story' },
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'National', label: 'National' },
    { id: 'State', label: 'State' },
    { id: 'District', label: 'District' },
    { id: 'Training', label: 'Training' },
    { id: 'Resources', label: 'Resources' },
    { id: 'Success Stories', label: 'Success Stories' },
  ];

  const filteredAnnouncements =
    activeFilter === 'all'
      ? announcements
      : announcements.filter((item) => item.type === activeFilter);

  const toggleExpand = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div className="announcements-page">
      {/* Page Header */}
      <section className="announcements-header">
        <div className="container-sm">
          <h1>Announcements & Resources</h1>
          <p className="header-subtitle">
            Stay updated with the latest news, training resources, and success
            stories from the SHG ecosystem
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="filters-section">
        <div className="container-sm">
          <div className="filter-group">
            <h3>Filter by Type</h3>
            <div className="filter-buttons">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Filter by Category</h3>
            <div className="category-buttons">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="category-btn"
                  disabled={category.id !== 'all'}
                  title={category.id === 'all' ? 'Available' : 'Coming soon'}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="announcements-content">
        <div className="container-sm">
          <div className="results-info">
            <p>
              Showing {filteredAnnouncements.length} item
              {filteredAnnouncements.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="announcements-list">
            {filteredAnnouncements.map((item) => (
              <div
                key={item.id}
                className={`announcement-item ${item.type}`}
                onClick={() => toggleExpand(item.id)}
              >
                <div className="item-header">
                  <div className="item-title-section">
                    <span className={`item-badge ${item.type}`}>
                      {item.type === 'announcement'
                        ? '📢'
                        : item.type === 'resource'
                          ? '📚'
                          : '🌟'}
                    </span>
                    <div className="item-title-content">
                      <h3 className="item-title">{item.title}</h3>
                      <div className="item-meta">
                        <span className="item-category">{item.category}</span>
                        <span className="item-date">{item.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="item-toggle">
                    {expandedItem === item.id ? '−' : '+'}
                  </div>
                </div>

                <div className="item-description">{item.description}</div>

                {item.imageUrl && (
                  <img
                    className="announcement-image"
                    src={item.imageUrl}
                    alt={item.title}
                  />
                )}

                {expandedItem === item.id && (
                  <div className="item-expanded">
                    <p>{item.fullContent}</p>
                    {item.type === 'resource' && (
                      <button className="btn btn-small btn-secondary">
                        Download Resource
                      </button>
                    )}
                    {item.type === 'announcement' && (
                      <button className="btn btn-small btn-primary">
                        View Details
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container-sm">
          <h2>Stay Updated</h2>
          <p>
            Subscribe to receive announcements and updates directly in your
            inbox
          </p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              required
              disabled
            />
            <button type="submit" className="btn btn-primary" disabled>
              Subscribe (Coming Soon)
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
