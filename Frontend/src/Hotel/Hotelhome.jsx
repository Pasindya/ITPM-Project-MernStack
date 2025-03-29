import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const PageContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #333;
  line-height: 1.6;
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), 
              url('/HotelImages/wildcost.jpg') center/cover no-repeat;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
  margin-bottom: 80px;

  &::after {
    content: '';
    position: absolute;
    bottom: -50px;
    left: 0;
    width: 100%;
    height: 100px;
    background: white;
    clip-path: polygon(0 0, 100% 50%, 100% 100%, 0% 100%);
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 40px;
  animation: ${fadeIn} 1s ease-out;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 20px;
  font-weight: 700;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  color: white;
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 40px;
  font-weight: 300;
`;

const SearchContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  max-width: 1000px;
  margin: -80px auto 80px;
  position: relative;
  z-index: 10;
  animation: ${fadeIn} 0.8s ease-out 0.2s both;
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #2c3e50;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s;

  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    outline: none;
  }
`;

const SelectField = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 1em;
  transition: all 0.3s;

  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    outline: none;
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background: linear-gradient(135deg, #2980b9, #3498db);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: white;
  color: #3498db;
  border: 1px solid #3498db;

  &:hover {
    background: #f8f9fa;
    color: #2980b9;
    border-color: #2980b9;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 60px;
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 600;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #3498db, #2ecc71);
    margin: 20px auto 0;
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 60px;
  color: #7f8c8d;
  font-size: 1.1rem;
  line-height: 1.8;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
`;

const HotelCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
`;

const HotelImage = styled.div`
  height: 250px;
  background: url(${props => props.image}) center/cover no-repeat;
  position: relative;
`;

const HotelRating = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    content: '★';
    color: #f1c40f;
  }
`;

const HotelContent = styled.div`
  padding: 25px;
`;

const HotelTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 1.4rem;
  color: #2c3e50;
`;

const HotelLocation = styled.p`
  color: #7f8c8d;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    content: '📍';
  }
`;

const HotelDescription = styled.p`
  margin-bottom: 20px;
  color: #555;
  line-height: 1.7;
`;

const HotelPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const PriceText = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;

  span {
    font-size: 0.9rem;
    font-weight: 400;
    color: #7f8c8d;
  }
`;

const FeaturesSection = styled.section`
  background: #f8f9fa;
  padding: 80px 0;
  margin: 80px 0;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 40px 30px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #3498db;
`;

const FeatureTitle = styled.h4`
  margin: 0 0 15px;
  font-size: 1.3rem;
  color: #2c3e50;
`;

const FeatureText = styled.p`
  color: #7f8c8d;
  line-height: 1.7;
  margin: 0;
`;

const TestimonialCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  margin-bottom: 30px;

  &::before {
    content: '"';
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 4rem;
    color: rgba(52, 152, 219, 0.1);
    font-family: serif;
    line-height: 1;
  }
`;

const TestimonialHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const TestimonialImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
  border: 3px solid #3498db;
`;

const TestimonialAuthor = styled.div`
  h5 {
    margin: 0 0 5px;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    color: #7f8c8d;
    font-size: 0.9rem;
  }
`;

const TestimonialRating = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 5px;

  span {
    color: #f1c40f;
    font-size: 1.1rem;
  }
`;

const TestimonialText = styled.p`
  font-style: italic;
  color: #555;
  line-height: 1.7;
  padding-left: 20px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background: linear-gradient(to bottom, #3498db, #2ecc71);
    border-radius: 3px;
  }
`;

const TipsSection = styled.section`
  background: linear-gradient(135deg, #3498db, #2ecc71);
  padding: 80px 0;
  color: white;
`;

const TipCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-5px);
  }
`;

const TipTitle = styled.h4`
  margin: 0 0 15px;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '💡';
  }
`;

const TipText = styled.p`
  margin: 0;
  line-height: 1.7;
  opacity: 0.9;
