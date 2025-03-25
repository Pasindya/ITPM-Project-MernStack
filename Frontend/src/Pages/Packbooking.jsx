import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Packbooking({ packbooking, onDelete }) {
  const { _id, name, mobile, email, livingCountry, tpackage, arrivalDate } = packbooking;
  const navigate = useNavigate();

  // Handle Update button click
  const handleUpdate = () => {
    navigate(`/updatepbook/${_id}`); // Navigate to the update page
  };

  // Handle Delete button click
  const handleDelete = async () => {
    // Show confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this booking?');
    
    if (!isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/packbookings/${_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }

      // Call the onDelete function passed as a prop to update the parent state
      onDelete(_id);
      
      // Refresh the page after successful deletion
      window.location.reload();
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '1rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        padding: '1.5rem',
        fontFamily: "'Inter', sans-serif",
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        ':hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
      }}
    >
      {/* Booking ID (Highlighted) */}
      <div
        style={{
          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: '600',
          marginBottom: '1rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        Booking ID: {_id}
      </div>

      {/* Name */}
      <div
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#1e293b',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #1e293b, #334155)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {name}
      </div>

      {/* Details (Centered) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          marginBottom: '1.5rem',
          width: '100%',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '0.875rem',
              color: '#64748b',
            }}
          >
            Mobile
          </div>
          <div
            style={{
              fontSize: '1rem',
              fontWeight: '500',
              color: '#1e293b',
            }}
          >
            {mobile}
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: '0.875rem',
              color: '#64748b',
            }}
          >
            Email
          </div>
          <div
            style={{
              fontSize: '1rem',
              fontWeight: '500',
              color: '#1e293b',
            }}
          >
            {email}
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: '0.875rem',
              color: '#64748b',
            }}
          >
            Living Country
          </div>
          <div
            style={{
              fontSize: '1rem',
              fontWeight: '500',
              color: '#1e293b',
            }}
          >
            {livingCountry}
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: '0.875rem',
              color: '#64748b',
            }}
          >
            Package
          </div>
          <div
            style={{
              fontSize: '1rem',
              fontWeight: '500',
              color: '#1e293b',
            }}
          >
            {tpackage}
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: '0.875rem',
              color: '#64748b',
            }}
          >
            Arrival Date
          </div>
          <div
            style={{
              fontSize: '1rem',
              fontWeight: '500',
              color: '#1e293b',
            }}
          >
            {new Date(arrivalDate).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
        }}
      >
        <button
          onClick={handleUpdate} // Link to update functionality
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            padding: '0.5rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            ':hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
            },
          }}
        >
          Update
        </button>
        <button
          onClick={handleDelete} // Link to delete functionality
          style={{
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: 'white',
            padding: '0.5rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            ':hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
            },
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Packbooking;