import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaBox, FaChartBar, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';

function Packnav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert('Logged out successfully');
    navigate('/home');
  };

  return (
    <div style={{ width: '250px', backgroundColor: '#1e293b', color: 'white', height: '100vh', display: 'flex', flexDirection: 'column', padding: '1rem' }}>
      <div style={{ padding: '1rem', borderBottom: '1px solid #334155', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Packages</h2>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
        <li style={{ marginBottom: '0.5rem' }}>
          <Link to="/adminpkg" style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', borderRadius: '0.375rem', color: 'white', textDecoration: 'none', transition: 'background-color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#334155')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
            <FaHome style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
            Home
          </Link>
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <Link to="/manage-packages" style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', borderRadius: '0.375rem', color: 'white', textDecoration: 'none', transition: 'background-color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#334155')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
            <FaBox style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
            Manage Packages
          </Link>
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <Link to="/package-reports" style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', borderRadius: '0.375rem', color: 'white', textDecoration: 'none', transition: 'background-color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#334155')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
            <FaChartBar style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
            Package Reports
          </Link>
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <Link to="/package-summary" style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', borderRadius: '0.375rem', color: 'white', textDecoration: 'none', transition: 'background-color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#334155')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
            <FaClipboardList style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
            Package Summary
          </Link>
        </li>
      </ul>

      <div style={{ padding: '1rem', borderTop: '1px solid #334155' }}>
        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '0.75rem', borderRadius: '0.375rem', backgroundColor: 'transparent', border: 'none', color: 'white', fontSize: '1rem', cursor: 'pointer', transition: 'background-color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#334155')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
          <FaSignOutAlt style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Packnav;