`;

const CtaSection = styled.section`
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), 
              url('/HotelImages/shangi.jpg') center/cover no-repeat;
  padding: 100px 0;
  text-align: center;
  color: white;
  position: relative;
`;

const CtaContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const CtaTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  animation: ${pulse} 2s infinite;
`;

const CtaText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
  line-height: 1.8;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

// Modal Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #7f8c8d;
`;

const BookingForm = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const BookingTitle = styled.h2`
  margin-top: 0;
  color: #2c3e50;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BookingInfo = styled.div`
  margin-bottom: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const InfoLabel = styled.span`
  flex: 1;
  color: #7f8c8d;
`;

const InfoValue = styled.span`
  flex: 2;
  font-weight: 500;
`;

const PriceValue = styled(InfoValue)`
  color: #e74c3c;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #2c3e50;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  border-color: ${props => props.error ? '#e74c3c' : '#ddd'};
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const ErrorText = styled.p`
  color: #e74c3c;
  font-size: 12px;
  margin: 5px 0 0;
`;

const SubmitError = styled.div`
  color: #e74c3c;
  margin-bottom: 15px;
  text-align: center;
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 10px;
  background-color: #d4edda;
  color: #155724;
  border-radius: 5px;
  margin-bottom: 15px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${props => props.disabled ? '#95a5a6' : '#2ecc71'};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-weight: 600;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.disabled ? '#95a5a6' : '#27ae60'};
  }
