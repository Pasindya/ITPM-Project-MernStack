import React from 'react';
import "../CSS/driver.css"
function Driver() {
  // Static list of drivers (for demonstration purposes)
  const drivers = [
    {
      id: 1,
      name: 'John Doe',
      licenseNumber: 'DL123456',
      vehicleType: 'SUV',
      experience: '5 years',
      contact: 'john.doe@example.com',
    },
    {
      id: 2,
      name: 'Jane Smith',
      licenseNumber: 'DL654321',
      vehicleType: 'Sedan',
      experience: '3 years',
      contact: 'jane.smith@example.com',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      licenseNumber: 'DL987654',
      vehicleType: 'Van',
      experience: '7 years',
      contact: 'mike.johnson@example.com',
    },
  ];

  return (
    <div className="driver-page">
      <h1>Our Drivers</h1>
      <p>Meet our professional and experienced drivers!</p>

      {/* List of drivers */}
      <div className="driver-list">
        {drivers.map((driver) => (
          <div key={driver.id} className="driver-card">
            <h2>{driver.name}</h2>
            <p><strong>License Number:</strong> {driver.licenseNumber}</p>
            <p><strong>Vehicle Type:</strong> {driver.vehicleType}</p>
            <p><strong>Experience:</strong> {driver.experience}</p>
            <p><strong>Contact:</strong> {driver.contact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Driver;