import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaEdit, FaChartLine, FaFileAlt, FaSignOutAlt } from 'react-icons/fa'; // Import icons

function TransportNav() {
  const navigate = useNavigate(); // Hook for navigation

  // Handle logout
  const handleLogout = () => {
    alert('Logged out successfully');
    navigate('/home'); // Navigate to the home page
  };

  const styles = {
    sidebar: {
      width: '250px',
      height: '100vh',
      backgroundColor: '#1a1a2e',
      padding: '20px',
      color: 'white',
      position: 'fixed',
      left: '0',
      top: '0',
      display: 'flex',
      flexDirection: 'column',
    },
    sidebarHeader: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '20px',
      borderBottom: '2px solid #ffcc00',
      paddingBottom: '10px',
    },
    sidebarMenu: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
    },
    sidebarLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '1.2rem',
      color: 'white',
      textDecoration: 'none',
      padding: '12px 15px',
      borderRadius: '5px',
      transition: '0.3s',
    },
    sidebarLinkHover: {
      backgroundColor: '#16213e',
    },
    logoutButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '1.2rem',
      color: '#ff4d4d',
      cursor: 'pointer',
      padding: '12px 15px',
      borderRadius: '5px',
      transition: '0.3s',
    },
    logoutButtonHover: {
      backgroundColor: '#ffcccc',
    },
    icon: {
      fontSize: '1.5rem',
    },
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.sidebarHeader}>Dashboard</div>
      <ul style={styles.sidebarMenu}>
        <li>
          <Link to="/dashboard" style={styles.sidebarLink}>
            <FaHome style={styles.icon} /> Home
          </Link>
        </li>
        <li>
          <Link to="/vehiclebooking" style={styles.sidebarLink}>
            <FaChartLine style={styles.icon} /> View Report
          </Link>
        </li>
        <li>
          <Link to="/updatevehicle" style={styles.sidebarLink}>
            <FaEdit style={styles.icon} /> Edit Vehicle Bookings
          </Link>
        </li>
        <li>
          <Link to="/transportsummary" style={styles.sidebarLink}>
            <FaFileAlt style={styles.icon} /> Main Summary
          </Link>
        </li>
        <li 
          onClick={handleLogout} 
          style={styles.logoutButton} 
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ffcccc'} 
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <FaSignOutAlt style={styles.icon} /> Logout
        </li>
      </ul>
    </div>
  );
}

export default TransportNav;
