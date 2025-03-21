import React, { useState } from 'react';

function Beach() {
  const [showForm, setShowForm] = useState(false); // State to control popup visibility
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    livingCountry: '',
    package: 'Beach Paradise Getaway', // Auto-fill package name
    arrivalDate: ''
  });
  const [errors, setErrors] = useState({}); // State to store validation errors
  const [successMessage, setSuccessMessage] = useState(''); // State to store success message

  // Open the popup
  const handleBookNow = () => {
    setShowForm(true);
    setSuccessMessage(''); // Clear success message when opening the form
  };

  // Close the popup
  const handleCloseForm = () => {
    setShowForm(false);
    setErrors({}); // Clear errors when closing the form
    setSuccessMessage(''); // Clear success message
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate mobile number (only digits, max 10 characters)
    if (name === 'mobile') {
      if (!/^\d*$/.test(value) || value.length > 10) {
        return; // Restrict non-digits and limit to 10 characters
      }
    }

    // Validate name and living country (only alphabets and spaces)
    if (name === 'name' || name === 'livingCountry') {
      if (!/^[A-Za-z\s]*$/.test(value)) {
        return; // Restrict numbers and special characters
      }
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name can only contain alphabets and spaces';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile must be 10 digits';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Email must contain @';
    }

    if (!formData.livingCountry.trim()) {
      newErrors.livingCountry = 'Living Country is required';
    } else if (!/^[A-Za-z\s]+$/.test(formData.livingCountry)) {
      newErrors.livingCountry = 'Living Country can only contain alphabets and spaces';
    }

    if (!formData.arrivalDate) {
      newErrors.arrivalDate = 'Arrival Date is required';
    } else if (new Date(formData.arrivalDate) < new Date()) {
      newErrors.arrivalDate = 'Arrival Date must be in the future';
    }

    // If there are errors, set them and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no errors, proceed with submission
    console.log('Form Data:', formData);

    // Simulate successful submission
    setSuccessMessage('Package successfully booked!');
    setTimeout(() => {
      setShowForm(false); // Close the form after 2 seconds
      setSuccessMessage(''); // Clear success message
    }, 2000);
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
      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#1e293b',
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        Beach Paradise Getaway
      </h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '1.5rem',
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '0.5rem',
            }}
          >
            Destinations: Mirissa, Unawatuna, Bentota
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: '#64748b',
              lineHeight: '1.6',
            }}
          >
            Relax on the pristine beaches of Sri Lanka with this 5-day getaway. Enjoy sun, sand, and sea at some of the most beautiful coastal destinations.
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '1.5rem',
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '0.5rem',
            }}
          >
            Duration: 5 Days
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: '#64748b',
              lineHeight: '1.6',
            }}
          >
            This 5-day tour offers a perfect blend of relaxation and adventure along Sri Lanka's stunning coastline.
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '1.5rem',
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '0.5rem',
            }}
          >
            Price: $900
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: '#64748b',
              lineHeight: '1.6',
            }}
          >
            The package includes accommodation, transportation, guided tours, and meals.
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          <img
            src="/Booking/mirissa.jpg"
            alt="Mirissa"
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
            }}
          />
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#1e293b',
              margin: '1rem 0',
            }}
          >
            Mirissa
          </h3>
          <p
            style={{
              fontSize: '1rem',
              color: '#64748b',
              padding: '0 1rem 1rem',
            }}
          >
            Mirissa is famous for its golden beaches and whale watching. Enjoy the serene coastline and vibrant nightlife.
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          <img
            src="/Booking/una.jpg"
            alt="Unawatuna"
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
            }}
          />
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#1e293b',
              margin: '1rem 0',
            }}
          >
            Unawatuna
          </h3>
          <p
            style={{
              fontSize: '1rem',
              color: '#64748b',
              padding: '0 1rem 1rem',
            }}
          >
            Unawatuna is a serene beach with crystal-clear waters, perfect for swimming and snorkeling.
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          <img
            src="/Booking/ben.jpg"
            alt="Bentota"
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
            }}
          />
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#1e293b',
              margin: '1rem 0',
            }}
          >
            Bentota
          </h3>
          <p
            style={{
              fontSize: '1rem',
              color: '#64748b',
              padding: '0 1rem 1rem',
            }}
          >
            Bentota is known for its water sports and luxury resorts. Enjoy activities like jet skiing, windsurfing, and more.
          </p>
        </div>
      </div>

      <div
        style={{
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        <button
          onClick={handleBookNow}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.375rem',
            border: 'none',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
        >
          Book Now
        </button>
      </div>

      {/* Popup Form */}
      {showForm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '2rem',
              width: '100%',
              maxWidth: '500px',
              position: 'relative',
            }}
          >
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: '1.5rem',
              }}
            >
              Package Booking Form
            </h2>
            <button
              onClick={handleCloseForm}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#64748b',
              }}
            >
              ×
            </button>
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  marginBottom: '1rem',
                }}
              >
                <label
                  style={{
                    display: 'block',
                    fontSize: '1rem',
                    color: '#1e293b',
                    marginBottom: '0.5rem',
                  }}
                >
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    border: '1px solid #cbd5e1',
                    fontSize: '1rem',
                  }}
                />
                {errors.name && (
                  <span
                    style={{
                      color: '#ef4444',
                      fontSize: '0.875rem',
                      marginTop: '0.25rem',
                      display: 'block',
                    }}
                  >
                    {errors.name}
                  </span>
                )}
              </div>
              <div
                style={{
                  marginBottom: '1rem',
                }}
              >
                <label
                  style={{
                    display: 'block',
                    fontSize: '1rem',
                    color: '#1e293b',
                    marginBottom: '0.5rem',
                  }}
                >
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
                  }}
                />
                {errors.mobile && (
                  <span
                    style={{
                      color: '#ef4444',
                      fontSize: '0.875rem',
                      marginTop: '0.25rem',
                      display: 'block',
                    }}
                  >
                    {errors.mobile}
                  </span>
                )}
              </div>
              <div
                style={{
                  marginBottom: '1rem',
                }}
              >
                <label
                  style={{
                    display: 'block',
                    fontSize: '1rem',
                    color: '#1e293b',
                    marginBottom: '0.5rem',
                  }}
                >
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    border: '1px solid #cbd5e1',
                    fontSize: '1rem',
                  }}
                />
                {errors.email && (
                  <span
                    style={{
                      color: '#ef4444',
                      fontSize: '0.875rem',
                      marginTop: '0.25rem',
                      display: 'block',
                    }}
                  >
                    {errors.email}
                  </span>
                )}
              </div>
              <div
                style={{
                  marginBottom: '1rem',
                }}
              >
                <label
                  style={{
                    display: 'block',
                    fontSize: '1rem',
                    color: '#1e293b',
                    marginBottom: '0.5rem',
                  }}
                >
                  Living Country:
                </label>
                <input
                  type="text"
                  name="livingCountry"
                  value={formData.livingCountry}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    border: '1px solid #cbd5e1',
                    fontSize: '1rem',
                  }}
                />
                {errors.livingCountry && (
                  <span
                    style={{
                      color: '#ef4444',
                      fontSize: '0.875rem',
                      marginTop: '0.25rem',
                      display: 'block',
                    }}
                  >
                    {errors.livingCountry}
                  </span>
                )}
              </div>
              <div
                style={{
                  marginBottom: '1rem',
                }}
              >
                <label
                  style={{
                    display: 'block',
                    fontSize: '1rem',
                    color: '#1e293b',
                    marginBottom: '0.5rem',
                  }}
                >
                  Package:
                </label>
                <input
                  type="text"
                  name="package"
                  value={formData.package}
                  readOnly
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    border: '1px solid #cbd5e1',
                    fontSize: '1rem',
                    backgroundColor: '#f1f5f9',
                  }}
                />
              </div>
              <div
                style={{
                  marginBottom: '1.5rem',
                }}
              >
                <label
                  style={{
                    display: 'block',
                    fontSize: '1rem',
                    color: '#1e293b',
                    marginBottom: '0.5rem',
                  }}
                >
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
                  }}
                />
                {errors.arrivalDate && (
                  <span
                    style={{
                      color: '#ef4444',
                      fontSize: '0.875rem',
                      marginTop: '0.25rem',
                      display: 'block',
                    }}
                  >
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
                Submit
              </button>
            </form>
            {successMessage && (
              <div
                style={{
                  color: '#22c55e',
                  fontSize: '1rem',
                  marginTop: '1rem',
                  textAlign: 'center',
                }}
              >
                {successMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Beach;