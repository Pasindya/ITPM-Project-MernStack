import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaEdit, FaChartLine, FaFileAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa'; // Import icons

function DashNav() {
  const navigate = useNavigate(); // Hook for navigation
  const [isNavVisible, setIsNavVisible] = useState(false); // State to control visibility

  // Handle logout
  const handleLogout = () => {
    alert('Logged out successfully');
    navigate('/home'); // Navigate to the home page
  };

  // Toggle navigation visibility
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
          backgroundColor: '#1e293b',
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
          backgroundColor: '#1e293b',
          color: 'white',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
          position: 'fixed',
          top: 0,
          left: isNavVisible ? 0 : '-250px', // Slide in/out effect
          transition: 'left 0.3s ease',
          zIndex: 999,
        }}
      >
        {/* Sidebar Header */}
        <div
          style={{
            padding: '1rem',
            borderBottom: '1px solid #334155',
            marginBottom: '1rem',
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
            }}
          >
            Dashboard
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
          <li
            style={{
              marginBottom: '0.5rem',
            }}
          >
            <Link
              to="/dashboard"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                color: 'white',
                textDecoration: 'none',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#334155')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <FaHome
                style={{
                  marginRight: '0.75rem',
                  fontSize: '1.25rem',
                }}
              />
              Home
            </Link>
          </li>
          <li
            style={{
              marginBottom: '0.5rem',
            }}
          >
            <Link
              to="/packdetails"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                color: 'white',
                textDecoration: 'none',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#334155')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <FaEdit
                style={{
                  marginRight: '0.75rem',
                  fontSize: '1.25rem',
                }}
              />
              Edit Package
            </Link>
          </li>
          <li
            style={{
              marginBottom: '0.5rem',
            }}
          >
            <Link
              to="/packreport"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                color: 'white',
                textDecoration: 'none',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#334155')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <FaChartLine
                style={{
                  marginRight: '0.75rem',
                  fontSize: '1.25rem',
                }}
              />
              View Report
            </Link>
          </li>
          <li
            style={{
              marginBottom: '0.5rem',
            }}
          >
            <Link
              to="/packsummary"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                color: 'white',
                textDecoration: 'none',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#334155')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <FaFileAlt
                style={{
                  marginRight: '0.75rem',
                  fontSize: '1.25rem',
                }}
              />
              Main Summary
            </Link>
          </li>
        </ul>

        {/* Logout Button */}
        <div
          style={{
            padding: '1rem',
            borderTop: '1px solid #334155',
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
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#334155')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <FaSignOutAlt
              style={{
                marginRight: '0.75rem',
                fontSize: '1.25rem',
              }}
            />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default DashNav;