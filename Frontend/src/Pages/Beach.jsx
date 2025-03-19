import React, { useState } from 'react';
import '../CSS/Beach.css'; // Import the CSS file for styling

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
    <div className="beach-container">
      <h1>Beach Paradise Getaway</h1>
      <div className="tour-details">
        <div className="destination">
          <h2>Destinations: Mirissa, Unawatuna, Bentota</h2>
          <p>
            Relax on the pristine beaches of Sri Lanka with this 5-day getaway. Enjoy sun, sand, and sea at some of the most beautiful coastal destinations.
          </p>
        </div>
        <div className="duration">
          <h2>Duration: 5 Days</h2>
          <p>
            This 5-day tour offers a perfect blend of relaxation and adventure along Sri Lanka's stunning coastline.
          </p>
        </div>
        <div className="price">
          <h2>Price: $900</h2>
          <p>
            The package includes accommodation, transportation, guided tours, and meals.
          </p>
        </div>
      </div>

      <div className="destination-images">
        <div className="destination-card">
          <img src="/Booking/mirissa.jpg" alt="Mirissa" />
          <h3>Mirissa</h3>
          <p>
            Mirissa is famous for its golden beaches and whale watching. Enjoy the serene coastline and vibrant nightlife.
          </p>
        </div>
        <div className="destination-card">
          <img src="/Booking/una.jpg" alt="Unawatuna" />
          <h3>Unawatuna</h3>
          <p>
            Unawatuna is a serene beach with crystal-clear waters, perfect for swimming and snorkeling.
          </p>
        </div>
        <div className="destination-card">
          <img src="/Booking/ben.jpg" alt="Bentota" />
          <h3>Bentota</h3>
          <p>
            Bentota is known for its water sports and luxury resorts. Enjoy activities like jet skiing, windsurfing, and more.
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
                <input
                  type="text"
                  name="package"
                  value={formData.package}
                  readOnly
                />
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

export default Beach;