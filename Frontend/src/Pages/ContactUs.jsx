import React, { useRef, useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

function ContactUs() {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [error, setError] = useState(null);

  // Initialize EmailJS (important for proper connection)
  emailjs.init('63PE0QPVRuYXu8js5'); // Your public key

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    emailjs.sendForm(
      'service_fjr4z0a', // Your service ID
      'template_hbdtiyr', // Your template ID
      form.current,
      '63PE0QPVRuYXu8js5' // Your public key
    )
    .then((result) => {
      console.log('Email successfully sent!', result.text);
      setMessageSent(true);
      form.current.reset();
    }, (error) => {
      console.error('Email send error:', error.text);
      setError('Failed to send message. Please try again later or contact us directly at traveltrailslanka@outlook.com');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: '#f5f7fa',
      minHeight: '100vh'
    }}>
      {/* Hero Section with Sri Lanka Image */}
      <div style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/Images/ti.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        borderRadius: '10px',
        marginBottom: '3rem',
        textAlign: 'center',
        padding: '0 1rem'
      }}>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          fontWeight: '700',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>Contact Travel Trail Sri Lanka</h1>
        <p style={{
          fontSize: '1.2rem',
          maxWidth: '700px',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
        }}>We're here to help you plan your perfect Sri Lankan adventure. Reach out to us with any questions!</p>
      </div>
      
      {messageSent ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          backgroundColor: '#e8f5e9',
          borderRadius: '8px',
          marginBottom: '3rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ 
            color: '#2e7d32', 
            marginBottom: '1rem',
            fontSize: '1.8rem'
          }}>Thank you for your message!</h3>
          <p style={{ 
            color: '#2e7d32', 
            marginBottom: '1.5rem',
            fontSize: '1.1rem'
          }}>Our team will get back to you within 24 hours.</p>
          <button 
            onClick={() => setMessageSent(false)}
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              fontWeight: '600'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#3d8b40'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4caf50'}
          >
            Send another message
          </button>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          marginBottom: '3rem'
        }}>
          {/* Contact Form */}
          <form 
            ref={form} 
            onSubmit={sendEmail}
            style={{
              flex: '1',
              minWidth: '300px',
              backgroundColor: 'white',
              padding: '2.5rem',
              borderRadius: '8px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}
          >
            <h2 style={{
              color: '#2c3e50',
              marginBottom: '2rem',
              fontSize: '1.8rem',
              textAlign: 'center'
            }}>Send Us a Message</h2>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="name" style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#34495e'
              }}>Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="user_name" 
                required 
                placeholder="John Doe"
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'border 0.3s ease'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="email" style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#34495e'
              }}>Your Email</label>
              <input 
                type="email" 
                id="email" 
                name="user_email" 
                required 
                placeholder="john@example.com"
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'border 0.3s ease'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="subject" style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#34495e'
              }}>Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                required 
                placeholder="How can we help?"
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'border 0.3s ease'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="message" style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#34495e'
              }}>Your Message</label>
              <textarea 
                id="message" 
                name="message" 
                required 
                rows="6" 
                placeholder="Tell us more about your inquiry..."
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                  transition: 'border 0.3s ease'
                }}
              ></textarea>
            </div>
            
            {error && (
              <div style={{
                color: '#c62828',
                backgroundColor: '#ffebee',
                padding: '0.8rem',
                borderRadius: '4px',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              style={{
                width: '100%',
                backgroundColor: isSubmitting ? '#95a5a6' : '#3498db',
                color: 'white',
                border: 'none',
                padding: '1rem',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseOver={(e) => !isSubmitting && (e.target.style.backgroundColor = '#2980b9')}
              onMouseOut={(e) => !isSubmitting && (e.target.style.backgroundColor = '#3498db')}
            >
              {isSubmitting ? 'Sending...' : (
                <>
                  <FaPaperPlane /> Send Message
                </>
              )}
            </button>
          </form>
          
          {/* Contact Information */}
          <div style={{
            flex: '1',
            minWidth: '300px',
            backgroundColor: 'white',
            padding: '2.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              color: '#2c3e50',
              marginBottom: '2rem',
              fontSize: '1.8rem',
              textAlign: 'center'
            }}>Our Information</h2>
            
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#e3f2fd',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  flexShrink: '0'
                }}>
                  <FaEnvelope style={{ color: '#1976d2', fontSize: '1.2rem' }} />
                </div>
                <div>
                  <p style={{
                    margin: '0',
                    color: '#7f8c8d',
                    fontSize: '0.9rem'
                  }}>Email us at</p>
                  <p style={{
                    margin: '0',
                    fontWeight: '600',
                    color: '#2c3e50',
                    fontSize: '1.1rem'
                  }}>traveltrailslanka@outlook.com</p>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#e8f5e9',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  flexShrink: '0'
                }}>
                  <FaPhone style={{ color: '#388e3c', fontSize: '1.2rem' }} />
                </div>
                <div>
                  <p style={{
                    margin: '0',
                    color: '#7f8c8d',
                    fontSize: '0.9rem'
                  }}>Call us at</p>
                  <p style={{
                    margin: '0',
                    fontWeight: '600',
                    color: '#2c3e50',
                    fontSize: '1.1rem'
                  }}>+94 76 123 4567</p>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#fff3e0',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  flexShrink: '0'
                }}>
                  <FaMapMarkerAlt style={{ color: '#e65100', fontSize: '1.2rem' }} />
                </div>
                <div>
                  <p style={{
                    margin: '0',
                    color: '#7f8c8d',
                    fontSize: '0.9rem'
                  }}>Visit us at</p>
                  <p style={{
                    margin: '0',
                    fontWeight: '600',
                    color: '#2c3e50',
                    fontSize: '1.1rem'
                  }}>Flower Park 336/A<br />Colombo, Sri Lanka</p>
                </div>
              </div>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                color: '#2c3e50',
                marginBottom: '1.5rem',
                fontSize: '1.3rem',
                textAlign: 'center'
              }}>Business Hours</h3>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid #eee',
                padding: '0.8rem 0'
              }}>
                <span style={{ color: '#7f8c8d' }}>Monday - Friday</span>
                <span style={{ fontWeight: '600' }}>9:00 AM - 6:00 PM</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid #eee',
                padding: '0.8rem 0'
              }}>
                <span style={{ color: '#7f8c8d' }}>Saturday</span>
                <span style={{ fontWeight: '600' }}>10:00 AM - 4:00 PM</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.8rem 0'
              }}>
                <span style={{ color: '#7f8c8d' }}>Sunday</span>
                <span style={{ fontWeight: '600' }}>Closed</span>
              </div>
            </div>
            
            <div>
              <h3 style={{
                color: '#2c3e50',
                marginBottom: '1.5rem',
                fontSize: '1.3rem',
                textAlign: 'center'
              }}>Follow Us</h3>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem'
              }}>
                <a href="#" style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#3b5998',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
                >
                  <FaFacebook />
                </a>
                <a href="#" style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#1da1f2',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
                >
                  <FaTwitter />
                </a>
                <a href="#" style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#e1306c',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Sri Lanka Map Section */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        marginBottom: '3rem'
      }}>
        <h2 style={{
          color: '#2c3e50',
          padding: '1.5rem',
          margin: '0',
          fontSize: '1.8rem',
          textAlign: 'center',
          borderBottom: '1px solid #eee'
        }}>Our Location in Sri Lanka</h2>
        <div style={{ height: '400px' }}>
          <iframe 
            title="Sri Lanka Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126325.25985867915!2d79.78616430000001!3d6.9344026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo!5e0!3m2!1sen!2slk!4v1620000000000!5m2!1sen!2slk" 
            width="100%" 
            height="100%" 
            style={{ border: '0' }} 
            allowFullScreen="" 
            loading="lazy"
          ></iframe>
        </div>
      </div>
      
      {/* Additional Sri Lanka Photo */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
        marginBottom: '3rem'
      }}>
        <img 
          src="/Images/ti.jpg" 
          alt="Sri Lanka Beach" 
          style={{
            width: '100%',
            height: '250px',
            objectFit: 'cover',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        />
        <img 
          src="/Images/anu.jpg" 
          alt="Sri Lanka Temple" 
          style={{
            width: '100%',
            height: '250px',
            objectFit: 'cover',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        />
        <img 
          src="/Images/ayu.jpg" 
          alt="Sri Lanka Train" 
          style={{
            width: '100%',
            height: '250px',
            objectFit: 'cover',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        />
      </div>
    </div>
  );
}

export default ContactUs;