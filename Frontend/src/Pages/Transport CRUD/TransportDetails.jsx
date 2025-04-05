import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import TransportNav from '../transportNav';

const URL = "http://localhost:5000/htransports";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function TransportDetails() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHandler();
        setBookings(data.htransports || []);
      } catch (err) {
        setError("Failed to load bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = (booking) => {
    navigate('/updatevehicle', { state: { booking } });
  };

  const handleDelete = async (id) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete this booking?");
      if (!isConfirmed) return;
      
      await axios.delete(`${URL}/${id}`);
      setBookings(prev => prev.filter(booking => booking._id !== id));
      alert('Booking deleted successfully!');
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert('Failed to delete booking. Please try again.');
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const searchLower = searchTerm.toLowerCase();
    return (
      booking.name.toLowerCase().includes(searchLower) ||
      (booking.customId && booking.customId.toLowerCase().includes(searchLower)) ||
      (booking._id && booking._id.toLowerCase().includes(searchLower)) ||
      (booking.passportNumber && booking.passportNumber.toLowerCase().includes(searchLower)) ||
      (booking.mobile && booking.mobile.includes(searchTerm))
    );
  });

  const scrollToBooking = (id) => {
    const element = document.getElementById(`booking-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add temporary highlight
      element.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.5)';
      setTimeout(() => {
        element.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      }, 2000);
    }
  };

  if (loading) {
    return (
      <div style={{
        fontFamily: "'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif",
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '20px' }}>Loading vehicle bookings...</h3>
          <div style={{
            width: '50px',
            height: '50px',
            border: '5px solid #f3f3f3',
            borderTop: '5px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        fontFamily: "'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif",
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: '#fee',
          padding: '30px',
          borderRadius: '10px',
          maxWidth: '500px',
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          borderLeft: '5px solid #e74c3c'
        }}>
          <h3 style={{ color: '#e74c3c', marginBottom: '20px' }}>{error}</h3>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              padding: '12px 24px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    
    <div style={{
      fontFamily: "'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif",
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Header Section */}
      <div style={{
        width: '100%',
        maxWidth: '1000px',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#2c3e50',
          marginBottom: '15px',
          background: 'linear-gradient(90deg, #3498db, #2ecc71)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          Tourist Vehicle Details
        </h1>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaPhone style={{ color: '#3498db' }} />
            <span>+1 (300) 1234 6543</span>
            <TransportNav/>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaEnvelope style={{ color: '#3498db' }} />
            <span>traveltrails@email.com</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaMapMarkerAlt style={{ color: '#3498db' }} />
            <span>Flower Park 336/A, Colombo, Sri Lanka</span>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{
          position: 'relative',
          maxWidth: '500px',
          margin: '0 auto 30px',
          width: '100%'
        }}>
          <input
            type="text"
            placeholder="Search by name, ID, passport or mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 20px 12px 45px',
              borderRadius: '30px',
              border: '1px solid #ddd',
              fontSize: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              ':focus': {
                outline: 'none',
                borderColor: '#3498db',
                boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.2)'
              }
            }}
          />
          <FaSearch style={{
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#7f8c8d'
          }} />
        </div>

        {/* Search Results Count */}
        {searchTerm && (
          <div style={{
            marginBottom: '20px',
            color: '#3498db',
            fontWeight: '500'
          }}>
            Found {filteredBookings.length} matching {filteredBookings.length === 1 ? 'booking' : 'bookings'}
          </div>
        )}
      </div>

      {/* Main Content */}
      {bookings.length > 0 ? (
        <div style={{
          width: '100%',
          maxWidth: '1000px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {/* All Booking Cards */}
          {(searchTerm ? filteredBookings : bookings).map((booking, index) => (
            <div 
              key={booking._id} 
              id={`booking-${booking._id}`}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '25px',
                width: '100%',
                marginBottom: '20px',
                border: '1px solid #e0e0e0',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Ribbon for Booking ID */}
              <div style={{
                position: 'absolute',
                top: '15px',
                right: '-30px',
                backgroundColor: '#3498db',
                color: 'white',
                padding: '5px 30px',
                transform: 'rotate(45deg)',
                fontSize: '14px',
                fontWeight: '600',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                width: '120px',
                textAlign: 'center'
              }}>
                {booking.customId || booking._id.substring(0, 8)}
              </div>
              
              {/* Card Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '15px',
                borderBottom: '2px solid #f1f1f1'
              }}>
                <h2 style={{
                  margin: '0',
                  color: '#2c3e50',
                  fontSize: '22px',
                  fontWeight: '600'
                }}>
                  {booking.name}
                </h2>
              </div>
              
              {/* Card Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px',
                marginBottom: '20px'
              }}>
                <div>
                  <h3 style={{
                    color: '#7f8c8d',
                    fontSize: '15px',
                    marginBottom: '12px',
                    borderBottom: '1px dashed #ddd',
                    paddingBottom: '5px'
                  }}>
                    Personal Information
                  </h3>
                  <div style={{ marginBottom: '10px' }}>
                    <span style={{
                      display: 'inline-block',
                      width: '120px',
                      color: '#7f8c8d',
                      fontWeight: '500'
                    }}>Passport No:</span>
                    <span style={{ fontWeight: '500' }}>
                      {booking.passportNumber || '--'}
                    </span>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <span style={{
                      display: 'inline-block',
                      width: '120px',
                      color: '#7f8c8d',
                      fontWeight: '500'
                    }}>Mobile:</span>
                    <span style={{ fontWeight: '500' }}>
                      {booking.mobile}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h3 style={{
                    color: '#7f8c8d',
                    fontSize: '15px',
                    marginBottom: '12px',
                    borderBottom: '1px dashed #ddd',
                    paddingBottom: '5px'
                  }}>
                    Vehicle Information
                  </h3>
                  <div style={{ marginBottom: '10px' }}>
                    <span style={{
                      display: 'inline-block',
                      width: '120px',
                      color: '#7f8c8d',
                      fontWeight: '500'
                    }}>Vehicle Type:</span>
                    <span style={{ fontWeight: '500' }}>
                      {booking.vehicleType}
                    </span>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <span style={{
                      display: 'inline-block',
                      width: '120px',
                      color: '#7f8c8d',
                      fontWeight: '500'
                    }}>Booking Date:</span>
                    <span style={{ fontWeight: '500' }}>
                      {booking.bookingdate ? 
                        new Date(booking.bookingdate).toLocaleDateString() : '--'}
                    </span>
                  </div>
                  <div>
                    <span style={{
                      display: 'inline-block',
                      width: '120px',
                      color: '#7f8c8d',
                      fontWeight: '500'
                    }}>Handover Date:</span>
                    <span style={{ fontWeight: '500' }}>
                      {booking.handoverDate ? 
                        new Date(booking.handoverDate).toLocaleDateString() : '--'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '15px',
                marginTop: '20px',
                paddingTop: '15px',
                borderTop: '2px solid #f1f1f1'
              }}>
                <button 
                  onClick={() => handleUpdate(booking)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 6px rgba(52, 152, 219, 0.3)',
                    ':hover': {
                      backgroundColor: '#2980b9',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 10px rgba(52, 152, 219, 0.4)'
                    }
                  }}
                >
                  <FaEdit /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(booking._id)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 6px rgba(231, 76, 60, 0.3)',
                    ':hover': {
                      backgroundColor: '#c0392b',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 10px rgba(231, 76, 60, 0.4)'
                    }
                  }}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '600px',
          width: '100%'
        }}>
          <h3 style={{
            color: '#7f8c8d',
            fontSize: '24px',
            marginBottom: '15px'
          }}>
            No vehicle bookings found
          </h3>
          <p style={{
            color: '#95a5a6',
            fontSize: '16px'
          }}>
            When bookings are made, they will appear here as beautiful cards
          </p>
        </div>
      )}
    </div>
  );
}

export default TransportDetails;