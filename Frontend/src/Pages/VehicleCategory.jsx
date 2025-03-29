import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../CSS/Vehiclecategory.css';

function VehicleCategory() {
  const location = useLocation();
  const { category } = location.state;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    passportNumber: '',
    expectedDays: '',
    bookingDate: '',
    handoverDate: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const openModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVehicle(null);
    setFormData({
      name: '',
      mobile: '',
      passportNumber: '',
      expectedDays: '',
      bookingDate: '',
      handoverDate: '',
    });
    setErrors({});
    setSubmitError('');
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === 'name') {
      updatedValue = value.replace(/[^A-Za-z\s]/g, '');
    } else if (name === 'mobile') {
      updatedValue = value.replace(/\D/g, '').slice(0, 10);
    } else if (name === 'passportNumber') {
      updatedValue = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
      updatedValue = updatedValue.slice(0, 12);
    } else if (name === 'expectedDays') {
      updatedValue = value.replace(/\D/g, '');
    }

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name can only contain alphabets and spaces';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile must be exactly 10 digits';
    }

    if (!formData.passportNumber.trim()) {
      newErrors.passportNumber = 'Passport Number is required';
    } else if (!/^[A-Z]{2}\d{10}$/.test(formData.passportNumber)) {
      newErrors.passportNumber = 'Must be 2 uppercase letters followed by 10 digits (e.g., AB1234567890)';
    }

    if (!formData.expectedDays.trim()) {
      newErrors.expectedDays = 'Expected Days is required';
    } else if (!/^\d+$/.test(formData.expectedDays)) {
      newErrors.expectedDays = 'Expected Days must be a number';
    } else if (parseInt(formData.expectedDays) < 1) {
      newErrors.expectedDays = 'Expected Days must be at least 1';
    }

    if (!formData.bookingDate) {
      newErrors.bookingDate = 'Booking Date is required';
    }

    if (!formData.handoverDate) {
      newErrors.handoverDate = 'Handover Date is required';
    } else if (formData.bookingDate && new Date(formData.handoverDate) <= new Date(formData.bookingDate)) {
      newErrors.handoverDate = 'Handover Date must be after Booking Date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
  
    if (!validateForm()) return;
  
    setIsSubmitting(true);
  
    try {
      // Format dates for backend
      const bookingDate = new Date(formData.bookingDate);
      const handoverDate = new Date(formData.handoverDate);
  
      const bookingData = {
        vehicleType: selectedVehicle.name,
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        passportNumber: formData.passportNumber.trim().toUpperCase(),
        expectedDays: parseInt(formData.expectedDays),
        bookingdate: bookingDate.toISOString(),
        handoverDate: handoverDate.toISOString(),
        pricePerKm: selectedVehicle.pricePerKm
      };
  
      console.log("Sending data to backend:", bookingData);
  
      const response = await axios.post('http://localhost:5000/htransports', bookingData, {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log("Backend response:", response);
  
      if (response.status === 200 || response.status === 201) {
        alert('Booking Successful!');
        closeModal();
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Booking error:', {
        message: error.message,
        response: error.response?.data,
        stack: error.stack
      });
      
      let errorMessage = 'An error occurred while booking. Please try again.';
      
      if (error.response) {
        errorMessage = error.response.data?.message || 
                      error.response.data?.error ||
                      `Server responded with ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'No response from server. Is it running?';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please try again.';
      }
      
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#333'
    }}>
      <h1 style={{
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: '10px',
        fontSize: '2.5rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>{category.type}</h1>
      
      <p style={{
        textAlign: 'center',
        fontSize: '1.1rem',
        color: '#7f8c8d',
        marginBottom: '40px',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto',
        lineHeight: '1.6'
      }}>{category.description}</p>
      
      <h2 style={{
        color: '#2c3e50',
        marginBottom: '30px',
        fontSize: '1.8rem',
        borderBottom: '2px solid #3498db',
        paddingBottom: '10px',
        display: 'inline-block'
      }}>Available Vehicles</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '30px',
        marginTop: '30px'
      }}>
        {category.vehicles.map((vehicle, index) => (
          <div key={index} style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            ':hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.15)'
            }
          }}>
            <img 
              src={vehicle.image} 
              alt={`${vehicle.name} Exterior`} 
              style={{
                width: '100%',
                height: '220px',
                objectFit: 'cover',
                borderBottom: '1px solid #eee'
              }} 
            />
            <div style={{ padding: '20px' }}>
              <h3 style={{
                margin: '0 0 10px',
                fontSize: '1.5rem',
                color: '#2c3e50'
              }}>{vehicle.name}</h3>
              
              <p style={{ margin: '8px 0', fontSize: '1rem' }}>
                <strong style={{ color: '#3498db' }}>Price per KM:</strong> 
                <span style={{ fontWeight: '600', marginLeft: '5px' }}>LKR {vehicle.pricePerKm}</span>
              </p>
              
              <p style={{ margin: '8px 0', fontSize: '1rem' }}>
                <strong style={{ color: '#3498db' }}>Seats:</strong> 
                <span style={{ marginLeft: '5px' }}>{vehicle.seats}</span>
              </p>
              
              <p style={{ margin: '8px 0', fontSize: '1rem' }}>
                <strong style={{ color: '#3498db' }}>AC:</strong> 
                <span style={{ marginLeft: '5px' }}>{vehicle.ac ? 'Yes' : 'No'}</span>
              </p>
              
              <p style={{ 
                margin: '15px 0 8px', 
                fontSize: '1rem',
                fontWeight: '600',
                color: '#3498db'
              }}>Facilities:</p>
              
              <ul style={{
                margin: '0 0 20px',
                paddingLeft: '20px',
                listStyleType: 'none'
              }}>
                {vehicle.facilities.map((facility, i) => (
                  <li key={i} style={{
                    position: 'relative',
                    paddingLeft: '15px',
                    marginBottom: '5px',
                    ':before': {
                      content: '"•"',
                      position: 'absolute',
                      left: '0',
                      color: '#3498db'
                    }
                  }}>{facility}</li>
                ))}
              </ul>
              
              <button 
                onClick={() => openModal(vehicle)}
                style={{
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  width: '100%',
                  transition: 'background-color 0.3s ease',
                  ':hover': {
                    backgroundColor: '#2980b9'
                  }
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div 
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '1000'
          }}
          onClick={handleOverlayClick}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              width: '90%',
              maxWidth: '600px',
              padding: '30px',
              boxShadow: '0 5px 30px rgba(0,0,0,0.3)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{
              marginTop: '0',
              color: '#2c3e50',
              fontSize: '1.8rem',
              marginBottom: '20px',
              textAlign: 'center'
            }}>Book {selectedVehicle.name}</h2>
            
            {submitError && <div style={{
              backgroundColor: '#ffebee',
              color: '#c62828',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>{submitError}</div>}
            
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#2c3e50'
                }}>Vehicle Type:</label>
                <input 
                  type="text" 
                  value={selectedVehicle.name} 
                  readOnly 
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    backgroundColor: '#f9f9f9'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#2c3e50'
                }}>Price Per KM:</label>
                <input 
                  type="text" 
                  value={`LKR ${selectedVehicle.pricePerKm}`} 
                  readOnly 
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    backgroundColor: '#f9f9f9'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#2c3e50'
                }}>Name:</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.name ? '1px solid #e74c3c' : '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    ':focus': {
                      outline: 'none',
                      borderColor: '#3498db',
                      boxShadow: '0 0 0 2px rgba(52,152,219,0.2)'
                    }
                  }}
                />
                {errors.name && <span style={{
                  color: '#e74c3c',
                  fontSize: '0.9rem',
                  marginTop: '5px',
                  display: 'block'
                }}>{errors.name}</span>}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#2c3e50'
                }}>Mobile:</label>
                <input 
                  type="text" 
                  name="mobile" 
                  value={formData.mobile} 
                  onChange={handleInputChange} 
                  maxLength="10"
                  required 
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.mobile ? '1px solid #e74c3c' : '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    ':focus': {
                      outline: 'none',
                      borderColor: '#3498db',
                      boxShadow: '0 0 0 2px rgba(52,152,219,0.2)'
                    }
                  }}
                />
                {errors.mobile && <span style={{
                  color: '#e74c3c',
                  fontSize: '0.9rem',
                  marginTop: '5px',
                  display: 'block'
                }}>{errors.mobile}</span>}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#2c3e50'
                }}>
                  Passport Number
                  <span style={{ 
                    fontSize: '0.8rem', 
                    color: '#7f8c8d',
                    marginLeft: '5px',
                    fontWeight: 'normal'
                  }}>
                    (Format: 2 letters + 10 digits, e.g., AB1234567890)
                  </span>
                </label>
                <input 
                  type="text" 
                  name="passportNumber" 
                  value={formData.passportNumber} 
                  onChange={handleInputChange} 
                  required 
                  maxLength={12}
                  placeholder="AB1234567890"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.passportNumber ? '1px solid #e74c3c' : '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    ':focus': {
                      outline: 'none',
                      borderColor: '#3498db',
                      boxShadow: '0 0 0 2px rgba(52,152,219,0.2)'
                    }
                  }}
                />
                {errors.passportNumber && <span style={{
                  color: '#e74c3c',
                  fontSize: '0.9rem',
                  marginTop: '5px',
                  display: 'block'
                }}>{errors.passportNumber}</span>}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#2c3e50'
                }}>Expected Days:</label>
                <input 
                  type="number" 
                  name="expectedDays" 
                  value={formData.expectedDays} 
                  onChange={handleInputChange} 
                  min="1"
                  required 
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.expectedDays ? '1px solid #e74c3c' : '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    ':focus': {
                      outline: 'none',
                      borderColor: '#3498db',
                      boxShadow: '0 0 0 2px rgba(52,152,219,0.2)'
                    }
                  }}
                />
                {errors.expectedDays && <span style={{
                  color: '#e74c3c',
                  fontSize: '0.9rem',
                  marginTop: '5px',
                  display: 'block'
                }}>{errors.expectedDays}</span>}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#2c3e50'
                }}>Booking Date:</label>
                <input 
                  type="date" 
                  name="bookingDate" 
                  value={formData.bookingDate} 
                  min={new Date().toISOString().split('T')[0]} 
                  onChange={handleInputChange} 
                  required 
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.bookingDate ? '1px solid #e74c3c' : '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    ':focus': {
                      outline: 'none',
                      borderColor: '#3498db',
                      boxShadow: '0 0 0 2px rgba(52,152,219,0.2)'
                    }
                  }}
                />
                {errors.bookingDate && <span style={{
                  color: '#e74c3c',
                  fontSize: '0.9rem',
                  marginTop: '5px',
                  display: 'block'
                }}>{errors.bookingDate}</span>}
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#2c3e50'
                }}>Handover Date:</label>
                <input 
                  type="date" 
                  name="handoverDate" 
                  value={formData.handoverDate} 
                  min={formData.bookingDate || new Date().toISOString().split('T')[0]} 
                  onChange={handleInputChange} 
                  required 
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.handoverDate ? '1px solid #e74c3c' : '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    ':focus': {
                      outline: 'none',
                      borderColor: '#3498db',
                      boxShadow: '0 0 0 2px rgba(52,152,219,0.2)'
                    }
                  }}
                />
                {errors.handoverDate && <span style={{
                  color: '#e74c3c',
                  fontSize: '0.9rem',
                  marginTop: '5px',
                  display: 'block'
                }}>{errors.handoverDate}</span>}
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '15px'
              }}>
                <button 
                  type="button" 
                  onClick={closeModal} 
                  disabled={isSubmitting}
                  style={{
                    flex: '1',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'background-color 0.3s ease',
                    ':hover': {
                      backgroundColor: '#c0392b'
                    },
                    ':disabled': {
                      backgroundColor: '#95a5a6',
                      cursor: 'not-allowed'
                    }
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{
                    flex: '1',
                    backgroundColor: '#2ecc71',
                    color: 'white',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'background-color 0.3s ease',
                    ':hover': {
                      backgroundColor: '#27ae60'
                    },
                    ':disabled': {
                      backgroundColor: '#95a5a6',
                      cursor: 'not-allowed'
                    }
                  }}
                >
                  {isSubmitting ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ marginRight: '8px' }}>Submitting...</span>
                    </span>
                  ) : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default VehicleCategory;