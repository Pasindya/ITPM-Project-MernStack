import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../CSS/Navbar.css'; // Import the CSS file for styling
import logo from '../assets/Travel Trails.png'; // Import your round logo image

function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [essentialsOpen, setEssentialsOpen] = useState(false);
  const [thingsToDoOpen, setThingsToDoOpen] = useState(false); // State for Things To Do dropdown

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="TravelTrails Logo" className="logo-image" />
        <span className="logo-text">TravelTrails</span>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/places">Places</Link></li>
        <li><Link to="/packages">Packages</Link></li>
        <li>
          <div
            className="dropdown"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link to="/services">Services</Link>
            {servicesOpen && (
              <div className="dropdown-menu">
                <Link to="/transporthome">Transport</Link>
                <Link to="/list">Guiders</Link>
                <Link to="/hotelhome">Hotels</Link>
              </div>
            )}
          </div>
        </li>
        <li>
          <div
            className="dropdown"
            onMouseEnter={() => setThingsToDoOpen(true)}
            onMouseLeave={() => setThingsToDoOpen(false)}
          >
            <Link to="/things-to-do">Things To Do</Link>
            {thingsToDoOpen && (
              <div className="dropdown-menu">
                <Link to="/event">Event</Link> {/* Only Events link under Things To Do */}
              </div>
            )}
          </div>
        </li>
        <li>
          <div
            className="dropdown"
            onMouseEnter={() => setEssentialsOpen(true)}
            onMouseLeave={() => setEssentialsOpen(false)}
          >
            <Link to="/travel-essentials">Travel Essentials</Link>
            {essentialsOpen && (
              <div className="dropdown-menu">
                <Link to="/weather">Weather Tracker</Link>
                <Link to="/currency">Currency Converter</Link>
                <Link to="/emergency-services">Emergency Services</Link>
                <Link to="/calender">Calendar with Holidays</Link>
              </div>
            )}
          </div>
        </li>
        <li><Link to="/translate">Translate</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;