import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMapMarkerAlt, FaRoute, FaStar, FaCloudSun, FaTemperatureHigh, 
  FaWind, FaCloudRain, FaCamera, FaInfoCircle, FaHeart, FaShare, 
  FaClock, FaCalendarAlt, FaUsers, FaCompass, FaSun, FaMoon, 
  FaCloud, FaCloudShowersHeavy, FaSnowflake, FaBolt, FaPlay, FaPause, FaSearch, FaUtensils, FaLandmark, FaHandsHelping, FaArrowRight, FaChevronLeft, FaChevronRight, FaInfo, FaBookmark, FaShareAlt,
  FaExpand, FaCompress, FaVolumeUp, FaVolumeMute, FaHistory
} from 'react-icons/fa';

const createCustomIcon = (type) => {
  const iconColors = {
    food: '#e74c3c',
    place: '#3498db',
    thing: '#2ecc71'
  };

  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${iconColors[type]}; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; display: flex; justify-content: center; align-items: center; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
             <span style="font-size: 14px; color: white; font-weight: bold;">${type.charAt(0).toUpperCase()}</span>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const nationalSymbols = [
  {
    title: "National Flower",
    name: "Nil Manel (Blue Water Lily)",
    scientific_name: "Nymphaea nouchali",
    image: "/Images/national/nil.jpg",
    description: "The beautiful blue water lily was declared the national flower of Sri Lanka in 1986. It symbolizes truth, purity, and discipline in Buddhist philosophy. The flower blooms in the morning and closes at night, representing the cycle of life.",
    cultural_significance: "In Buddhist art, the blue water lily represents the purity of the mind and the path to enlightenment. It's often depicted in temple murals and sculptures.",
    historical_background: "The flower has been revered in Sri Lanka for over 2,500 years, mentioned in ancient Buddhist texts and royal gardens."
  },
  {
    title: "National Gem",
    name: "Blue Sapphire",
    scientific_name: "Corundum (Al₂O₃)",
    image: "/Images/national/manik.jpg",
    description: "Sri Lanka's blue sapphires are world-renowned for their quality and brilliance. The 400-carat 'Blue Giant of the Orient' found in Sri Lanka is one of the largest sapphires ever discovered. The island is known as 'Ratna Dweepa' (Island of Gems).",
    cultural_significance: "Sapphires are believed to bring wisdom, good fortune, and protection. They are often used in royal jewelry and religious artifacts.",
    historical_background: "Sri Lanka has been a source of precious gems for over 2,000 years, with records of gem trading dating back to ancient times."
  },
  {
    title: "National Game",
    name: "Volleyball",
    image: "/Images/national/volley.jpg",
    description: "Volleyball was declared the national sport of Sri Lanka in 1991. The country has a strong volleyball tradition, especially in rural areas. The sport promotes teamwork and physical fitness across all communities.",
    cultural_significance: "Volleyball brings together people from different ethnic and social backgrounds, promoting unity and sportsmanship.",
    historical_background: "Introduced during the British colonial period, volleyball quickly became popular in schools and villages across the island."
  },
  {
    title: "National Flag",
    name: "Lion Flag",
    image: "/Images/national/flag.jpg",
    description: "The flag features a golden lion holding a sword, representing the Sinhalese ethnicity and the nation's strength. The orange and green stripes represent Tamils and Moors, while the maroon background symbolizes the majority Sinhalese.",
    cultural_significance: "The lion symbolizes bravery and strength, while the sword represents the sovereignty of the nation. The four Bo leaves at the corners represent the four virtues of Buddhism: loving-kindness, compassion, sympathetic joy, and equanimity.",
    historical_background: "The flag's design dates back to 1948 when Sri Lanka gained independence, incorporating elements from the ancient Kandyan kingdom's flag."
  },
  {
    title: "National Animal",
    name: "Sri Lankan Giant Squirrel (දඬුලේනා)",
    scientific_name: "Ratufa macroura",
    image: "/Images/national/lena.jpg",
    description: "The Sri Lankan Giant Squirrel (Ratufa macroura) is a near-threatened species endemic to Sri Lanka. Known for its large size and striking color variations, it inhabits forests across the island. Due to habitat loss and hunting, conservation efforts are crucial for its survival.",
    cultural_significance: "The giant squirrel is considered a symbol of agility and adaptability in Sri Lankan folklore. It's often featured in traditional stories and art.",
    historical_background: "This species has been part of Sri Lanka's ecosystem for thousands of years, adapting to various forest types across the island."
  },
  {
    title: "National Tree",
    name: "Na (Ironwood)",
    scientific_name: "Mesua ferrea",
    image: "/Images/national/naa.jpeg",
    description: "Mesua ferrea (Na tree) was declared the national tree of Sri Lanka in 1986. Its beautiful flowers are used in traditional medicine and religious offerings. The tree is known for its hard, durable wood and fragrant flowers.",
    cultural_significance: "The Na tree is considered sacred in Buddhist temples and is often planted in temple premises. Its flowers are used in religious ceremonies and traditional medicine.",
    historical_background: "The tree has been valued for centuries for its medicinal properties and durable wood, used in traditional architecture."
  },
  {
    title: "National Bird",
    name: "Sri Lanka Junglefowl",
    scientific_name: "Gallus lafayettii",
    image: "/Images/national/kukula.jpg",
    description: "The colorful Sri Lanka junglefowl (Gallus lafayettii) is endemic to the island. The male's striking plumage features red, orange, yellow, and deep blue feathers. It's considered the ancestor of the domestic chicken.",
    cultural_significance: "The junglefowl is featured in ancient Sinhalese art and is considered a symbol of natural beauty and resilience.",
    historical_background: "This species has been part of Sri Lanka's ecosystem for millions of years, evolving uniquely on the island."
  },
  {
    title: "National Dance",
    name: "Kandyan Dance",
    image: "/Images/national/dance.jpg",
    description: "Kandyan dance is a classical dance form that originated in the central hills of Sri Lanka. It features elaborate costumes, rhythmic drumming, and acrobatic movements. The dance is performed during religious ceremonies and cultural events.",
    cultural_significance: "The dance is deeply connected to Buddhist temple rituals and royal ceremonies. Each movement and costume element has symbolic meaning.",
    historical_background: "Dating back to the Kandyan Kingdom (15th-19th centuries), this dance form has been preserved through generations of dedicated performers."
  },
  {
    title: "National Instrument",
    name: "Geta Beraya",
    image: "/Images/national/beraya.jpg",
    description: "The Geta Beraya is a traditional drum used in Kandyan dance performances. Made from wood and animal hide, it produces deep, resonant sounds that accompany dance movements.",
    cultural_significance: "The drum is considered sacred and is used in temple ceremonies and cultural performances. Its rhythms are believed to have spiritual significance.",
    historical_background: "The art of drum making and playing has been passed down through generations of craftsmen and musicians."
  },
  {
    title: "National Costume",
    name: "Osariya",
    image: "/Images/national/osariya.jpg",
    description: "The Osariya is the traditional Kandyan saree worn by women. It features intricate pleats and a distinctive drape that creates an elegant silhouette. The costume is worn during special occasions and cultural events.",
    cultural_significance: "The Osariya represents Sri Lankan femininity and cultural identity. Its design and wearing style are unique to Sri Lanka.",
    historical_background: "The costume evolved during the Kandyan period, incorporating elements from various cultural influences while maintaining its distinct Sri Lankan character."
  },
  {
    title: "National Martial Art",
    name: "Angampora",
    image: "/Images/national/angampora.jpg",
    description: "Angampora is an ancient martial art that combines combat techniques, meditation, and traditional medicine. It includes both armed and unarmed combat, with a strong emphasis on spiritual development.",
    cultural_significance: "Angampora is not just a fighting style but a complete system of physical and mental training, deeply connected to Buddhist philosophy.",
    historical_background: "This martial art has been practiced for over 3,000 years, with its techniques preserved through oral tradition and dedicated training schools."
  },
  {
    title: "National Architecture",
    name: "Stupa Architecture",
    image: "/Images/national/stupa.jpg",
    description: "Sri Lankan stupa architecture represents the pinnacle of Buddhist architectural achievement. The massive white domes, decorated with intricate carvings and surrounded by elaborate moonstones, are unique to Sri Lanka.",
    cultural_significance: "Stupas are not just architectural marvels but sacred monuments housing relics of the Buddha and important Buddhist monks.",
    historical_background: "The development of stupa architecture in Sri Lanka spans over 2,000 years, with each period adding unique elements to the design."
  }
];

// Weather API Configuration
const API_KEY = '2e85719828517999c1ce073d01087421';
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// Add photo gallery data
const locationPhotos = {
  "Temple of the Tooth": [
    "/Images/temple/temple-1.jpg",
    "/Images/temple/temple-2.jpg",
    "/Images/temple/temple-3.jpg"
  ],
  "Galle Fort Walk": [
    "/Images/galle/galle-1.jpg",
    "/Images/galle/galle-2.jpg",
    "/Images/galle/galle-3.jpg"
  ],
  "Sigiriya Rock Fortress": [
    "/Images/places/sigiriya-1.jpg",
    "/Images/places/sigiriya-2.jpg",
    "/Images/places/sigiriya-3.jpg"
  ],
  "Kandyan Dancers": [
    "/Images/activities/dance-1.jpg",
    "/Images/activities/dance-2.jpg",
    "/Images/activities/dance-3.jpg"
  ],
  "Kottu Roti": [
    "/Images/food/kottu-1.jpg",
    "/Images/food/kottu-2.jpg",
    "/Images/food/kottu-3.jpg"
  ],
  "Colombo Street Food": [
    "/Images/food/street-food-1.jpg",
    "/Images/food/street-food-2.jpg",
    "/Images/food/street-food-3.jpg"
  ],
  "Gangaramaya Temple": [
    "/Images/temple/gangaramaya-1.jpg",
    "/Images/temple/gangaramaya-2.jpg",
    "/Images/temple/gangaramaya-3.jpg"
  ],
  "Beeralu Lace Making": [
    "/Images/activities/lace-1.jpg",
    "/Images/activities/lace-2.jpg",
    "/Images/activities/lace-3.jpg"
  ],
  "Traditional Mask Making": [
    "/Images/activities/mask-1.jpg",
    "/Images/activities/mask-2.jpg",
    "/Images/activities/mask-3.jpg"
  ],
  "Nallur Kovil": [
    "/Images/temple/nallur-1.jpg",
    "/Images/temple/nallur-2.jpg",
    "/Images/temple/nallur-3.jpg"
  ],
  "Jaffna Crab Curry": [
    "/Images/food/crab-1.jpg",
    "/Images/food/crab-2.jpg",
    "/Images/food/crab-3.jpg"
  ],
  "Arugam Bay Surfing": [
    "/Images/activities/surfing-1.jpg",
    "/Images/activities/surfing-2.jpg",
    "/Images/activities/surfing-3.jpg"
  ],
  "Batticaloa Fish Curry": [
    "/Images/food/fish-curry-1.jpg",
    "/Images/food/fish-curry-2.jpg",
    "/Images/food/fish-curry-3.jpg"
  ],
  "Fishing Catamaran": [
    "/Images/activities/catamaran-1.jpg",
    "/Images/activities/catamaran-2.jpg",
    "/Images/activities/catamaran-3.jpg"
  ],
  "Polonnaruwa Rice & Curry": [
    "/Images/food/rice-curry-1.jpg",
    "/Images/food/rice-curry-2.jpg",
    "/Images/food/rice-curry-3.jpg"
  ],
  "Stone Carvings": [
    "/Images/places/carvings-1.jpg",
    "/Images/places/carvings-2.jpg",
    "/Images/places/carvings-3.jpg"
  ],
  "Munneswaram Temple": [
    "/Images/temple/munneswaram-1.jpg",
    "/Images/temple/munneswaram-2.jpg",
    "/Images/temple/munneswaram-3.jpg"
  ],
  "Puttalam Lagoon Crab": [
    "/Images/food/lagoon-crab-1.jpg",
    "/Images/food/lagoon-crab-2.jpg",
    "/Images/food/lagoon-crab-3.jpg"
  ],
  "Toddy Tapping": [
    "/Images/activities/toddy-1.jpg",
    "/Images/activities/toddy-2.jpg",
    "/Images/activities/toddy-3.jpg"
  ],
  "Train to Ella": [
    "/Images/places/train-1.jpg",
    "/Images/places/train-2.jpg",
    "/Images/places/train-3.jpg"
  ],
  "Hoppers (Appa)": [
    "/Images/food/hoppers-1.jpg",
    "/Images/food/hoppers-2.jpg",
    "/Images/food/hoppers-3.jpg"
  ],
  "Tea Picking": [
    "/Images/activities/tea-1.jpg",
    "/Images/activities/tea-2.jpg",
    "/Images/activities/tea-3.jpg"
  ],
  "Ratnapura Gem Mines": [
    "/Images/places/gem-1.jpg",
    "/Images/places/gem-2.jpg",
    "/Images/places/gem-3.jpg"
  ],
  "Weli Thalapa": [
    "/Images/food/weli-1.jpg",
    "/Images/food/weli-2.jpg",
    "/Images/food/weli-3.jpg"
  ],
  "Gem Cutting": [
    "/Images/activities/gem-cutting-1.jpg",
    "/Images/activities/gem-cutting-2.jpg",
    "/Images/activities/gem-cutting-3.jpg"
  ],
  "Peradeniya Royal Botanical Gardens": [
    "/Images/places/peradeniya-1.jpg",
    "/Images/places/peradeniya-2.jpg",
    "/Images/places/peradeniya-3.jpg"
  ],
  "Dambulla Cave Temple": [
    "/Images/places/dambulla-1.jpg",
    "/Images/places/dambulla-2.jpg",
    "/Images/places/dambulla-3.jpg"
  ],
  "Kelaniya Temple": [
    "/Images/temple/kelaniya-1.jpg",
    "/Images/temple/kelaniya-2.jpg",
    "/Images/temple/kelaniya-3.jpg"
  ],
  "Seema Malaka Temple": [
    "/Images/temple/seema-malaka-1.jpg",
    "/Images/temple/seema-malaka-2.jpg",
    "/Images/temple/seema-malaka-3.jpg"
  ],
  "Mulkirigala Rock Temple": [
    "/Images/temple/mulkirigala-1.jpg",
    "/Images/temple/mulkirigala-2.jpg",
    "/Images/temple/mulkirigala-3.jpg"
  ],
  "Weligama Bay": [
    "/Images/places/weligama-1.jpg",
    "/Images/places/weligama-2.jpg",
    "/Images/places/weligama-3.jpg"
  ],
  "Nagadeepa Temple": [
    "/Images/temple/nagadeepa-1.jpg",
    "/Images/temple/nagadeepa-2.jpg",
    "/Images/temple/nagadeepa-3.jpg"
  ],
  "Jaffna Fort": [
    "/Images/places/jaffna-fort-1.jpg",
    "/Images/places/jaffna-fort-2.jpg",
    "/Images/places/jaffna-fort-3.jpg"
  ],
  "Koneswaram Temple": [
    "/Images/temple/koneswaram-1.jpg",
    "/Images/temple/koneswaram-2.jpg",
    "/Images/temple/koneswaram-3.jpg"
  ],
  "Pasikudah Beach": [
    "/Images/places/pasikudah-1.jpg",
    "/Images/places/pasikudah-2.jpg",
    "/Images/places/pasikudah-3.jpg"
  ],
  "Anuradhapura Sacred City": [
    "/Images/places/anuradhapura-1.jpg",
    "/Images/places/anuradhapura-2.jpg",
    "/Images/places/anuradhapura-3.jpg"
  ],
  "Mihintale Temple": [
    "/Images/temple/mihintale-1.jpg",
    "/Images/temple/mihintale-2.jpg",
    "/Images/temple/mihintale-3.jpg"
  ],
  "Yapahuwa Rock Fortress": [
    "/Images/places/yapahuwa-1.jpg",
    "/Images/places/yapahuwa-2.jpg",
    "/Images/places/yapahuwa-3.jpg"
  ],
  "Panduwasnuwara": [
    "/Images/places/panduwasnuwara-1.jpg",
    "/Images/places/panduwasnuwara-2.jpg",
    "/Images/places/panduwasnuwara-3.jpg"
  ],
  "Bogoda Wooden Bridge": [
    "/Images/places/bogoda-1.jpg",
    "/Images/places/bogoda-2.jpg",
    "/Images/places/bogoda-3.jpg"
  ],
  "Diyaluma Falls": [
    "/Images/places/diyaluma-1.jpg",
    "/Images/places/diyaluma-2.jpg",
    "/Images/places/diyaluma-3.jpg"
  ],
  "Sinharaja Rain Forest": [
    "/Images/places/sinharaja-1.jpg",
    "/Images/places/sinharaja-2.jpg",
    "/Images/places/sinharaja-3.jpg"
  ],
  "Belihuloya": [
    "/Images/places/belihuloya-1.jpg",
    "/Images/places/belihuloya-2.jpg",
    "/Images/places/belihuloya-3.jpg"
  ]
};

function Map() {
  const [activeExperience, setActiveExperience] = useState(null);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [filter, setFilter] = useState('all');
  const [provinceFilter, setProvinceFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [carouselAutoPlay, setCarouselAutoPlay] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [currentLocation, setCurrentLocation] = useState('Colombo');
  const mapRef = useRef(null);
  const [activeSymbol, setActiveSymbol] = useState(null);
  const [showSymbolDetails, setShowSymbolDetails] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [viewedSymbols, setViewedSymbols] = useState([]);

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            q: currentLocation,
            appid: API_KEY,
            units: 'metric',
          },
        });
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, [currentLocation]);

  const authenticExperiences = [
    // Central Province
    { name: "Temple of the Tooth", location: "Kandy", province: "Central", type: "place", coords: [7.2939, 80.6414] },
    { name: "Kandyan Dancers", location: "Kandy", province: "Central", type: "thing", coords: [7.2939, 80.6414] },
    { name: "Ambul Thiyal", location: "Kandy", province: "Central", type: "food", coords: [7.294, 80.640] },
    { name: "Peradeniya Royal Botanical Gardens", location: "Kandy", province: "Central", type: "place", coords: [7.2733, 80.5957] },
    { name: "Dambulla Cave Temple", location: "Dambulla", province: "Central", type: "place", coords: [7.8567, 80.6492] },

    // Western Province
    { name: "Colombo Street Food", location: "Colombo", province: "Western", type: "food", coords: [6.9271, 79.8612] },
    { name: "Gangaramaya Temple", location: "Colombo", province: "Western", type: "place", coords: [6.9157, 79.8560] },
    { name: "Beeralu Lace Making", location: "Moratuwa", province: "Western", type: "thing", coords: [6.767, 79.882] },
    { name: "Kelaniya Temple", location: "Kelaniya", province: "Western", type: "place", coords: [6.9556, 79.9222] },
    { name: "Seema Malaka Temple", location: "Colombo", province: "Western", type: "place", coords: [6.9167, 79.8500] },

    // Southern Province
    { name: "Galle Fort Walk", location: "Galle", province: "Southern", type: "place", coords: [6.0273, 80.2179] },
    { name: "Kottu Roti", location: "Matara", province: "Southern", type: "food", coords: [5.9485, 80.5353] },
    { name: "Traditional Mask Making", location: "Ambalangoda", province: "Southern", type: "thing", coords: [6.2359, 80.0538] },
    { name: "Mulkirigala Rock Temple", location: "Mulkirigala", province: "Southern", type: "place", coords: [6.2333, 80.7667] },
    { name: "Weligama Bay", location: "Weligama", province: "Southern", type: "place", coords: [5.9667, 80.4167] },

    // Northern Province
    { name: "Nallur Kovil", location: "Jaffna", province: "Northern", type: "place", coords: [9.6659, 80.0255] },
    { name: "Jaffna Crab Curry", location: "Jaffna", province: "Northern", type: "food", coords: [9.6685, 80.0074] },
    { name: "Palmyrah Crafts", location: "Jaffna", province: "Northern", type: "thing", coords: [9.6618, 80.0251] },
    { name: "Nagadeepa Temple", location: "Jaffna", province: "Northern", type: "place", coords: [9.5000, 79.7333] },
    { name: "Jaffna Fort", location: "Jaffna", province: "Northern", type: "place", coords: [9.6667, 80.0167] },

    // Eastern Province
    { name: "Arugam Bay Surfing", location: "Arugam Bay", province: "Eastern", type: "place", coords: [6.8431, 81.8350] },
    { name: "Batticaloa Fish Curry", location: "Batticaloa", province: "Eastern", type: "food", coords: [7.7102, 81.6924] },
    { name: "Fishing Catamaran", location: "Trincomalee", province: "Eastern", type: "thing", coords: [8.5874, 81.2152] },
    { name: "Koneswaram Temple", location: "Trincomalee", province: "Eastern", type: "place", coords: [8.5833, 81.2333] },
    { name: "Pasikudah Beach", location: "Pasikudah", province: "Eastern", type: "place", coords: [7.9167, 81.5500] },

    // North Central Province
    { name: "Sigiriya Rock Fortress", location: "Sigiriya", province: "North Central", type: "place", coords: [7.9575, 80.7603] },
    { name: "Polonnaruwa Rice & Curry", location: "Polonnaruwa", province: "North Central", type: "food", coords: [7.9403, 81.0188] },
    { name: "Stone Carvings", location: "Anuradhapura", province: "North Central", type: "thing", coords: [8.3114, 80.4037] },
    { name: "Anuradhapura Sacred City", location: "Anuradhapura", province: "North Central", type: "place", coords: [8.3333, 80.3833] },
    { name: "Mihintale Temple", location: "Mihintale", province: "North Central", type: "place", coords: [8.3500, 80.5167] },

    // North Western Province
    { name: "Munneswaram Temple", location: "Chilaw", province: "North Western", type: "place", coords: [7.5734, 79.7946] },
    { name: "Puttalam Lagoon Crab", location: "Puttalam", province: "North Western", type: "food", coords: [8.0334, 79.8415] },
    { name: "Toddy Tapping", location: "Wennappuwa", province: "North Western", type: "thing", coords: [7.3166, 79.8582] },
    { name: "Yapahuwa Rock Fortress", location: "Yapahuwa", province: "North Western", type: "place", coords: [7.8333, 80.3667] },
    { name: "Panduwasnuwara", location: "Kurunegala", province: "North Western", type: "place", coords: [7.4667, 80.1000] },

    // Uva Province
    { name: "Train to Ella", location: "Ella", province: "Uva", type: "place", coords: [6.8606, 81.0463] },
    { name: "Hoppers (Appa)", location: "Badulla", province: "Uva", type: "food", coords: [6.9897, 81.0550] },
    { name: "Tea Picking", location: "Bandarawela", province: "Uva", type: "thing", coords: [6.8296, 80.9875] },
    { name: "Bogoda Wooden Bridge", location: "Badulla", province: "Uva", type: "place", coords: [7.1167, 81.0667] },
    { name: "Diyaluma Falls", location: "Badulla", province: "Uva", type: "place", coords: [6.8333, 81.0000] },

    // Sabaragamuwa Province
    { name: "Ratnapura Gem Mines", location: "Ratnapura", province: "Sabaragamuwa", type: "place", coords: [6.6828, 80.3992] },
    { name: "Weli Thalapa", location: "Kegalle", province: "Sabaragamuwa", type: "food", coords: [7.2513, 80.3464] },
    { name: "Gem Cutting", location: "Ratnapura", province: "Sabaragamuwa", type: "thing", coords: [6.683, 80.399] },
    { name: "Sinharaja Rain Forest", location: "Ratnapura", province: "Sabaragamuwa", type: "place", coords: [6.4167, 80.5000] },
    { name: "Belihuloya", location: "Ratnapura", province: "Sabaragamuwa", type: "place", coords: [6.7167, 80.7667] }
  ];

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
    setCurrentLocation(experience.location); // Update weather location
    if (mapRef.current) {
      mapRef.current.flyTo(experience.coords, 12, {
        duration: 1
      });
    }
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const getWeatherIcon = (weatherCondition) => {
    const iconMap = {
      Clear: <FaSun className="weather-icon sun" />,
      Clouds: <FaCloud className="weather-icon cloud" />,
      Rain: <FaCloudShowersHeavy className="weather-icon rain" />,
      Snow: <FaSnowflake className="weather-icon snow" />,
      Thunderstorm: <FaBolt className="weather-icon thunder" />,
      Drizzle: <FaCloudRain className="weather-icon drizzle" />,
      Mist: <FaCloud className="weather-icon mist" />,
    };
    return iconMap[weatherCondition] || <FaSun className="weather-icon sun" />;
  };

  const handleSymbolClick = (symbol) => {
    setActiveSymbol(symbol);
    setShowSymbolDetails(true);
    // Add to viewed symbols history
    setViewedSymbols(prev => {
      const newHistory = [symbol, ...prev.filter(s => s.name !== symbol.name)].slice(0, 5);
      return newHistory;
    });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="map-app">
      {/* Enhanced National Symbols Section */}
      <motion.div 
        className={`national-symbols-section ${isFullscreen ? 'fullscreen' : ''}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-header">
          <div className="header-content">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Sri Lanka National Symbols
            </motion.h3>
            <motion.p 
              className="section-subtitle"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover the rich cultural heritage of Sri Lanka through its national symbols
            </motion.p>
          </div>
          <div className="section-controls">
            <button 
              className="control-btn history"
              onClick={() => setShowHistory(!showHistory)}
              title="View History"
            >
              <FaHistory />
            </button>
            <button 
              className="control-btn audio"
              onClick={toggleMute}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <button 
              className="control-btn fullscreen"
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>
            <button 
              className="control-btn play"
              onClick={() => setCarouselAutoPlay(!carouselAutoPlay)}
              title={carouselAutoPlay ? "Pause Slideshow" : "Play Slideshow"}
            >
              {carouselAutoPlay ? <FaPause /> : <FaPlay />}
            </button>
          </div>
        </div>

        {/* Recently Viewed Symbols */}
        <AnimatePresence>
          {showHistory && (
            <motion.div 
              className="viewed-symbols"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <h4>Recently Viewed</h4>
              <div className="viewed-symbols-grid">
                {viewedSymbols.map((symbol, index) => (
                  <motion.div 
                    key={index}
                    className="viewed-symbol-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleSymbolClick(symbol)}
                  >
                    <img src={symbol.image} alt={symbol.name} />
                    <div className="card-overlay">
                      <h5>{symbol.name}</h5>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="symbols-container">
          <Carousel
            autoPlay={carouselAutoPlay}
            interval={5000}
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showArrows={true}
            showIndicators={true}
            className="national-symbols-carousel"
            renderArrowPrev={(onClickHandler, hasPrev, label) => (
              <motion.button
                className="carousel-arrow prev"
                onClick={onClickHandler}
                title={label}
                disabled={!hasPrev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaChevronLeft />
              </motion.button>
            )}
            renderArrowNext={(onClickHandler, hasNext, label) => (
              <motion.button
                className="carousel-arrow next"
                onClick={onClickHandler}
                title={label}
                disabled={!hasNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaChevronRight />
              </motion.button>
            )}
          >
            {nationalSymbols.map((symbol, index) => (
              <motion.div 
                key={index} 
                className="symbol-slide"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleSymbolClick(symbol)}
              >
                <div className="symbol-image">
                  <img src={symbol.image} alt={symbol.name} />
                  <div className="symbol-overlay">
                    <div className="overlay-content">
                      <motion.h4
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {symbol.title}
                      </motion.h4>
                      <motion.h5
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {symbol.name}
                      </motion.h5>
                      {symbol.scientific_name && (
                        <motion.p 
                          className="scientific-name"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          {symbol.scientific_name}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="symbol-info">
                  <motion.p 
                    className="description"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {symbol.description}
                  </motion.p>
                  <div className="symbol-actions">
                    <motion.button 
                      className="action-btn info"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaInfo /> Learn More
                    </motion.button>
                    <motion.button 
                      className="action-btn bookmark"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaBookmark /> Save
                    </motion.button>
                    <motion.button 
                      className="action-btn share"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaShareAlt /> Share
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </Carousel>
        </div>

        {/* Enhanced Symbol Details Modal */}
        <AnimatePresence>
          {showSymbolDetails && activeSymbol && (
            <motion.div 
              className="symbol-details-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="modal-content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <button 
                  className="close-modal"
                  onClick={() => setShowSymbolDetails(false)}
                >
                  ×
                </button>
                <div className="modal-header">
                  <motion.h3
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {activeSymbol.title}
                  </motion.h3>
                  <motion.h4
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {activeSymbol.name}
                  </motion.h4>
                  {activeSymbol.scientific_name && (
                    <motion.p 
                      className="scientific-name"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {activeSymbol.scientific_name}
                    </motion.p>
                  )}
                </div>
                <div className="modal-body">
                  <motion.div 
                    className="modal-image"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <img src={activeSymbol.image} alt={activeSymbol.name} />
                  </motion.div>
                  <motion.div 
                    className="modal-info"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="description">{activeSymbol.description}</p>
                    <div className="additional-info">
                      <div className="info-section">
                        <h5>Cultural Significance</h5>
                        <p>{activeSymbol.cultural_significance}</p>
                      </div>
                      <div className="info-section">
                        <h5>Historical Background</h5>
                        <p>{activeSymbol.historical_background}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
                <motion.div 
                  className="modal-footer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button 
                    className="action-btn primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaBookmark /> Save to Collection
                  </motion.button>
                  <motion.button 
                    className="action-btn secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaShareAlt /> Share Symbol
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="map-container">
        <div className="map-controls">
          <div className="header-section">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Sri Lanka Authentic Experiences
            </motion.h1>
            <motion.p 
              className="subtitle"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover the island's rich culture, cuisine, and traditions
            </motion.p>
          </div>

          {/* Weather Widget */}
          {weatherData && (
            <motion.div 
              className="weather-widget"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="weather-header">
                <div className="location-info">
                  <FaMapMarkerAlt className="location-icon" />
                  <h3>{weatherData.city.name}</h3>
                </div>
                <span className="last-updated">
                  <FaClock /> {new Date().toLocaleTimeString()}
                </span>
              </div>
              <div className="weather-content">
                <div className="current-weather">
                  <div className="temperature">
                    <div className="temp-main">
                      {getWeatherIcon(weatherData.list[0].weather[0].main)}
                      <span className="temp-value">
                        {Math.round(weatherData.list[0].main.temp)}°C
                      </span>
                    </div>
                    <span className="feels-like">
                      Feels like: {Math.round(weatherData.list[0].main.feels_like)}°C
                    </span>
                  </div>
                  <div className="weather-details">
                    <div className="detail">
                      <FaWind /> {weatherData.list[0].wind.speed} m/s
                    </div>
                    <div className="detail">
                      <FaCloudRain /> {weatherData.list[0].main.humidity}%
                    </div>
                    <div className="detail">
                      <FaCompass /> {weatherData.list[0].wind.deg}°
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Search and Filters */}
          <motion.div 
            className="search-filter-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="search-box">
              <input
                type="text"
                placeholder="Search experiences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="search-icon" />
            </div>
            
            <div className="filters">
              <div className="filter-group">
                <label>Experience Type:</label>
                <div className="filter-buttons">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={filter === 'all' ? 'active' : ''}
                    onClick={() => setFilter('all')}
                  >
                    All
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={filter === 'food' ? 'active' : ''}
                    onClick={() => setFilter('food')}
                  >
                    <FaUtensils /> Food
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={filter === 'place' ? 'active' : ''}
                    onClick={() => setFilter('place')}
                  >
                    <FaLandmark /> Places
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={filter === 'thing' ? 'active' : ''}
                    onClick={() => setFilter('thing')}
                  >
                    <FaHandsHelping /> Activities
                  </motion.button>
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
            </div>
          </motion.div>
        </div>

        {/* Map Content */}
        <div className="map-content">
          <MapContainer 
            center={[7.8731, 80.7718]} 
            zoom={7} 
            style={{ height: '100%', width: '100%', borderRadius: '8px' }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            {geoJsonData && <GeoJSON 
              data={geoJsonData} 
              style={{ 
                color: '#555', 
                weight: 1, 
                fillOpacity: 0.1,
                fillColor: '#f8f9fa'
              }} 
            />}
            {filteredExperiences.map((experience, index) => (
              <Marker
                key={index}
                position={experience.coords}
                icon={createCustomIcon(experience.type)}
                eventHandlers={{
                  click: () => handleMarkerClick(experience),
                }}
              >
                <Popup className="custom-popup">
                  <motion.div 
                    className="popup-content"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="popup-header">
                      <h4>{experience.name}</h4>
                      <div className="popup-meta">
                        <span className={`tag ${experience.type}`}>
                          {experience.type.charAt(0).toUpperCase() + experience.type.slice(1)}
                        </span>
                        <span className="location">
                          <FaMapMarkerAlt /> {experience.location}, {experience.province}
                        </span>
                      </div>
                    </div>
                    
                    {locationPhotos[experience.name] && (
                      <div className="popup-gallery">
                        <Carousel
                          showThumbs={false}
                          showStatus={false}
                          showArrows={true}
                          infiniteLoop={true}
                          autoPlay={true}
                          interval={3000}
                          className="popup-carousel"
                        >
                          {locationPhotos[experience.name].map((photo, idx) => (
                            <div key={idx} className="popup-image">
                              <img src={photo} alt={`${experience.name} - Photo ${idx + 1}`} />
                            </div>
                          ))}
                        </Carousel>
                      </div>
                    )}
                    
                    <p className="popup-description">{getExperienceDescription(experience.name)}</p>
                    
                    <div className="popup-actions">
                      <motion.button 
                        className="popup-more-btn"
                        onClick={() => handleMarkerClick(experience)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Learn More <FaArrowRight />
                      </motion.button>
                      <motion.button 
                        className="popup-directions-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaRoute /> Get Directions
                      </motion.button>
                    </div>
                  </motion.div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          {/* Experience Sidebar */}
          <motion.div 
            className={`experience-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              {isSidebarCollapsed ? <FaChevronLeft /> : <FaChevronRight />}
            </button>
            
            {!isSidebarCollapsed && (
              <div className="sidebar-content">
                <div className="sidebar-header">
                  <h3>{activeExperience ? activeExperience.name : 'Select an Experience'}</h3>
                  {activeExperience && (
                    <span className={`tag ${activeExperience.type}`}>
                      {activeExperience.type.charAt(0).toUpperCase() + activeExperience.type.slice(1)}
                    </span>
                  )}
                </div>
                
                {activeExperience ? (
                  <div className="experience-details">
                    <div className="experience-gallery">
                      {locationPhotos[activeExperience.name] ? (
                        <Carousel
                          showThumbs={true}
                          showStatus={false}
                          showArrows={true}
                          infiniteLoop={true}
                          autoPlay={true}
                          interval={4000}
                          className="experience-carousel"
                        >
                          {locationPhotos[activeExperience.name].map((photo, idx) => (
                            <div key={idx} className="gallery-image">
                              <img src={photo} alt={`${activeExperience.name} - Photo ${idx + 1}`} />
                            </div>
                          ))}
                        </Carousel>
                      ) : (
                        <div className="experience-image">
                          <img 
                            src={`/images/${activeExperience.name.replace(/\s+/g, '-').toLowerCase()}.jpg`} 
                            alt={activeExperience.name}
                            onError={(e) => {
                              e.target.src = '/images/default-experience.jpg';
                            }}
                          />
                        </div>
                      )}
                      <div className="image-overlay">
                        <span>
                          <FaMapMarkerAlt /> {activeExperience.location}, {activeExperience.province}
                        </span>
                      </div>
                    </div>
                    
                    <div className="detail-section">
                      <div className="detail-row">
                        <span className="detail-label">
                          <FaInfoCircle /> Description:
                        </span>
                        <p className="detail-value">{getExperienceDescription(activeExperience.name)}</p>
                      </div>
                      
                      <div className="action-buttons">
                        <motion.button 
                          className="btn-directions"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaRoute /> Get Directions
                        </motion.button>
                        <motion.button 
                          className="btn-save"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaBookmark /> Save
                        </motion.button>
                        <motion.button 
                          className="btn-share"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaShareAlt /> Share
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="welcome-message">
                    <div className="welcome-content">
                      <img src="/images/sri-lanka-welcome.jpg" alt="Sri Lanka" />
                      <p>Explore authentic Sri Lankan experiences by clicking on markers or using the filters above.</p>
                    </div>
                    
                    <div className="legend">
                      <h5>Map Legend</h5>
                      <div className="legend-items">
                        <div className="legend-item">
                          <div className="legend-icon food"></div>
                          <span>Food & Drink</span>
                        </div>
                        <div className="legend-item">
                          <div className="legend-icon place"></div>
                          <span>Places</span>
                        </div>
                        <div className="legend-item">
                          <div className="legend-icon thing"></div>
                          <span>Activities</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function getExperienceDescription(name) {
  const descriptions = {
    "Temple of the Tooth": "A sacred Buddhist temple in Kandy housing the relic of the tooth of Buddha. This UNESCO World Heritage site is a must-visit for its spiritual significance and stunning architecture. Evening ceremonies with drummers and offerings are particularly atmospheric.",
    "Kandyan Dancers": "Colorful traditional dance performances with elaborate costumes and drumming. The Kandyan dance is one of Sri Lanka's most iconic cultural expressions, featuring acrobatics, intricate footwork, and vibrant masks.",
    "Ambul Thiyal": "A sour fish curry popular in the hill country, made with goraka (a souring fruit) and spices. This dish is traditionally cooked in a clay pot and has a unique tangy flavor that pairs perfectly with rice.",
    "Colombo Street Food": "Vibrant street stalls offering kottu, hoppers, and other local delights. Don't miss the egg hoppers (appa) with lunu miris sambol or the spicy isso vadai (shrimp fritters) along Galle Face Green.",
    "Gangaramaya Temple": "A famous Buddhist temple blending modern architecture and cultural elements. The temple complex includes a museum with rare artifacts and a beautiful bo tree surrounded by Buddha statues.",
    "Beeralu Lace Making": "An intricate lace craft passed down through generations in coastal towns. Visit the small workshops in Moratuwa to see artisans create delicate patterns using wooden bobbins.",
    "Galle Fort Walk": "Explore the charming Dutch fort with colonial architecture and sea views. The 400-year-old ramparts enclose boutique hotels, cafes, and artisan shops within its atmospheric streets.",
    "Kottu Roti": "Sri Lanka's famous chopped roti stir-fry with vegetables and meat. The rhythmic clanging of the metal blades as chefs prepare kottu on hot griddles is a signature sound of Sri Lankan nights.",
    "Traditional Mask Making": "Carving and painting vibrant ritual masks in Ambalangoda. These masks were traditionally used in healing rituals and folk dramas, and now make for unique souvenirs.",
    "Nallur Kovil": "A grand Hindu temple in Jaffna known for its festival. The annual Nallur Festival features processions with decorated chariots and devotees performing kavadi (penance dances).",
    "Jaffna Crab Curry": "A spicy and flavorful seafood dish from the north, cooked with roasted spices and coconut milk. The crabs from Jaffna's lagoons are particularly meaty and sweet.",
    "Palmyrah Crafts": "Handmade crafts from Palmyrah leaves, a Northern specialty. These include woven baskets, mats, and even notebooks made from the durable leaves of the palmyrah palm.",
    "Arugam Bay Surfing": "One of the world's top surfing destinations with consistent waves from May to October. The point break offers long rides perfect for intermediate surfers, with a laid-back beach vibe.",
    "Batticaloa Fish Curry": "Unique Eastern-style fish curry with coconut milk and tamarind. The local preparation uses fresh lagoon fish and a distinctive blend of spices including fenugreek and curry leaves.",
    "Fishing Catamaran": "Traditional wooden boats used by Eastern fishermen. These colorful outrigger canoes can be seen at sunrise bringing in the day's catch along the eastern coastline.",
    "Sigiriya Rock Fortress": "An ancient rock palace with frescoes and water gardens. Climb the 1,200 steps to see the famous 'mirror wall' and lion's paw gateway to this 5th-century citadel.",
    "Polonnaruwa Rice & Curry": "Hearty rice and curry dishes from the ancient city. The local version often includes jackfruit curry, brinjal moju (pickle), and coconut sambol.",
    "Stone Carvings": "Intricate stonework found in Anuradhapura and Polonnaruwa. The moonstones (sandakada pahana) with their concentric circles of animals and dancers are particularly noteworthy.",
    "Munneswaram Temple": "An ancient temple attracting pilgrims of all faiths. The temple's history dates back over 1000 years and features a massive chariot used in annual processions.",
    "Puttalam Lagoon Crab": "Delicious lagoon crab cooked in local spices. The shallow waters of Puttalam lagoon produce crabs with exceptionally sweet and tender meat.",
    "Toddy Tapping": "The art of extracting sap to make palm wine. Toddy tappers climb tall palm trees at dawn to collect the fermenting sap, which can be drunk fresh or distilled into arrack.",
    "Train to Ella": "A scenic ride through lush tea estates and mountains. The stretch from Hatton to Ella offers breathtaking views of waterfalls and misty peaks from the observation car.",
    "Hoppers (Appa)": "Crispy bowl-shaped pancakes served with sambol or curry. Try the egg hopper with a runny yolk in the center, or sweet versions with treacle and coconut milk.",
    "Tea Picking": "Experience plucking tea leaves in cool plantations. The best leaves are the 'two leaves and a bud' picked by skilled workers who harvest up to 20kg per day.",
    "Ratnapura Gem Mines": "Sri Lanka's gem capital with active mines. Visit small-scale operations where miners sift through river gravel for sapphires, rubies, and cat's eyes.",
    "Weli Thalapa": "A sweet coconut and jaggery treat wrapped in fragrant screwpine leaves. This traditional sweet has a distinctive pandan aroma and sticky, chewy texture.",
    "Gem Cutting": "Crafting precious stones into brilliant gems. Watch master cutters in Ratnapura transform rough stones into faceted jewels using techniques passed down for generations.",
    "Peradeniya Royal Botanical Gardens": "A serene and beautiful botanical garden in Kandy. It's home to a wide variety of plants and trees, making it a perfect spot for nature lovers.",
    "Dambulla Cave Temple": "A sacred Buddhist temple in Dambulla with intricate rock carvings and a large Buddha statue. It's a must-visit for its spiritual significance and stunning architecture.",
    "Kelaniya Temple": "A beautiful and serene Buddhist temple in Kelaniya. It's known for its intricate stone carvings and peaceful atmosphere.",
    "Seema Malaka Temple": "A beautiful and serene Buddhist temple in Colombo. It's known for its intricate stone carvings and peaceful atmosphere.",
    "Mulkirigala Rock Temple": "A sacred Buddhist temple in Mulkirigala with stunning rock carvings and a large Buddha statue. It's a must-visit for its spiritual significance and stunning architecture.",
    "Weligama Bay": "A beautiful and serene bay in Weligama. It's known for its calm waters and beautiful sunsets, making it a perfect spot for relaxation and photography.",
    "Nagadeepa Temple": "A sacred Buddhist temple in Jaffna with stunning rock carvings and a large Buddha statue. It's a must-visit for its spiritual significance and stunning architecture.",
    "Jaffna Fort": "A historic fort in Jaffna with a rich history and stunning views. It's a must-visit for its historical significance and beautiful architecture.",
    "Koneswaram Temple": "A beautiful and serene Buddhist temple in Trincomalee. It's known for its intricate stone carvings and peaceful atmosphere.",
    "Pasikudah Beach": "A beautiful and serene beach in Pasikudah. It's known for its calm waters and beautiful sunsets, making it a perfect spot for relaxation and photography.",
    "Anuradhapura Sacred City": "An ancient city in Anuradhapura with a rich history and stunning architecture. It's a must-visit for its historical significance and beautiful architecture.",
    "Mihintale Temple": "A sacred Buddhist temple in Mihintale with stunning rock carvings and a large Buddha statue. It's a must-visit for its spiritual significance and stunning architecture.",
    "Yapahuwa Rock Fortress": "A historic rock fortress in Yapahuwa with a rich history and stunning views. It's a must-visit for its historical significance and beautiful architecture.",
    "Panduwasnuwara": "A beautiful and serene village in Kurunegala with a rich history and beautiful architecture. It's a must-visit for its historical significance and beautiful architecture.",
    "Bogoda Wooden Bridge": "A beautiful wooden bridge in Badulla with a rich history and beautiful architecture. It's a must-visit for its historical significance and beautiful architecture.",
    "Diyaluma Falls": "A beautiful waterfall in Badulla with a rich history and beautiful architecture. It's a must-visit for its historical significance and beautiful architecture.",
    "Sinharaja Rain Forest": "A lush and beautiful rain forest in Ratnapura with a rich history and beautiful architecture. It's a must-visit for its historical significance and beautiful architecture.",
    "Belihuloya": "A beautiful and serene village in Ratnapura with a rich history and beautiful architecture. It's a must-visit for its historical significance and beautiful architecture."
  };
  return descriptions[name] || "An unforgettable Sri Lankan experience awaits you. This authentic encounter offers deep insight into the island's rich culture, history, and traditions.";
}

export default Map;