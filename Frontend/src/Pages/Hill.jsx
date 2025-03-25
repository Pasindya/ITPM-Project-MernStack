import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Hill() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    livingCountry: '',
    tpackage: 'Hill Country Escape',
    arrivalDate: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const packageOptions = [
    'Hill Country Escape',
    'Cultural Heritage Tour',
    'Beach Paradise Getaway',
    'Wildlife Safari Adventure',
    'Ayurveda & Wellness Retreat',
    'Adventure & Trekking Expedition'
  ];

  const handleBookNow = () => {
    setShowForm(true);
    setSuccessMessage('');
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setErrors({});
    setSuccessMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'mobile') {
      if (!/^\d*$/.test(value) || value.length > 10) return;
    }

    if (name === 'name' || name === 'livingCountry') {
      if (!/^[A-Za-z\s]*$/.test(value)) return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name can only contain letters and spaces';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile must be 10 digits';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.livingCountry.trim()) {
      newErrors.livingCountry = 'Living Country is required';
    } else if (!/^[A-Za-z\s]+$/.test(formData.livingCountry)) {
      newErrors.livingCountry = 'Country can only contain letters and spaces';
    }

    if (!formData.arrivalDate) {
      newErrors.arrivalDate = 'Arrival Date is required';
    } else if (new Date(formData.arrivalDate) < new Date()) {
      newErrors.arrivalDate = 'Date must be in the future';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/packbookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSuccessMessage('Booking successful! Redirecting...');
      setTimeout(() => {
        setShowForm(false);
        navigate('/packages', { state: { formData } });
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSuccessMessage('Failed to book the package. Please try again.');
    }
  };

  // Inline styles
  const styles = {
    page: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#333',
      lineHeight: 1.6,
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px'
    },
    hero: {
      background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/Images/hill-hero.jpg) center/cover no-repeat',
      height: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: 'white',
      marginBottom: '40px',
      borderRadius: '8px'
    },
    heroContent: {
      maxWidth: '800px',
      padding: '0 20px'
    },
    heroTitle: {
      fontSize: '3rem',
      marginBottom: '20px',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      color: 'white'
    },
    heroSubtitle: {
      fontSize: '1.5rem',
      marginBottom: '30px'
    },
    ctaButton: {
      backgroundColor: '#2ecc71',
      color: 'white',
      border: 'none',
      padding: '12px 30px',
      fontSize: '1.2rem',
      borderRadius: '50px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    highlights: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
      marginBottom: '50px'
    },
    highlightCard: {
      background: '#f9f9f9',
      padding: '25px',
      borderRadius: '8px',
      textAlign: 'center',
      transition: 'transform 0.3s ease'
    },
    highlightIcon: {
      fontSize: '2.5rem',
      marginBottom: '15px'
    },
    destinationGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '30px',
      margin: '50px 0'
    },
    destinationCard: {
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease'
    },
    cardImage: {
      width: '100%',
      height: '250px',
      objectFit: 'cover'
    },
    cardContent: {
      padding: '20px'
    },
    itinerary: {
      margin: '60px 0'
    },
    itineraryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px'
    },
    dayCard: {
      background: '#f9f9f9',
      padding: '20px',
      borderRadius: '8px',
      borderLeft: '5px solid #2ecc71'
    },
    popupOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(5px)'
    },
    popupContainer: {
      background: 'white',
      borderRadius: '10px',
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      overflowY: 'auto',
      padding: '30px',
      position: 'relative',
      animation: 'popIn 0.3s ease-out'
    },
    popupHeader: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    formGroup: {
      marginBottom: '20px'
    },
    formLabel: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: 600,
      color: '#2c3e50'
    },
    formInput: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '1rem'
    },
    errorInput: {
      borderColor: '#e74c3c !important'
    },
    errorMessage: {
      color: '#e74c3c',
      fontSize: '0.9rem',
      marginTop: '5px',
      display: 'block'
    },
    submitButton: {
      width: '100%',
      padding: '15px',
      backgroundColor: '#27ae60',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '1.1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginTop: '20px'
    },
    successMessage: {
      backgroundColor: '#d4edda',
      color: '#155724',
      padding: '15px',
      borderRadius: '5px',
      marginTop: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    closeButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      fontSize: '1.5rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#7f8c8d'
    }
  };

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Hill Country Escape</h1>
          <p style={styles.heroSubtitle}>Discover the cool climes and breathtaking landscapes of Sri Lanka's highlands</p>
          <button 
            style={styles.ctaButton} 
            onClick={handleBookNow}
            onMouseOver={(e) => e.target.style.backgroundColor = '#27ae60'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2ecc71'}
          >
            Book Your Mountain Retreat
          </button>
        </div>
      </div>

      {/* Tour Highlights */}
      <div style={styles.highlights}>
        <div 
          style={styles.highlightCard}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = ''}
        >
          <div style={styles.highlightIcon}>⛰️</div>
          <h3>Destinations</h3>
          <p>Nuwara Eliya, Ella, Horton Plains</p>
        </div>
        <div 
          style={styles.highlightCard}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = ''}
        >
          <div style={styles.highlightIcon}>⏳</div>
          <h3>Duration</h3>
          <p>6 Days / 5 Nights</p>
        </div>
        <div 
          style={styles.highlightCard}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = ''}
        >
          <div style={styles.highlightIcon}>💰</div>
          <h3>Price</h3>
          <p>Starting from $1100 per person</p>
        </div>
      </div>

      {/* Detailed Description */}
      <section style={{ margin: '40px 0' }}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>About the Hill Country Tour</h2>
        <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          Escape to Sri Lanka's picturesque hill country, where misty mountains, lush tea plantations, and cool 
          climates create the perfect setting for relaxation and adventure amidst breathtaking natural beauty.
        </p>
      </section>

      {/* Destination Cards */}
      <div style={styles.destinationGrid}>
        <div 
          style={styles.destinationCard}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseOut={(e) => e.currentTarget.style.transform = ''}
        >
          <img 
            src="/Images/swing.jpg" 
            alt="Nuwara Eliya" 
            style={styles.cardImage}
          />
          <div style={styles.cardContent}>
            <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Nuwara Eliya</h3>
            <p>
              Known as "Little England," this charming town features colonial architecture, 
              beautiful gardens, and sprawling tea estates. Enjoy cool temperatures and 
              visit a working tea factory to learn about Ceylon tea production.
            </p>
          </div>
        </div>
        
        <div 
          style={styles.destinationCard}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseOut={(e) => e.currentTarget.style.transform = ''}
        >
          <img 
            src="/Images/rivers.jpg" 
            alt="Ella" 
            style={styles.cardImage}
          />
          <div style={styles.cardContent}>
            <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Ella</h3>
            <p>
              This picturesque mountain town offers stunning views, hiking trails to 
              waterfalls like Ravana Falls, and the famous Nine Arch Bridge. Enjoy 
              panoramic views from Ella Rock and sample authentic Sri Lankan cuisine.
            </p>
          </div>
        </div>
        
        <div 
          style={styles.destinationCard}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseOut={(e) => e.currentTarget.style.transform = ''}
        >
          <img 
            src="/Images/mount.jpg" 
            alt="Horton Plains" 
            style={styles.cardImage}
          />
          <div style={styles.cardContent}>
            <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Horton Plains</h3>
            <p>
              This national park features the dramatic World's End viewpoint, 
              Baker's Falls, and diverse wildlife. The morning hike offers 
              breathtaking views as the mist clears to reveal sheer cliffs and 
              distant landscapes.
            </p>
          </div>
        </div>
      </div>

      {/* Itinerary */}
      <section style={styles.itinerary}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#2c3e50' }}>Tour Itinerary</h2>
        <div style={styles.itineraryGrid}>
          <div style={styles.dayCard}>
            <h3 style={{ color: '#2ecc71', marginBottom: '15px' }}>Day 1-2: Arrival & Nuwara Eliya</h3>
            <ul style={{ paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Arrival in Colombo</li>
              <li style={{ marginBottom: '8px' }}>Scenic train ride to Nuwara Eliya</li>
              <li style={{ marginBottom: '8px' }}>Visit tea plantations and factories</li>
              <li style={{ marginBottom: '8px' }}>Explore colonial architecture</li>
            </ul>
          </div>
          <div style={styles.dayCard}>
            <h3 style={{ color: '#2ecc71', marginBottom: '15px' }}>Day 3-4: Ella</h3>
            <ul style={{ paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Hike to Ella Rock</li>
              <li style={{ marginBottom: '8px' }}>Visit Nine Arch Bridge</li>
              <li style={{ marginBottom: '8px' }}>See Ravana Falls</li>
              <li style={{ marginBottom: '8px' }}>Local cooking class</li>
            </ul>
          </div>
          <div style={styles.dayCard}>
            <h3 style={{ color: '#2ecc71', marginBottom: '15px' }}>Day 5-6: Horton Plains & Return</h3>
            <ul style={{ paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Sunrise hike in Horton Plains</li>
              <li style={{ marginBottom: '8px' }}>Visit World's End viewpoint</li>
              <li style={{ marginBottom: '8px' }}>Return to Colombo</li>
              <li style={{ marginBottom: '8px' }}>Departure</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Booking Form Popup */}
      {showForm && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContainer}>
            <button 
              style={styles.closeButton}
              onClick={handleCloseForm}
              onMouseOver={(e) => e.target.style.color = '#333'}
              onMouseOut={(e) => e.target.style.color = '#7f8c8d'}
            >
              &times;
            </button>
            
            <div style={styles.popupHeader}>
              <h2 style={{ color: '#2c3e50', marginBottom: '10px' }}>Book Your Hill Country Escape</h2>
              <p style={{ color: '#7f8c8d' }}>Fill in your details to reserve your spot</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.formLabel}>Full Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  style={{
                    ...styles.formInput,
                    ...(errors.name ? styles.errorInput : {})
                  }}
                />
                {errors.name && <span style={styles.errorMessage}>{errors.name}</span>}
              </div>
              
              <div style={styles.formGroup}>
                <label htmlFor="mobile" style={styles.formLabel}>Mobile Number*</label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter 10-digit mobile number"
                  style={{
                    ...styles.formInput,
                    ...(errors.mobile ? styles.errorInput : {})
                  }}
                />
                {errors.mobile && <span style={styles.errorMessage}>{errors.mobile}</span>}
              </div>
              
              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.formLabel}>Email Address*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  style={{
                    ...styles.formInput,
                    ...(errors.email ? styles.errorInput : {})
                  }}
                />
                {errors.email && <span style={styles.errorMessage}>{errors.email}</span>}
              </div>
              
              <div style={styles.formGroup}>
                <label htmlFor="livingCountry" style={styles.formLabel}>Country of Residence*</label>
                <input
                  type="text"
                  id="livingCountry"
                  name="livingCountry"
                  value={formData.livingCountry}
                  onChange={handleChange}
                  placeholder="Enter your country"
                  style={{
                    ...styles.formInput,
                    ...(errors.livingCountry ? styles.errorInput : {})
                  }}
                />
                {errors.livingCountry && <span style={styles.errorMessage}>{errors.livingCountry}</span>}
              </div>
              
              <div style={styles.formGroup}>
                <label htmlFor="tpackage" style={styles.formLabel}>Package</label>
                <select
                  id="tpackage"
                  name="tpackage"
                  value={formData.tpackage}
                  onChange={handleChange}
                  style={styles.formInput}
                >
                  {packageOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div style={styles.formGroup}>
                <label htmlFor="arrivalDate" style={styles.formLabel}>Preferred Arrival Date*</label>
                <input
                  type="date"
                  id="arrivalDate"
                  name="arrivalDate"
                  value={formData.arrivalDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  style={{
                    ...styles.formInput,
                    ...(errors.arrivalDate ? styles.errorInput : {})
                  }}
                />
                {errors.arrivalDate && <span style={styles.errorMessage}>{errors.arrivalDate}</span>}
              </div>
              
              <button 
                type="submit" 
                style={styles.submitButton}
                onMouseOver={(e) => e.target.style.backgroundColor = '#2ecc71'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#27ae60'}
              >
                Confirm Booking
              </button>
            </form>
            
            {successMessage && (
              <div style={styles.successMessage}>
                <svg 
                  style={{ width: '20px', height: '20px', marginRight: '10px' }} 
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                </svg>
                {successMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Hill;