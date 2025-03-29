import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Event = () => {
  const navigate = useNavigate();
  const [hoveredEvent, setHoveredEvent] = useState(null);

  // Event data
  const events = [
    {
      id: 1,
      title: "Kandy Esala Perahera",
      image: "/Images/Kandy Esala Perahera.jpg",
      description: "The Kandy Esala Perahera is one of Sri Lanka's grandest Buddhist festivals, featuring vibrant processions, traditional dances, and cultural performances.",
      date: "August 10-20, 2025"
    },
    {
      id: 2,
      title: "Poson Festival",
      image: "/Images/Poson Festival in Sri Lanka _ Explore Sri Lanka.jpg",
      description: "Poson Festival marks the arrival of Buddhism in Sri Lanka, with spiritual events, rituals, and cultural celebrations across the island.",
      date: "June 3-5, 2025"
    },
    {
      id: 3,
      title: "Vesak Festival",
      image: "/Images/Vesak celebrations on the way to flying lanterns at the Borobudur Temple, Indonesia.jpg",
      description: "Vesak is celebrated to mark the birth, enlightenment, and death of the Buddha. It is a peaceful festival filled with spiritual practices and community activities.",
      date: "May 5-6, 2025"
    },
    {
      id: 4,
      title: "Cultural Festival",
      image: "/Images/festivel.jpg",
      description: "This festival celebrates the richness of Sri Lankan culture with music, food, art, and traditional performances.",
      date: "December 15-20, 2025"
    },
    {
      id: 5,
      title: "Dj",
      image: "/Images/Dj.jpg",
      description: "Join us for an electrifying night of music and dance with top DJs from around the world. Experience the ultimate party atmosphere.",
      date: "March 15-20, 2025"
    },
    {
      id: 6,
      title: "Ultra Music Festival",
      image: "/Images/Ultra.jpg",
      description: "Join us for an electrifying night of music and dance with top DJs from around the world. Experience the ultimate party atmosphere.",
      date: "April 15-20, 2025"
    }
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.overlay}></div>
        <div style={{ position: "relative", zIndex: 10 }}>
          <h1 style={styles.title}>Welcome to Ceylon Trails Events</h1>
          <p style={styles.subtitle}>
            Celebrate Sri Lanka's vibrant traditions, music, and festivals
          </p>
        </div>
      </div>

      {/* Event Listings */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Upcoming Events</h2>

        <div style={styles.eventSection}>
          {events.map((event) => (
            <div
              key={event.id}
              style={{
                ...styles.eventContainer,
                transform: hoveredEvent === event.id ? 'translateY(-10px)' : 'translateY(0)'
              }}
              onMouseEnter={() => setHoveredEvent(event.id)}
              onMouseLeave={() => setHoveredEvent(null)}
            >
              <div style={styles.imageContainer}>
                <img
                  src={event.image}
                  alt={event.title}
                  style={{
                    ...styles.eventImage,
                    transform: hoveredEvent === event.id ? 'scale(1.05)' : 'scale(1)'
                  }}
                />
                {hoveredEvent === event.id && (
                  <div style={styles.dateBadge}>
                    {event.date}
                  </div>
                )}
              </div>
              
              <h3 style={styles.eventTitle}>
                {event.title}
              </h3>
              
              <p style={styles.eventDescription}>
                {event.description}
              </p>
              
              <button
                style={styles.bookButton}
                onClick={() => navigate("/book-event")}
              >
                Book Now
                <span style={styles.buttonArrow}>→</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideInDown {
            from { 
              transform: translateY(-50px);
              opacity: 0;
            }
            to { 
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes slideInUp {
            from { 
              transform: translateY(50px);
              opacity: 0;
            }
            to { 
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }

          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }

          .hero-title {
            animation: slideInDown 1s ease-out;
          }

          .hero-subtitle {
            animation: slideInUp 1s ease-out 0.3s forwards;
            opacity: 0;
          }

          .section-title {
            animation: fadeIn 1s ease-out 0.6s forwards;
            opacity: 0;
          }

          .event-card {
            animation: fadeIn 0.5s ease-out forwards;
            opacity: 0;
          }

          .book-button-arrow {
            display: inline-block;
            animation: pulse 1.5s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

// Styles
const styles = {
  container: {
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    padding: "0",
    fontFamily: "'Poppins', sans-serif",
    overflowX: "hidden"
  },
  hero: {
    position: "relative",
    height: "90vh",
    backgroundImage: 'url("/Images/Beautiful Sri Lanka.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    padding: "0 20px",
    overflow: "hidden",
    animation: "float 8s ease-in-out infinite"
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)",
    zIndex: 1,
  },
  title: {
    fontSize: "4.5rem",
    fontWeight: "bold",
    letterSpacing: "2px",
    zIndex: 2,
    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)",
    marginBottom: "1rem",
    background: "linear-gradient(to right, #fff, #f8f9fa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: "slideInDown 1s ease-out"
  },
  subtitle: {
    fontSize: "1.8rem",
    zIndex: 2,
    fontWeight: "300",
    letterSpacing: "1px",
    textShadow: "1px 1px 4px rgba(0, 0, 0, 0.5)",
    maxWidth: "800px",
    margin: "0 auto",
    lineHeight: "1.4",
    animation: "slideInUp 1s ease-out 0.3s forwards",
    opacity: 0
  },
  section: {
    padding: "5rem 3rem",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  sectionTitle: {
    fontSize: "3rem",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "4rem",
    color: "#2c3e50",
    position: "relative",
    display: "inline-block",
    animation: "fadeIn 1s ease-out 0.6s forwards",
    opacity: 0,
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "-10px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "60%",
      height: "4px",
      backgroundColor: "#007bff",
      borderRadius: "2px",
    },
  },
  eventSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "2.5rem",
  },
  eventContainer: {
    backgroundColor: "#ffffff",
    padding: "1.8rem",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    animation: "fadeIn 0.5s ease-out forwards",
    opacity: 0,
    "&:hover": {
      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.12)",
    },
  },
  imageContainer: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "12px",
    marginBottom: "1.5rem",
  },
  eventImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "12px",
    display: "block",
    transition: "transform 0.3s ease",
  },
  dateBadge: {
    position: "absolute",
    bottom: "15px",
    left: "15px",
    backgroundColor: "rgba(0, 123, 255, 0.9)",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    fontSize: "0.9rem",
    fontWeight: "500",
    animation: "fadeIn 0.3s ease-out"
  },
  eventTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "#2c3e50",
  },
  eventDescription: {
    fontSize: "1.1rem",
    fontWeight: "300",
    color: "#555",
    lineHeight: "1.6",
    marginBottom: "1.5rem",
  },
  bookButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "0.9rem 1.8rem",
    fontSize: "1.1rem",
    cursor: "pointer",
    borderRadius: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    fontWeight: "500",
    transition: "all 0.3s ease",
    width: "100%",
    "&:hover": {
      backgroundColor: "#0069d9",
      "& span": {
        animation: "pulse 1.5s infinite ease-in-out"
      }
    },
  },
  buttonArrow: {
    display: "inline-block",
    marginLeft: "0.5rem",
  }
};

export default Event;