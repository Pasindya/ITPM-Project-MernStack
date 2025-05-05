import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { 
  FaEnvelope, 
  FaPhone, 
  FaPhoneAlt,
  FaWhatsapp, 
  FaSearch, 
  FaDownload, 
  FaFilter,
  FaMapMarkerAlt,
  FaLanguage,
  FaUserTie,
  FaArrowRight,
  FaArrowLeft,
  FaTimes,
  FaPhoneSquareAlt
} from "react-icons/fa";
import { motion } from "framer-motion";
import { FiPhoneCall } from "react-icons/fi";

const GuiderList = () => {
  const [guiders, setGuiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedGuider, setSelectedGuider] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGuiders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/guiders");
        setGuiders(response.data);
        const uniqueLocations = [...new Set(response.data.map((g) => g.location))];
        setLocations(uniqueLocations);
      } catch (err) {
        setError("Failed to load guiders. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchGuiders();
  }, []);

  const filteredGuiders = guiders.filter((guider) => {
    const matchesName = guider.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation ? guider.location.toLowerCase() === selectedLocation.toLowerCase() : true;
    const matchesExperience = selectedExperience ? guider.experience >= selectedExperience : true;
    return matchesName && matchesLocation && matchesExperience;
  });

  const generatePDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    let yOffset = 20;

    pdf.setFontSize(22);
    pdf.setTextColor(40, 40, 40);
    pdf.text("Guider Report", 105, 15, null, null, "center");

    for (const guider of filteredGuiders) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = guider.guiderpic;

      await new Promise((resolve) => {
        img.onload = () => {
          const imgWidth = 30;
          const imgHeight = 30;

          if (yOffset + imgHeight + 40 > 290) {
            pdf.addPage();
            yOffset = 20;
          }

          pdf.addImage(img, "JPEG", 15, yOffset, imgWidth, imgHeight);
          pdf.setFontSize(12);
          pdf.setTextColor(50, 50, 50);
          pdf.text(`Name: ${guider.name}`, 50, yOffset + 5);
          pdf.text(`Email: ${guider.email}`, 50, yOffset + 12);
          pdf.text(`Contact: ${guider.contactNumber}`, 50, yOffset + 19);
          pdf.text(`Experience: ${guider.experience} years`, 50, yOffset + 26);
          pdf.text(`Location: ${guider.location}`, 50, yOffset + 33);
          pdf.text(`Languages: ${guider.languages}`, 50, yOffset + 40);

          pdf.setDrawColor(200);
          pdf.line(10, yOffset + 45, 200, yOffset + 45);
          yOffset += 50;
          resolve();
        };
      });
    }

    pdf.save("Guider_Report.pdf");
  };

  const handleGuiderSelect = (guider, index) => {
    setSelectedGuider(guider);
    setCurrentIndex(index);
  };

  const handleCloseDetail = () => {
    setSelectedGuider(null);
  };

  const handleNextGuider = () => {
    const nextIndex = (currentIndex + 1) % filteredGuiders.length;
    setSelectedGuider(filteredGuiders[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const handlePrevGuider = () => {
    const prevIndex = (currentIndex - 1 + filteredGuiders.length) % filteredGuiders.length;
    setSelectedGuider(filteredGuiders[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      padding: "2rem",
      fontFamily: "'Poppins', sans-serif",
    }}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: "center",
          marginBottom: "3rem",
          maxWidth: "800px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h1 style={{
          fontSize: "2.8rem",
          fontWeight: "800",
          color: "transparent",
          marginBottom: "1rem",
          background: "linear-gradient(90deg, #2563eb, #7c3aed)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}>Discover Expert Travel Guides</h1>
        <p style={{
          fontSize: "1.2rem",
          color: "#64748b",
          lineHeight: "1.6",
          maxWidth: "600px",
          margin: "0 auto",
        }}>
          Connect with our certified guides who will make your journey unforgettable
        </p>
      </motion.div>

      {/* Search and Filter Section */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "2rem",
        flexWrap: "wrap",
        gap: "1.5rem",
      }}>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          style={{
            position: "relative",
            flex: "1",
            minWidth: "250px",
            maxWidth: "500px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            transition: "all 0.3s ease",
          }}
        >
          <FaSearch style={{
            position: "absolute",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#64748b",
            fontSize: "1.1rem",
          }} />
          <input
            type="text"
            placeholder="Search guides by name..."
            style={{
              padding: "16px 20px 16px 50px",
              borderRadius: "12px",
              border: "none",
              width: "100%",
              fontSize: "1rem",
              outline: "none",
              backgroundColor: "transparent",
              boxShadow: "none",
              transition: "all 0.3s ease",
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              paddingRight: "15px",
            }}
          >
            <FaMapMarkerAlt style={{
              position: "absolute",
              left: "15px",
              color: "#64748b",
              zIndex: "1",
              fontSize: "1rem",
            }} />
            <select
              style={{
                padding: "16px 20px 16px 40px",
                borderRadius: "12px",
                border: "none",
                width: "180px",
                fontSize: "1rem",
                outline: "none",
                appearance: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                fontWeight: "500",
              }}
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              paddingRight: "15px",
            }}
          >
            <FaUserTie style={{
              position: "absolute",
              left: "15px",
              color: "#64748b",
              zIndex: "1",
              fontSize: "1rem",
            }} />
            <select
              style={{
                padding: "16px 20px 16px 40px",
                borderRadius: "12px",
                border: "none",
                width: "200px",
                fontSize: "1rem",
                outline: "none",
                appearance: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                fontWeight: "500",
              }}
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
            >
              <option value="">All Experience</option>
              <option value="1">1+ years</option>
              <option value="3">3+ years</option>
              <option value="5">5+ years</option>
              <option value="10">10+ years</option>
            </select>
          </motion.div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={generatePDF} 
            style={{
              padding: "16px 28px",
              fontSize: "1rem",
              backgroundColor: "#4f46e5",
              color: "#fff",
              borderRadius: "12px",
              cursor: "pointer",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 4px 6px rgba(79, 70, 229, 0.3)",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
          >
            <FaDownload style={{ fontSize: "1.1rem" }} />
            Export Guides
          </motion.button>
        </div>
      </div>

      {/* Loading and Error States */}
      {loading ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "300px",
          }}
        >
          <div style={{
            border: "5px solid #f3f3f3",
            borderTop: "5px solid #4f46e5",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            animation: "spin 1s linear infinite",
            marginBottom: "1.5rem",
          }}></div>
          <p style={{
            fontSize: "1.2rem",
            color: "#64748b",
            fontWeight: "500",
          }}>Loading our expert guides...</p>
        </motion.div>
      ) : error ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "300px",
          }}
        >
          <p style={{
            color: "#ef4444",
            fontSize: "1.2rem",
            marginBottom: "1.5rem",
            textAlign: "center",
            fontWeight: "500",
          }}>{error}</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "14px 28px",
              backgroundColor: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 6px rgba(239, 68, 68, 0.3)",
            }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </motion.button>
        </motion.div>
      ) : (
        <>
          {filteredGuiders.length > 0 ? (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "2.5rem",
              justifyContent: "center",
            }}>
              {filteredGuiders.map((guider, index) => (
                <motion.div 
                  key={guider._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ 
                    y: -8, 
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "16px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    position: "relative",
                  }}
                  onClick={() => handleGuiderSelect(guider, index)}
                >
                  <div style={{
                    width: "100%",
                    height: "220px",
                    overflow: "hidden",
                    position: "relative",
                  }}>
                    <img 
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }} 
                      src={guider.guiderpic} 
                      alt={guider.name} 
                    />
                    <div style={{
                      position: "absolute",
                      bottom: "15px",
                      left: "15px",
                      backgroundColor: "rgba(79, 70, 229, 0.9)",
                      color: "#fff",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}>
                      <FaUserTie style={{ fontSize: "0.8rem" }} />
                      {guider.experience}+ years
                    </div>
                  </div>

                  <div style={{
                    padding: "1.5rem",
                  }}>
                    <h3 style={{
                      fontSize: "1.4rem",
                      fontWeight: "700",
                      color: "#1e293b",
                      marginBottom: "0.5rem",
                      lineHeight: "1.3",
                    }}>{guider.name}</h3>
                    
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "0.8rem",
                    }}>
                      <FaMapMarkerAlt style={{ 
                        color: "#ef4444", 
                        fontSize: "0.9rem",
                        minWidth: "16px"
                      }} />
                      <span style={{
                        fontSize: "0.95rem",
                        color: "#64748b",
                      }}>{guider.location}</span>
                    </div>
                    
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "1.2rem",
                    }}>
                      <FaLanguage style={{ 
                        color: "#4f46e5", 
                        fontSize: "0.9rem",
                        minWidth: "16px"
                      }} />
                      <span style={{
                        fontSize: "0.95rem",
                        color: "#475569",
                      }}>{guider.languages}</span>
                    </div>

                    <div style={{
                      fontSize: "0.95rem",
                      color: "#4f46e5",
                      textAlign: "center",
                      padding: "12px",
                      backgroundColor: "#eef2ff",
                      borderRadius: "10px",
                      marginTop: "0.5rem",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                    }}>
                      View Contact & Details
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                gridColumn: "1 / -1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "3rem",
                textAlign: "center",
              }}
            >
              <img 
                src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result.gif" 
                alt="No results found" 
                style={{
                  maxWidth: "300px",
                  marginBottom: "2rem",
                  borderRadius: "16px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
              />
              <h3 style={{
                fontSize: "1.5rem",
                color: "#1e293b",
                marginBottom: "0.5rem",
                fontWeight: "700",
              }}>
                No guides found
              </h3>
              <p style={{
                fontSize: "1.1rem",
                color: "#64748b",
                maxWidth: "500px",
                lineHeight: "1.6",
              }}>
                We couldn't find any guides matching your search criteria. Try adjusting your filters.
              </p>
            </motion.div>
          )}
        </>
      )}

      {/* Guider Detail Modal */}
      {selectedGuider && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "1000",
            padding: "1rem",
            backdropFilter: "blur(5px)",
          }}
          onClick={handleCloseDetail}
        >
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            style={{
              backgroundColor: "#fff",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "500px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleCloseDetail}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                backgroundColor: "#f1f5f9",
                border: "none",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                zIndex: "10",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                ":hover": {
                  backgroundColor: "#e2e8f0",
                }
              }}
            >
              <FaTimes style={{ 
                color: "#64748b",
                fontSize: "1.1rem",
              }} />
            </button>

            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "2.5rem 2rem 2rem",
              borderBottom: "1px solid #f1f5f9",
              position: "relative",
            }}>
              <div style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "5px solid #eef2ff",
                boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)",
                marginBottom: "1.5rem",
              }}>
                <img 
                  src={selectedGuider.guiderpic} 
                  alt={selectedGuider.name} 
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div style={{
                textAlign: "center",
                width: "100%",
              }}>
                <h2 style={{
                  fontSize: "1.8rem",
                  fontWeight: "700",
                  color: "#1e293b",
                  marginBottom: "0.5rem",
                  lineHeight: "1.3",
                }}>{selectedGuider.name}</h2>
                
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  marginBottom: "1rem",
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: "#eef2ff",
                    color: "#4f46e5",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                  }}>
                    <FaUserTie style={{ fontSize: "0.8rem" }} />
                    {selectedGuider.experience} years experience
                  </div>
                </div>
                
                <p style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  fontSize: "1rem",
                  color: "#64748b",
                  marginBottom: "0.5rem",
                }}>
                  <FaMapMarkerAlt style={{ color: "#4f46e5", fontSize: "0.9rem" }} />
                  {selectedGuider.location}
                </p>
              </div>
            </div>

            <div style={{
              padding: "2rem",
            }}>
              <div style={{
                marginBottom: "2rem",
              }}>
                <h3 style={{
                  fontSize: "1.3rem",
                  fontWeight: "700",
                  color: "#1e293b",
                  marginBottom: "1.5rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "2px solid #f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}>
                  <span style={{
                    backgroundColor: "#4f46e5",
                    color: "white",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <FaPhoneSquareAlt style={{ fontSize: "1rem" }} />
                  </span>
                  Contact Information
                </h3>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.2rem",
                  }}>
                    <div style={{
                      backgroundColor: "#eef2ff",
                      color: "#4f46e5",
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <FaPhoneSquareAlt style={{ fontSize: "1.3rem" }} />
                    </div>
                    <div>
                      <p style={{
                        fontSize: "0.85rem",
                        color: "#64748b",
                        marginBottom: "0.25rem",
                        fontWeight: "500",
                      }}>Phone Number</p>
                      <a 
                        href={`tel:${selectedGuider.contactNumber}`} 
                        style={{
                          fontSize: "1.1rem",
                          color: "#1e293b",
                          fontWeight: "600",
                          textDecoration: "none",
                          display: "block",
                          transition: "all 0.3s ease",
                          ":hover": {
                            color: "#4f46e5",
                          }
                        }}
                      >
                        {selectedGuider.contactNumber}
                      </a>
                    </div>
                  </div>
                  
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.2rem",
                  }}>
                    <div style={{
                      backgroundColor: "#eef2ff",
                      color: "#4f46e5",
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <FaEnvelope style={{ fontSize: "1.3rem" }} />
                    </div>
                    <div>
                      <p style={{
                        fontSize: "0.85rem",
                        color: "#64748b",
                        marginBottom: "0.25rem",
                        fontWeight: "500",
                      }}>Email Address</p>
                      <a 
                        href={`mailto:${selectedGuider.email}`} 
                        style={{
                          fontSize: "1.1rem",
                          color: "#1e293b",
                          fontWeight: "600",
                          textDecoration: "none",
                          display: "block",
                          transition: "all 0.3s ease",
                          ":hover": {
                            color: "#4f46e5",
                          }
                        }}
                      >
                        {selectedGuider.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{
                marginBottom: "2rem",
              }}>
                <h3 style={{
                  fontSize: "1.3rem",
                  fontWeight: "700",
                  color: "#1e293b",
                  marginBottom: "1.5rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "2px solid #f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}>
                  <span style={{
                    backgroundColor: "#4f46e5",
                    color: "white",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <FaUserTie style={{ fontSize: "1rem" }} />
                  </span>
                  Quick Actions
                </h3>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "1rem",
                }}>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={`mailto:${selectedGuider.email}`}
                    style={{
                      padding: "16px",
                      backgroundColor: "#4f46e5",
                      color: "#fff",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "12px",
                      textDecoration: "none",
                      fontSize: "1rem",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 6px rgba(79, 70, 229, 0.3)",
                    }}
                  >
                    <FaEnvelope style={{ fontSize: "1.1rem" }} />
                    Send Email
                  </motion.a>
                  
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={`https://wa.me/94${selectedGuider.contactNumber.slice(1)}?text=${encodeURIComponent(
                      `Hello ${selectedGuider.name}, I found your profile and would like to book your services as a guide.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "16px",
                      backgroundColor: "#25D366",
                      color: "#fff",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "12px",
                      textDecoration: "none",
                      fontSize: "1rem",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 6px rgba(37, 211, 102, 0.3)",
                    }}
                  >
                    <FaWhatsapp style={{ fontSize: "1.1rem" }} />
                    WhatsApp Message
                  </motion.a>
                  
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={`tel:${selectedGuider.contactNumber}`}
                    style={{
                      padding: "16px",
                      backgroundColor: "#10b981",
                      color: "#fff",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "12px",
                      textDecoration: "none",
                      fontSize: "1rem",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 6px rgba(16, 185, 129, 0.3)",
                    }}
                  >
                    <FiPhoneCall style={{ 
                      fontSize: "1.3rem",
                    }} />
                    Call Now
                  </motion.a>
                </div>
              </div>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1.5rem",
                gap: "1rem",
              }}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "14px 20px",
                    backgroundColor: "#4f46e5",
                    color: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                    flex: 1,
                    justifyContent: "center",
                    boxShadow: "0 4px 6px rgba(79, 70, 229, 0.3)",
                  }}
                  onClick={handlePrevGuider}
                >
                  <FaArrowLeft style={{ fontSize: "0.9rem" }} />
                  Previous
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "14px 20px",
                    backgroundColor: "#4f46e5",
                    color: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                    flex: 1,
                    justifyContent: "center",
                    boxShadow: "0 4px 6px rgba(79, 70, 229, 0.3)",
                  }}
                  onClick={handleNextGuider}
                >
                  Next
                  <FaArrowRight style={{ fontSize: "0.9rem" }} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default GuiderList;