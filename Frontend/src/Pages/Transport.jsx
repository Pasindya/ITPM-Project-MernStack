import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import '../CSS/Transport.css'; // Import the CSS file

// Mock data for vehicle types and details
const vehicles = [
  {
    id: 1,
    type: "Hatchback",
    capacity: 4,
    pricePerKm: 130,
    description: "Compact and stylish, perfect for city travel.",
    image: "/Images/Transport/Hatchback.jpg",
    category: "Car",
  },
  {
    id: 2,
    type: "Sedan",
    pricePerKm: 110,
    description: "The Sedan offers a smooth and luxurious ride, making it perfect for family trips or business travel. With ample trunk space and advanced safety features, it’s a reliable choice for long journeys.",
    image: "Images/Transport/Sedan.jpg",
    category: "Car",
  },
  {
    id: 3,
    type: "Van",
    pricePerKm: 100,
    description: "The Van is a versatile vehicle, ideal for group travel or transporting goods. With seating for up to 8 people, it combines comfort and functionality for all your needs.",
    image: "/Images/Transport/van.jpg",
    category: "Van",
  },
  {
    id: 4,
    type: "Luxury Van",
    pricePerKm: 200,
    description: "Experience premium comfort with the Luxury Van. Designed for business executives and special occasions, it offers leather seats, climate control, and a smooth ride.",
    image: "/Images/Transport/luxuryvan.jpg",
    category: "Van",
  },
  {
    id: 5,
    type: "Mini Bus",
    pricePerKm: 120,
    description: "The Mini Bus is perfect for small group tours and events. With seating for 10-15 people, it ensures a comfortable and efficient journey for all passengers.",
    image: "/Images/Transport/mini.jpg",
    category: "Bus",
  },
  {
    id: 6,
    type: "Tourist Coach Bus",
    pricePerKm: 200,
    description: "The Tourist Coach Bus is designed for large groups and long-distance travel. With onboard amenities and comfortable seating, it’s perfect for sightseeing tours.",
    image: "/Images/Transport/coach bus.jpg",
    category: "Bus",
  },
  {
    id: 7,
    type: "Jeep",
    pricePerKm: 150,
    description: "The Jeep is built for off-road adventures. With its powerful engine and 4x4 capabilities, it’s perfect for exploring mountains, forests, and deserts.",
    image: "/Images/Transport/jeep.jpg",
    category: "Off-Road",
  },
  {
    id: 8,
    type: "Tuk-Tuk Wheel",
    pricePerKm: 90,
    description: "The Tuk-Tuk Wheel is a compact and eco-friendly vehicle, perfect for short-distance travel and city commutes. It’s easy to park and navigate through busy streets.",
    image: "/Images/Transport/tuk tuk.jpg",
    category: "Eco-Friendly",
  },
  {
    id: 9,
    type: "Motor Bicycle",
    pricePerKm: 80,
    description: "The Motor Bicycle is an affordable and efficient option for short trips. With excellent fuel efficiency, it’s perfect for navigating through traffic.",
    image: "/Images/Transport/motorbick.jpg",
    category: "Eco-Friendly",
  },
  {
    id: 10,
    type: "Scooter",
    pricePerKm: 70,
    description: "The Scooter is lightweight and nimble, ideal for quick trips and city travel. It’s affordable, easy to ride, and perfect for urban commuters.",
    image: "/Images/Transport/scooter.jpg",
    category: "Eco-Friendly",
  },
];

// Google Maps configuration
const mapContainerStyle = {
  width: '100%',
  height: '300px',
};

const center = {
  lat: 6.9271, // Default center (Sri Lanka)
  lng: 79.8612,
};