`;

function HotelHome() {
  const navigate = useNavigate();
  
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
  const featuredHotels = [
    {
      id: 1,
      name: "Cinnamon Grand Colombo",
      location: "Colombo",
      price: 250,
      rating: 4.8,
      image: "/HotelImages/cinnomon.jpg",
      description: "Luxury 5-star hotel in the heart of Colombo with ocean views and world-class amenities.",
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
    }
  ];

  // Customer testimonials
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      country: "Australia",
      comment: "The hotels in Sri Lanka exceeded all my expectations. The hospitality was incredible and the locations were breathtaking. We stayed at three different properties and each was unique and memorable.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      country: "Singapore",
      comment: "From budget stays to luxury resorts, Sri Lanka offers amazing value. The service is impeccable and the food is delicious. Can't wait to return next year!",
      rating: 4,
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Emma Williams",
      country: "UK",
      comment: "The boutique hotels in Sri Lanka's hill country provided such authentic experiences. Waking up to misty mountains and enjoying fresh tea from the estate was magical.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  ];

  // Travel tips
  const travelTips = [
    {
      title: "Best Time to Visit",
      content: "The west and south coasts are best from December to April, while the east coast shines from May to September. Hill country is pleasant year-round."
    },
    {
      title: "Cultural Etiquette",
      content: "Dress modestly when visiting temples (shoulders and knees covered). Remove shoes before entering religious sites and avoid turning your back to Buddha statues."
    },
    {
      title: "Local Cuisine",
      content: "Don't miss trying hoppers, kottu roti, and fresh seafood. Sri Lankan curries are legendary - ask for 'mild' if you're sensitive to spice."
    },
    {
      title: "Transport Tips",
      content: "Private drivers are affordable and convenient. Trains offer scenic journeys (book 1st class for hill country routes). Tuk-tuks are great for short distances."
    }
  ];

  // Features
  const features = [
    {
      icon: "🏖️",
      title: "Beachfront Locations",
      text: "Many hotels are situated on pristine beaches with private access and stunning ocean views."
    },
    {
      icon: "🍽️",
      title: "Authentic Cuisine",
      text: "Experience world-renowned Sri Lankan hospitality and delicious local cuisine at every property."
    },
    {
      icon: "💰",
      title: "Great Value",
      text: "Luxury accommodations at surprisingly affordable prices compared to other tropical destinations."
    },
    {
      icon: "🌿",
      title: "Eco-Friendly",
      text: "Many properties emphasize sustainability and harmony with Sri Lanka's incredible natural beauty."
    }
  ];

  // Get unique locations for filter
  const locations = [...new Set(featuredHotels.map(hotel => hotel.location))];

  // Filter hotels based on search and filters
  const filteredHotels = featuredHotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         hotel.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = priceFilter === 'all' || 
                       (priceFilter === 'low' && hotel.price < 100) ||
                       (priceFilter === 'medium' && hotel.price >= 100 && hotel.price < 200) ||
                       (priceFilter === 'high' && hotel.price >= 200);
    const matchesLocation = locationFilter === 'all' || hotel.location === locationFilter;
    
    return matchesSearch && matchesPrice && matchesLocation;
  });

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

      const response = await axios.post('http://localhost:5000/hbookings', bookingData);

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(response.data.message || 'Booking failed');
      }

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
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Discover Sri Lankan Hospitality</HeroTitle>
          <HeroSubtitle>Luxury stays amidst ancient wonders, tropical beaches, and lush hill country</HeroSubtitle>
          <PrimaryButton onClick={() => navigate('/hotels')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Explore Destinations
          </PrimaryButton>
        </HeroContent>
      </HeroSection>

      {/* Search Section */}
      <SearchContainer>
        <SearchForm>
          <InputGroup>
            <InputLabel>Destination</InputLabel>
            <SelectField
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="all">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </SelectField>
          </InputGroup>
          
          <InputGroup>
            <InputLabel>Price Range</InputLabel>
            <SelectField
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="low">Budget (Under $100)</option>
              <option value="medium">Mid-Range ($100-$200)</option>
              <option value="high">Luxury ($200+)</option>
            </SelectField>
          </InputGroup>
          
          <InputGroup>
            <InputLabel>Check-in</InputLabel>
            <InputField 
              type="date" 
              min={minDate}
            />
          </InputGroup>
          
          <InputGroup>
            <InputLabel>Check-out</InputLabel>
            <InputField 
              type="date" 
              min={minDate}
            />
          </InputGroup>
          
          <PrimaryButton type="button" onClick={() => setSearchTerm('')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            Search Hotels
          </PrimaryButton>
        </SearchForm>
      </SearchContainer>

      {/* Featured Hotels */}
      <Container>
        <SectionTitle>Featured Hotels</SectionTitle>
        <SectionSubtitle>
          Discover our hand-picked selection of Sri Lanka's finest accommodations, from beachfront resorts to jungle hideaways.
        </SectionSubtitle>
        
        <Grid>
          {filteredHotels.map(hotel => (
            <HotelCard key={hotel.id}>
              <HotelImage image={hotel.image}>
                <HotelRating>{hotel.rating}</HotelRating>
              </HotelImage>
              <HotelContent>
                <HotelTitle>{hotel.name}</HotelTitle>
                <HotelLocation>{hotel.location}</HotelLocation>
                <HotelDescription>{hotel.description}</HotelDescription>
                <HotelPrice>
                  <PriceText>${hotel.price}<span>/night</span></PriceText>
                  <SecondaryButton onClick={() => handleViewDetails(hotel)}>
                    View Details
                  </SecondaryButton>
                </HotelPrice>
              </HotelContent>
            </HotelCard>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <FeaturesSection>
        <Container>
          <SectionTitle>Why Choose Sri Lanka?</SectionTitle>
          <SectionSubtitle>
            Sri Lanka offers a diverse range of accommodations to suit every traveler's needs, with exceptional service and unforgettable experiences.
          </SectionSubtitle>
          
          <FeatureGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureText>{feature.text}</FeatureText>
              </FeatureCard>
            ))}
          </FeatureGrid>
        </Container>
      </FeaturesSection>

      {/* Testimonials */}
      <Container>
        <SectionTitle>Guest Experiences</SectionTitle>
        <SectionSubtitle>
          Hear from travelers who've experienced the warmth of Sri Lankan hospitality firsthand.
        </SectionSubtitle>
        
        <Grid>
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id}>
              <TestimonialHeader>
                <TestimonialImage src={testimonial.image} alt={testimonial.name} />
                <TestimonialAuthor>
                  <h5>{testimonial.name}</h5>
                  <p>{testimonial.country}</p>
                  <TestimonialRating>
                    {Array(testimonial.rating).fill().map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </TestimonialRating>
                </TestimonialAuthor>
              </TestimonialHeader>
              <TestimonialText>{testimonial.comment}</TestimonialText>
            </TestimonialCard>
          ))}
        </Grid>
      </Container>

      {/* Travel Tips */}
      <TipsSection>
        <Container>
          <SectionTitle style={{color: 'white'}}>Sri Lanka Travel Tips</SectionTitle>
          <SectionSubtitle style={{color: 'rgba(255,255,255,0.8)'}}>
            Make the most of your Sri Lankan adventure with these helpful tips from our travel experts.
          </SectionSubtitle>
          
          <Grid>
            {travelTips.map((tip, index) => (
              <TipCard key={index}>
                <TipTitle>{tip.title}</TipTitle>
                <TipText>{tip.content}</TipText>
              </TipCard>
            ))}
          </Grid>
        </Container>
      </TipsSection>

      {/* Call to Action */}
      <CtaSection>
        <CtaContent>
          <CtaTitle>Ready for Your Sri Lankan Adventure?</CtaTitle>
          <CtaText>
            Whether you're dreaming of beachfront luxury, jungle safaris, or cultural discoveries, we'll help you find the perfect accommodation for your journey.
          </CtaText>
          <ButtonGroup>
            <PrimaryButton>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Contact Our Experts
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate('/hotels')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
              Book Now
            </SecondaryButton>
          </ButtonGroup>
        </CtaContent>
      </CtaSection>

      {/* Hotel Details Modal */}
      {showDetailsModal && selectedHotel && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={() => setShowDetailsModal(false)}>
              ×
            </CloseButton>
            
            <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
              <div style={{flex: '1', minWidth: '300px'}}>
                <img 
                  src={selectedHotel.image} 
                  alt={selectedHotel.name}
                  style={{width: '100%', height: 'auto', borderRadius: '8px', objectFit: 'cover'}}
                />
              </div>
              <div style={{flex: '1', minWidth: '300px'}}>
                <h2 style={{marginTop: 0, color: '#2c3e50'}}>{selectedHotel.name}</h2>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '15px'}}>
                  <span style={{marginRight: '5px'}}>📍</span>
                  <span>{selectedHotel.location}</span>
                </div>
                <div style={{display: 'inline-flex', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.05)', padding: '5px 10px', borderRadius: '20px', marginBottom: '15px'}}>
                  <span style={{color: '#f1c40f', marginRight: '5px'}}>★</span>
                  <span>{selectedHotel.rating}</span>
                </div>
                <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#e74c3c', marginBottom: '15px'}}>
                  ${selectedHotel.price} <span style={{fontSize: '1rem', fontWeight: 'normal', color: '#7f8c8d'}}>per night</span>
                </div>
                <div style={{marginBottom: '15px'}}>
                  <span style={{marginRight: '5px'}}>📞</span>
                  {selectedHotel.contact}
                </div>
                <PrimaryButton 
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleBookNow(selectedHotel);
                  }}
                >
                  Book Now
                </PrimaryButton>
              </div>
            </div>
            
            <div style={{marginTop: '20px'}}>
              <h3 style={{color: '#2c3e50', borderBottom: '1px solid #eee', paddingBottom: '10px'}}>Description</h3>
              <p style={{color: '#34495e', lineHeight: '1.6'}}>{selectedHotel.description}</p>
            </div>
            
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px'}}>
              <div style={{flex: '1', minWidth: '250px'}}>
                <h3 style={{color: '#2c3e50', borderBottom: '1px solid #eee', paddingBottom: '10px'}}>Amenities</h3>
                <ul style={{paddingLeft: '20px', color: '#34495e'}}>
                  {selectedHotel.amenities.map((amenity, index) => (
                    <li key={index} style={{marginBottom: '8px'}}>{amenity}</li>
                  ))}
                </ul>
              </div>
              
              <div style={{flex: '1', minWidth: '250px'}}>
                <h3 style={{color: '#2c3e50', borderBottom: '1px solid #eee', paddingBottom: '10px'}}>Room Types</h3>
                <ul style={{paddingLeft: '20px', color: '#34495e'}}>
                  {selectedHotel.rooms.map((room, index) => (
                    <li key={index} style={{marginBottom: '8px'}}>{room}</li>
                  ))}
                </ul>
              </div>
              
              <div style={{flex: '1', minWidth: '250px'}}>
                <h3 style={{color: '#2c3e50', borderBottom: '1px solid #eee', paddingBottom: '10px'}}>Policies</h3>
                <ul style={{paddingLeft: '20px', color: '#34495e'}}>
                  {selectedHotel.policies.map((policy, index) => (
                    <li key={index} style={{marginBottom: '8px'}}>{policy}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Booking Form Popup */}
      {showBookingForm && selectedHotel && (
        <ModalOverlay>
          <BookingForm>
            <BookingTitle>
              Book {selectedHotel.name}
              <CloseButton onClick={() => setShowBookingForm(false)}>
                ×
              </CloseButton>
            </BookingTitle>
            
            <BookingInfo>
              <InfoRow>
                <InfoLabel>Location:</InfoLabel>
                <InfoValue>{selectedHotel.location}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Price:</InfoLabel>
                <PriceValue>${selectedHotel.price}/night</PriceValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Contact:</InfoLabel>
                <InfoValue>{selectedHotel.contact}</InfoValue>
              </InfoRow>
            </BookingInfo>
            
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel>Check-In Date *</FormLabel>
                <FormInput 
                  type="date" 
                  name="checkIn"
                  min={minDate}
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  error={formErrors.checkIn}
                  required
                />
                {formErrors.checkIn && (
                  <ErrorText>{formErrors.checkIn}</ErrorText>
                )}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Check-Out Date *</FormLabel>
                <FormInput 
                  type="date" 
                  name="checkOut"
                  min={minCheckOutDate}
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  error={formErrors.checkOut}
                  required
                />
                {formErrors.checkOut && (
                  <ErrorText>{formErrors.checkOut}</ErrorText>
                )}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Guests *</FormLabel>
                <FormSelect
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  required
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5+">5+ Guests</option>
                </FormSelect>
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Full Name *</FormLabel>
                <FormInput 
                  type="text" 
                  name="name"
                  placeholder="Your full name (letters only)"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={formErrors.name}
                  required
                />
                {formErrors.name && (
                  <ErrorText>{formErrors.name}</ErrorText>
                )}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Email *</FormLabel>
                <FormInput 
                  type="email" 
                  name="email"
                  placeholder="Your @gmail.com or @yahoo.com email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={formErrors.email}
                  required
                />
                {formErrors.email && (
                  <ErrorText>{formErrors.email}</ErrorText>
                )}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Phone Number *</FormLabel>
                <FormInput 
                  type="tel" 
                  name="phone"
                  placeholder="Your 10-digit phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={formErrors.phone}
                  required
                />
                {formErrors.phone && (
                  <ErrorText>{formErrors.phone}</ErrorText>
                )}
              </FormGroup>
              
              {formErrors.submit && (
                <SubmitError>
                  {formErrors.submit}
                </SubmitError>
              )}
              
              {submitSuccess ? (
                <SuccessMessage>
                  Booking submitted successfully!
                </SuccessMessage>
              ) : (
                <SubmitButton
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                </SubmitButton>
              )}
            </form>
          </BookingForm>
        </ModalOverlay>
      )}
    </PageContainer>
  );
}

export default HotelHome;