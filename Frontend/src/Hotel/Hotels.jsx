import React, { useState } from 'react';

function Hotels() {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '1',
    name: '',
    email: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState({
    checkIn: '',
    checkOut: '',
    name: '',
    email: '',
    phone: '',
    submit: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample hotel data
  const hotels = [
    {
      id: 1,
      name: "Cinnamon Grand Colombo",
      location: "Colombo",
      price: 250,
      rating: 4.8,
      image: "/HotelImages/cinnomon.jpg",
      description: "Luxury 5-star hotel in the heart of Colombo with ocean views.",
      contact: "+94112437437",
      amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Bar"],
      rooms: ["Deluxe Room", "Executive Suite", "Ocean View"],
      policies: ["Check-in: 2PM", "Check-out: 12PM", "Free cancellation"]
    },
    {
      id: 2,
      name: "Heritance Kandalama",
      location: "Dambulla",
      price: 180,
      rating: 4.7,
      image: "/HotelImages/kanda.jpg",
      description: "Eco-friendly luxury hotel designed by Geoffrey Bawa, blending with nature near Sigiriya.",
      contact: "+94662234121",
      amenities: ["Infinity Pool", "Ayurveda Spa", "3 Restaurants", "Eco Tours", "Free WiFi"],
      rooms: ["Superior Room", "Deluxe Room", "Suite"],
      policies: ["Check-in: 2PM", "Check-out: 12PM", "Pets not allowed"]
    },
    {
      id: 3,
      name: "The Fortress Resort & Spa",
      location: "Galle",
      price: 220,
      rating: 4.9,
      image: "/HotelImages/fortress.jpg",
      description: "Luxurious beachfront resort with colonial Dutch architecture near Galle Fort.",
      contact: "+94912232345",
      amenities: ["Private Beach", "Spa", "Yoga Pavilion", "2 Pools", "Fine Dining"],
      rooms: ["Luxury Room", "Beach Villa", "Pool Villa"],
      policies: ["Check-in: 3PM", "Check-out: 11AM", "Free cancellation 48hrs prior"]
    },
    {
      id: 4,
      name: "Earl's Regency Hotel",
      location: "Kandy",
      price: 150,
      rating: 4.5,
      image: "/HotelImages/earls.jpg",
      description: "Hill country retreat with panoramic views of Kandy's mountains and Mahaweli River.",
      contact: "+94812222333",
      amenities: ["Swimming Pool", "Spa", "Gym", "Restaurant", "Conference Facilities"],
      rooms: ["Standard Room", "Superior Room", "Family Suite"],
      policies: ["Check-in: 2PM", "Check-out: 12PM", "Early check-in available"]
    },
    {
      id: 5,
      name: "Anantara Peace Haven Tangalle Resort",
      location: "Tangalle",
      price: 300,
      rating: 4.9,
      image: "/HotelImages/ananthara.jpg",
      description: "Luxurious cliff-top resort with private beach access and ocean views.",
      contact: "+94472392222",
      amenities: ["Private Beach", "Infinity Pool", "Spa", "4 Restaurants", "Kids Club"],
      rooms: ["Deluxe Room", "Ocean View Villa", "Beach Pool Villa"],
      policies: ["Check-in: 3PM", "Check-out: 12PM", "Non-refundable deposit required"]
    },
    {
      id: 6,
      name: "Uga Jungle Beach",
      location: "Trincomalee",
      price: 190,
      rating: 4.6,
      image: "/HotelImages/uga.jpg",
      description: "Secluded beachfront property nestled between jungle and ocean in northeast Sri Lanka.",
      contact: "+94262222666",
      amenities: ["Private Beach", "Pool", "Spa", "Restaurant", "Diving Center"],
      rooms: ["Jungle Chalet", "Beach Villa", "Family Suite"],
      policies: ["Check-in: 2PM", "Check-out: 11AM", "Seasonal rates apply"]
    },
    {
      id: 7,
      name: "Araliya Green Hills",
      location: "Nuwara Eliya",
      price: 120,
      rating: 4.3,
      image: "/HotelImages/araliya.jpg",
      description: "Charming colonial-style hotel in Sri Lanka's tea country with mountain views.",
      contact: "+94522222222",
      amenities: ["Indoor Pool", "Spa", "Tea Lounge", "Restaurant", "Game Room"],
      rooms: ["Standard Room", "Superior Room", "Family Room"],
      policies: ["Check-in: 2PM", "Check-out: 12PM", "Heating included"]
    },
    {
      id: 8,
      name: "Jetwing Lighthouse",
      location: "Galle",
      price: 210,
      rating: 4.7,
      image: "/HotelImages/jet.jpg",
      description: "Another Geoffrey Bawa masterpiece offering spectacular ocean views near Galle Fort.",
      contact: "+94912222222",
      amenities: ["Beach Access", "Spa", "2 Restaurants", "Pool", "Free WiFi"],
      rooms: ["Deluxe Room", "Suite", "Ocean View Room"],
      policies: ["Check-in: 2PM", "Check-out: 12PM", "Children stay free"]
    },
    {
      id: 9,
      name: "Wild Coast Tented Lodge",
      location: "Yala",
      price: 350,
      rating: 4.9,
      image: "/HotelImages/wildcost.jpg",
      description: "Luxury safari tents blending into the wilderness near Yala National Park.",
      contact: "+94772222222",
      amenities: ["Safari Tours", "Pool", "Spa", "Fine Dining", "Wildlife Viewing"],
      rooms: ["Cocoon Suite", "Family Tent", "Luxury Tent"],
      policies: ["Check-in: 2PM", "Check-out: 11AM", "Minimum stay required"]
    },
    {
      id: 10,
      name: "Shangri-La Hambantota",
      location: "Hambantota",
      price: 280,
      rating: 4.8,
      image: "/HotelImages/shangi.jpg",
      description: "Beachfront resort with extensive spa facilities and golf course access.",
      contact: "+94772223333",
      amenities: ["Private Beach", "18-hole Golf", "CHI Spa", "5 Restaurants", "Kids Club"],
      rooms: ["Deluxe Room", "Family Room", "Ocean Suite"],
      policies: ["Check-in: 3PM", "Check-out: 12PM", "Early check-in available"]
    }
  ];

  // Filter hotels based on search and filters
  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         hotel.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = priceFilter === 'all' || 
                       (priceFilter === 'low' && hotel.price < 100) ||
                       (priceFilter === 'medium' && hotel.price >= 100 && hotel.price < 200) ||
                       (priceFilter === 'high' && hotel.price >= 200);
    const matchesLocation = locationFilter === 'all' || hotel.location === locationFilter;
    
    return matchesSearch && matchesPrice && matchesLocation;
  });

  // Get unique locations for filter
  const locations = [...new Set(hotels.map(hotel => hotel.location))];

  // Handle book now click
  const handleBookNow = (hotel) => {
    setSelectedHotel(hotel);
    setShowBookingForm(true);
    setFormData({
      checkIn: '',
      checkOut: '',
      guests: '1',
      name: '',
      email: '',
      phone: ''
    });
    setFormErrors({});
    setSubmitSuccess(false);
  };

  // Handle view details click
  const handleViewDetails = (hotel) => {
    setSelectedHotel(hotel);
    setShowDetailsModal(true);
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    const today = new Date().toISOString().split('T')[0];
    
    if (!formData.checkIn) {
      errors.checkIn = 'Check-in date is required';
    } else if (formData.checkIn < today) {
      errors.checkIn = 'Check-in date must be in the future';
    }
    
    if (!formData.checkOut) {
      errors.checkOut = 'Check-out date is required';
    } else if (formData.checkOut < formData.checkIn) {
      errors.checkOut = 'Check-out date must be after check-in date';
    }
    
    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      errors.name = 'Name should contain only letters and spaces';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@(gmail|yahoo)\.com$/.test(formData.email)) {
      errors.email = 'Please enter a valid @gmail.com or @yahoo.com email';
    }
    
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission with backend connection
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setFormErrors(prev => ({...prev, submit: ''}));

    try {
      const bookingData = {
        hotelName: selectedHotel.name,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: parseInt(formData.guests),
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      };

      const response = await fetch('http://localhost:5000/hbookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Booking failed');
      }

      const result = await response.json();
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setShowBookingForm(false);
        setFormData({
          checkIn: '',
          checkOut: '',
          guests: '1',
          name: '',
          email: '',
          phone: ''
        });
      }, 2000);

    } catch (error) {
      console.error('Booking error:', error);
      setFormErrors(prev => ({
        ...prev,
        submit: error.message || 'Failed to submit booking. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const phoneValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({
        ...prev,
        [name]: phoneValue
      }));
    } else if (name === 'name') {
      const nameValue = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: nameValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Date calculations for min dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const minCheckOutDate = formData.checkIn 
    ? new Date(new Date(formData.checkIn).getTime() + 86400000).toISOString().split('T')[0]
    : minDate;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Discover Sri Lankan Hospitality</h1>
      
      {/* Search and Filters */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search hotels in Sri Lanka..."
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div style={styles.filterContainer}>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Price Range:</label>
            <select
              style={styles.filterSelect}
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="low">Budget (Under $100)</option>
              <option value="medium">Mid-Range ($100-$200)</option>
              <option value="high">Luxury ($200+)</option>
            </select>
          </div>
          
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Location:</label>
            <select
              style={styles.filterSelect}
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="all">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Hotel Listings */}
      <div style={styles.hotelGrid}>
        {filteredHotels.map(hotel => (
          <div key={hotel.id} style={styles.hotelCard}>
            <div style={styles.hotelImageContainer}>
              <img 
                src={hotel.image} 
                alt={hotel.name}
                style={styles.hotelImage}
              />
              <div style={styles.ratingBadge}>
                <span style={styles.starIcon}>★</span>
                {hotel.rating}
              </div>
            </div>
            <div style={styles.hotelInfo}>
              <h3 style={styles.hotelName}>{hotel.name}</h3>
              <div style={styles.locationContainer}>
                <span style={styles.locationIcon}>📍</span>
                {hotel.location}
              </div>
              <p style={styles.hotelDescription}>
                {hotel.description.length > 100 
                  ? `${hotel.description.substring(0, 100)}...` 
                  : hotel.description}
              </p>
              <div style={styles.priceContainer}>
                <div style={styles.price}>
                  ${hotel.price} <span style={styles.priceSubtext}>/ night</span>
                </div>
                <div style={styles.buttonGroup}>
                  <button 
                    onClick={() => handleViewDetails(hotel)}
                    style={styles.secondaryButton}
                  >
                    View More
                  </button>
                  <button 
                    onClick={() => handleBookNow(hotel)}
                    style={styles.primaryButton}
                  >
                    Book Now
                  </button>
                </div>
              </div>
              <div style={styles.contactContainer}>
                <span style={styles.phoneIcon}>📞</span>
                {hotel.contact}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredHotels.length === 0 && (
        <div style={styles.noResults}>
          <img 
            src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" 
            alt="No results" 
            style={styles.noResultsImage}
          />
          <h3 style={styles.noResultsText}>No hotels found</h3>
          <p style={styles.noResultsSubtext}>Try adjusting your search filters</p>
        </div>
      )}

      {/* Hotel Details Modal */}
      {showDetailsModal && selectedHotel && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button 
              onClick={() => setShowDetailsModal(false)}
              style={styles.closeButton}
            >
              ×
            </button>
            
            <div style={styles.modalInner}>
              <div style={styles.modalImageContainer}>
                <img 
                  src={selectedHotel.image} 
                  alt={selectedHotel.name}
                  style={styles.modalImage}
                />
              </div>
              <div style={styles.modalInfo}>
                <h2 style={styles.modalTitle}>{selectedHotel.name}</h2>
                <div style={styles.modalLocation}>
                  <span style={styles.locationIcon}>📍</span>
                  <span>{selectedHotel.location}</span>
                </div>
                <div style={styles.modalRating}>
                  <span style={styles.starIcon}>★</span>
                  <span>{selectedHotel.rating}</span>
                </div>
                <div style={styles.modalPrice}>
                  ${selectedHotel.price} <span style={styles.priceSubtext}>per night</span>
                </div>
                <div style={styles.modalContact}>
                  <span style={styles.phoneIcon}>📞</span>
                  {selectedHotel.contact}
                </div>
                <button 
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleBookNow(selectedHotel);
                  }}
                  style={styles.bookButton}
                >
                  Book Now
                </button>
              </div>
            </div>
            
            <div style={styles.modalSection}>
              <h3 style={styles.sectionTitle}>Description</h3>
              <p style={styles.sectionText}>{selectedHotel.description}</p>
            </div>
            
            <div style={styles.modalColumns}>
              <div style={styles.column}>
                <h3 style={styles.sectionTitle}>Amenities</h3>
                <ul style={styles.list}>
                  {selectedHotel.amenities.map((amenity, index) => (
                    <li key={index} style={styles.listItem}>{amenity}</li>
                  ))}
                </ul>
              </div>
              
              <div style={styles.column}>
                <h3 style={styles.sectionTitle}>Room Types</h3>
                <ul style={styles.list}>
                  {selectedHotel.rooms.map((room, index) => (
                    <li key={index} style={styles.listItem}>{room}</li>
                  ))}
                </ul>
              </div>
              
              <div style={styles.column}>
                <h3 style={styles.sectionTitle}>Policies</h3>
                <ul style={styles.list}>
                  {selectedHotel.policies.map((policy, index) => (
                    <li key={index} style={styles.listItem}>{policy}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Form Popup */}
      {showBookingForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.bookingForm}>
            <h2 style={styles.bookingTitle}>
              Book {selectedHotel?.name}
              <button 
                onClick={() => setShowBookingForm(false)}
                style={styles.closeButton}
              >
                ×
              </button>
            </h2>
            
            <div style={styles.bookingInfo}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Location:</span>
                <span style={styles.infoValue}>{selectedHotel?.location}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Price:</span>
                <span style={styles.priceValue}>${selectedHotel?.price}/night</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Contact:</span>
                <span style={styles.infoValue}>{selectedHotel?.contact}</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Check-In Date *</label>
                <input 
                  type="date" 
                  name="checkIn"
                  min={minDate}
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  style={{
                    ...styles.formInput,
                    borderColor: formErrors.checkIn ? '#e74c3c' : '#ddd'
                  }}
                  required
                />
                {formErrors.checkIn && (
                  <p style={styles.errorText}>{formErrors.checkIn}</p>
                )}
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Check-Out Date *</label>
                <input 
                  type="date" 
                  name="checkOut"
                  min={minCheckOutDate}
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  style={{
                    ...styles.formInput,
                    borderColor: formErrors.checkOut ? '#e74c3c' : '#ddd'
                  }}
                  required
                />
                {formErrors.checkOut && (
                  <p style={styles.errorText}>{formErrors.checkOut}</p>
                )}
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Guests *</label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  style={styles.formInput}
                  required
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5+">5+ Guests</option>
                </select>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Full Name *</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your full name (letters only)"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{
                    ...styles.formInput,
                    borderColor: formErrors.name ? '#e74c3c' : '#ddd'
                  }}
                  required
                />
                {formErrors.name && (
                  <p style={styles.errorText}>{formErrors.name}</p>
                )}
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Email *</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your @gmail.com or @yahoo.com email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    ...styles.formInput,
                    borderColor: formErrors.email ? '#e74c3c' : '#ddd'
                  }}
                  required
                />
                {formErrors.email && (
                  <p style={styles.errorText}>{formErrors.email}</p>
                )}
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Your 10-digit phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{
                    ...styles.formInput,
                    borderColor: formErrors.phone ? '#e74c3c' : '#ddd'
                  }}
                  required
                />
                {formErrors.phone && (
                  <p style={styles.errorText}>{formErrors.phone}</p>
                )}
              </div>
              
              {formErrors.submit && (
                <div style={styles.submitError}>
                  {formErrors.submit}
                </div>
              )}
              
              {submitSuccess ? (
                <div style={styles.successMessage}>
                  Booking submitted successfully!
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    ...styles.submitButton,
                    backgroundColor: isSubmitting ? '#95a5a6' : '#2ecc71',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    ':hover': {
                      backgroundColor: isSubmitting ? '#95a5a6' : '#27ae60'
                    }
                  }}
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles object
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'Poppins', sans-serif",
    background: '#f9f9f9',
    minHeight: '100vh'
  },
  heading: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '30px',
    fontSize: '2.5rem',
    background: 'linear-gradient(to right, #3498db, #2ecc71)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '30px',
    padding: '25px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  searchInput: {
    padding: '12px 15px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    outline: 'none'
  },
  filterContainer: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  },
  filterGroup: {
    flex: 1,
    minWidth: '200px'
  },
  filterLabel: {
    display: 'block',
    marginBottom: '8px',
    color: '#2c3e50',
    fontWeight: '500'
  },
  filterSelect: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    cursor: 'pointer'
  },
  hotelGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '25px',
    marginBottom: '30px'
  },
  hotelCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    backgroundColor: 'white',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
    }
  },
  hotelImageContainer: {
    position: 'relative'
  },
  hotelImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  ratingBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center'
  },
  starIcon: {
    color: '#f1c40f',
    marginRight: '5px'
  },
  hotelInfo: {
    padding: '20px'
  },
  hotelName: {
    margin: '0 0 10px',
    color: '#2c3e50',
    fontSize: '1.3rem'
  },
  locationContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    color: '#7f8c8d'
  },
  locationIcon: {
    marginRight: '5px'
  },
  hotelDescription: {
    margin: '0 0 15px',
    color: '#34495e',
    fontSize: '14px',
    lineHeight: '1.5'
  },
  priceContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  price: {
    fontWeight: 'bold',
    color: '#e74c3c',
    fontSize: '1.2rem'
  },
  priceSubtext: {
    fontWeight: 'normal',
    color: '#95a5a6',
    fontSize: '0.9rem'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px'
  },
  primaryButton: {
    padding: '8px 15px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#2980b9'
    }
  },
  secondaryButton: {
    padding: '8px 15px',
    backgroundColor: '#f9f9f9',
    color: '#3498db',
    border: '1px solid #3498db',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s',
    ':hover': {
      backgroundColor: '#3498db',
      color: 'white'
    }
  },
  contactContainer: {
    marginTop: '15px',
    paddingTop: '15px',
    borderTop: '1px solid #eee',
    display: 'flex',
    alignItems: 'center',
    color: '#3498db'
  },
  phoneIcon: {
    marginRight: '8px'
  },
  noResults: {
    gridColumn: '1/-1',
    textAlign: 'center',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
  },
  noResultsImage: {
    width: '100px',
    opacity: '0.6',
    marginBottom: '20px'
  },
  noResultsText: {
    color: '#7f8c8d',
    marginBottom: '10px'
  },
  noResultsSubtext: {
    color: '#bdc3c7'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    position: 'relative'
  },
  bookingForm: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
  },
  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#7f8c8d'
  },
  modalInner: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  },
  modalImageContainer: {
    flex: '1',
    minWidth: '300px'
  },
  modalImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    objectFit: 'cover'
  },
  modalInfo: {
    flex: '1',
    minWidth: '300px'
  },
  modalTitle: {
    marginTop: 0,
    color: '#2c3e50'
  },
  modalLocation: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px'
  },
  modalRating: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    padding: '5px 10px',
    borderRadius: '20px',
    marginBottom: '15px'
  },
  modalPrice: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: '15px'
  },
  modalContact: {
    marginBottom: '15px'
  },
  bookButton: {
    padding: '10px 20px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#27ae60'
    }
  },
  modalSection: {
    marginTop: '20px'
  },
  sectionTitle: {
    color: '#2c3e50',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px'
  },
  sectionText: {
    color: '#34495e',
    lineHeight: '1.6'
  },
  modalColumns: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px'
  },
  column: {
    flex: '1',
    minWidth: '250px'
  },
  list: {
    paddingLeft: '20px',
    color: '#34495e'
  },
  listItem: {
    marginBottom: '8px'
  },
  bookingTitle: {
    marginTop: 0,
    color: '#2c3e50',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bookingInfo: {
    marginBottom: '20px'
  },
  infoRow: {
    display: 'flex',
    marginBottom: '10px'
  },
  infoLabel: {
    flex: 1,
    color: '#7f8c8d'
  },
  infoValue: {
    flex: 2,
    fontWeight: '500'
  },
  priceValue: {
    flex: 2,
    fontWeight: '500',
    color: '#e74c3c'
  },
  formGroup: {
    marginBottom: '15px'
  },
  formLabel: {
    display: 'block',
    marginBottom: '5px',
    color: '#2c3e50',
    fontWeight: '500'
  },
  formInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd'
  },
  errorText: {
    color: '#e74c3c',
    fontSize: '12px',
    margin: '5px 0 0'
  },
  submitError: {
    color: '#e74c3c',
    marginBottom: '15px',
    textAlign: 'center'
  },
  successMessage: {
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#d4edda',
    color: '#155724',
    borderRadius: '5px',
    marginBottom: '15px'
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'background-color 0.3s'
  }
};

export default Hotels;