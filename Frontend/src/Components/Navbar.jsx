import React, { useState } from 'react';
import '../CSS/Navbar.css'; // Import the CSS file for styling
import logo from '../assets/Travel Trails.png'; // Import your round logo image

function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [essentialsOpen, setEssentialsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="TravelTrails Logo" className="logo-image" />
        <span className="logo-text">TravelTrails</span>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/places">Places</a></li>
        <li><a href="/packages">Packages</a></li>
        <li>
          <div
            className="dropdown"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <a href="/services">Services</a>
            {servicesOpen && (
              <div className="dropdown-menu">
                <a href="/transport">Transport</a>
                <a href="/guiders">Guiders</a>
                <a href="/hotels">Hotels</a>
              </div>
            )}
          </div>
        </li>
        <li><a href="/things-to-do">Things To Do</a></li>
        <li><a href="/contact">Contact</a></li>
        <li>
          <div
            className="dropdown"
            onMouseEnter={() => setEssentialsOpen(true)}
            onMouseLeave={() => setEssentialsOpen(false)}
          >
            <a href="/travel-essentials">Travel Essentials</a>
            {essentialsOpen && (
              <div className="dropdown-menu">
                <a href="/weather-tracker">Weather Tracker</a>
                <a href="/currency-converter">Currency Converter</a>
                <a href="/emergency-services">Emergency Services</a>
                <a href="/holiday-calendar">Calendar with Holidays</a>
              </div>
            )}
          </div>
        </li>
        <li><a href="/translate">Translate</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;