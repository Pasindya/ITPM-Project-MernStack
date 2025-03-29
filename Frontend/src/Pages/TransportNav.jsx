import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaEdit, FaChartLine, FaFileAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

function TransportNav() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    alert('Logged out successfully');
    navigate('/home');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const styles = {
    sidebar: {
      width: isOpen ? '250px' : '0',
      height: '100vh',
      backgroundColor: '#1a1a2e',
      padding: isOpen ? '20px' : '0',
      color: 'white',
      position: 'fixed',
      left: '0',
      top: '0',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden',
      transition: '0.5s',
      zIndex: '1000',
    },
    sidebarHeader: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '20px',
      borderBottom: '2px solid #ffcc00',
      paddingBottom: '10px',
      whiteSpace: 'nowrap',
      opacity: isOpen ? '1' : '0',
      transition: 'opacity 0.3s',
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
      whiteSpace: 'nowrap',
      opacity: isOpen ? '1' : '0',
      transition: 'opacity 0.3s',
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
      whiteSpace: 'nowrap',
      opacity: isOpen ? '1' : '0',
      transition: 'opacity 0.3s',
    },
    icon: {
      fontSize: '1.5rem',
    },
    toggleButton: {
      position: 'fixed',
      top: '20px',
      left: isOpen ? '270px' : '20px',
      zIndex: '1001',
      backgroundColor: '#1a1a2e',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      transition: '0.5s',
      fontSize: '1.5rem',
    },
    overlay: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: '999',
      display: isOpen ? 'block' : 'none',
    },
  };

  return (
    <>
      <div style={styles.overlay} onClick={toggleSidebar} />
      
      <button style={styles.toggleButton} onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>Dashboard</div>
        <ul style={styles.sidebarMenu}>
          <li>
            <Link to="/dashboard" style={styles.sidebarLink} onClick={() => setIsOpen(false)}>
              <FaHome style={styles.icon} /> Home
            </Link>
          </li>
          <li>
            <Link to="/vehiclebooking" style={styles.sidebarLink} onClick={() => setIsOpen(false)}>
              <FaChartLine style={styles.icon} /> View Report
            </Link>
          </li>
          <li>
            <Link to="/updatevehicle" style={styles.sidebarLink} onClick={() => setIsOpen(false)}>
              <FaEdit style={styles.icon} /> Edit Vehicle Bookings
            </Link>
          </li>
          <li>
            <Link to="/transportsummary" style={styles.sidebarLink} onClick={() => setIsOpen(false)}>
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
    </>
  );
}

export default TransportNav;