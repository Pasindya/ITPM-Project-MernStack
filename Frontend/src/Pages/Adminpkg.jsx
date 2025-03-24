import React from "react";
import DashNav from "./DashNav"; // Import Sidebar

function Adminpkg() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        fontFamily: "'Inter', sans-serif", // Modern font
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
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#1e293b",
              marginBottom: "0.5rem",
              letterSpacing: "-0.025em",
            }}
          >
            Welcome, Admin 👋
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              color: "#64748b",
              lineHeight: "1.75",
            }}
          >
            Manage your travel operations efficiently using the options in the sidebar.
          </p>
        </div>

        {/* Description Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "1rem",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
            padding: "3rem",
            gap: "3rem",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer",
            ":hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          {/* Text Content */}
          <div
            style={{
              flex: 1,
            }}
          >
            <h2
              style={{
                fontSize: "1.875rem",
                fontWeight: "700",
                color: "#1e293b",
                marginBottom: "1.5rem",
                letterSpacing: "-0.025em",
              }}
            >
              📌 Package Booking Management
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "#64748b",
                lineHeight: "1.75",
                marginBottom: "2rem",
              }}
            >
              Easily manage travel packages. View, edit, and generate reports for bookings.
              Track your main summary and make updates effortlessly.
            </p>
            <button
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                border: "none",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                ":hover": {
                  backgroundColor: "#2563eb",
                },
              }}
            >
              Explore Packages
            </button>
          </div>

          {/* Image */}
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
                maxWidth: "450px",
                borderRadius: "1rem",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminpkg;