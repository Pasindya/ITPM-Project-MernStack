import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../CSS/Welcome.css'; // Import the CSS file for styling

function Welcome() {
  const images = [
    {
      src: '/Images/si.jpg',
      description: 'Discover breathtaking landscapes.',
    },
    {
      src: '/Images/nine.jpg',
      description: 'Experience vibrant cultures.',
    },
    {
      src: '/Images/eleph.jpg',
      description: 'Create unforgettable memories.',
    },
    {
      src: '/Images/dem.jpg',
      description: 'Explore hidden gems.',
    },
    {
      src: '/Images/surf.jpg',
      description: 'Adventure awaits you.',
    },
    {
      src: '/Images/clfo.jpg', // Add food image
      description: 'Savor delicious local cuisines.',
    },
    {
      src: '/Images/ing.jpg', // Add food image
      description: 'Taste the flavors of the world.',
    },
    {
      src: '/Images/cul.jpg', // Add event image
      description: 'Join exciting cultural events.',
    },
    {
      src: '/Images/dance.jpg', // Add event image
      description: 'Celebrate traditions and festivals.',
    },
    {
      src: '/Images/water.jpg', // Add culture image
      description: 'Immerse yourself in rich heritage.',
    },
    {
      src: '/Images/sl.jpg', // Add culture image
      description: 'Discover the soul of the land.',
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  return (
    <div className="welcome-container">
      {/* Image Background */}
      <div
        className="image-background"
        style={{ backgroundImage: `url(${images[currentImageIndex].src})` }}
      ></div>

      {/* Overlay Content */}
      <div className="welcome-overlay">
        <h1>Welcome to Travel Trails</h1>
        <p>{images[currentImageIndex].description}</p>
        <button className="explore-button" onClick={() => navigate('/home')}>
          Explore More
        </button>
      </div>
    </div>
  );
}

export default Welcome;