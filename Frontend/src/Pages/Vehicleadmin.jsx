import React from 'react';
import TransportNav from './transportNav';

function Vehicleadmin() {
  return (
    <div style={styles.dashboard}>
      {/* Sidebar */}
      <TransportNav />

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Welcome, Admin 👋</h1>
          <p style={styles.headerSubtitle}>
            Manage your transport operations efficiently using the options in the sidebar. 🚖✨
          </p>
        </div>

        {/* Description */}
        <div style={styles.descriptionContainer}>
          <div style={styles.description}>
            <h2 style={styles.descriptionTitle}>📌 Vehicle Booking Management</h2>
            <p style={styles.descriptionText}>
              Easily manage vehicle bookings. View, edit, and generate reports effortlessly.
              Track your main summary and keep everything up to date with ease.
            </p>
          </div>
          <div style={styles.imageContainer}>
            <img
              src="/Images/Transport/admin.jpg" // Replace with your image URL
              alt="Vehicle Booking Management"
              style={styles.vbookingImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vehicleadmin;

// Inline CSS styles
const styles = {
  dashboard: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  mainContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px',
    backgroundColor: 'white',
    marginLeft: '250px', // Adjust based on sidebar width
  },
  header: {
    textAlign: 'center',
    marginBottom: '25px',
  },
  headerTitle: {
    fontSize: '26px',
    color: '#2c3e50',
  },
  headerSubtitle: {
    fontSize: '14px',
    color: '#7f8c8d',
  },
  descriptionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
    width: '100%',
    gap: '20px', // Add spacing between text and image
  },
  description: {
    width: '50%',
    textAlign: 'left',
  },
  descriptionTitle: {
    fontSize: '22px',
    color: '#34495e',
  },
  descriptionText: {
    fontSize: '14px',
    color: '#7f8c8d',
  },
  imageContainer: {
    width: '50%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  vbookingImage: {
    width: '100%',
    maxWidth: '300px',
    borderRadius: '8px',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
  },
  // Responsive Design for smaller screens
  '@media (max-width: 768px)': {
    descriptionContainer: {
      flexDirection: 'column',
      textAlign: 'center',
      alignItems: 'center',
    },
    description: {
      width: '90%',
    },
    imageContainer: {
      width: '100%',
      justifyContent: 'center',
    },
    vbookingImage: {
      width: '80%',
    },
  },
};