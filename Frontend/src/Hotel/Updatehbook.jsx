import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Updatehbook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState({
    hotelName: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/hbookings/${id}`);
        const data = response.data.data || response.data;
        setBooking({
          hotelName: data.hotelName,
          checkIn: data.checkIn.split('T')[0],
          checkOut: data.checkOut.split('T')[0],
          guests: data.guests,
          name: data.name,
          email: data.email,
          phone: data.phone
        });
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to load booking");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Only send the editable fields to the backend
      const updateData = {
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        phone: booking.phone
      };
      await axios.put(`http://localhost:5000/hbookings/${id}`, updateData);
      navigate('/hoteldetails');
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to update booking");
    }
  };

  if (loading) {
    return <div className="loading">Loading booking details...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => navigate('/hoteldetails')}>Back to Bookings</button>
      </div>
    );
  }

  // Calculate minimum check-out date (one day after check-in)
  const minCheckOutDate = booking.checkIn 
    ? new Date(new Date(booking.checkIn).getTime() + 86400000).toISOString().split('T')[0]
    : '';

  return (
    <div className="update-container">
      <h1>Update Hotel Booking</h1>
      <p className="booking-id">Booking ID: {id}</p>
      
      <form onSubmit={handleSubmit} className="update-form">
        {/* Display-only fields */}
        <div className="form-group">
          <label>Hotel Name:</label>
          <div className="display-field">{booking.hotelName}</div>
        </div>
        
        <div className="form-group">
          <label>Guest Name:</label>
          <div className="display-field">{booking.name}</div>
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <div className="display-field">{booking.email}</div>
        </div>
        
        <div className="form-group">
          <label>Number of Guests:</label>
          <div className="display-field">{booking.guests}</div>
        </div>
        
        {/* Editable fields */}
        <div className="form-group">
          <label htmlFor="checkIn">Check-In Date:</label>
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            value={booking.checkIn}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="checkOut">Check-Out Date:</label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            value={booking.checkOut}
            onChange={handleChange}
            required
            min={minCheckOutDate}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Mobile Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={booking.phone}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            title="Please enter a 10-digit phone number"
          />
        </div>
        
        {error && <p className="form-error">{error}</p>}
        
        <div className="form-actions">
          <button type="button" onClick={() => navigate('/hoteldetails')} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="update-btn">
            Update Booking
          </button>
        </div>
      </form>
    </div>
  );
}

// CSS Styles
const styles = `
  .update-container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .update-container h1 {
    color: #2d3748;
    text-align: center;
    margin-bottom: 1rem;
  }

  .booking-id {
    text-align: center;
    color: #4a5568;
    margin-bottom: 2rem;
    font-size: 0.9rem;
  }

  .update-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    font-weight: 600;
    color: #4a5568;
  }

  .display-field {
    padding: 0.75rem;
    background-color: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    color: #4a5568;
  }

  .form-group input {
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  .form-group input:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 1px #3182ce;
  }

  .form-group input[type="date"] {
    padding: 0.65rem;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
  }

  .cancel-btn, .update-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .cancel-btn {
    background-color: #e2e8f0;
    color: #4a5568;
  }

  .cancel-btn:hover {
    background-color: #cbd5e0;
  }

  .update-btn {
    background-color: #3182ce;
    color: white;
  }

  .update-btn:hover {
    background-color: #2b6cb0;
  }

  .form-error {
    color: #e53e3e;
    text-align: center;
    margin: 0.5rem 0;
  }

  .loading, .error {
    text-align: center;
    padding: 2rem;
  }

  .error button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #3182ce;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);

export default Updatehbook;