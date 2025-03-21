import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Cultural.css'; // Import the CSS file

function Cultural() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false); // State to control popup visibility
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    livingCountry: '',
    package: 'Cultural Heritage Tour', // Default package
    arrivalDate: ''
  });
  const [errors, setErrors] = useState({}); // State to store validation errors
  const [successMessage, setSuccessMessage] = useState(''); // State to store success message

  // Package options for the dropdown
  const packageOptions = [
    'Cultural Heritage Tour',
    'Beach Paradise Getaway',
    'Wildlife Safari Adventure',
    'Hill Country Escape',
    'Ayurveda & Wellness Retreat',
    'Adventure & Trekking Expedition'
  ];

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
  const handleSubmit = async (e) => {
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
    try {
      // Send form data to the backend
      const response = await fetch('https://your-backend-api.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Simulate successful submission
      setSuccessMessage('Package successfully booked!');
      setTimeout(() => {
        setShowForm(false); // Close the form after 2 seconds
        setSuccessMessage(''); // Clear success message
        navigate('/packagebook', { state: { formData } }); // Navigate to the next page
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSuccessMessage('Failed to book the package. Please try again.');
    }
  };

  return (
    <div className="cultural-container">
      <h1>Cultural Heritage Tour</h1>
      <div className="tour-details">
        <div className="destination">
          <h2>Destinations: Kandy, Sigiriya, Anuradhapura</h2>
          <p>
            Explore the rich cultural heritage of Sri Lanka with this 7-day tour. Visit iconic landmarks, ancient cities, and UNESCO World Heritage Sites.
          </p>
        </div>
        <div className="duration">
          <h2>Duration: 7 Days</h2>
          <p>
            This tour spans 7 days, offering a comprehensive experience of Sri Lanka's cultural treasures.
          </p>
        </div>
        <div className="price">
          <h2>Price: $1200</h2>
          <p>
            The package includes accommodation, transportation, guided tours, and meals.
          </p>
        </div>
      </div>

      <div className="destination-images">
        <div className="destination-card">
          <img src="/Images/mali.jpg" alt="Kandy" />
          <h3>Kandy</h3>
          <p>
            Kandy is home to the sacred Temple of the Tooth Relic, a UNESCO World Heritage Site. Enjoy the serene Kandy Lake and explore the vibrant local markets.
          </p>
        </div>
        <div className="destination-card">
          <img src="/Images/si.jpg" alt="Sigiriya" />
          <h3>Sigiriya</h3>
          <p>
            Sigiriya, also known as the Lion Rock, is an ancient rock fortress with stunning frescoes and panoramic views. It is a UNESCO World Heritage Site.
          </p>
        </div>
        <div className="destination-card">
          <img src="/Images/anu.jpg" alt="Anuradhapura" />
          <h3>Anuradhapura</h3>
          <p>
            Anuradhapura is one of the ancient capitals of Sri Lanka, known for its well-preserved ruins of ancient Sri Lankan civilization. It is a UNESCO World Heritage Site.
          </p>
        </div>
      </div>

      <div className="book-now">
        <button className="book-now-button" onClick={handleBookNow}>Book Now</button>
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Package Booking Form</h2>
            <button className="close-button" onClick={handleCloseForm}>×</button>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label>Mobile:</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
                {errors.mobile && <span className="error">{errors.mobile}</span>}
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label>Living Country:</label>
                <input
                  type="text"
                  name="livingCountry"
                  value={formData.livingCountry}
                  onChange={handleChange}
                  required
                />
                {errors.livingCountry && <span className="error">{errors.livingCountry}</span>}
              </div>
              <div className="form-group">
                <label>Package:</label>
                <select
                  name="package"
                  value={formData.package}
                  onChange={handleChange}
                  required
                >
                  {packageOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Arrival Date:</label>
                <input
                  type="date"
                  name="arrivalDate"
                  value={formData.arrivalDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
                {errors.arrivalDate && <span className="error">{errors.arrivalDate}</span>}
              </div>
              <button type="submit" className="submit-button">Submit</button>
            </form>
            {successMessage && <div className="success-message">{successMessage}</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cultural;