import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaEdit, FaChartLine, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';

function Packagenav() {
  const handleLogout = () => {
    // Implement your logout logic here
    console.log('User logged out');
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Package Dashboard</h2>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/dashboard" className="sidebar-link">
              <FaHome className="icon" /> Home
            </Link>
          </li>
          <li>
            <Link to="/packbookings" className="sidebar-link">
              <FaEdit className="icon" /> Edit Package
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
    </div>
  );
}

export default Packagenav;