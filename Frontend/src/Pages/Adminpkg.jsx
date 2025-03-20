import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { FaHome, FaEdit, FaChartLine, FaFileAlt, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import Home from './Home'; // Import Home component
import EditPackage from './EditPackage'; // Import EditPackage component
import ViewReport from './ViewReport'; // Import ViewReport component
import MainSummary from './MainSummary'; // Import MainSummary component
import '../CSS/Adminpkg.css'; // Import CSS file
import Dashboard from './Dashboard';

function Adminpkg() {
  const navigate = useNavigate(); // Hook for navigation

  // Handle logout
  const handleLogout = () => {
    alert('Logged out successfully');
    navigate('/home'); // Navigate to the home page
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
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
            <Link to="/edit-package" className="sidebar-link">
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

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1>Welcome, Admin</h1>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit-package" element={<EditPackage />} />
          <Route path="/view-report" element={<ViewReport />} />
          <Route path="/main-summary" element={<MainSummary />} />
          <Route
            path="/"
            element={
              <div className="description-container">
                <div className="description">
                  <h2>Package Booking Management</h2>
                  <p>
                    Manage your travel packages efficiently. View, edit, and generate reports for
                    bookings. Keep track of your main summary and make updates as needed.
                  </p>
                </div>
                <div className="image-container">
                  <img
                    src="/Images/book.jpg" // Replace with your image URL
                    alt="Package Booking Management"
                    className="package-image"
                  />
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}



export default App;