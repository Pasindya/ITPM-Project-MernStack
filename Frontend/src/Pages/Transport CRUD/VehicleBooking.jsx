import React, { useEffect, useState } from 'react';
import TransportNav from '../transportNav';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:5000/htransports";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function VehicleBooking() {
  const [htransports, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHandler().then((data) => setBookings(data.htransports));
  }, []);

  const handleUpdate = (booking) => {
    navigate('/updatevehicle', { state: { booking } });
  };

  const handleDelete = async (id) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete this booking?");
      if (!isConfirmed) return;
      
      await axios.delete(`${URL}/${id}`);
      setBookings(htransports.filter(booking => booking._id !== id));
      alert('Booking deleted successfully!');
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert('Failed to delete booking. Please try again.');
    }
  };

  // Styles
  const pageStyle = {
    fontFamily: "'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif",
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    padding: '20px'
  };

  const headerStyle = {
    textAlign: 'center',
    margin: '30px 0',
    padding: '20px 0',
    position: 'relative'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '15px',
    position: 'relative',
    display: 'inline-block',
    paddingBottom: '10px'
  };

  const titleUnderline = {
    content: '""',
    position: 'absolute',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '4px',
    backgroundColor: '#3498db',
    borderRadius: '2px'
  };

  const subtitleStyle = {
    fontSize: '1.1rem',
    color: '#7f8c8d',
    marginTop: '10px'
  };

  const tableContainerStyle = {
    margin: '0 auto',
    maxWidth: '1200px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse'
  };

  const thStyle = {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '12px 15px',
    textAlign: 'left',
    fontWeight: '500'
  };

  const tdStyle = {
    padding: '12px 15px',
    borderBottom: '1px solid #e0e0e0',
    color: '#333'
  };

  const trHoverStyle = {
    '&:hover': {
      backgroundColor: '#f5f9ff'
    }
  };

  const actionButtonStyle = {
    padding: '6px 12px',
    margin: '0 4px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  };

  const editButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#3498db',
    color: 'white',
    '&:hover': {
      backgroundColor: '#2980b9'
    }
  };

  const deleteButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#e74c3c',
    color: 'white',
    '&:hover': {
      backgroundColor: '#c0392b'
    }
  };

  const downloadButtonStyle = {
    display: 'block',
    margin: '30px auto',
    padding: '10px 20px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    '&:hover': {
      backgroundColor: '#27ae60'
    }
  };

  return (
    <div style={pageStyle}>
      <TransportNav />
      <div style={headerStyle}>
        <h1 style={titleStyle}>
          Vehicle Bookings
          <span style={titleUnderline}></span>
        </h1>
        <p style={subtitleStyle}>View and manage all vehicle bookings</p>
      </div>

      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Booking ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Mobile</th>
              <th style={thStyle}>Vehicle Type</th>
              <th style={thStyle}>Booking Date</th>
              <th style={thStyle}>Handover Date</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {htransports && htransports.map((booking) => (
              <tr key={booking._id} style={trHoverStyle}>
                <td style={tdStyle}>{booking.customId || booking._id}</td>
                <td style={tdStyle}>{booking.name}</td>
                <td style={tdStyle}>{booking.mobile}</td>
                <td style={tdStyle}>{booking.vehicleType}</td>
                <td style={tdStyle}>{new Date(booking.bookingdate).toLocaleDateString()}</td>
                <td style={tdStyle}>{new Date(booking.handoverDate).toLocaleDateString()}</td>
                <td style={tdStyle}>
                  <button 
                    style={editButtonStyle}
                    onClick={() => handleUpdate(booking)}
                  >
                    Edit
                  </button>
                  <button 
                    style={deleteButtonStyle}
                    onClick={() => handleDelete(booking._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button style={downloadButtonStyle}>
        Download PDF
      </button>
    </div>
  );
}

export default VehicleBooking;