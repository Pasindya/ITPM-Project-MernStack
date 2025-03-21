import React from "react";
import DashNav from "./DashNav"; // Import Sidebar

function Adminpkg() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* Sidebar */}
      <DashNav />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "2rem",
          marginLeft: "250px", // Adjust based on sidebar width
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: "2rem",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#1e293b",
              marginBottom: "0.5rem",
            }}
          >
            Welcome, Admin 👋
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "#64748b",
            }}
          >
            Manage your travel operations efficiently using the options in the sidebar.
          </p>
        </div>

        {/* Description */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "2rem",
            gap: "2rem",
          }}
        >
          <div
            style={{
              flex: 1,
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#1e293b",
                marginBottom: "1rem",
              }}
            >
              📌 Package Booking Management
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "#64748b",
                lineHeight: "1.6",
              }}
            >
              Easily manage travel packages. View, edit, and generate reports for bookings.
              Track your main summary and make updates effortlessly.
            </p>
          </div>
          <div
            style={{
              flex: 1,
              textAlign: "center",
            }}
          >
            <img
              src="/Images/book.jpg" // Replace with your image URL
              alt="Package Booking Management"
              style={{
                width: "100%",
                maxWidth: "400px",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminpkg;