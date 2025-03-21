import React, { useState } from 'react';
import '../CSS/Guider.css'; // Import the CSS file

function AddGuide() {
  const [formData, setFormData] = useState({
    nid: '',
    name: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    location: '',
    experience: '',
    languages: '',
    availability: '',
    bio: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // NID validation (must be a number and exactly 10 digits)
    if (!/^\d{10}$/.test(formData.nid)) {
      newErrors.nid = 'NID must be exactly 10 digits.';
    }

    // Name validation (must contain only letters and spaces)
    if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name must contain only letters and spaces.';
    }

    // Age validation (must be a number between 18 and 100)
    if (formData.age < 18 || formData.age > 100) {
      newErrors.age = 'Age must be between 18 and 100.';
    }

    // Gender validation (must be selected)
    if (!formData.gender) {
      newErrors.gender = 'Gender is required.';
    }

    // Contact Number validation (must be exactly 10 digits)
    if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact number must be exactly 10 digits.';
    }

    // Email validation (must be a valid email address)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address.';
    }

    // Location validation (must not be empty)
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required.';
    }

    // Experience validation (must be a number and greater than 0)
    if (formData.experience <= 0) {
      newErrors.experience = 'Experience must be greater than 0.';
    }

    // Languages validation (must not be empty and allow multiple languages)
    if (!formData.languages.trim() || formData.languages.split(',').length < 1) {
      newErrors.languages = 'At least one language is required.';
    }

    // Availability validation (must be either Yes or No)
    if (!['Yes', 'No'].includes(formData.availability)) {
      newErrors.availability = 'Availability must be either "Yes" or "No".';
    }

    // Bio validation (must be at least 10 characters long)
    if (formData.bio.length < 10) {
      newErrors.bio = 'Bio must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restricting numbers and symbols in name field
    if (name === 'name' && /[^A-Za-z\s]/.test(value)) {
      return; // Do not update state if numbers or symbols are entered
    }

    // Restrict contact number to only digits
    if (name === 'contactNumber' && !/^\d*$/.test(value)) {
      return; // Do not update state if non-digit characters are entered
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Handle form submission, e.g., send data to an API
      console.log('Form Data Submitted:', formData);
      // Reset form after submission
      setFormData({
        nid: '',
        name: '',
        age: '',
        gender: '',
        contactNumber: '',
        email: '',
        location: '',
        experience: '',
        languages: '',
        availability: '',
        bio: ''
      });
      setErrors({});
    }
  };

  const handleViewAllExperts = () => {
    // Navigate to the page where all experts are listed
    console.log('Navigating to view all experts...');
    // You can use React Router or any navigation method here
  };

  return (
    <div className="add-guide-container">
      <h1>Add New Travel Expert</h1>
      <form onSubmit={handleSubmit}>
        <div className="two-side-form">
          {/* Left Column */}
          <div className="form-side">
            <div className="form-group">
              <label>
                <i className="fas fa-id-card"></i> NID:
              </label>
              <input
                type="text"
                name="nid"
                value={formData.nid}
                onChange={handleChange}
                required
                placeholder="Enter 10-digit NID"
              />
              {errors.nid && <span className="error">{errors.nid}</span>}
            </div>
            <div className="form-group">
              <label>
                <i className="fas fa-user"></i> Full Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter full name"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label>
                <i className="fas fa-birthday-cake"></i> Age:
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                placeholder="Enter age"
              />
              {errors.age && <span className="error">{errors.age}</span>}
            </div>
            <div className="form-group">
              <label>
                <i className="fas fa-phone"></i> Contact Number:
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                maxLength="10"
                required
                placeholder="Enter 10-digit contact number"
              />
              {errors.contactNumber && <span className="error">{errors.contactNumber}</span>}
            </div>
            <div className="form-group">
              <label>
                <i className="fas fa-envelope"></i> Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email address"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
          </div>

          {/* Right Column */}
          <div className="form-side">
            <div className="form-group">
              <label>
                <i className="fas fa-venus-mars"></i> Gender:
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <span className="error">{errors.gender}</span>}
            </div>
            <div className="form-group">
              <label>
                <i className="fas fa-map-marker-alt"></i> Location:
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Enter location"
              />
              {errors.location && <span className="error">{errors.location}</span>}
            </div>
            <div className="form-group">
              <label>
                <i className="fas fa-briefcase"></i> Experience (in years):
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                placeholder="Enter years of experience"
              />
              {errors.experience && <span className="error">{errors.experience}</span>}
            </div>
            <div className="form-group">
              <label>
                <i className="fas fa-language"></i> Languages:
              </label>
              <input
                type="text"
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                required
                placeholder="Enter languages separated by commas"
              />
              {errors.languages && <span className="error">{errors.languages}</span>}
            </div>
            <div className="form-group">
              <label>
                <i className="fas fa-calendar-check"></i> Availability:
              </label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                required
              >
                <option value="">Select Availability</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.availability && <span className="error">{errors.availability}</span>}
            </div>
            <div className="form-group">
              <label>
                <i className="fas fa-file-alt"></i> Bio:
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
                placeholder="Enter a short bio (min 10 characters)"
                rows="5"
              />
              {errors.bio && <span className="error">{errors.bio}</span>}
            </div>
          </div>
        </div>
        <div className="button-group">
          <button type="submit" className="submit-button">Add Travel Expert</button>
          <button type="button" className="view-all-button" onClick={handleViewAllExperts}>
            View All Experts
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddGuide;