import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaEdit, FaEye, FaChartLine, FaSignOutAlt, FaBars, FaTimes, FaHotel } from 'react-icons/fa';

function Hotelnav() {
  const navigate = useNavigate();
  const [isNavVisible, setIsNavVisible] = useState(false);

  const handleLogout = () => {
    alert('Logged out successfully');
    navigate('/');
  };

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleNav}
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 1000,
          backgroundColor: '#1e40af',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          padding: '0.75rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        {isNavVisible ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Navigation Bar */}
      <div
        style={{
          width: '250px',
          backgroundColor: '#1e40af',
          color: 'white',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
          position: 'fixed',
          top: 0,
          left: isNavVisible ? 0 : '-250px',
          transition: 'left 0.3s ease',
          zIndex: 999,
        }}
      >
        {/* Sidebar Header */}
        <div
          style={{
            padding: '1rem',
            borderBottom: '1px solid #3b82f6',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <FaHotel size={28} />
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Hotel Admin
          </h2>
        </div>

        {/* Sidebar Menu */}
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            flex: 1,
          }}
        >
          <li style={{ marginBottom: '0.5rem' }}>
            <Link
              to="/dashboard"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                color: 'white',
                textDecoration: 'none',
                backgroundColor: window.location.pathname === '/dashboard' ? '#3b82f6' : 'transparent',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                if (window.location.pathname !== '/dashboard') {
                  e.currentTarget.style.backgroundColor = '#3b82f6';
                }
              }}
              onMouseLeave={(e) => {
                if (window.location.pathname !== '/dashboard') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <FaHome style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
              Home
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link
              to="/hoteldetails"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                color: 'white',
                textDecoration: 'none',
                backgroundColor: window.location.pathname === '/hoteldetails' ? '#3b82f6' : 'transparent',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                if (window.location.pathname !== '/hoteldetailsl') {
                  e.currentTarget.style.backgroundColor = '#3b82f6';
                }
              }}
              onMouseLeave={(e) => {
                if (window.location.pathname !== '/viewhotel') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <FaEdit style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
              Edit Reservation
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link
              to="/viewhotel"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                color: 'white',
                textDecoration: 'none',
                backgroundColor: window.location.pathname === '/viewhotel' ? '#3b82f6' : 'transparent',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                if (window.location.pathname !== '/viewhotel') {
                  e.currentTarget.style.backgroundColor = '#3b82f6';
                }
              }}
              onMouseLeave={(e) => {
                if (window.location.pathname !== '/view-reservation') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <FaEye style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
              View Reservation
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link
              to="/hotel-summary"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                color: 'white',
                textDecoration: 'none',
                backgroundColor: window.location.pathname === '/hotel-summary' ? '#3b82f6' : 'transparent',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                if (window.location.pathname !== '/hotel-summary') {
                  e.currentTarget.style.backgroundColor = '#3b82f6';
                }
              }}
              onMouseLeave={(e) => {
                if (window.location.pathname !== '/hotel-summary') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <FaChartLine style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
              Main Summary
            </Link>
          </li>
        </ul>

        {/* Logout Button */}
        <div
          style={{
            padding: '1rem',
            borderTop: '1px solid #3b82f6',
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.375rem',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <FaSignOutAlt style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Hotelnav;