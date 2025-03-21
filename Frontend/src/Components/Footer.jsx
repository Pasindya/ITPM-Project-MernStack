import React from 'react';
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
    <footer
      style={{
        backgroundColor: '#2c3e50',
        color: '#ecf0f1',
        padding: '2rem 1rem',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Logo and Tagline Section */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Travel Trails</h2>
        <p style={{ fontSize: '1.2rem', color: '#bdc3c7' }}>Your Journey, Our Passion</p>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          maxWidth: '1200px',
          margin: '0 auto',
          gap: '2rem',
        }}
      >
        {/* Links Section */}
        <div style={{ flex: 1, minWidth: '200px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <a
                href="/"
                style={{ color: '#ecf0f1', textDecoration: 'none', transition: 'color 0.3s ease' }}
                onMouseOver={(e) => (e.target.style.color = '#3498db')}
                onMouseOut={(e) => (e.target.style.color = '#ecf0f1')}
              >
                Home
              </a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a
                href="/special-packages"
                style={{ color: '#ecf0f1', textDecoration: 'none', transition: 'color 0.3s ease' }}
                onMouseOver={(e) => (e.target.style.color = '#3498db')}
                onMouseOut={(e) => (e.target.style.color = '#ecf0f1')}
              >
                Special Packages
              </a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a
                href="/special-offers"
                style={{ color: '#ecf0f1', textDecoration: 'none', transition: 'color 0.3s ease' }}
                onMouseOver={(e) => (e.target.style.color = '#3498db')}
                onMouseOut={(e) => (e.target.style.color = '#ecf0f1')}
              >
                Services
              </a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a
                href="/blog"
                style={{ color: '#ecf0f1', textDecoration: 'none', transition: 'color 0.3s ease' }}
                onMouseOver={(e) => (e.target.style.color = '#3498db')}
                onMouseOut={(e) => (e.target.style.color = '#ecf0f1')}
              >
                Things To Do
              </a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a
                href="/contacts"
                style={{ color: '#ecf0f1', textDecoration: 'none', transition: 'color 0.3s ease' }}
                onMouseOver={(e) => (e.target.style.color = '#3498db')}
                onMouseOut={(e) => (e.target.style.color = '#ecf0f1')}
              >
                Contacts
              </a>
            </li>
          </ul>
        </div>

        {/* Contacts Section */}
        <div style={{ flex: 1, minWidth: '200px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Contact Us</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>Phone: +1 (300) 1234 6543</li>
            <li style={{ marginBottom: '0.5rem' }}>Email: traveltrails@email.com</li>
            <li style={{ marginBottom: '0.5rem' }}>Address: Flowe Park 336/A, Colombo, Sri Lanka</li>
          </ul>
        </div>

        {/* Tourism Hotlines Section */}
        <div style={{ flex: 1, minWidth: '200px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Tourism Hotlines</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>Tourism Hotline: 1912</li>
            <li style={{ marginBottom: '0.5rem' }}>Ambulance: 1990</li>
          </ul>
        </div>

        {/* Social Media Icons Section */}
        <div style={{ flex: 1, minWidth: '200px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Follow Us</h3>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-start',
            }}
          >
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ecf0f1', transition: 'color 0.3s ease' }}
              onMouseOver={(e) => (e.target.style.color = '#3498db')}
              onMouseOut={(e) => (e.target.style.color = '#ecf0f1')}
            >
              <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '1.5rem' }} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ecf0f1', transition: 'color 0.3s ease' }}
              onMouseOver={(e) => (e.target.style.color = '#3498db')}
              onMouseOut={(e) => (e.target.style.color = '#ecf0f1')}
            >
              <FontAwesomeIcon icon={faTwitter} style={{ fontSize: '1.5rem' }} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ecf0f1', transition: 'color 0.3s ease' }}
              onMouseOver={(e) => (e.target.style.color = '#3498db')}
              onMouseOut={(e) => (e.target.style.color = '#ecf0f1')}
            >
              <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '1.5rem' }} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ecf0f1', transition: 'color 0.3s ease' }}
              onMouseOver={(e) => (e.target.style.color = '#3498db')}
              onMouseOut={(e) => (e.target.style.color = '#ecf0f1')}
            >
              <FontAwesomeIcon icon={faFacebook} style={{ fontSize: '1.5rem' }} />
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ecf0f1', transition: 'color 0.3s ease' }}
              onMouseOver={(e) => (e.target.style.color = '#3498db')}
              onMouseOut={(e) => (e.target.style.color = '#ecf0f1')}
            >
              <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: '1.5rem' }} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '2rem',
          paddingTop: '1rem',
          borderTop: '1px solid #34495e',
        }}
      >
        <p style={{ fontSize: '0.9rem', color: '#bdc3c7' }}>
          &copy; 2023 Travel Trails. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;