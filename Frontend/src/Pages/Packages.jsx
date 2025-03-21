import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Packages.css'

function Packages() {
  const packages = [
    {
      id: 1,
      name: 'Cultural Heritage Tour',
      destination: 'Kandy, Sigiriya, Anuradhapura',
      duration: '7 Days',
      price: '$1200',
      image: '/Images/Kandy.jpg',
      link: '/cultural',
    },
    {
      id: 2,
      name: 'Beach Paradise Getaway',
      destination: 'Mirissa, Unawatuna, Bentota',
      duration: '5 Days',
      price: '$900',
      image: '/Images/galle.jpg',
      link: '/beach',
    },
    {
      id: 3,
      name: 'Wildlife Safari Adventure',
      destination: 'Yala, Udawalawe, Wilpattu',
      duration: '4 Days',
      price: '$800',
      image: '/Images/saF.jpg',
      link: '/safari',
    },
    {
      id: 4,
      name: 'Hill Country Escape',
      destination: 'Nuwara Eliya, Ella, Horton Plains',
      duration: '6 Days',
      price: '$1100',
      image: '/Images/mount.jpg',
      link: '/hill',
    },
    {
      id: 5,
      name: 'Ayurveda & Wellness Retreat',
      destination: 'Beruwala, Ahungalla, Tangalle',
      duration: '5 Days',
      price: '$1000',
      image: '/Images/ayu.jpg',
      link: '/ayurveda-wellness-retreat',
    },
    {
      id: 6,
      name: 'Adventure & Trekking Expedition',
      destination: 'Adam\'s Peak, Knuckles Range, Sinharaja Forest',
      duration: '8 Days',
      price: '$1500',
      image: '/Images/adams.jpg',
      link: '/adventure-trekking-expedition',
    },
  ];

  return (
    <div className="packages">
      <h1>Travel Packages</h1>
      <div className="package-grid">
        {packages.map((pkg) => (
          <div key={pkg.id} className="package-card">
            <img src={pkg.image} alt={pkg.name} />
            <h2>{pkg.name}</h2>
            <p><strong>Destination:</strong> {pkg.destination}</p>
            <p><strong>Duration:</strong> {pkg.duration}</p>
            <p><strong>Price:</strong> {pkg.price}</p>
            <Link to={pkg.link}>
              <button className="book-button">View More</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Packages;