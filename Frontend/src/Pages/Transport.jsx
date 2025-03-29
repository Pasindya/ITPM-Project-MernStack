import React from 'react';
import { useNavigate } from 'react-router-dom';

function Transport() {
  const navigate = useNavigate();

  // Enhanced vehicle categories with better images and details
  const vehicleCategories = [
    {
      id: 1,
      type: 'Premium Cars',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Luxury and comfort for your personal travel with premium amenities',
      icon: '🚗',
      color: '#4ECDC4',
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
          image: '/Images/Transport/prius.jpg',
          seats: 5,
          ac: true,
          facilities: ['Hybrid Engine', 'Eco-Friendly', 'Touchscreen Display', 'Air Conditioning']
        },
        {
          name: 'Hybrid Car', 
          pricePerKm: 150, 
          image: '/Images/Transport/hybrid.jpg',
          seats: 5,
          ac: true,
          facilities: ['Fuel Efficient', 'Regenerative Braking', 'Advanced Safety Features', 'Air Conditioning']
        },
        { 
          name: 'Wagoner Car', 
          pricePerKm: 110, 
          image: '/Images/Transport/wagonr.jpg',
          seats: 7,
          ac: true,
          facilities: ['Spacious Interior', 'All-Wheel Drive', 'Roof Rack', 'Air Conditioning']
        },
      ],

    },
    {
      id: 2,
      type: 'Vans & Shuttles',
      image: '/Images/Transport/van2.jpg',
      description: 'Spacious vehicles perfect for group travel and airport transfers',
      icon: '🚐',
      color: '#FF6B6B',
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
      type: 'Buses & Coaches',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Comfortable transportation for large groups and corporate events',
      icon: '🚌',
      color: '#45B7D1',
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
      type: 'Eco Rides',
      image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Environmentally friendly options for city exploration',
      icon: '🚲',
      color: '#A5D6A7',
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
          image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
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
      type: 'Adventure Rides',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Rugged vehicles for off-road adventures and safari tours',
      icon: '🚙',
      color: '#FFD166',
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
  

  const handleViewMore = (category) => {
    navigate(`/vehicles/${category.type.toLowerCase().replace(/\s+/g, '-')}`, { 
      state: { 
        category,
        vehicles: category.vehicles 
      } 
    });
  };

  return (
    <div style={styles.pageContainer}>
      {/* Parallax Background */}
      <div style={styles.parallaxBackground}></div>
      
      {/* Main Content */}
      <div style={styles.contentContainer}>
        {/* Animated Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            <span style={styles.titleHighlight}>Premium</span> Transport Solutions
          </h1>
          <p style={styles.subtitle}>
            Select from our curated collection of vehicles for every travel need
          </p>
          <div style={styles.headerDivider}></div>
        </div>

        {/* Vehicle Categories Grid */}
        <div style={styles.gridContainer}>
          {vehicleCategories.map((category) => (
            <div 
              key={category.id} 
              style={{...styles.card, borderTop: `5px solid ${category.color}`}}
              className="vehicle-card"
            >
              <div style={styles.cardIcon} className="card-icon">
                <span style={{ fontSize: '2.5rem' }}>{category.icon}</span>
              </div>
              
              {/* Card Image with Gradient Overlay */}
              <div style={styles.cardImageContainer}>
                <img 
                  src={category.image} 
                  alt={category.type} 
                  style={styles.cardImage}
                  className="card-image"
                />
                <div style={{...styles.imageOverlay, background: `linear-gradient(to top, ${category.color} 0%, transparent 100%)`}}></div>
              </div>
              
              {/* Card Content */}
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{category.type}</h3>
                <p style={styles.cardDescription}>{category.description}</p>
                
                {/* Facilities Preview */}
                <div style={styles.facilitiesPreview}>
                  {category.vehicles[0].facilities.slice(0, 3).map((facility, index) => (
                    <span key={index} style={styles.facilityTag}>
                      {facility}
                    </span>
                  ))}
                  {category.vehicles[0].facilities.length > 3 && (
                    <span style={styles.moreFacilities}>+{category.vehicles[0].facilities.length - 3} more</span>
                  )}
                </div>
                
                <button 
                  style={{...styles.viewButton, 
                    background: `linear-gradient(135deg, ${category.color} 0%, ${darkenColor(category.color, 20)} 100%)`,
                    boxShadow: `0 4px 15px ${transparentize(category.color, 0.4)}`
                  }}
                  onClick={() => handleViewMore(category)}
                  className="view-button"
                >
                  Explore {category.type}
                  <span style={styles.buttonArrow}>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
}

// Helper functions for color manipulation
function darkenColor(color, percent) {
  // Implementation for darkening colors
  return color; // Simplified for example
}

function transparentize(color, alpha) {
  // Implementation for adding transparency
  return color; // Simplified for example
}

// Enhanced Styles with modern UI elements
const styles = {
  pageContainer: {
    position: 'relative',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    overflow: 'hidden',
    fontFamily: "'Poppins', sans-serif",
  },
  parallaxBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '400px',
    background: 'linear-gradient(135deg, #4ECDC4 0%, #45B7D1 50%, #FF6B6B 100%)',
    zIndex: 0,
    transform: 'skewY(-4deg)',
    transformOrigin: 'top left',
    marginTop: '-100px',
    height: '500px',
    backgroundSize: '400% 400%',
    animation: 'gradientShift 15s ease infinite',
  },
  contentContainer: {
    position: 'relative',
    zIndex: 1,
    padding: '60px 20px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px',
    color: '#fff',
    animation: 'fadeInDown 0.8s ease-out',
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: '800',
    marginBottom: '15px',
    textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
    background: 'linear-gradient(90deg, #fff, #FFD166)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  titleHighlight: {
    fontWeight: '900',
  },
  subtitle: {
    fontSize: '1.3rem',
    maxWidth: '700px',
    margin: '0 auto 25px',
    opacity: 0.9,
    lineHeight: '1.6',
  },
  headerDivider: {
    width: '120px',
    height: '5px',
    background: '#FFD166',
    margin: '25px auto',
    borderRadius: '3px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
    marginBottom: '80px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.12)',
    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
    cursor: 'pointer',
    position: 'relative',
  },
  cardIcon: {
    position: 'absolute',
    top: '25px',
    right: '25px',
    zIndex: 3,
    backgroundColor: 'rgba(255,255,255,0.95)',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
    transition: 'all 0.4s ease',
  },
  cardImageContainer: {
    position: 'relative',
    width: '100%',
    height: '220px',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.8s ease',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.7,
    transition: 'opacity 0.4s ease',
  },
  cardContent: {
    padding: '30px',
  },
  cardTitle: {
    fontSize: '1.8rem',
    margin: '0 0 15px',
    color: '#333',
    fontWeight: '700',
  },
  cardDescription: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '20px',
    lineHeight: '1.6',
    minHeight: '60px',
  },
  facilitiesPreview: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '25px',
  },
  facilityTag: {
    backgroundColor: '#f5f5f5',
    color: '#555',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '500',
  },
  moreFacilities: {
    color: '#888',
    fontSize: '0.75rem',
    alignSelf: 'center',
    marginLeft: '5px',
  },
  viewButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '15px 25px',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  buttonArrow: {
    fontSize: '1.3rem',
    transition: 'transform 0.3s ease',
  },
  ctaContainer: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '60px 40px',
    textAlign: 'center',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
    marginTop: '40px',
    backgroundImage: 'linear-gradient(135deg, rgba(44, 62, 80, 0.03) 0%, rgba(255, 255, 255, 0.1) 100%)',
    border: '1px solid rgba(0,0,0,0.05)',
  },
  ctaContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  ctaTitle: {
    fontSize: '2.3rem',
    color: '#2C3E50',
    marginBottom: '20px',
    fontWeight: '700',
    background: 'linear-gradient(90deg, #2C3E50, #4CA1AF)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  ctaText: {
    fontSize: '1.2rem',
    color: '#666',
    maxWidth: '600px',
    margin: '0 auto 30px',
    lineHeight: '1.7',
  },
  ctaButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  primaryCtaButton: {
    backgroundColor: '#4ECDC4',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '18px 35px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 5px 15px rgba(78, 205, 196, 0.4)',
    display: 'flex',
    alignItems: 'center',
  },
  secondaryCtaButton: {
    backgroundColor: '#fff',
    color: '#2C3E50',
    border: '2px solid #2C3E50',
    borderRadius: '8px',
    padding: '18px 35px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
  },
};

// Enhanced Global Styles with more animations
const globalStyles = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  .vehicle-card:hover {
    transform: translateY(-15px) !important;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15) !important;
  }

  .vehicle-card:hover .card-icon {
    transform: scale(1.15) rotate(15deg) !important;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
  }

  .vehicle-card:hover .card-image {
    transform: scale(1.1) !important;
  }

  .vehicle-card:hover .image-overlay {
    opacity: 0.5 !important;
  }

  .vehicle-card:hover .view-button {
    transform: translateX(8px) !important;
  }

  .vehicle-card:hover .button-arrow {
    transform: translateX(8px) !important;
  }

  .primaryCtaButton:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 8px 20px rgba(78, 205, 196, 0.6) !important;
  }

  .secondaryCtaButton:hover {
    background-color: #2C3E50 !important;
    color: #fff !important;
    transform: translateY(-3px) !important;
  }
`;

// Add the global styles to your document head
const styleElement = document.createElement('style');
styleElement.innerHTML = globalStyles;
document.head.appendChild(styleElement);

export default Transport;