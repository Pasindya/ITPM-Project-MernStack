import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../CSS/Home.css'; // Import the CSS file for styling

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleBookNowClick = () => {
    navigate('/packages'); // Navigate to the packages page
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero-section">
        <video autoPlay loop muted className="hero-video">
          <source src="/video/turt.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-content">
          <h1>Welcome to Sri Lanka</h1>
          <p>Discover the pearl of the Indian Ocean.</p>
        </div>
      </div>

      {/* Popular Destinations Section */}
      <div className="section">
        <h2>Popular Destinations</h2>
        <div className="destination-grid">
          <div className="destination-card">
            <img src="/Images/si.jpg" alt="Sigiriya" />
            <h3>Sigiriya</h3>
            <p>Explore the ancient rock fortress.</p>
          </div>
          <div className="destination-card">
            <img src="/Images/Kandy.jpg" alt="Kandy" />
            <h3>Kandy</h3>
            <p>Visit the Temple of the Sacred Tooth Relic.</p>
          </div>
          <div className="destination-card">
            <img src="/Images/nine.jpg" alt="Ella" />
            <h3>Ella</h3>
            <p>Hike to the iconic Nine Arches Bridge.</p>
          </div>
        </div>
      </div>

      {/* Cultural Highlights Section */}
      <div className="section">
        <h2>Cultural Highlights</h2>
        <div className="culture-grid">
          <div className="culture-card">
            <img src="/Images/dance.jpg" alt="Traditional Dance" />
            <h3>Traditional Dance</h3>
            <p>Experience vibrant cultural performances.</p>
          </div>
          <div className="culture-card">
            <img src="/Images/pera.jpg" alt="Festivals" />
            <h3>Festivals</h3>
            <p>Celebrate Sri Lanka's rich traditions.</p>
          </div>
          <div className="culture-card">
            <img src="/Images/temple.jpeg" alt="Temples" />
            <h3>Temples</h3>
            <p>Discover ancient Buddhist temples.</p>
          </div>
        </div>
      </div>

      {/* Cuisine Section */}
      <div className="section">
        <h2>Sri Lankan Cuisine</h2>
        <div className="cuisine-grid">
          <div className="cuisine-card">
            <img src="/Images/lkfood.jpg" alt="Rice and Curry" />
            <h3>Rice and Curry</h3>
            <p>Savor the island's staple dish.</p>
          </div>
          <div className="cuisine-card">
            <img src="/Images/hopp.jpg" alt="Hoppers" />
            <h3>Hoppers</h3>
            <p>Try this delicious Sri Lankan pancake.</p>
          </div>
          <div className="cuisine-card">
            <img src="/Images/kottu.jpg" alt="Kottu Roti" />
            <h3>Kottu Roti</h3>
            <p>Enjoy the island's favorite street food.</p>
          </div>
        </div>
      </div>

      {/* Adventure Activities Section */}
      <div className="section">
        <h2>Adventure Activities</h2>
        <div className="adventure-grid">
          <div className="adventure-card">
            <img src="/Images/surf.jpg" alt="Surfing" />
            <h3>Surfing</h3>
            <p>Ride the waves in Arugam Bay.</p>
          </div>
          <div className="adventure-card">
            <img src="/Images/saF.jpg" alt="Safari" />
            <h3>Safari</h3>
            <p>Spot elephants and leopards in Yala National Park.</p>
          </div>
          <div className="adventure-card">
            <img src="/Images/hiking.jpg" alt="Hiking" />
            <h3>Hiking</h3>
            <p>Climb Adam's Peak for breathtaking views.</p>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="cta-section">
        <h2>Ready to Explore Sri Lanka?</h2>
        <p>Start planning your dream trip today.</p>
        <button className="cta-button" onClick={handleBookNowClick}>Book Now</button>
      </div>
    </div>
  );
};

export default Home;