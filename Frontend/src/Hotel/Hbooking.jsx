import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Hbooking({ hbooking, onDelete }) {
  const { _id, hotelName, checkIn, checkOut, guests, name, email, phone } = hbooking;
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/updatehbook/${_id}`);
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this hotel booking?');
    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:5000/hbookings/${_id}`);
      onDelete(_id);
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking');
    }
  };

  return (
    <div className="booking-card">
      <div className="booking-id">Booking ID: {_id}</div>
      <h2 className="hotel-name">{hotelName}</h2>
      
      <div className="booking-details">
        <div className="detail-group">
          <span className="detail-label">Guest Name:</span>
          <span className="detail-value">{name}</span>
        </div>
        
        <div className="detail-group">
          <span className="detail-label">Dates:</span>
          <span className="detail-value">
            {new Date(checkIn).toLocaleDateString()} - {new Date(checkOut).toLocaleDateString()}
          </span>
        </div>
        
        <div className="detail-group">
          <span className="detail-label">Guests:</span>
          <span className="detail-value">{guests}</span>
        </div>
        
        <div className="detail-group">
          <span className="detail-label">Contact:</span>
          <span className="detail-value">{phone} | {email}</span>
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={handleUpdate} className="update-btn">
          Update
        </button>
        <button onClick={handleDelete} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}

export default Hbooking;

// CSS Styles (can be moved to a separate CSS file)
const styles = `
  .booking-card {
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
    transition: transform 0.2s ease;
  }

  .booking-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  .booking-id {
    background-color: #3182ce;
    color: white;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 12px;
    display: inline-block;
  }

  .hotel-name {
    font-size: 20px;
    color: #2d3748;
    margin-bottom: 16px;
  }

  .booking-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 16px;
  }

  .detail-group {
    display: flex;
    flex-direction: column;
  }

  .detail-label {
    font-size: 14px;
    color: #718096;
    font-weight: 500;
  }

  .detail-value {
    font-size: 16px;
    color: #2d3748;
    font-weight: 600;
  }

  .action-buttons {
    display: flex;
    gap: 12px;
    margin-top: 16px;
  }

  .update-btn, .delete-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .update-btn {
    background-color: #38a169;
    color: white;
  }

  .update-btn:hover {
    background-color: #2f855a;
  }

  .delete-btn {
    background-color: #e53e3e;
    color: white;
  }

  .delete-btn:hover {
    background-color: #c53030;
  }
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);