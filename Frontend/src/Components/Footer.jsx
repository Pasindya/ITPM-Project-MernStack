import React from 'react';
import '../CSS/Footer.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faTwitter,
  faLinkedin,
  faFacebook,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="footer">
      {/* Logo and Tagline Section */}
      <div className="footer-logo">
        <h2>Travel Trails</h2>
        <p>Your Journey, Our Passion</p>
      </div>

      <div className="footer-content">
        {/* Links Section */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/special-packages">Special Packages</a></li>
            <li><a href="/special-offers">Services</a></li>
            <li><a href="/blog">Things To Do</a></li>
            <li><a href="/contacts">Contacts</a></li>
          </ul>
        </div>

        {/* Contacts Section */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul>
            <li>Phone: +1 (300) 1234 6543</li>
            <li>Email: traveltrails@email.com</li>
            <li>Address: Flowe Park 336/A, Colombo, Sri Lanka</li>
          </ul>
        </div>

        {/* Tourism Hotlines Section */}
        <div className="footer-section">
          <h3>Tourism Hotlines</h3>
          <ul>
            <li>Tourism Hotline: 1912</li>
            <li>Ambulance: 1990</li>
          </ul>
        </div>

        {/* Social Media Icons Section */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} className="icon" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} className="icon" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} className="icon" />
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} className="icon" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2023 Travel Trails. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;