// src/Pages/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../CSS/Dashboard.css'; // Import the CSS file for styling
import adminImage from '../assets/admin.jpg'; // Import the image
import vehicleImage from '../assets/vadmin.jpg';

function Dashboard() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout actions (e.g., clear session/token)
    navigate('/'); // Navigate to the Welcome page
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          {/* Booking Management */}
          <li>
            <button onClick={() => navigate('/hoteladmin')}>
              Hotel Booking
            </button>
          </li>
          <li>
            <button onClick={() => navigate('/adminpkg')}>
              Package Booking
            </button>
          </li>

          {/* Other Management Sections */}
          <li>
            <button onClick={() => navigate('/guider-management')}>
              Guider Management
            </button>
          </li>
          <li>
            <button onClick={() => navigate('/taskboard')}>
              Event Management
            </button>
          </li>
          <li>
            <button onClick={() => navigate('/vehicleadmin')}>
              Transport Management
            </button>
          </li>
        </ul>

        {/* Logout Button */}
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Small Description with Image */}
      <div className="description">
        <div className="description-content">
          <h1>Welcome, Admin</h1>
          <p>Manage your travel operations efficiently using the options in the sidebar.</p>
        </div>
        <img src={adminImage} alt="Admin Dashboard" className="dashboard-image" />
      </div>
    </div>
  );
}

export default Dashboard;