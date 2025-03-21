import React from "react";
import { useNavigate } from "react-router-dom";

const Event = () => {
  const navigate = useNavigate();

  // Styles
  const styles = {
    container: {
      backgroundColor: "#f3f4f6",
      minHeight: "100vh",
      padding: "3rem",
      fontFamily: "'Poppins', sans-serif",
    },
    hero: {
      position: "relative",
      height: "80vh",
      backgroundImage: 'url("/Images/Beautiful Sri Lanka.jpg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "white",
      padding: "0 20px",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
      animation: "zoomIn 5s ease-in-out infinite alternate",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      zIndex: 1,
    },
    title: {
      fontSize: "4rem",
      fontWeight: "bold",
      letterSpacing: "2px",
      zIndex: 2,
      textShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)",
      animation: "fadeInDown 2s ease-in-out",
    },
    subtitle: {
      marginTop: "1rem",
      fontSize: "1.75rem",
      zIndex: 2,
      fontWeight: "300",
      letterSpacing: "1px",
      textShadow: "1px 1px 4px rgba(0, 0, 0, 0.5)",
      animation: "fadeInUp 2.5s ease-in-out",
    },
    sectionTitle: {
      fontSize: "2.75rem",
      fontWeight: "600",
      textAlign: "center",
      marginBottom: "3rem",
      color: "#333",
      textTransform: "uppercase",
      letterSpacing: "1px",
      position: "relative",
      display: "inline-block",
      animation: "fadeIn 3s ease-in-out",
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
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "2rem",
      padding: "2rem 0",
    },
    eventContainer: {
      backgroundColor: "#ffffff",
      padding: "1.5rem",
      borderRadius: "15px",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      animation: "fadeInUp 1s ease-in-out",
      "&:hover": {
        transform: "translateY(-10px)",
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
      },
    },
    eventImage: {
      display: "block",
      margin: "1.5rem auto",
      width: "100%",
      maxWidth: "600px",
      borderRadius: "10px",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
      },
    },
    eventDescription: {
      margin: "1rem 0",
      fontSize: "1.2rem",
      fontWeight: "300",
      color: "#555",
      lineHeight: "1.6",
    },
    bookButton: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "0.75rem 1.5rem",
      fontSize: "1rem",
      cursor: "pointer",
      borderRadius: "25px",
      transition: "background-color 0.3s ease, transform 0.3s ease",
      animation: "pulse 2s infinite",
      "&:hover": {
        backgroundColor: "#0056b3",
        transform: "scale(1.05)",
      },
    },
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <header style={styles.hero}>
        <div style={styles.overlay}></div>
        <div style={{ position: "relative", zIndex: 10 }}>
          <h1 style={styles.title}>Welcome to Ceylon Trails Events</h1>
          <p style={styles.subtitle}>
            Celebrate Sri Lanka's vibrant traditions, music, and festivals.
          </p>
        </div>
      </header>

      {/* Event Listings */}
      <section>
        <h2 style={styles.sectionTitle}>Upcoming Events</h2>

        <div style={styles.eventSection}>
          {/* Event 1 */}
          <div style={styles.eventContainer}>
            <img
              src="/Images/Kandy Esala Perahera.jpg"
              alt="Kandy Esala Perahera"
              style={styles.eventImage}
            />
            <p style={styles.eventDescription}>
              The Kandy Esala Perahera is one of Sri Lanka's grandest Buddhist
              festivals, featuring vibrant processions, traditional dances, and
              cultural performances.
            </p>
            <button style={styles.bookButton} onClick={() => navigate("/book-event")}>
              Book Now
            </button>
          </div>

          {/* Event 2 */}
          <div style={styles.eventContainer}>
            <img
              src="/Images/Poson Festival in Sri Lanka _ Explore Sri Lanka.jpg"
              alt="Poson Festival in Sri Lanka"
              style={styles.eventImage}
            />
            <p style={styles.eventDescription}>
              Poson Festival marks the arrival of Buddhism in Sri Lanka, with
              spiritual events, rituals, and cultural celebrations across the
              island.
            </p>
            <button style={styles.bookButton} onClick={() => navigate("/book-event")}>
              Book Now
            </button>
          </div>

          {/* Event 3 */}
          <div style={styles.eventContainer}>
            <img
              src="/Images/Vesak celebrations on the way to flying lanterns at the Borobudur Temple, Indonesia.jpg"
              alt="Vesak Festival"
              style={styles.eventImage}
            />
            <p style={styles.eventDescription}>
              Vesak is celebrated to mark the birth, enlightenment, and death of
              the Buddha. It is a peaceful festival filled with spiritual
              practices and community activities.
            </p>
            <button style={styles.bookButton} onClick={() => navigate("/book-event")}>
              Book Now
            </button>
          </div>

          {/* Event 4 */}
          <div style={styles.eventContainer}>
            <img
              src="/Images/festivel.jpg"
              alt="Festival Image"
              style={styles.eventImage}
            />
            <p style={styles.eventDescription}>
              This festival celebrates the richness of Sri Lankan culture with
              music, food, art, and traditional performances.
            </p>
            <button style={styles.bookButton} onClick={() => navigate("/book-event")}>
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes zoomIn {
            0% {
              transform: scale(1);
            }
            100% {
              transform: scale(1.1);
            }
          }

          @keyframes fadeInDown {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Event;