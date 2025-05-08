import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Polyline, ZoomControl, ScaleControl, AttributionControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaMapMarkerAlt, FaRoute, FaStar, FaCloudSun, FaCalculator, FaTemperatureHigh, FaWind, FaCloudRain, FaCamera, FaInfoCircle, FaHeart, FaShare, FaClock, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const createCustomIcon = (type) => {
  const iconColors = {
    food: '#e74c3c',
    place: '#3498db',
    thing: '#2ecc71',
    culture: '#9b59b6',
    nature: '#27ae60',
    history: '#f39c12'
  };

  return L.divIcon({
    className: 'custom-icon',
    html: `
      <div class="marker-container">
        <div class="marker-pin" style="background-color: ${iconColors[type]}"></div>
        <div class="marker-pulse"></div>
        <div class="marker-content">
          <i class="fas ${getIconForType(type)}"></i>
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });
};

const getIconForType = (type) => {
  const icons = {
    food: 'fa-utensils',
    place: 'fa-landmark',
    thing: 'fa-hands-helping',
    culture: 'fa-theater-masks',
    nature: 'fa-mountain',
    history: 'fa-landmark'
  };
  return icons[type] || 'fa-map-marker-alt';
};

const authenticExperiences = [
  // Central Province
  { name: "Temple of the Tooth", location: "Kandy", province: "Central", type: "place", coords: [7.2939, 80.6414] },
  { name: "Kandyan Dancers", location: "Kandy", province: "Central", type: "culture", coords: [7.2939, 80.6414] },
  { name: "Ambul Thiyal", location: "Kandy", province: "Central", type: "food", coords: [7.294, 80.640] },
  { name: "Peradeniya Botanical Gardens", location: "Kandy", province: "Central", type: "nature", coords: [7.2733, 80.5957] },
  { name: "Royal Palace of Kandy", location: "Kandy", province: "Central", type: "history", coords: [7.2939, 80.6414] },

  // Western Province
  { name: "Colombo Street Food", location: "Colombo", province: "Western", type: "food", coords: [6.9271, 79.8612] },
  { name: "Gangaramaya Temple", location: "Colombo", province: "Western", type: "place", coords: [6.9157, 79.8560] },
  { name: "Beeralu Lace Making", location: "Moratuwa", province: "Western", type: "culture", coords: [6.767, 79.882] },
  { name: "Mount Lavinia Beach", location: "Colombo", province: "Western", type: "nature", coords: [6.8397, 79.8631] },
  { name: "Colombo National Museum", location: "Colombo", province: "Western", type: "history", coords: [6.9107, 79.8607] },

  // Southern Province
  { name: "Galle Fort Walk", location: "Galle", province: "Southern", type: "place", coords: [6.0273, 80.2179] },
  { name: "Kottu Roti", location: "Matara", province: "Southern", type: "food", coords: [5.9485, 80.5353] },
  { name: "Traditional Mask Making", location: "Ambalangoda", province: "Southern", type: "culture", coords: [6.2359, 80.0538] },
  { name: "Yala National Park", location: "Hambantota", province: "Southern", type: "nature", coords: [6.3054, 81.3333] },
  { name: "Mulkirigala Rock Temple", location: "Hambantota", province: "Southern", type: "history", coords: [6.1667, 80.7667] },

  // Northern Province
  { name: "Nallur Kovil", location: "Jaffna", province: "Northern", type: "place", coords: [9.6659, 80.0255] },
  { name: "Jaffna Crab Curry", location: "Jaffna", province: "Northern", type: "food", coords: [9.6685, 80.0074] },
  { name: "Palmyrah Crafts", location: "Jaffna", province: "Northern", type: "culture", coords: [9.6618, 80.0251] },
  { name: "Point Pedro Beach", location: "Jaffna", province: "Northern", type: "nature", coords: [9.8167, 80.2333] },
  { name: "Jaffna Fort", location: "Jaffna", province: "Northern", type: "history", coords: [9.6667, 80.0167] },

  // Eastern Province
  { name: "Arugam Bay Surfing", location: "Arugam Bay", province: "Eastern", type: "place", coords: [6.8431, 81.8350] },
  { name: "Batticaloa Fish Curry", location: "Batticaloa", province: "Eastern", type: "food", coords: [7.7102, 81.6924] },
  { name: "Fishing Catamaran", location: "Trincomalee", province: "Eastern", type: "culture", coords: [8.5874, 81.2152] },
  { name: "Pigeon Island", location: "Trincomalee", province: "Eastern", type: "nature", coords: [8.5833, 81.2167] },
  { name: "Koneswaram Temple", location: "Trincomalee", province: "Eastern", type: "history", coords: [8.5833, 81.2333] },

  // North Central Province
  { name: "Sigiriya Rock Fortress", location: "Sigiriya", province: "North Central", type: "place", coords: [7.9575, 80.7603] },
  { name: "Polonnaruwa Rice & Curry", location: "Polonnaruwa", province: "North Central", type: "food", coords: [7.9403, 81.0188] },
  { name: "Stone Carvings", location: "Anuradhapura", province: "North Central", type: "culture", coords: [8.3114, 80.4037] },
  { name: "Minneriya National Park", location: "Polonnaruwa", province: "North Central", type: "nature", coords: [7.9833, 80.7167] },
  { name: "Ruwanwelisaya", location: "Anuradhapura", province: "North Central", type: "history", coords: [8.3500, 80.4000] },

  // North Western Province
  { name: "Munneswaram Temple", location: "Chilaw", province: "North Western", type: "place", coords: [7.5734, 79.7946] },
  { name: "Puttalam Lagoon Crab", location: "Puttalam", province: "North Western", type: "food", coords: [8.0334, 79.8415] },
  { name: "Toddy Tapping", location: "Wennappuwa", province: "North Western", type: "culture", coords: [7.3166, 79.8582] },
  { name: "Wilpattu National Park", location: "Puttalam", province: "North Western", type: "nature", coords: [8.4500, 80.0000] },
  { name: "Yapahuwa Rock Fortress", location: "Kurunegala", province: "North Western", type: "history", coords: [7.7667, 80.3667] },

  // Uva Province
  { name: "Train to Ella", location: "Ella", province: "Uva", type: "place", coords: [6.8606, 81.0463] },
  { name: "Hoppers (Appa)", location: "Badulla", province: "Uva", type: "food", coords: [6.9897, 81.0550] },
  { name: "Tea Picking", location: "Bandarawela", province: "Uva", type: "culture", coords: [6.8296, 80.9875] },
  { name: "Horton Plains", location: "Nuwara Eliya", province: "Uva", type: "nature", coords: [6.8000, 80.8000] },
  { name: "Dowa Rock Temple", location: "Badulla", province: "Uva", type: "history", coords: [6.9833, 81.0500] },

  // Sabaragamuwa Province
  { name: "Ratnapura Gem Mines", location: "Ratnapura", province: "Sabaragamuwa", type: "place", coords: [6.6828, 80.3992] },
  { name: "Weli Thalapa", location: "Kegalle", province: "Sabaragamuwa", type: "food", coords: [7.2513, 80.3464] },
  { name: "Gem Cutting", location: "Ratnapura", province: "Sabaragamuwa", type: "culture", coords: [6.683, 80.399] },
  { name: "Sinharaja Forest", location: "Ratnapura", province: "Sabaragamuwa", type: "nature", coords: [6.4167, 80.5000] },
  { name: "Dambulla Cave Temple", location: "Kegalle", province: "Sabaragamuwa", type: "history", coords: [7.8567, 80.6492] }
];

const nationalSymbols = [
  {
    title: "National Flower",
    name: "Nil Manel (Blue Water Lily)",
    image: "/Images/national/nil.jpg",
    description: "The beautiful blue water lily was declared the national flower of Sri Lanka in 1986. It symbolizes truth, purity, and discipline in Buddhist philosophy."
  },
  {
    title: "National Gem",
    name: "Blue Sapphire",
    image: "/Images/national/manik.jpg",
    description: "Sri Lanka's blue sapphires are world-renowned for their quality. The 400-carat 'Blue Giant of the Orient' found in Sri Lanka is one of the largest sapphires ever discovered."
  },
  {
    title: "National Game",
    name: "Volleyball",
    image: "/Images/national/volley.jpg",
    description: "Volleyball was declared the national sport of Sri Lanka in 1991. The country has a strong volleyball tradition, especially in rural areas."
  },
  {
    title: "National Flag",
    name: "Lion Flag",
    image: "/Images/national/flag.jpg",
    description: "The flag features a golden lion holding a sword, representing the Sinhalese ethnicity and the nation's strength. The orange and green stripes represent Tamils and Moors."
  },
  {
    title: "National Animal",
    name: "Sri Lankan Giant Squirrel (දඬුලේනා)",
    scientific_name: "Ratufa macroura",
    image: "/Images/national/lena.jpg",
    description: "The Sri Lankan Giant Squirrel (Ratufa macroura) is a near-threatened species endemic to Sri Lanka. Known for its large size and striking color variations, it inhabits forests across the island. Due to habitat loss and hunting, conservation efforts are crucial for its survival."
  },
  {
    title: "National Tree",
    name: "Na (Ironwood)",
    image: "/Images/national/naa.jpeg",
    description: "Mesua ferrea (Na tree) was declared the national tree of Sri Lanka in 1986. Its beautiful flowers are used in traditional medicine and religious offerings."
  },
  {
    title: "National Bird",
    name: "Sri Lanka Junglefowl",
    image: "/Images/national/kukula.jpg",
    description: "The colorful Sri Lanka junglefowl (Gallus lafayettii) is endemic to the island. The male's striking plumage features red, orange, yellow, and deep blue feathers."
  },
  {
    title: "National Dance",
    name: "Kandyan Dance",
    image: "/Images/national/dance.jpg",
    description: "Kandyan dance is one of the most significant traditional dance forms in Sri Lanka. It originated in the central highlands and is characterized by elaborate costumes and rhythmic drumming."
  },
  {
    title: "National Instrument",
    name: "Geta Beraya",
    image: "/Images/national/beraya.jpg",
    description: "The Geta Beraya is a traditional drum used in Kandyan dance performances. Made from wood and animal hide, it produces deep, resonant sounds that are integral to Sri Lankan music."
  },
  {
    title: "National Costume",
    name: "Osariya",
    image: "/Images/national/osariya.jpg",
    description: "The Osariya is the traditional Kandyan saree worn by women. It features intricate designs and is typically worn for special occasions and cultural performances."
  }
];

// Weather API Configuration
const API_KEY = '2e85719828517999c1ce073d01087421';
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// Add image gallery for each experience
const experienceImages = {
  "Temple of the Tooth": [
    "/Images/national/toot2.jpg",
    "/images/experiences/temple-of-tooth-2.jpg",
    "/images/experiences/temple-of-tooth-3.jpg"
  ],
  "Kandyan Dancers": [
    "/images/experiences/kandyan-dancers-1.jpg",
    "/images/experiences/kandyan-dancers-2.jpg",
    "/images/experiences/kandyan-dancers-3.jpg"
  ],
  // Add more image arrays for other experiences...
};

// Add experience details with more information
const experienceDetails = {
  "Temple of the Tooth": {
    description: "A sacred Buddhist temple in Kandy housing the relic of the tooth of Buddha. This UNESCO World Heritage site is a must-visit for its spiritual significance and stunning architecture.",
    highlights: [
      "Evening ceremonies with drummers",
      "Ancient murals and paintings",
      "Golden roof architecture",
      "Buddhist museum"
    ],
    bestTime: "Early morning or evening",
    tips: "Dress modestly and remove shoes before entering",
    nearbyAttractions: [
      "Kandy Lake",
      "Royal Palace",
      "Peradeniya Gardens"
    ]
  },
  // Add more detailed information for other experiences...
};

// Add experience cards data
const experienceCards = {
  "Temple of the Tooth": {
    mainImage: "/Images/national/toot2.jpg",
    gallery: [
      "/Images/national/toot2.jpg",
      "/Images/national/toot2.jpg",
      "/Images/national/toot2.jpg"
    ],
    rating: 4.8,
    reviews: 1245,
    duration: "2-3 hours",
    bestTime: "Early morning or evening",
    price: "Free (Donations welcome)",
    difficulty: "Easy",
    description: "A sacred Buddhist temple in Kandy housing the relic of the tooth of Buddha. This UNESCO World Heritage site is a must-visit for its spiritual significance and stunning architecture.",
    highlights: [
      "Evening ceremonies with drummers",
      "Ancient murals and paintings",
      "Golden roof architecture",
      "Buddhist museum"
    ],
    tips: "Dress modestly and remove shoes before entering",
    nearbyAttractions: [
      "Kandy Lake",
      "Royal Palace",
      "Peradeniya Gardens"
    ]
  },
  "Kandyan Dancers": {
    mainImage: "/images/experiences/kandyan-dancers-main.jpg",
    gallery: [
      "/images/experiences/kandyan-dancers-1.jpg",
      "/images/experiences/kandyan-dancers-2.jpg",
      "/images/experiences/kandyan-dancers-3.jpg"
    ],
    rating: 4.7,
    reviews: 856,
    duration: "1-2 hours",
    bestTime: "Evening performances",
    price: "LKR 1,500",
    difficulty: "Easy",
    description: "Experience the vibrant Kandyan dance performances featuring elaborate costumes, rhythmic drumming, and traditional music. A cultural spectacle that showcases Sri Lanka's rich heritage.",
    highlights: [
      "Traditional costumes",
      "Live drumming",
      "Fire walking",
      "Cultural demonstrations"
    ],
    tips: "Book tickets in advance during peak season",
    nearbyAttractions: [
      "Kandy Cultural Center",
      "Temple of the Tooth",
      "Kandy Lake"
    ]
  },
  // Add more experience cards...
};

// Enhanced NationalSymbolsCarousel component
const NationalSymbolsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % nationalSymbols.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isHovered]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + nationalSymbols.length) % nationalSymbols.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % nationalSymbols.length);
  };

  return (
    <div 
      className="national-symbols-carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="carousel-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="carousel-slide"
          >
            <div className="carousel-content">
              <div className="carousel-image">
                <img 
                  src={nationalSymbols[currentIndex].image} 
                  alt={nationalSymbols[currentIndex].name}
                  loading="lazy"
                />
                <div className="image-overlay">
                  <span className="symbol-number">{currentIndex + 1} / {nationalSymbols.length}</span>
                </div>
              </div>
              <div className="carousel-info">
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {nationalSymbols[currentIndex].title}
                </motion.h3>
                <motion.h4
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {nationalSymbols[currentIndex].name}
                </motion.h4>
                {nationalSymbols[currentIndex].scientific_name && (
                  <motion.p
                    className="scientific-name"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {nationalSymbols[currentIndex].scientific_name}
                  </motion.p>
                )}
                <motion.p
                  className="description"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {nationalSymbols[currentIndex].description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="carousel-controls">
          <button 
            className="control-button prev"
            onClick={handlePrevious}
            aria-label="Previous symbol"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="carousel-indicators">
            {nationalSymbols.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to symbol ${index + 1}`}
              />
            ))}
          </div>
          <button 
            className="control-button next"
            onClick={handleNext}
            aria-label="Next symbol"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

