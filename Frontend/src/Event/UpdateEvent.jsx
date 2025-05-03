import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateEvent() {
  const [inputs, setInputs] = useState({
    FirstName: "",
    LastName: "",
    City: "",
    Number: "",
    Gmail: "",
    NumberAdult: "",
    Date: "",
    Time: "",
    Location: "",
    EventCategory: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/events/${id}`);
        setInputs(res.data.event || {});
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching event data:", error);
        setIsLoading(false);
      }
    };
    fetchHandler();
  }, [id]);

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    
    // Remove all non-digit characters
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$|^\d{10,15}$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const currentDateTime = new Date();
    const selectedDateTime = inputs.Date && inputs.Time ? 
      new Date(`${inputs.Date}T${inputs.Time}`) : null;

    // Required fields validation
    if (!inputs.FirstName.trim()) newErrors.FirstName = "First name is required";
    if (!inputs.LastName.trim()) newErrors.LastName = "Last name is required";
    if (!inputs.Date) newErrors.Date = "Date is required";
    if (!inputs.Time) newErrors.Time = "Time is required";

    // Name fields validation - letters only
    if (inputs.FirstName.trim() && !nameRegex.test(inputs.FirstName)) {
      newErrors.FirstName = "Only letters and spaces allowed";
    }
    if (inputs.LastName.trim() && !nameRegex.test(inputs.LastName)) {
      newErrors.LastName = "Only letters and spaces allowed";
    }

    // City and Location validation
    if (inputs.City && /[^a-zA-Z0-9\s\-,.()]/.test(inputs.City)) {
      newErrors.City = "Only letters, numbers, spaces, and basic punctuation (-,.) allowed";
    }
    if (inputs.Location && /[^a-zA-Z0-9\s\-,.()]/.test(inputs.Location)) {
      newErrors.Location = "Only letters, numbers, spaces, and basic punctuation (-,.) allowed";
    }

    // Email validation
    if (inputs.Gmail && !emailRegex.test(inputs.Gmail)) {
      newErrors.Gmail = "Please enter a valid email address";
    }

    // Phone number validation
    if (inputs.Number) {
      const cleanNumber = inputs.Number.replace(/[^\d]/g, '');
      if (!phoneRegex.test(inputs.Number)) {
        newErrors.Number = "Please enter a valid phone number (10 digits)";
      } else if (cleanNumber.length < 10) {
        newErrors.Number = "Phone number must be at least 10 digits";
      } else if (cleanNumber.length > 15) {
        newErrors.Number = "Phone number cannot exceed 15 digits";
      }
    }

    // Number of adults validation
    if (inputs.NumberAdult) {
      const numAdults = Number(inputs.NumberAdult);
      if (isNaN(numAdults)) {
        newErrors.NumberAdult = "Must be a number";
      } else if (numAdults < 1) {
        newErrors.NumberAdult = "Must be at least 1";
      } else if (numAdults > 100) {
        newErrors.NumberAdult = "Maximum 100 adults";
      }
    } else {
      newErrors.NumberAdult = "Number of adults is required";
    }

    // Date and Time validation
    if (selectedDateTime) {
      if (selectedDateTime < currentDateTime) {
        newErrors.Date = "Date and time cannot be in the past";
        newErrors.Time = "Date and time cannot be in the past";
      }
    } else {
      if (inputs.Date) {
        const selectedDate = new Date(inputs.Date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          newErrors.Date = "Date cannot be in the past";
        }
      }
      if (inputs.Time) {
        const now = new Date();
        const selectedTime = new Date(`1970-01-01T${inputs.Time}`);
        const currentTime = new Date(`1970-01-01T${now.getHours()}:${now.getMinutes()}`);
        
        // Only validate time if date is today
        if (inputs.Date === new Date().toISOString().split('T')[0] && selectedTime < currentTime) {
          newErrors.Time = "Time cannot be in the past for today's date";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendRequest = async () => {
    try {
      // Clean phone number before sending
      const cleanNumber = inputs.Number.replace(/[^\d]/g, '');
      
      await axios.put(`http://localhost:5000/events/${id}`, {
        FirstName: inputs.FirstName.trim(),
        LastName: inputs.LastName.trim(),
        City: inputs.City.trim(),
        Number: cleanNumber,
        Gmail: inputs.Gmail.trim(),
        NumberAdult: parseInt(inputs.NumberAdult) || 0,
        Date: inputs.Date,
        Time: inputs.Time,
        Location: inputs.Location.trim(),
        EventCategory: inputs.EventCategory.trim(),
      });
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for phone number field
    if (name === "Number") {
      // Only allow numbers and limit length to 15 characters
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue.length > 15) return; // Don't update if too long
      
      setInputs(prev => ({
        ...prev,
        [name]: formatPhoneNumber(numericValue)
      }));
      
      // Clear error if exists
      if (errors.Number) {
        setErrors(prev => {
          const newErrors = {...prev};
          delete newErrors.Number;
          return newErrors;
        });
      }
      return;
    }

    // Special handling for NumberAdult field
    if (name === "NumberAdult") {
      // Only allow numbers and limit to 3 digits
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue.length > 3) return;
      
      setInputs(prev => ({
        ...prev,
        [name]: numericValue
      }));
      
      // Clear error if exists
      if (errors.NumberAdult) {
        setErrors(prev => {
          const newErrors = {...prev};
          delete newErrors.NumberAdult;
          return newErrors;
        });
      }
      return;
    }

    // Special handling for name fields (FirstName, LastName)
    if (name === "FirstName" || name === "LastName") {
      // Only allow letters and spaces
      if (value && !/^[A-Za-z\s]*$/.test(value)) {
        setErrors(prev => ({
          ...prev,
          [name]: "Only letters and spaces allowed"
        }));
        return;
      }
      
      setInputs(prev => ({
        ...prev,
        [name]: value
      }));

      // Clear error if exists
      if (errors[name]) {
        setErrors(prev => {
          const newErrors = {...prev};
          delete newErrors[name];
          return newErrors;
        });
      }
      return;
    }

    // For other fields
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setIsUpdating(true);
    try {
      await sendRequest();
      setTimeout(() => {
        navigate("/eventm");
      }, 1000);
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({
        form: "Failed to update event. Please try again."
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const getError = (fieldName) => {
    return errors[fieldName] ? (
      <div style={{
        color: '#dc3545',
        fontSize: '0.8rem',
        marginTop: '0.3rem'
      }}>
        {errors[fieldName]}
      </div>
    ) : null;
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #6a11cb',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '3rem',
      fontFamily: "'Poppins', sans-serif",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
        padding: '3rem',
        width: '100%',
        maxWidth: '800px',
        transform: shake ? 'translateX(0)' : 'translateY(0)',
        animation: shake ? 'shake 0.5s' : 'fadeInUp 0.6s ease-out'
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '3rem',
          fontSize: '2.5rem',
          fontWeight: '600',
          background: 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent'
        }}>Update Event</h1>
        {errors.form && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            {errors.form}
          </div>
        )}
        <form onSubmit={handleSubmit} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {/* First Name */}
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <input
              type="text"
              name="FirstName"
              placeholder=" "
              value={inputs.FirstName}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '1.2rem 1.5rem',
                border: errors.FirstName ? '2px solid #dc3545' : '2px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
              }}
            />
            <label style={{
              position: 'absolute',
              left: '1.5rem',
              top: inputs.FirstName ? '0' : '1.2rem',
              transform: inputs.FirstName ? 'translateY(-50%) scale(0.9)' : 'none',
              background: inputs.FirstName ? 'white' : 'transparent',
              padding: inputs.FirstName ? '0 0.5rem' : '0',
              color: errors.FirstName ? '#dc3545' : (inputs.FirstName ? '#6a11cb' : '#757575'),
              transition: 'all 0.2s ease',
              pointerEvents: 'none',
              fontSize: inputs.FirstName ? '0.9rem' : '1rem'
            }}>
              First Name*
            </label>
            {getError('FirstName')}
          </div>

          {/* Last Name */}
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <input
              type="text"
              name="LastName"
              placeholder=" "
              value={inputs.LastName}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '1.2rem 1.5rem',
                border: errors.LastName ? '2px solid #dc3545' : '2px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
              }}
            />
            <label style={{
              position: 'absolute',
              left: '1.5rem',
              top: inputs.LastName ? '0' : '1.2rem',
              transform: inputs.LastName ? 'translateY(-50%) scale(0.9)' : 'none',
              background: inputs.LastName ? 'white' : 'transparent',
              padding: inputs.LastName ? '0 0.5rem' : '0',
              color: errors.LastName ? '#dc3545' : (inputs.LastName ? '#6a11cb' : '#757575'),
              transition: 'all 0.2s ease',
              pointerEvents: 'none',
              fontSize: inputs.LastName ? '0.9rem' : '1rem'
            }}>
              Last Name*
            </label>
            {getError('LastName')}
          </div>

          {/* Phone Number */}
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <input
              type="tel"
              name="Number"
              placeholder=" "
              value={inputs.Number}
              onChange={handleChange}
              pattern="[0-9]{10,15}"
              inputMode="numeric"
              style={{
                width: '100%',
                padding: '1.2rem 1.5rem',
                border: errors.Number ? '2px solid #dc3545' : '2px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
              }}
            />
            <label style={{
              position: 'absolute',
              left: '1.5rem',
              top: inputs.Number ? '0' : '1.2rem',
              transform: inputs.Number ? 'translateY(-50%) scale(0.9)' : 'none',
              background: inputs.Number ? 'white' : 'transparent',
              padding: inputs.Number ? '0 0.5rem' : '0',
              color: errors.Number ? '#dc3545' : (inputs.Number ? '#6a11cb' : '#757575'),
              transition: 'all 0.2s ease',
              pointerEvents: 'none',
              fontSize: inputs.Number ? '0.9rem' : '1rem'
            }}>
              Phone Number (e.g., (123) 456-7890)
            </label>
            {getError('Number')}
          </div>

          {/* Number of Adults */}
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <input
              type="text"
              name="NumberAdult"
              placeholder=" "
              value={inputs.NumberAdult}
              onChange={handleChange}
              inputMode="numeric"
              required
              style={{
                width: '100%',
                padding: '1.2rem 1.5rem',
                border: errors.NumberAdult ? '2px solid #dc3545' : '2px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
              }}
            />
            <label style={{
              position: 'absolute',
              left: '1.5rem',
              top: inputs.NumberAdult ? '0' : '1.2rem',
              transform: inputs.NumberAdult ? 'translateY(-50%) scale(0.9)' : 'none',
              background: inputs.NumberAdult ? 'white' : 'transparent',
              padding: inputs.NumberAdult ? '0 0.5rem' : '0',
              color: errors.NumberAdult ? '#dc3545' : (inputs.NumberAdult ? '#6a11cb' : '#757575'),
              transition: 'all 0.2s ease',
              pointerEvents: 'none',
              fontSize: inputs.NumberAdult ? '0.9rem' : '1rem'
            }}>
              Number of Adults*
            </label>
            {getError('NumberAdult')}
          </div>

          {/* Date */}
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <input
              type="date"
              name="Date"
              placeholder=" "
              value={inputs.Date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              style={{
                width: '100%',
                padding: '1.2rem 1.5rem',
                border: errors.Date ? '2px solid #dc3545' : '2px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
              }}
            />
            <label style={{
              position: 'absolute',
              left: '1.5rem',
              top: inputs.Date ? '0' : '1.2rem',
              transform: inputs.Date ? 'translateY(-50%) scale(0.9)' : 'none',
              background: inputs.Date ? 'white' : 'transparent',
              padding: inputs.Date ? '0 0.5rem' : '0',
              color: errors.Date ? '#dc3545' : (inputs.Date ? '#6a11cb' : '#757575'),
              transition: 'all 0.2s ease',
              pointerEvents: 'none',
              fontSize: inputs.Date ? '0.9rem' : '1rem'
            }}>
              Date*
            </label>
            {getError('Date')}
          </div>

          {/* Time */}
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <input
              type="time"
              name="Time"
              placeholder=" "
              value={inputs.Time}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '1.2rem 1.5rem',
                border: errors.Time ? '2px solid #dc3545' : '2px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
              }}
            />
            <label style={{
              position: 'absolute',
              left: '1.5rem',
              top: inputs.Time ? '0' : '1.2rem',
              transform: inputs.Time ? 'translateY(-50%) scale(0.9)' : 'none',
              background: inputs.Time ? 'white' : 'transparent',
              padding: inputs.Time ? '0 0.5rem' : '0',
              color: errors.Time ? '#dc3545' : (inputs.Time ? '#6a11cb' : '#757575'),
              transition: 'all 0.2s ease',
              pointerEvents: 'none',
              fontSize: inputs.Time ? '0.9rem' : '1rem'
            }}>
              Time*
            </label>
            {getError('Time')}
          </div>

          {/* Other fields (City, Email, Location, EventCategory) remain the same */}
          {/* ... */}
          <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            name="Location"
                            placeholder=" "
                            value={inputs.Location}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '1rem',
                                border: '2px solid #e0e0e0',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                ':focus': {
                                    borderColor: '#6a11cb',
                                    outline: 'none',
                                    boxShadow: '0 0 0 3px rgba(106, 17, 203, 0.2)'
                                }
                            }}
                        />
                        <label style={{
                            position: 'absolute',
                            left: '1rem',
                            top: inputs.Location ? '0' : '1rem',
                            transform: inputs.Location ? 'translateY(-50%) scale(0.9)' : 'none',
                            background: inputs.Location ? 'white' : 'transparent',
                            padding: inputs.Location ? '0 0.5rem' : '0',
                            color: inputs.Location ? '#6a11cb' : '#757575',
                            transition: 'all 0.2s ease',
                            pointerEvents: 'none',
                            fontSize: inputs.Location ? '0.9rem' : '1rem'
                        }}>
                            Location
                        </label>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            name="EventCategory"
                            placeholder=" "
                            value={inputs.EventCategory}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '1rem',
                                border: '2px solid #e0e0e0',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                ':focus': {
                                    borderColor: '#6a11cb',
                                    outline: 'none',
                                    boxShadow: '0 0 0 3px rgba(106, 17, 203, 0.2)'
                                }
                            }}
                        />
                        <label style={{
                            position: 'absolute',
                            left: '1rem',
                            top: inputs.EventCategory ? '0' : '1rem',
                            transform: inputs.EventCategory ? 'translateY(-50%) scale(0.9)' : 'none',
                            background: inputs.EventCategory ? 'white' : 'transparent',
                            padding: inputs.EventCategory ? '0 0.5rem' : '0',
                            color: inputs.EventCategory ? '#6a11cb' : '#757575',
                            transition: 'all 0.2s ease',
                            pointerEvents: 'none',
                            fontSize: inputs.EventCategory ? '0.9rem' : '1rem'
                        }}>
                            Event Category
                        </label>
                    </div>

          <div style={{ 
            gridColumn: '1 / -1', 
            display: 'flex', 
            justifyContent: 'center',
            marginTop: '1rem'
          }}>
            <button
              type="submit"
              disabled={isUpdating}
              style={{
                padding: '1.2rem 3rem',
                background: isUpdating 
                  ? '#9e9e9e' 
                  : 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                cursor: isUpdating ? 'not-allowed' : 'pointer',
                fontSize: '1.1rem',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(106, 17, 203, 0.3)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                ':hover': !isUpdating && {
                  boxShadow: '0 6px 20px rgba(106, 17, 203, 0.4)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              {isUpdating ? (
                <>
                  <span style={{ position: 'relative', zIndex: 2 }}>Updating...</span>
                  <span style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '0%',
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.2)',
                    animation: 'loadingBar 1s linear infinite'
                  }}></span>
                </>
              ) : 'Update Event'}
            </button>
          </div>
        </form>
      </div>

      {/* Inline CSS for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        @keyframes loadingBar {
          0% { width: 0%; left: 0; }
          50% { width: 100%; left: 0; }
          100% { width: 0%; left: 100%; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        select:focus, input:focus {
          outline: none;
          border-color: #6a11cb !important;
          box-shadow: 0 0 0 3px rgba(106, 17, 203, 0.2) !important;
        }
      `}</style>
    </div>
  );
}

export default UpdateEvent;