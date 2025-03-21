import React from 'react';
import { Link } from 'react-router-dom';

function Packages() {
  const packages = [
    {
      id: 1,
      name: 'Cultural Heritage Tour',
      destination: 'Kandy, Sigiriya, Anuradhapura',
      duration: '7 Days',
      price: '$1200',
      image: '/Images/Kandy.jpg',
      link: '/cultural',
    },
    {
      id: 2,
      name: 'Beach Paradise Getaway',
      destination: 'Mirissa, Unawatuna, Bentota',
      duration: '5 Days',
      price: '$900',
      image: '/Images/galle.jpg',
      link: '/beach',
    },
    {
      id: 3,
      name: 'Wildlife Safari Adventure',
      destination: 'Yala, Udawalawe, Wilpattu',
      duration: '4 Days',
      price: '$800',
      image: '/Images/saF.jpg',
      link: '/safari',
    },
    {
      id: 4,
      name: 'Hill Country Escape',
      destination: 'Nuwara Eliya, Ella, Horton Plains',
      duration: '6 Days',
      price: '$1100',
      image: '/Images/mount.jpg',
      link: '/hill',
    },
    {
      id: 5,
      name: 'Ayurveda & Wellness Retreat',
      destination: 'Beruwala, Ahungalla, Tangalle',
      duration: '5 Days',
      price: '$1000',
      image: '/Images/ayu.jpg',
      link: '/ayurveda-wellness-retreat',
    },
    {
      id: 6,
      name: 'Adventure & Trekking Expedition',
      destination: "Adam's Peak, Knuckles Range, Sinharaja Forest",
      duration: '8 Days',
      price: '$1500',
      image: '/Images/adams.jpg',
      link: '/adventure-trekking-expedition',
    },
  ];

  return (
    <div
      style={{
        padding: '2rem',
        backgroundColor: '#f3f4f6',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#1e293b' }}>
        Travel Packages
      </h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          padding: '0 1rem',
        }}
      >
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              transition: 'transform 0.2s',
              cursor: 'pointer',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <img
              src={pkg.image}
              alt={pkg.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1e293b' }}>
                {pkg.name}
              </h2>
              <p style={{ marginBottom: '0.5rem', color: '#475569' }}>
                <strong>Destination:</strong> {pkg.destination}
              </p>
              <p style={{ marginBottom: '0.5rem', color: '#475569' }}>
                <strong>Duration:</strong> {pkg.duration}
              </p>
              <p style={{ marginBottom: '1rem', color: '#475569' }}>
                <strong>Price:</strong> {pkg.price}
              </p>
              <Link to={pkg.link}>
                <button
                  style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
                >
                  View More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Packages;