// Add NationalSymbols component before the Map component
const NationalSymbols = () => {
  return (
    <div className="national-symbols-section">
      <h3>National Symbols of Sri Lanka</h3>
      <div className="symbols-grid">
        {nationalSymbols.map((symbol, index) => (
          <div key={index} className="symbol-card">
            <div className="symbol-image">
              <img src={symbol.image} alt={symbol.name} />
            </div>
            <div className="symbol-content">
              <h4>{symbol.title}</h4>
              <h5>{symbol.name}</h5>
              {symbol.scientific_name && (
                <p className="scientific-name">{symbol.scientific_name}</p>
              )}
              <p className="symbol-description">{symbol.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function Map() {
  const [activeExperience, setActiveExperience] = useState(null);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [filter, setFilter] = useState('all');
  const [provinceFilter, setProvinceFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [carouselAutoPlay, setCarouselAutoPlay] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [routePoints, setRoutePoints] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [weatherLoading, setWeatherLoading] = useState({});
  const [weatherError, setWeatherError] = useState({});
  const [showDistanceCalculator, setShowDistanceCalculator] = useState(false);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCardModal, setShowCardModal] = useState(false);
  const mapRef = useRef(null);

  const categories = {
    food: { icon: 'fa-utensils', label: 'Food & Drink' },
    place: { icon: 'fa-landmark', label: 'Places' },
    thing: { icon: 'fa-hands-helping', label: 'Activities' },
    culture: { icon: 'fa-theater-masks', label: 'Culture' },
    nature: { icon: 'fa-mountain', label: 'Nature' },
    history: { icon: 'fa-landmark', label: 'History' }
  };

  const provinces = [...new Set(authenticExperiences.map(exp => exp.province))];

  useEffect(() => {
    fetch('/sri-lanka.geojson')
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data));
  }, []);

  const filteredExperiences = authenticExperiences.filter(exp => {
    const matchesSearch = exp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         exp.location.toLowerCase().includes(searchQuery.toLowerCase());
    return (filter === 'all' || exp.type === filter) && 
           (provinceFilter === 'all' || exp.province === provinceFilter) &&
           matchesSearch;
  });

  const handleMarkerClick = (experience) => {
    setActiveExperience(experience);
    if (mapRef.current) {
      mapRef.current.flyTo(experience.coords, 12, {
        duration: 1
      });
    }
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const fetchWeather = async (coords) => {
    const key = `${coords[0]},${coords[1]}`;
    if (weatherData[key] || weatherLoading[key]) return;

    setWeatherLoading(prev => ({ ...prev, [key]: true }));
    try {
      const response = await fetch(
        `${API_URL}?lat=${coords[0]}&lon=${coords[1]}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      
      if (data.cod === '200') {
        // Process the forecast data
        const processedData = {
          current: data.list[0],
          forecast: data.list.slice(1, 6), // Next 5 forecasts (3-hour intervals)
          city: data.city
        };
        
        setWeatherData(prev => ({
          ...prev,
          [key]: processedData
        }));
      } else {
        throw new Error(data.message || 'Failed to fetch weather data');
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
      setWeatherError(prev => ({
        ...prev,
        [key]: error.message
      }));
    } finally {
      setWeatherLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  const calculateDistance = (point1, point2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (point2[0] - point1[0]) * Math.PI / 180;
    const dLon = (point2[1] - point1[1]) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1[0] * Math.PI / 180) * Math.cos(point2[0] * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const toggleFavorite = (experience) => {
    setFavorites(prev => {
      const isFavorite = prev.some(fav => fav.name === experience.name);
      if (isFavorite) {
        return prev.filter(fav => fav.name !== experience.name);
      } else {
        return [...prev, experience];
      }
    });
  };

  const addToRoute = (experience) => {
    setRoutePoints(prev => [...prev, experience.coords]);
  };

  const handlePointSelection = (experience) => {
    if (selectedPoints.length < 2) {
      setSelectedPoints(prev => [...prev, experience]);
    }
  };

  // Get weather icon based on condition
  const getWeatherIcon = (condition) => {
    const icons = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '🌨️',
      'Mist': '🌫️'
    };
    return icons[condition] || '🌡️';
  };

  // Get weather background based on condition
  const getWeatherBackground = (condition) => {
    const backgrounds = {
      'Clear': 'linear-gradient(135deg, #87CEEB, #1E90FF)',
      'Clouds': 'linear-gradient(135deg, #B0C4DE, #708090)',
      'Rain': 'linear-gradient(135deg, #4682B4, #2F4F4F)',
      'Drizzle': 'linear-gradient(135deg, #87CEEB, #4682B4)',
      'Thunderstorm': 'linear-gradient(135deg, #483D8B, #191970)',
      'Snow': 'linear-gradient(135deg, #F0F8FF, #B0C4DE)',
      'Mist': 'linear-gradient(135deg, #F5F5F5, #D3D3D3)'
    };
    return backgrounds[condition] || 'linear-gradient(135deg, #87CEEB, #1E90FF)';
  };

  // Enhanced weather display component
  const WeatherDisplay = ({ coords }) => {
    const key = `${coords[0]},${coords[1]}`;
    const weather = weatherData[key];
    const loading = weatherLoading[key];
    const error = weatherError[key];

    useEffect(() => {
      if (!weather && !loading && !error) {
        fetchWeather(coords);
      }
    }, [coords]);

    if (loading) {
      return <div className="weather-info loading">Loading weather data...</div>;
    }

    if (error) {
      return <div className="weather-info error">Weather data unavailable</div>;
    }

    if (!weather) {
      return null;
    }

    const { current, forecast, city } = weather;
    const condition = current.weather[0].main;

    return (
      <div className="weather-display" style={{ background: getWeatherBackground(condition) }}>
        <div className="weather-current">
          <div className="weather-icon">
            {getWeatherIcon(condition)}
          </div>
          <div className="weather-details">
            <h4>{city.name}</h4>
            <div className="weather-temp">
              <FaTemperatureHigh />
              <span>{Math.round(current.main.temp)}°C</span>
            </div>
            <div className="weather-wind">
              <FaWind />
              <span>{Math.round(current.wind.speed)} m/s</span>
            </div>
            {current.rain && (
              <div className="weather-rain">
                <FaCloudRain />
                <span>{current.rain['3h']}mm</span>
              </div>
            )}
          </div>
        </div>
        <div className="weather-forecast">
          {forecast.map((item, index) => (
            <div key={index} className="forecast-item">
              <div className="forecast-time">
                {new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="forecast-icon">
                {getWeatherIcon(item.weather[0].main)}
              </div>
              <div className="forecast-temp">
                {Math.round(item.main.temp)}°C
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Enhanced map controls
  const MapControls = () => (
    <div className="map-controls-overlay">
      <div className="map-control-group">
        <button 
          className="map-control-btn"
          onClick={() => mapRef.current?.flyTo([7.8731, 80.7718], 7)}
          title="Reset View"
        >
          <i className="fas fa-home"></i>
        </button>
        <button 
          className="map-control-btn"
          onClick={() => setShowDistanceCalculator(!showDistanceCalculator)}
          title="Distance Calculator"
        >
          <i className="fas fa-ruler"></i>
        </button>
        <button 
          className="map-control-btn"
          onClick={() => setRoutePoints([])}
          title="Clear Route"
        >
          <i className="fas fa-route"></i>
        </button>
      </div>
    </div>
  );

  // Enhanced experience popup
  const ExperiencePopup = ({ experience }) => (
    <motion.div 
      className="experience-popup"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="popup-header">
        <img 
          src={experienceCards[experience.name]?.mainImage || 
               `/images/${experience.name.replace(/\s+/g, '-').toLowerCase()}.jpg`} 
          alt={experience.name}
          onError={(e) => {
            e.target.src = '/images/default-experience.jpg';
          }}
        />
        <div className="popup-overlay">
          <h4>{experience.name}</h4>
          <div className="popup-meta">
            <span className={`tag ${experience.type}`}>
              {experience.type.charAt(0).toUpperCase() + experience.type.slice(1)}
            </span>
            <span className="location">
              <i className="fas fa-map-marker-alt"></i> {experience.location}
            </span>
          </div>
        </div>
      </div>
      <div className="popup-content">
        <p className="popup-description">{getExperienceDescription(experience.name)}</p>
        <div className="popup-actions">
          <button 
            className="popup-more-btn"
            onClick={() => handleMarkerClick(experience)}
          >
            Learn More <i className="fas fa-arrow-right"></i>
          </button>
          <div className="popup-secondary-actions">
            <button 
              className={`favorite-btn ${favorites.some(fav => fav.name === experience.name) ? 'active' : ''}`}
              onClick={() => toggleFavorite(experience)}
              title="Add to Favorites"
            >
              <FaStar />
            </button>
            <button 
              className="route-btn"
              onClick={() => addToRoute(experience)}
              title="Add to Route"
            >
              <FaRoute />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="map-app">
      <NationalSymbolsCarousel />
      <div className="map-container">
        <div className="map-controls">
          <div className="header-section">
            <div className="header-content">
              <h1>Sri Lanka Authentic Experiences</h1>
              <p className="subtitle">Discover the island's rich culture, cuisine, and traditions</p>
            </div>
            <div className="header-image">
              <img src="/images/sri-lanka-header.jpg" alt="Sri Lanka" />
            </div>
          </div>
          
          <div className="search-filter-section">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search experiences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fas fa-search"></i>
            </div>
            
            <div className="filters">
              <div className="filter-group">
                <label>Experience Type:</label>
                <div className="filter-buttons">
                  {Object.entries(categories).map(([key, { icon, label }]) => (
                    <button 
                      key={key}
                      className={filter === key ? 'active' : ''}
                      onClick={() => setFilter(key)}
                    >
                      <i className={`fas ${icon}`}></i> {label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="filter-group">
                <label>Province:</label>
                <select 
                  value={provinceFilter} 
                  onChange={(e) => setProvinceFilter(e.target.value)}
                  className="province-select"
                >
                  <option value="all">All Provinces</option>
                  {provinces.map((province, index) => (
                    <option key={index} value={province}>{province}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Tools:</label>
                <div className="tool-buttons">
                  <button 
                    className={showDistanceCalculator ? 'active' : ''}
                    onClick={() => setShowDistanceCalculator(!showDistanceCalculator)}
                  >
                    <FaCalculator /> Distance Calculator
                  </button>
                  <button onClick={() => setRoutePoints([])}>
                    <FaRoute /> Clear Route
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="map-content">
          <MapContainer 
            center={[7.8731, 80.7718]} 
            zoom={7} 
            style={{ height: '100%', width: '100%', borderRadius: '8px' }}
            ref={mapRef}
            zoomControl={false}
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            <ZoomControl position="bottomright" />
            <ScaleControl position="bottomleft" />
            <AttributionControl position="bottomright" />
            
            {geoJsonData && (
              <GeoJSON 
                data={geoJsonData} 
                style={{ 
                  color: '#555', 
                  weight: 1, 
                  fillOpacity: 0.1,
                  fillColor: '#f8f9fa'
                }} 
              />
            )}
            
            {routePoints.length > 1 && (
              <Polyline
                positions={routePoints}
                color="#3498db"
                weight={3}
                opacity={0.7}
                dashArray="5, 10"
                animate={true}
              />
            )}
            
            {filteredExperiences.map((experience, index) => (
              <Marker
                key={index}
                position={experience.coords}
                icon={createCustomIcon(experience.type)}
                eventHandlers={{
                  click: () => {
                    handleMarkerClick(experience);
                    if (showDistanceCalculator) {
                      handlePointSelection(experience);
                    }
                  },
                }}
              >
                <Popup className="custom-popup">
                  <ExperiencePopup experience={experience} />
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          <MapControls />
          
          <div className={`experience-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              {isSidebarCollapsed ? (
                <i className="fas fa-chevron-left"></i>
              ) : (
                <i className="fas fa-chevron-right"></i>
              )}
            </button>
            
            {!isSidebarCollapsed && (
              <div className="sidebar-content">
                {showDistanceCalculator && selectedPoints.length === 2 && (
                  <div className="distance-calculator">
                    <h4>Distance Calculator</h4>
                    <p>
                      Distance between {selectedPoints[0].name} and {selectedPoints[1].name}:
                      {calculateDistance(selectedPoints[0].coords, selectedPoints[1].coords).toFixed(2)} km
                    </p>
                    <button onClick={() => setSelectedPoints([])}>Clear Selection</button>
                  </div>
                )}

                {activeExperience ? (
                  <div className="experience-card">
                    <div className="card-header">
                      <div className="card-image">
                        <img 
                          src={experienceCards[activeExperience.name]?.mainImage || 
                               `/images/${activeExperience.name.replace(/\s+/g, '-').toLowerCase()}.jpg`} 
                          alt={activeExperience.name}
                        />
                        <div className="card-rating">
                          <FaStar />
                          <span>{experienceCards[activeExperience.name]?.rating || 4.5}</span>
                          <small>({experienceCards[activeExperience.name]?.reviews || 100}+ reviews)</small>
                        </div>
                      </div>
                      <div className="card-title">
                        <h3>{activeExperience.name}</h3>
                        <div className="card-meta">
                          <span><FaMapMarkerAlt /> {activeExperience.location}, {activeExperience.province}</span>
                          <span><FaClock /> {experienceCards[activeExperience.name]?.duration || "2-3 hours"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="card-info-grid">
                        <div className="info-item">
                          <FaCalendarAlt />
                          <div>
                            <h5>Best Time to Visit</h5>
                            <p>{experienceCards[activeExperience.name]?.bestTime || "Morning"}</p>
                          </div>
                        </div>
                        <div className="info-item">
                          <FaUsers />
                          <div>
                            <h5>Difficulty</h5>
                            <p>{experienceCards[activeExperience.name]?.difficulty || "Easy"}</p>
                          </div>
                        </div>
                        <div className="info-item">
                          <FaInfoCircle />
                          <div>
                            <h5>Price</h5>
                            <p>{experienceCards[activeExperience.name]?.price || "Free"}</p>
                          </div>
                        </div>
                      </div>

                      <div className="card-description">
                        <p>{experienceCards[activeExperience.name]?.description || getExperienceDescription(activeExperience.name)}</p>
                      </div>

                      {experienceCards[activeExperience.name]?.highlights && (
                        <div className="card-highlights">
                          <h4>Highlights</h4>
                          <ul>
                            {experienceCards[activeExperience.name].highlights.map((highlight, index) => (
                              <li key={index}>{highlight}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <WeatherDisplay coords={activeExperience.coords} />

                      {experienceCards[activeExperience.name]?.nearbyAttractions && (
                        <div className="card-nearby">
                          <h4>Nearby Attractions</h4>
                          <div className="nearby-grid">
                            {experienceCards[activeExperience.name].nearbyAttractions.map((attraction, index) => (
                              <div key={index} className="nearby-item">
                                <FaMapMarkerAlt />
                                <span>{attraction}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="card-actions">
                        <button className="btn-primary">
                          <FaMapMarkerAlt /> Get Directions
                        </button>
                        <button className="btn-secondary">
                          <FaHeart /> Save
                        </button>
                        <button className="btn-secondary">
                          <FaShare /> Share
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="welcome-section">
                    <div className="welcome-header">
                      <img src="/images/sri-lanka-welcome.jpg" alt="Welcome to Sri Lanka" />
                      <h2>Discover Sri Lanka</h2>
                    </div>
                    
                    <div className="featured-experiences">
                      <h3>Featured Experiences</h3>
                      <div className="experience-grid">
                        {authenticExperiences.slice(0, 6).map((experience, index) => (
                          <div 
                            key={index} 
                            className="experience-preview-card"
                            onClick={() => handleMarkerClick(experience)}
                          >
                            <div className="preview-image">
                              <img 
                                src={experienceCards[experience.name]?.mainImage || 
                                     `/images/${experience.name.replace(/\s+/g, '-').toLowerCase()}.jpg`} 
                                alt={experience.name}
                              />
                              <div className="preview-rating">
                                <FaStar />
                                <span>{experienceCards[experience.name]?.rating || 4.5}</span>
                              </div>
                            </div>
                            <div className="preview-content">
                              <h4>{experience.name}</h4>
                              <p>{experience.location}, {experience.province}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <NationalSymbols />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h5>About This Project</h5>
            <p>Discover Sri Lanka's authentic cultural experiences, from ancient temples to local cuisine and traditional crafts.</p>
          </div>
          <div className="footer-section">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">All Experiences</a></li>
              <li><a href="#">Travel Tips</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h5>Connect With Us</h5>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} Sri Lanka Authentic Experiences. All rights reserved.</p>
        </div>
      </div>

      {showImageGallery && (
        <div className="image-gallery-modal" onClick={() => setShowImageGallery(false)}>
          <div className="gallery-content" onClick={e => e.stopPropagation()}>
            <button className="close-gallery" onClick={() => setShowImageGallery(false)}>×</button>
            <div className="gallery-main">
              <img 
                src={experienceImages[activeExperience.name]?.[selectedImage]} 
                alt={activeExperience.name} 
              />
            </div>
            <div className="gallery-thumbnails">
              {experienceImages[activeExperience.name]?.map((img, index) => (
                <div 
                  key={index} 
                  className={`gallery-thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${activeExperience.name} ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getExperienceDescription(name) {
  const descriptions = {
    "Temple of the Tooth": "A sacred Buddhist temple in Kandy housing the relic of the tooth of Buddha. This UNESCO World Heritage site is a must-visit for its spiritual significance and stunning architecture. Evening ceremonies with drummers and offerings are particularly atmospheric.",
    "Kandyan Dancers": "Colorful traditional dance performances with elaborate costumes and drumming. The Kandyan dance is one of Sri Lanka's most iconic cultural expressions, featuring acrobatics, intricate footwork, and vibrant masks.",
    "Ambul Thiyal": "A sour fish curry popular in the hill country, made with goraka (a souring fruit) and spices. This dish is traditionally cooked in a clay pot and has a unique tangy flavor that pairs perfectly with rice.",
    "Peradeniya Botanical Gardens": "A beautiful botanical garden in Kandy, home to a wide variety of plants and flowers. The garden is a popular spot for picnicking, photography, and enjoying the lush greenery of Sri Lanka.",
    "Royal Palace of Kandy": "The former royal palace of the Kandyan kingdom, now a museum. The palace is a blend of traditional Kandyan architecture and European influences. Visitors can see the throne room, the royal audience hall, and the private chambers of the kings.",
    "Colombo Street Food": "Vibrant street stalls offering kottu, hoppers, and other local delights. Don't miss the egg hoppers (appa) with lunu miris sambol or the spicy isso vadai (shrimp fritters) along Galle Face Green.",
    "Gangaramaya Temple": "A famous Buddhist temple blending modern architecture and cultural elements. The temple complex includes a museum with rare artifacts and a beautiful bo tree surrounded by Buddha statues.",
    "Beeralu Lace Making": "An intricate lace craft passed down through generations in coastal towns. Visit the small workshops in Moratuwa to see artisans create delicate patterns using wooden bobbins.",
    "Mount Lavinia Beach": "A beautiful beach in Colombo, known for its golden sands and clear waters. It's a popular spot for swimming, sunbathing, and enjoying the sunset.",
    "Colombo National Museum": "The National Museum of Colombo houses a collection of artifacts from Sri Lanka's history and culture. Visitors can see ancient artifacts, traditional costumes, and a collection of Sri Lankan coins.",
    "Galle Fort Walk": "Explore the charming Dutch fort with colonial architecture and sea views. The 400-year-old ramparts enclose boutique hotels, cafes, and artisan shops within its atmospheric streets.",
    "Kottu Roti": "Sri Lanka's famous chopped roti stir-fry with vegetables and meat. The rhythmic clanging of the metal blades as chefs prepare kottu on hot griddles is a signature sound of Sri Lankan nights.",
    "Traditional Mask Making": "Carving and painting vibrant ritual masks in Ambalangoda. These masks were traditionally used in healing rituals and folk dramas, and now make for unique souvenirs.",
    "Yala National Park": "A popular national park in Sri Lanka, known for its diverse wildlife and beautiful landscapes. The park is home to a wide variety of animals, including leopards, elephants, and various bird species.",
    "Mulkirigala Rock Temple": "An ancient rock temple in Hambantota, known for its unique architecture and beautiful views. The temple is carved into the rock face and features intricate carvings and a large bo tree.",
    "Nallur Kovil": "A grand Hindu temple in Jaffna known for its festival. The annual Nallur Festival features processions with decorated chariots and devotees performing kavadi (penance dances).",
    "Jaffna Crab Curry": "A spicy and flavorful seafood dish from the north, cooked with roasted spices and coconut milk. The crabs from Jaffna's lagoons are particularly meaty and sweet.",
    "Palmyrah Crafts": "Handmade crafts from Palmyrah leaves, a Northern specialty. These include woven baskets, mats, and even notebooks made from the durable leaves of the palmyrah palm.",
    "Point Pedro Beach": "A beautiful beach in Jaffna, known for its golden sands and clear waters. It's a popular spot for swimming, sunbathing, and enjoying the sunset.",
    "Jaffna Fort": "An ancient fort in Jaffna, known for its history and architecture. The fort was built by the Portuguese in the 16th century and later expanded by the Dutch.",
    "Arugam Bay Surfing": "One of the world's top surfing destinations with consistent waves from May to October. The point break offers long rides perfect for intermediate surfers, with a laid-back beach vibe.",
    "Batticaloa Fish Curry": "Unique Eastern-style fish curry with coconut milk and tamarind. The local preparation uses fresh lagoon fish and a distinctive blend of spices including fenugreek and curry leaves.",
    "Fishing Catamaran": "Traditional wooden boats used by Eastern fishermen. These colorful outrigger canoes can be seen at sunrise bringing in the day's catch along the eastern coastline.",
    "Pigeon Island": "A small island in Trincomalee, known for its beautiful beaches and clear waters. It's a popular spot for snorkeling and diving, with a variety of marine life and coral reefs.",
    "Koneswaram Temple": "An ancient temple in Trincomalee, known for its history and architecture. The temple is dedicated to Lord Muruga and features intricate carvings and a large bo tree.",
    "Sigiriya Rock Fortress": "An ancient rock palace with frescoes and water gardens. Climb the 1,200 steps to see the famous 'mirror wall' and lion's paw gateway to this 5th-century citadel.",
    "Polonnaruwa Rice & Curry": "Hearty rice and curry dishes from the ancient city. The local version often includes jackfruit curry, brinjal moju (pickle), and coconut sambol.",
    "Stone Carvings": "Intricate stonework found in Anuradhapura and Polonnaruwa. The moonstones (sandakada pahana) with their concentric circles of animals and dancers are particularly noteworthy.",
    "Minneriya National Park": "A popular national park in Sri Lanka, known for its elephants and beautiful landscapes. The park is home to a large elephant population and is a popular spot for wildlife watching.",
    "Ruwanwelisaya": "An ancient rock temple in Anuradhapura, known for its history and architecture. The temple is carved into the rock face and features intricate carvings and a large bo tree.",
    "Munneswaram Temple": "An ancient temple attracting pilgrims of all faiths. The temple's history dates back over 1000 years and features a massive chariot used in annual processions.",
    "Puttalam Lagoon Crab": "Delicious lagoon crab cooked in local spices. The shallow waters of Puttalam lagoon produce crabs with exceptionally sweet and tender meat.",
    "Toddy Tapping": "The art of extracting sap to make palm wine. Toddy tappers climb tall palm trees at dawn to collect the fermenting sap, which can be drunk fresh or distilled into arrack.",
    "Wilpattu National Park": "A popular national park in Sri Lanka, known for its birdlife and beautiful landscapes. The park is home to a wide variety of bird species and is a popular spot for birdwatching.",
    "Yapahuwa Rock Fortress": "An ancient rock fortress in Kurunegala, known for its history and architecture. The fortress was built by the Sinhalese king Vijayabahu I in the 12th century.",
    "Train to Ella": "A scenic ride through lush tea estates and mountains. The stretch from Hatton to Ella offers breathtaking views of waterfalls and misty peaks from the observation car.",
    "Hoppers (Appa)": "Crispy bowl-shaped pancakes served with sambol or curry. Try the egg hopper with a runny yolk in the center, or sweet versions with treacle and coconut milk.",
    "Tea Picking": "Experience plucking tea leaves in cool plantations. The best leaves are the 'two leaves and a bud' picked by skilled workers who harvest up to 20kg per day.",
    "Horton Plains": "A beautiful national park in Sri Lanka, known for its tea estates and misty peaks. The park is home to a variety of wildlife and is a popular spot for hiking and wildlife watching.",
    "Dowa Rock Temple": "An ancient rock temple in Badulla, known for its history and architecture. The temple is carved into the rock face and features intricate carvings and a large bo tree.",
    "Ratnapura Gem Mines": "Sri Lanka's gem capital with active mines. Visit small-scale operations where miners sift through river gravel for sapphires, rubies, and cat's eyes.",
    "Weli Thalapa": "A sweet coconut and jaggery treat wrapped in fragrant screwpine leaves. This traditional sweet has a distinctive pandan aroma and sticky, chewy texture.",
    "Gem Cutting": "Crafting precious stones into brilliant gems. Watch master cutters in Ratnapura transform rough stones into faceted jewels using techniques passed down for generations.",
    "Sinharaja Forest": "A beautiful rainforest in Sri Lanka, known for its biodiversity and unique ecosystem. The forest is home to a variety of plant and animal species and is a popular spot for hiking and wildlife watching.",
    "Dambulla Cave Temple": "An ancient cave temple in Sri Lanka, known for its history and architecture. The temple is carved into the rock face and features intricate carvings and a large bo tree."
  };
  return descriptions[name] || "An unforgettable Sri Lankan experience awaits you. This authentic encounter offers deep insight into the island's rich culture, history, and traditions.";
}

export default Map;