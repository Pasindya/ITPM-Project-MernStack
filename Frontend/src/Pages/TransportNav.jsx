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

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Dashboard</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard" className="sidebar-link">
            <FaHome className="icon" /> Home
          </Link>
        </li>
        <li>
          <Link to="/vehiclebookings" className="sidebar-link">
            <FaEdit className="icon" /> Edit Vehicle Bookings
          </Link>
        </li>
        <li>
          <Link to="/view-report" className="sidebar-link">
            <FaChartLine className="icon" /> View Report
          </Link>
        </li>
        <li>
          <Link to="/main-summary" className="sidebar-link">
            <FaFileAlt className="icon" /> Main Summary
          </Link>
        </li>
        <li onClick={handleLogout} className="logout-button">
          <FaSignOutAlt className="icon" /> Logout
        </li>
      </ul>
    </div>
  );
}

export default  TransportNav