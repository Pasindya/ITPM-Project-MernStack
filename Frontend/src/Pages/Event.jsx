import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiCalendar, FiMapPin, FiMusic, FiStar } from "react-icons/fi";


const Event = () => {
  const navigate = useNavigate();
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  // Event data with categories
  const events = [
    {
      id: 1,
      title: "Kandy Esala Perahera",
      image: "/Images/Kandy Esala Perahera.jpg",
      description: "The Kandy Esala Perahera is one of Sri Lanka's grandest Buddhist festivals, featuring vibrant processions, traditional dances, and cultural performances.",
      date: "August 10-20, 2025",
      location: "Kandy",
      category: "cultural",
      price: "Free",
      rating: 4.8
    },
    {
      id: 2,
      title: "Poson Festival",
      image: "/Images/Poson Festival in Sri Lanka _ Explore Sri Lanka.jpg",
      description: "Poson Festival marks the arrival of Buddhism in Sri Lanka, with spiritual events, rituals, and cultural celebrations across the island.",
      date: "June 3-5, 2025",
      location: "Anuradhapura",
      category: "religious",
      price: "Free",
      rating: 4.5
    },
    {
      id: 3,
      title: "Vesak Festival",
      image: "/Images/Vesak celebrations on the way to flying lanterns at the Borobudur Temple, Indonesia.jpg",
      description: "Vesak is celebrated to mark the birth, enlightenment, and death of the Buddha. It is a peaceful festival filled with spiritual practices and community activities.",
      date: "May 5-6, 2025",
      location: "Nationwide",
      category: "religious",
      price: "Free",
      rating: 4.7
    },
    {
      id: 4,
      title: "Galle Literary Festival",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
      description: "This international festival celebrates literature with authors, poets, and thinkers from around the world in the historic Galle Fort.",
      date: "January 25-28, 2025",
      location: "Galle",
      category: "cultural",
      price: "$20+",
      rating: 4.6
    },
    {
      id: 5,
      title: "Colombo Nightlife Festival",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
      description: "Experience Colombo's vibrant nightlife with top DJs, live music, and entertainment across the city's best venues.",
      date: "March 15-20, 2025",
      location: "Colombo",
      category: "music",
      price: "$30+",
      rating: 4.9
    },
    {
      id: 6,
      title: "Sri Lanka Surf Championship",
      image: "/Images/surf.jpg",
      description: "Watch international surfers compete on Sri Lanka's best waves in this thrilling championship event.",
      date: "July 10-15, 2025",
      location: "Arugam Bay",
      category: "sports",
      price: "$15+",
      rating: 4.4
    }
  ];

  const filteredEvents = activeCategory === "all" 
    ? events 
    : events.filter(event => event.category === activeCategory);

  return (
    <div style={styles.container}>
      {/* Hero Section with Parallax Effect */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Experience Sri Lanka's <span style={styles.highlight}>Vibrant Culture</span></h1>
          <p style={styles.heroSubtitle}>
            Immerse yourself in breathtaking festivals and unforgettable events across the island
          </p>
          <button 
            style={styles.ctaButton}
            onClick={() => document.getElementById('events').scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Events <FiArrowRight style={styles.ctaIcon} />
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div style={styles.filterContainer}>
        <button 
          style={activeCategory === "all" ? styles.activeFilter : styles.filterButton}
          onClick={() => setActiveCategory("all")}
        >
          All Events
        </button>
        <button 
          style={activeCategory === "cultural" ? styles.activeFilter : styles.filterButton}
          onClick={() => setActiveCategory("cultural")}
        >
          Cultural
        </button>
        <button 
          style={activeCategory === "religious" ? styles.activeFilter : styles.filterButton}
          onClick={() => setActiveCategory("religious")}
        >
          Religious
        </button>
        <button 
          style={activeCategory === "music" ? styles.activeFilter : styles.filterButton}
          onClick={() => setActiveCategory("music")}
        >
          Music
        </button>
        <button 
          style={activeCategory === "sports" ? styles.activeFilter : styles.filterButton}
          onClick={() => setActiveCategory("sports")}
        >
          Sports
        </button>
      </div>

      {/* Event Listings */}
      <section id="events" style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Upcoming Events</h2>
          <p style={styles.sectionSubtitle}>Discover the magic of Sri Lankan celebrations</p>
        </div>

        <div style={styles.eventGrid}>
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              style={{
                ...styles.eventCard,
                transform: hoveredEvent === event.id ? 'translateY(-10px)' : 'translateY(0)'
              }}
              onMouseEnter={() => setHoveredEvent(event.id)}
              onMouseLeave={() => setHoveredEvent(null)}
            >
              <div style={styles.eventImageContainer}>
                <img
                  src={event.image}
                  alt={event.title}
                  style={{
                    ...styles.eventImage,
                    transform: hoveredEvent === event.id ? 'scale(1.05)' : 'scale(1)'
                  }}
                />
                <div style={styles.eventBadges}>
                  <span style={styles.priceBadge}>{event.price}</span>
                  <span style={styles.dateBadge}>
                    <FiCalendar style={styles.badgeIcon} /> {event.date.split('-')[0]}
                  </span>
                </div>
              </div>
              
              <div style={styles.eventContent}>
                <div style={styles.eventMeta}>
                  <span style={styles.eventLocation}>
                    <FiMapPin style={styles.metaIcon} /> {event.location}
                  </span>
                  <span style={styles.eventRating}>
                    <FiStar style={styles.metaIcon} /> {event.rating}
                  </span>
                </div>
                
                <h3 style={styles.eventTitle}>{event.title}</h3>
                
                <p style={styles.eventDescription}>{event.description}</p>
                
                <div style={styles.eventActions}>
                  <button
                    style={styles.learnMoreButton}
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    Learn More
                  </button>
                  <button
                    style={styles.bookButton}
                    onClick={() => navigate("/book-event")}
                  >
                    Book Now <FiArrowRight style={styles.buttonIcon} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <div style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready for an Unforgettable Experience?</h2>
        <p style={styles.ctaText}>Join thousands of travelers who've discovered Sri Lanka's vibrant culture through our curated events</p>
        <button style={styles.ctaButtonSecondary} onClick={() => navigate("/contact")}>
          Get in Touch <FiArrowRight style={styles.ctaIcon} />
        </button>
      </div>
    </div>
  );
};

// Modern UI Styles
const styles = {
  container: {
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    padding: 0,
    fontFamily: "'Inter', sans-serif",
    overflowX: "hidden"
  },
  hero: {
    position: "relative",
    height: "90vh",
    minHeight: "600px",
    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), url('/Frontend/public/Booking/una.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    padding: "0 20px",
    overflow: "hidden"
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, rgba(6, 27, 65, 0.8) 0%, rgba(23, 107, 135, 0.6) 100%)",
    zIndex: 1
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: "900px",
    padding: "0 20px"
  },
  heroTitle: {
    fontSize: "clamp(2.5rem, 5vw, 4rem)",
    fontWeight: 800,
    lineHeight: 1.2,
    marginBottom: "1.5rem",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)"
  },
  highlight: {
    background: "linear-gradient(90deg, #f6d365 0%, #fda085 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  },
  heroSubtitle: {
    fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
    fontWeight: 400,
    maxWidth: "700px",
    margin: "0 auto 2.5rem",
    lineHeight: 1.6,
    opacity: 0.9
  },
  ctaButton: {
    backgroundColor: "#f97316",
    color: "white",
    border: "none",
    padding: "15px 35px",
    fontSize: "1.1rem",
    borderRadius: "50px",
    cursor: "pointer",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(249, 115, 22, 0.4)",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 6px 20px rgba(249, 115, 22, 0.6)",
      backgroundColor: "#ea580c"
    }
  },
  ctaIcon: {
    transition: "transform 0.3s ease"
  },
  filterContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "15px",
    padding: "25px 20px",
    backgroundColor: "white",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
    position: "sticky",
    top: 0,
    zIndex: 100
  },
  filterButton: {
    padding: "10px 25px",
    borderRadius: "50px",
    border: "1px solid #e2e8f0",
    backgroundColor: "white",
    color: "#64748b",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "0.95rem",
    fontWeight: 500,
    "&:hover": {
      backgroundColor: "#f1f5f9",
      color: "#334155"
    }
  },
  activeFilter: {
    padding: "10px 25px",
    borderRadius: "50px",
    border: "none",
    backgroundColor: "#1e40af",
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "0.95rem",
    fontWeight: 500,
    boxShadow: "0 2px 10px rgba(30, 64, 175, 0.2)"
  },
  section: {
    padding: "80px 20px",
    maxWidth: "1400px",
    margin: "0 auto"
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "50px"
  },
  sectionTitle: {
    fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
    fontWeight: 700,
    color: "#1e293b",
    marginBottom: "15px",
    position: "relative",
    display: "inline-block",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "-10px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "80px",
      height: "4px",
      background: "linear-gradient(90deg, #f6d365 0%, #fda085 100%)",
      borderRadius: "2px"
    }
  },
  sectionSubtitle: {
    fontSize: "1.1rem",
    color: "#64748b",
    maxWidth: "700px",
    margin: "0 auto"
  },
  eventGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "30px"
  },
  eventCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
      "& $bookButton": {
        backgroundColor: "#1e40af"
      }
    }
  },
  eventImageContainer: {
    position: "relative",
    height: "250px",
    overflow: "hidden"
  },
  eventImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease"
  },
  eventBadges: {
    position: "absolute",
    top: "15px",
    left: "15px",
    right: "15px",
    display: "flex",
    justifyContent: "space-between"
  },
  priceBadge: {
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    color: "white",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: 600
  },
  dateBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    color: "#1e293b",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: "5px"
  },
  badgeIcon: {
    fontSize: "0.8rem"
  },
  eventContent: {
    padding: "25px"
  },
  eventMeta: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
    fontSize: "0.9rem",
    color: "#64748b"
  },
  eventLocation: {
    display: "flex",
    alignItems: "center",
    gap: "5px"
  },
  eventRating: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: "#f59e0b"
  },
  metaIcon: {
    fontSize: "0.9rem"
  },
  eventTitle: {
    fontSize: "1.4rem",
    fontWeight: 700,
    color: "#1e293b",
    marginBottom: "15px",
    lineHeight: 1.3
  },
  eventDescription: {
    fontSize: "1rem",
    color: "#64748b",
    lineHeight: 1.6,
    marginBottom: "25px"
  },
  eventActions: {
    display: "flex",
    gap: "15px"
  },
  learnMoreButton: {
    flex: 1,
    backgroundColor: "transparent",
    color: "#1e40af",
    border: "1px solid #1e40af",
    padding: "12px 20px",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#e0e7ff"
    }
  },
  bookButton: {
    flex: 1,
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    "&:hover": {
      backgroundColor: "#1d4ed8"
    }
  },
  buttonIcon: {
    fontSize: "1rem",
    transition: "transform 0.3s ease"
  },
  ctaSection: {
    backgroundColor: "#1e293b",
    color: "white",
    padding: "80px 20px",
    textAlign: "center"
  },
  ctaTitle: {
    fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
    fontWeight: 700,
    marginBottom: "20px",
    lineHeight: 1.3
  },
  ctaText: {
    fontSize: "1.1rem",
    maxWidth: "700px",
    margin: "0 auto 30px",
    opacity: 0.9,
    lineHeight: 1.6
  },
  ctaButtonSecondary: {
    backgroundColor: "#f97316",
    color: "white",
    border: "none",
    padding: "15px 35px",
    fontSize: "1.1rem",
    borderRadius: "50px",
    cursor: "pointer",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(249, 115, 22, 0.4)",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 6px 20px rgba(249, 115, 22, 0.6)",
      backgroundColor: "#ea580c"
    }
  }
};

export default Event;