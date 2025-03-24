import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashNav from './DashNav';

function Updatepbook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    livingCountry: '',
    tpackage: '',
    arrivalDate: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch booking details when the component mounts
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`http://localhost:5000/packbookings/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch booking details');
        }
        const data = await response.json();
        setFormData(data.packbookings);
      } catch (error) {
        console.error('Error fetching booking:', error);
        setErrors({ fetchError: 'Failed to load booking details. Please try again.' });
      }
    };

    fetchBooking();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow changes only for mobile and arrivalDate
    if (name !== 'mobile' && name !== 'arrivalDate') {
      return;
    }

    // Validate mobile number (only digits, max 10 characters)
    if (name === 'mobile') {
      if (!/^\d*$/.test(value) || value.length > 10) {
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate mobile and arrival date fields
    const newErrors = {};

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile must be 10 digits';
    }

    if (!formData.arrivalDate) {
      newErrors.arrivalDate = 'Arrival Date is required';
    } else if (new Date(formData.arrivalDate) < new Date()) {
      newErrors.arrivalDate = 'Arrival Date must be in the future';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/packbookings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: formData.mobile,
          arrivalDate: formData.arrivalDate
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update booking');
      }

      setSuccessMessage('Booking successfully updated!');
      setTimeout(() => {
        navigate('/packdetails');
      }, 2000);
    } catch (error) {
      console.error('Error updating booking:', error);
      setErrors({ submitError: 'Failed to update booking. Please try again.' });
    }
  };

  return (
    <div
      style={{
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <DashNav />
      
      {/* ID Display Card */}
      <div
        style={{
          maxWidth: '500px',
          margin: '0 auto 2rem auto',
          backgroundColor: '#3b82f6',
          color: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '1rem',
          textAlign: 'center',
          fontSize: '1.25rem',
          fontWeight: 'bold',
        }}
      >
        Editing Booking ID: {id}
      </div>

      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#1e293b',
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        Update Package Booking
      </h1>

      {errors.fetchError && (
        <div
          style={{
            color: '#ef4444',
            fontSize: '1rem',
            textAlign: 'center',
            marginBottom: '1rem',
          }}
        >
          {errors.fetchError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: '500px',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
        }}
      >
        {/* Name Field (Read-only) - Styled differently */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '1rem', color: '#6b7280', marginBottom: '0.5rem' }}>
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            readOnly
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              border: '1px solid #e5e7eb',
              fontSize: '1rem',
              backgroundColor: '#f3f4f6',
              color: '#4b5563',
              cursor: 'not-allowed',
            }}
          />
        </div>

        {/* Mobile Field (Editable) - Normal styling */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '1rem', color: '#1e293b', marginBottom: '0.5rem' }}>
            Mobile:
          </label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              border: '1px solid #cbd5e1',
              fontSize: '1rem',
              backgroundColor: 'white',
            }}
          />
          {errors.mobile && (
            <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
              {errors.mobile}
            </span>
          )}
        </div>

        {/* Email Field (Read-only) - Styled differently */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '1rem', color: '#6b7280', marginBottom: '0.5rem' }}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              border: '1px solid #e5e7eb',
              fontSize: '1rem',
              backgroundColor: '#f3f4f6',
              color: '#4b5563',
              cursor: 'not-allowed',
            }}
          />
        </div>

        {/* Living Country Field (Read-only) - Styled differently */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '1rem', color: '#6b7280', marginBottom: '0.5rem' }}>
            Living Country:
          </label>
          <input
            type="text"
            name="livingCountry"
            value={formData.livingCountry}
            readOnly
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              border: '1px solid #e5e7eb',
              fontSize: '1rem',
              backgroundColor: '#f3f4f6',
              color: '#4b5563',
              cursor: 'not-allowed',
            }}
          />
        </div>

        {/* Package Field (Read-only) - Styled differently */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '1rem', color: '#6b7280', marginBottom: '0.5rem' }}>
            Package:
          </label>
          <input
            type="text"
            name="tpackage"
            value={formData.tpackage}
            readOnly
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              border: '1px solid #e5e7eb',
              fontSize: '1rem',
              backgroundColor: '#f3f4f6',
              color: '#4b5563',
              cursor: 'not-allowed',
            }}
          />
        </div>

        {/* Arrival Date Field (Editable) - Normal styling */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '1rem', color: '#1e293b', marginBottom: '0.5rem' }}>
            Arrival Date:
          </label>
          <input
            type="date"
            name="arrivalDate"
            value={formData.arrivalDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              border: '1px solid #cbd5e1',
              fontSize: '1rem',
              backgroundColor: 'white',
            }}
          />
          {errors.arrivalDate && (
            <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
              {errors.arrivalDate}
            </span>
          )}
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.375rem',
            border: 'none',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '100%',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
        >
          Update Booking
        </button>

        {successMessage && (
          <div style={{ color: '#22c55e', fontSize: '1rem', marginTop: '1rem', textAlign: 'center' }}>
            {successMessage}
          </div>
        )}

        {errors.submitError && (
          <div style={{ color: '#ef4444', fontSize: '1rem', marginTop: '1rem', textAlign: 'center' }}>
            {errors.submitError}
          </div>
        )}
      </form>
    </div>
  );
}

export default Updatepbook;