function Transport() {
  const [selectedVehicle, setSelectedVehicle] = useState(null); // State for selected vehicle
  const [showForm, setShowForm] = useState(false); // State to show/hide the form
  const [capacity, setCapacity] = useState(""); // State for capacity
  const [expectedDays, setExpectedDays] = useState(1); // State for expected days
  const [travelLocation, setTravelLocation] = useState(""); // State for travel location
  const [locationKm, setLocationKm] = useState(0); // State for distance in KM
  const [fullPayment, setFullPayment] = useState(0); // State for full payment
  const [selectedPlace, setSelectedPlace] = useState(null); // State for selected place from Google Maps
  const [autocomplete, setAutocomplete] = useState(null); // State for Autocomplete object


  // Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCmNOof0mw0PTzyrTsSbBre7gp82YMUdMA', // Replace with your API key
    libraries: ['places'],
  });

  // Function to handle "Hire Now" button click
  const handleHireNow = (vehicle) => {
    setSelectedVehicle(vehicle); // Set the selected vehicle
    setShowForm(true); // Show the form
  };

  // Function to calculate full payment
  const calculateFullPayment = (km) => {
    if (selectedVehicle) {
      const payment = selectedVehicle.pricePerKm * km;
      setFullPayment(payment);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking confirmed for ${selectedVehicle.type}. Total Payment: LKR ${fullPayment}`);
    setShowForm(false); // Hide the form after submission
  };

  // Function to close the form
  const handleCloseForm = () => {
    setShowForm(false); // Hide the form
  };





  
  // Function to handle place selection in Autocomplete
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setSelectedPlace(place);
      setTravelLocation(place.formatted_address || '');
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  // Function to load Autocomplete
  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="transport-container">
      <h1 className="transport-title">Explore Our Fleet of Vehicles</h1>

      {/* Vehicle Grid */}
      <div className="vehicle-grid">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="vehicle-card" style={{ backgroundColor: "#fff" }} // White card background
          >
            {/* Vehicle Image */}
            <div className="image-container">
              <img
                src={vehicle.image}
                alt={vehicle.type}
                className="vehicle-image"
              />
            </div>
            {/* Vehicle Details */}
            <h2>{vehicle.type}</h2>
            <p className="price-text">
              <strong>Price per KM:</strong> LKR {vehicle.pricePerKm}
            </p>
            {/* Description */}
            <p className="description-text">{vehicle.description}</p>
            {/* Hire Now Button */}
            <button
              onClick={() => handleHireNow(vehicle)}
              className="hire-button"
            >
              Hire Now
            </button>
          </div>
        ))}
      </div>

      {/* Hire Now Form */}
      {showForm && selectedVehicle && (
        <div className="form-overlay">
          <div className="hire-form">
            <h2>Book {selectedVehicle.type}</h2>
            <button className="close-button" onClick={handleCloseForm}>
              ×</button>

            <form onSubmit={handleSubmit}>
              {/* Vehicle Details */}
              <div className="form-group">
                <label>Vehicle Type:</label>
                <input type="text" value={selectedVehicle.type} readOnly />
              </div>

              <div className="form-group">
                <label>Capacity:</label>
                <input
                  type="number"
                  placeholder="Enter capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Price per KM:</label>
                <input type="text" value={`LKR ${selectedVehicle.pricePerKm}`} readOnly />
              </div>

              {/* Expected Days */}
              <div className="form-group">
                <label>Expected Days:</label>
                <input
                  type="number"
                  placeholder="Enter expected days"
                  value={expectedDays}
                  onChange={(e) => setExpectedDays(e.target.value)}
                  required
                />
              </div>

              {/* Travel Location */}
              <div className="form-group">
                <label>Travel Location:</label>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                  <input
                    type="text"
                    placeholder="Enter travel location"
                    value={travelLocation}
                    onChange={(e) => setTravelLocation(e.target.value)}
                    required
                  />
                </Autocomplete>
              </div>

              {/* Google Map */}
              <div className="form-group">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={10}
                  center={center}
                >
                  {selectedPlace && <Marker position={selectedPlace.geometry.location} />}
                </GoogleMap>
              </div>

              {/* Distance in KM */}
              <div className="form-group">
                <label>Distance (KM):</label>
                <input
                  type="number"
                  placeholder="Enter distance in KM"
                  value={locationKm}
                  onChange={(e) => {
                    setLocationKm(e.target.value);
                    calculateFullPayment(e.target.value);
                  }}
                  required
                />
              </div>

              {/* Full Payment */}
              <div className="form-group">
                <label>Full Payment:</label>
                <input type="text" value={`LKR ${fullPayment}`} readOnly />
              </div>

              {/* Submit Button */}
              <button type="submit" className="hire-button">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transport;

