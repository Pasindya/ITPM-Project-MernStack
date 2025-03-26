import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Transport() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Mock data for vehicle categories
  const vehicleCategories = [
    {
      id: 1,
      type: 'Cars',
      image: '/Images/Transport/car1.jpg', // Replace with your image path
      description: 'Explore our collection of stylish and comfortable cars for your travel needs.',
      vehicles: [
        { 
          name: 'Hatchback', 
          pricePerKm: 130, 
          image: '/Images/Transport/Hatchback.jpg',
          seats: 5,
          ac: true,
          facilities: ['Bluetooth', 'USB Charger', 'GPS Navigation', 'Air Conditioning']
        },
        { 
          name: 'Sedan', 
          pricePerKm: 120, 
          image: '/Images/Transport/Sedan.jpg',
          seats: 4,
          ac: true,
          facilities: ['Leather Seats', 'Sunroof', 'Climate Control', 'Air Conditioning']
        },
        { 
          name: 'Aqua', 
          pricePerKm: 110, 
          image: '/Images/Transport/aqua.jpg',
          seats: 4,
          ac: true,
          facilities: ['Massage Seats', 'Premium Sound System', 'Wi-Fi', 'Air Conditioning']
        },
        { 
          name: 'Prius', 
          pricePerKm: 140, 
          image: '/Images/Transport/prius.jpg', // Replace with the correct image path
          seats: 5,
          ac: true,
          facilities: ['Hybrid Engine', 'Eco-Friendly', 'Touchscreen Display', 'Air Conditioning']
        },
        {
          name: 'Hybrid Car', 
          pricePerKm: 150, 
          image: '/Images/Transport/hybrid.jpg', // Replace with the correct image path
          seats: 5,
          ac: true,
          facilities: ['Fuel Efficient', 'Regenerative Braking', 'Advanced Safety Features', 'Air Conditioning']
        },
        { 
          name: 'Wagoner Car', 
          pricePerKm: 110, 
          image: '/Images/Transport/wagonr.jpg', // Replace with the correct image path
          seats: 7,
          ac: true,
          facilities: ['Spacious Interior', 'All-Wheel Drive', 'Roof Rack', 'Air Conditioning']
        },
      ],
    },
    {
      id: 2,
      type: 'Vans',
      image: '/Images/Transport/van1.jpg', // Replace with your image path
      description: 'Perfect for group travel or transporting goods with ample space and comfort.',
      vehicles: [
        { 
          name: 'Standard Van', 
          pricePerKm: 100, 
          image: '/Images/Transport/van.jpg',
          seats: 8,
          ac: true,
          facilities: ['Rear AC Vents', 'Cup Holders', 'Spacious Interior', 'Air Conditioning']
        },
        { 
          name: 'Luxury Van', 
          pricePerKm: 200, 
          image: '/Images/Transport/luxuryvan.jpg',
          seats: 6,
          ac: true,
          facilities: ['Reclining Seats', 'Entertainment System', 'Mini Fridge', 'Air Conditioning']
        },
      ],
    },
    {
      id: 3,
      type: 'Buses',
      image: '/Images/Transport/bus1.jpg', // Replace with your image path
      description: 'Ideal for large groups and long-distance travel with onboard amenities.',
      vehicles: [
        { 
          name: 'Mini Bus', 
          pricePerKm: 120, 
          image: '/Images/Transport/mini.jpg',
          seats: 20,
          ac: true,
          facilities: ['Reclining Seats', 'Overhead Storage', 'Air Conditioning']
        },
        { 
          name: 'Tourist Coach Bus', 
          pricePerKm: 200, 
          image: '/Images/Transport/coach bus.jpg',
          seats: 50,
          ac: true,
          facilities: ['Wi-Fi', 'Entertainment System','Air Conditioning']
        },
      ],
    },
    {
      id: 4,
      type: 'Eco-Friendly',
      image: '/Images/Transport/eco.jpg', // Replace with your image path
      description: 'Environmentally friendly vehicles for short-distance travel and city commutes.',
      vehicles: [
        { 
          name: 'Scooter', 
          pricePerKm: 70, 
          image: '/Images/Transport/scooter.jpg',
          seats: 2,
          ac: false,
          facilities: ['Lightweight', 'Eco-Friendly', 'USB Charger']
        },
        { 
          name: 'Motor Bicycle', 
          pricePerKm: 80, 
          image: '/Images/Transport/motorbick.jpg',
          seats: 2,
          ac: false,
          facilities: ['Fuel Efficient', 'Compact Design', 'USB Charger']
        },
        { 
          name: 'Tuk Tuk Wheel', 
          pricePerKm: 90, 
          image: '/Images/Transport/tuk tuk.jpg',
          seats: 3,
          ac: false,
          facilities: ['Open Air Design', 'Affordable', 'Easy to Maneuver']
        },
        { 
          name: 'Bicycle Ride', 
          pricePerKm: 50, 
          image: '/Images/Transport/footcycle.jpg',
          seats: 1,
          facilities: ['Eco-Friendly Transportation','Helmet Provided',
            'Basket for Storage',
            'Adjustable Seat Height',
            'Lightweight Design']
        },
      ],
    },
    {
      id: 5,
      type: 'Off-Road',
      image: '/Images/Transport/jeep1.jpg', // Replace with your image path
      description: 'Built for adventure with powerful engines and 4x4 capabilities.',
      vehicles: [
        { 
          name: 'Jeep', 
          pricePerKm: 150, 
          image: '/Images/Transport/jeep.jpg',
          seats: 5,
          ac: true,
          facilities: ['4x4 Drive', 'Roof Rack', 'Air Conditioning']
        },
        { 
          name: '4x4 SUV', 
          pricePerKm: 180, 
          image: '/Images/Transport/suv.jpg',
          seats: 7,
          ac: true,
          facilities: ['All-Terrain Tires', 'Sunroof', 'Air Conditioning']
        },
      ],
    },
  ];

  // Function to handle "View More" button click
  const handleViewMore = (category) => {
    console.log('View More clicked for:', category.type); // Debugging
    navigate(`/vehicles/${category.type.toLowerCase()}`, { state: { category } }); // Navigate to the details page
  };

  return (
    <div style={styles.transportContainer}>
      <h1 style={styles.transportTitle}>Explore Our Vehicle Categories</h1>
      <p style={styles.transportSubtitle}>Choose from a wide range of vehicle types for your travel needs.</p>

      {/* Vehicle Categories Grid */}
      <div style={styles.vehicleCategoriesGrid}>
        {vehicleCategories.map((category) => (
          <div key={category.id} style={styles.vehicleCategoryCard}>
            {/* Vehicle Category Image */}
            <div style={styles.imageContainer}>
              <img src={category.image} alt={category.type} style={styles.vehicleCategoryImage} />
            </div>
            {/* Vehicle Category Details */}
            <h2 style={styles.vehicleCategoryType}>{category.type}</h2>
            <p style={styles.vehicleCategoryDescription}>{category.description}</p>
            {/* View More Button */}
            <button
              style={styles.viewMoreButton}
              onClick={() => handleViewMore(category)}
            >
              View More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Inline CSS styles
const styles = {
  transportContainer: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  transportTitle: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '10px',
  },
  transportSubtitle: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '30px',
  },
  vehicleCategoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    padding: '0 20px',
  },
  vehicleCategoryCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-10px)',
    },
  },
  imageContainer: {
    width: '100%',
    height: '200px',
    overflow: 'hidden',
  },
  vehicleCategoryImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  vehicleCategoryType: {
    fontSize: '1.8rem',
    color: '#333',
    margin: '15px 0 10px',
  },
  vehicleCategoryDescription: {
    fontSize: '1rem',
    color: '#666',
    padding: '0 15px',
    marginBottom: '20px',
  },
  viewMoreButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginBottom: '20px',
    ':hover': {
      backgroundColor: '#0056b3',
    },
  },
};

export default Transport;