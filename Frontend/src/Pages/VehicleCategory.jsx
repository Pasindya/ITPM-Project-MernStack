import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../CSS/VehicleCategory.css'; // Import the CSS file

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
  };

  // Handle input change and apply validation rules
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    // Validation rules
    if (name === 'name') {
      updatedValue = value.replace(/[^A-Za-z\s]/g, ''); // Allow only alphabets and spaces
    } else if (name === 'mobile') {
      updatedValue = value.replace(/\D/g, ''); // Allow only numbers
    } else if (name === 'passportNumber') {
      updatedValue = value.replace(/[^A-Za-z0-9]/g, ''); // Alphanumeric only
    } else if (name === 'expectedDays') {
      updatedValue = value.replace(/\D/g, ''); // Allow only numbers
    }

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  // Function to validate the form before submission
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
    } else if (!/^[A-Za-z0-9]+$/.test(formData.passportNumber)) {
      newErrors.passportNumber = 'Passport Number can only contain letters and numbers';
    }

    if (!formData.expectedDays.trim()) {
      newErrors.expectedDays = 'Expected Days is required';
    } else if (!/^\d+$/.test(formData.expectedDays)) {
      newErrors.expectedDays = 'Expected Days must be a number';
    }

    if (!formData.bookingDate) newErrors.bookingDate = 'Booking Date is required';
    if (!formData.handoverDate) newErrors.handoverDate = 'Handover Date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const bookingDetails = {
        vehicleType: selectedVehicle.name,
        pricePerKm: selectedVehicle.pricePerKm,
        ...formData,
      };

      console.log('Booking Details:', bookingDetails);
      alert('Booking Successful!');
      closeModal();
    }
  };

  return (
    <div className="vehicle-category-details">
      <h1>{category.type}</h1>
      <p>{category.description}</p>
      <h2>Available Vehicles</h2>
      <div className="vehicle-list">
        {category.vehicles.map((vehicle, index) => (
          <div key={index} className="vehicle-card">
            <img src={vehicle.image} alt={`${vehicle.name} Exterior`} className="vehicle-image" />
            <h3>{vehicle.name}</h3>
            <p><strong>Price per KM:</strong> LKR {vehicle.pricePerKm}</p>
            <p><strong>Seats:</strong> {vehicle.seats}</p>
            <p><strong>AC:</strong> {vehicle.ac ? 'Yes' : 'No'}</p>
            <p><strong>Facilities:</strong></p>
            <ul className="facilities-list">
              {vehicle.facilities.map((facility, i) => (
                <li key={i}>{facility}</li>
              ))}
            </ul>
            <button className="book-now-button" onClick={() => openModal(vehicle)}>Book Now</button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Book {selectedVehicle.name}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Vehicle Type:</label>
                <input type="text" value={selectedVehicle.name} readOnly />
              </div>
              <div className="form-group">
                <label>Price Per KM:</label>
                <input type="text" value={`LKR ${selectedVehicle.pricePerKm}`} readOnly />
              </div>

              <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>Mobile:</label>
                <input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange} />
                {errors.mobile && <span className="error">{errors.mobile}</span>}
              </div>

              <div className="form-group">
                <label>Passport Number:</label>
                <input type="text" name="passportNumber" value={formData.passportNumber} onChange={handleInputChange} />
                {errors.passportNumber && <span className="error">{errors.passportNumber}</span>}
              </div>

              <div className="form-group">
                <label>Expected Days:</label>
                <input type="text" name="expectedDays" value={formData.expectedDays} onChange={handleInputChange} />
                {errors.expectedDays && <span className="error">{errors.expectedDays}</span>}
              </div>

              <div className="form-group">
              <label>Booking Date:</label>
              <input 
               type="date" 
               name="bookingDate" 
               value={formData.bookingDate} 
               min={new Date().toISOString().split('T')[0]} 
               onChange={handleInputChange} 
              />
               {errors.bookingDate && <span className="error">{errors.bookingDate}</span>}
          </div>

           <div className="form-group">
           <label>Handover Date:</label>
            <input 
            type="date" 
            name="handoverDate" 
            value={formData.handoverDate} 
            min={new Date().toISOString().split('T')[0]} 
           onChange={handleInputChange} 
           />
            {errors.handoverDate && <span className="error">{errors.handoverDate}</span>}
         </div>

              <div className="form-buttons">
                <button type="button" onClick={closeModal}>Cancel</button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default VehicleCategory;
