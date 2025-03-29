import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Packages() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const packages = [
    {
      id: 1,
      name: 'Cultural Heritage Tour',
      destination: 'Kandy, Sigiriya, Anuradhapura',
      duration: '7 Days',
      price: '$1200',
      image: '/Images/Kandy.jpg',
      link: '/cultural',
      badge: 'Popular',
      category: 'cultural',
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: 'Beach Paradise Getaway',
      destination: 'Mirissa, Unawatuna, Bentota',
      duration: '5 Days',
      price: '$900',
      image: '/Images/galle.jpg',
      link: '/beach',
      badge: 'Limited Offer',
      category: 'beach',
      rating: 4.6,
      reviews: 98
    },
    {
      id: 3,
      name: 'Wildlife Safari Adventure',
      destination: 'Yala, Udawalawe, Wilpattu',
      duration: '4 Days',
      price: '$800',
      image: '/Images/saF.jpg',
      link: '/safari',
      category: 'adventure',
      rating: 4.9,
      reviews: 156
    },
    {
      id: 4,
      name: 'Hill Country Escape',
      destination: 'Nuwara Eliya, Ella, Horton Plains',
      duration: '6 Days',
      price: '$1100',
      image: '/Images/mount.jpg',
      link: '/hill',
      category: 'nature',
      rating: 4.7,
      reviews: 87
    },
    {
      id: 5,
      name: 'Ayurveda & Wellness Retreat',
      destination: 'Beruwala, Ahungalla, Tangalle',
      duration: '5 Days',
      price: '$1000',
      image: '/Images/ayu.jpg',
      link: '/ayur',
      badge: 'New',
      category: 'wellness',
      rating: 4.5,
      reviews: 72
    },
    {
      id: 6,
      name: 'Adventure & Trekking Expedition',
      destination: "Adam's Peak, Knuckles Range, Sinharaja Forest",
      duration: '8 Days',
      price: '$1500',
      image: '/Images/adams.jpg',
      link: '/adventure',
      badge: 'Premium',
      category: 'adventure',
      rating: 4.9,
      reviews: 203
    },
  ];

  // Filter packages based on active filter and search query
  const filteredPackages = packages.filter(pkg => {
    const matchesFilter = activeFilter === 'all' || pkg.category === activeFilter;
    const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         pkg.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // SVG icons as components
  const LocationIcon = () => (
    <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: '#718096' }}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );

  const TimeIcon = () => (
    <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: '#718096' }}>
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </svg>
  );

  const StarIcon = ({ filled }) => (
    <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', fill: filled ? '#F59E0B' : '#E2E8F0' }}>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );

  const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'white', marginLeft: '0.5rem' }}>
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  );

  // Render star rating
  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<StarIcon key={i} filled={i <= Math.round(rating)} />);
    }
    return stars;
  };

  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem 1rem',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      backgroundColor: '#f8fafc'
    }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
        borderRadius: '1rem',
        padding: '3rem 2rem',
        marginBottom: '3rem',
        color: 'white',
        textAlign: 'center',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          fontSize: '2.75rem',
          fontWeight: '800',
          marginBottom: '0.5rem',
          letterSpacing: '-0.025em'
        }}>
          Discover Sri Lanka
        </h1>
        <p style={{
          fontSize: '1.25rem',
          fontWeight: '400',
          marginBottom: '2rem',
          maxWidth: '700px',
          marginLeft: 'auto',
          marginRight: 'auto',
          opacity: '0.9'
        }}>
          Explore breathtaking landscapes, rich culture, and unforgettable experiences
        </p>
      </div>

      {/* Search and Filter Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          padding: '0.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          flex: '1',
          minWidth: '300px',
          maxWidth: '500px'
        }}>
          <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px', fill: '#94a3b8', margin: '0 0.75rem' }}>
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search packages..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: '1',
              padding: '0.5rem',
              border: 'none',
              outline: 'none',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={() => setActiveFilter('all')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '2rem',
              border: 'none',
              backgroundColor: activeFilter === 'all' ? '#3b82f6' : '#e2e8f0',
              color: activeFilter === 'all' ? 'white' : '#334155',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '0.875rem'
            }}
          >
            All
          </button>
          <button 
            onClick={() => setActiveFilter('cultural')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '2rem',
              border: 'none',
              backgroundColor: activeFilter === 'cultural' ? '#3b82f6' : '#e2e8f0',
              color: activeFilter === 'cultural' ? 'white' : '#334155',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '0.875rem'
            }}
          >
            Cultural
          </button>
          <button 
            onClick={() => setActiveFilter('beach')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '2rem',
              border: 'none',
              backgroundColor: activeFilter === 'beach' ? '#3b82f6' : '#e2e8f0',
              color: activeFilter === 'beach' ? 'white' : '#334155',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '0.875rem'
            }}
          >
            Beach
          </button>
          <button 
            onClick={() => setActiveFilter('adventure')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '2rem',
              border: 'none',
              backgroundColor: activeFilter === 'adventure' ? '#3b82f6' : '#e2e8f0',
              color: activeFilter === 'adventure' ? 'white' : '#334155',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '0.875rem'
            }}
          >
            Adventure
          </button>
          <button 
            onClick={() => setActiveFilter('wellness')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '2rem',
              border: 'none',
              backgroundColor: activeFilter === 'wellness' ? '#3b82f6' : '#e2e8f0',
              color: activeFilter === 'wellness' ? 'white' : '#334155',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '0.875rem'
            }}
          >
            Wellness
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div style={{ marginBottom: '1.5rem', color: '#64748b', fontSize: '0.875rem' }}>
        Showing {filteredPackages.length} of {packages.length} packages
      </div>

      {/* Packages Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '2rem'
      }}>
        {filteredPackages.map((pkg) => (
          <div 
            key={pkg.id} 
            style={{
              background: 'white',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              position: 'relative',
              border: '1px solid #e2e8f0'
            }}
          >
            {/* Badge */}
            {pkg.badge && (
              <span style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                padding: '0.25rem 0.75rem',
                borderRadius: '2rem',
                fontSize: '0.75rem',
                fontWeight: '700',
                color: 'white',
                zIndex: '10',
                backgroundColor: 
                  pkg.badge === 'Popular' ? '#3b82f6' :
                  pkg.badge === 'Limited Offer' ? '#f59e0b' :
                  pkg.badge === 'New' ? '#10b981' :
                  'linear-gradient(90deg, #8b5cf6, #ec4899)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}>
                {pkg.badge}
              </span>
            )}

            {/* Image */}
            <div style={{
              position: 'relative',
              height: '240px',
              overflow: 'hidden'
            }}>
              <img 
                src={pkg.image} 
                alt={pkg.name} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }} 
              />
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                padding: '0.5rem 1rem',
                borderRadius: '2rem',
                fontWeight: '700',
                color: '#1e293b',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                fontSize: '1rem'
              }}>
                {pkg.price}
                <span style={{ 
                  fontSize: '0.875rem',
                  fontWeight: '400',
                  color: '#64748b',
                  marginLeft: '0.25rem'
                }}>per person</span>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '1.5rem' }}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1e293b',
                  margin: 0
                }}>
                  {pkg.name}
                </h2>
                
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#f8fafc',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem'
                }}>
                  <div style={{ display: 'flex', marginRight: '0.25rem' }}>
                    {renderRating(pkg.rating)}
                  </div>
                  <span style={{ 
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#334155'
                  }}>
                    {pkg.rating}
                  </span>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  color: '#475569',
                  fontSize: '0.9375rem'
                }}>
                  <LocationIcon />
                  <span>{pkg.destination}</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  color: '#475569',
                  fontSize: '0.9375rem'
                }}>
                  <TimeIcon />
                  <span>{pkg.duration}</span>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{
                  fontSize: '0.875rem',
                  color: '#64748b'
                }}>
                  {pkg.reviews} reviews
                </span>
                
                <Link 
                  to={pkg.link} 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  View Details
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredPackages.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          marginTop: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '0.5rem'
          }}>
            No packages found
          </h3>
          <p style={{
            color: '#64748b',
            marginBottom: '1.5rem'
          }}>
            Try adjusting your search or filter criteria
          </p>
          <button 
            onClick={() => {
              setActiveFilter('all');
              setSearchQuery('');
            }}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default Packages;