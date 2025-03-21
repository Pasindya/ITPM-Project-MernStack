import React from "react";
import DashNav from "./DashNav"; // Import Sidebar
import "../CSS/Adminpkg.css"; // Import CSS file

function Adminpkg() {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <DashNav />

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1>Welcome, Admin 👋</h1>
          <p>Manage your travel operations efficiently using the options in the sidebar.</p>
        </div>

        {/* Description */}
        <div className="description-container">
          <div className="description">
            <h2>📌 Package Booking Management</h2>
            <p>
              Easily manage travel packages. View, edit, and generate reports for bookings.
              Track your main summary and make updates effortlessly.
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
      </div>
    </div>
  );
}

export default Adminpkg;
