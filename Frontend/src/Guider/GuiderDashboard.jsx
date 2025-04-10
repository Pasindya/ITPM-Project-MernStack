import React, { useState, useEffect } from "react";
import { 
  FaHome, FaUsers, FaChartPie, FaUserPlus,
  FaSignOutAlt, FaUserTie, FaClock, 
  FaGlobe, FaSpinner, FaInfoCircle, FaSearch
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";

const GuiderDashboard = () => {
  const [guiders, setGuiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuiders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/guiders");
        setGuiders(response.data);
      } catch (err) {
        setError("Failed to load guider data");
        console.error("Error fetching guiders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGuiders();
  }, []);

  const calculateStats = () => {
    if (guiders.length === 0) return {
      totalGuiders: 0,
      avgExperience: 0,
      languagesCount: 0,
      experienceDistribution: []
    };

    const totalExperience = guiders.reduce((sum, guider) => sum + parseInt(guider.experience || 0), 0);
    const avgExperience = (totalExperience / guiders.length).toFixed(1);

    const allLanguages = guiders.flatMap(guider => guider.languages || []);
    const uniqueLanguages = [...new Set(allLanguages)].length;

    const distributionRanges = [
      { range: "0-2 years", count: guiders.filter(g => parseInt(g.experience) <= 2).length },
      { range: "2-5 years", count: guiders.filter(g => parseInt(g.experience) > 2 && parseInt(g.experience) <= 5).length },
      { range: "5-10 years", count: guiders.filter(g => parseInt(g.experience) > 5 && parseInt(g.experience) <= 10).length },
      { range: "10+ years", count: guiders.filter(g => parseInt(g.experience) > 10).length }
    ];

    const colors = ["#93c5fd", "#60a5fa", "#3b82f6", "#2563eb"];
    
    const experienceDistribution = distributionRanges.map((item, index) => ({
      ...item,
      percentage: Math.round((item.count / guiders.length) * 100),
      color: colors[index]
    }));

    return {
      totalGuiders: guiders.length,
      avgExperience,
      languagesCount: uniqueLanguages,
      experienceDistribution
    };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa"
      }}>
        <FaSpinner style={{ 
          animation: "spin 1s linear infinite",
          fontSize: "2rem",
          marginRight: "1rem"
        }} />
        <p>Loading guider data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa"
      }}>
        <div style={{
          backgroundColor: "#fee2e2",
          color: "#b91c1c",
          padding: "2rem",
          borderRadius: "0.5rem",
          maxWidth: "600px",
          textAlign: "center"
        }}>
          <h3 style={{ marginBottom: "1rem" }}>Error Loading Data</h3>
          <p>{error}</p>
          <button 
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#b91c1c",
              color: "white",
              border: "none",
              borderRadius: "0.25rem",
              cursor: "pointer"
            }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f8f9fa",
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Sidebar */}
      <div style={{
        width: "250px",
        backgroundColor: "#1e293b",
        color: "white",
        padding: "1.5rem",
        flexShrink: 0
      }}>
        <h2 style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          marginBottom: "1rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid #334155"
        }}>
          TRAVELTRAILS
        </h2>
        
        <h3 style={{
          fontSize: "1.1rem",
          fontWeight: "600",
          color: "#cbd5e1",
          marginBottom: "1.5rem"
        }}>Guider Analytics</h3>
        
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <NavLink
                to="/guiderdashboard"
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  color: isActive ? "#ffffff" : "#cbd5e1",
                  backgroundColor: isActive ? "#334155" : "transparent",
                  textDecoration: "none",
                  transition: "all 0.3s",
                })}
              >
                <FaHome style={{ marginRight: "0.75rem" }} />
                Dashboard
              </NavLink>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <NavLink
                to="/adds"
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  color: isActive ? "#ffffff" : "#cbd5e1",
                  backgroundColor: isActive ? "#334155" : "transparent",
                  textDecoration: "none",
                  transition: "all 0.3s",
                })}
              >
                <FaUserPlus style={{ marginRight: "0.75rem" }} />
                Add Guider
              </NavLink>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <NavLink
                to="/all"
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  color: isActive ? "#ffffff" : "#cbd5e1",
                  backgroundColor: isActive ? "#334155" : "transparent",
                  textDecoration: "none",
                  transition: "all 0.3s",
                })}
              >
                <FaUsers style={{ marginRight: "0.75rem" }} />
                Manage Guiders
              </NavLink>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <NavLink
                to="/guidertak"
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  color: isActive ? "#ffffff" : "#cbd5e1",
                  backgroundColor: isActive ? "#334155" : "transparent",
                  textDecoration: "none",
                  transition: "all 0.3s",
                })}
              >
                <FaChartPie style={{ marginRight: "0.75rem" }} />
                Reports
              </NavLink>
            </li>
          </ul>
        </nav>

        <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              color: "#cbd5e1",
              backgroundColor: "transparent",
              border: "none",
              width: "100%",
              cursor: "pointer",
              textAlign: "left",
              ":hover": {
                backgroundColor: "#334155"
              }
            }}
          >
            <FaSignOutAlt style={{ marginRight: "0.75rem" }} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "2rem",
        backgroundColor: "#f8f9fa"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#1e293b",
              marginBottom: "0.5rem"
            }}>
              Guider Analytics Dashboard
            </h1>
            <p style={{
              fontSize: "1rem",
              color: "#64748b",
            }}>
              Overview of {stats.totalGuiders} travel guiders
            </p>
          </div>

          {/* Dashboard Features - Updated with additional text */}
          <div style={{
            backgroundColor: "#e0f2fe",
            padding: "1.5rem",
            borderRadius: "0.75rem",
            marginBottom: "2rem",
            borderLeft: "4px solid #0ea5e9"
          }}>
            <h3 style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#0369a1",
              marginBottom: "1rem"
            }}>
              <FaInfoCircle style={{ marginRight: "0.5rem" }} />
              Dashboard Features
            </h3>
            <div style={{ color: "#075985", lineHeight: "1.6" }}>
              <p style={{ marginBottom: "0.5rem" }}>Comprehensive analytics and management for your guider team:</p>
              <ul style={{ marginLeft: "1.5rem", listStyleType: "disc" }}>
                <li>Track total number of guiders and their experience levels</li>
                <li>Monitor language distribution across your team</li>
                <li>Add, remove, and edit guider profiles</li>
                <li>Generate detailed reports on guider performance</li>
                <li>Search functionality to quickly find specific guiders</li>
                <li>Analyze experience ranges and distribution</li>
              </ul>
            </div>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem"
          }}>
            <div style={{
              backgroundColor: "white",
              borderRadius: "0.75rem",
              padding: "1.5rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              borderLeft: "4px solid #4f46e5"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem"
              }}>
                <div style={{
                  marginRight: "1rem",
                  padding: "0.5rem",
                  borderRadius: "50%",
                  backgroundColor: "rgba(79, 70, 229, 0.1)"
                }}>
                  <FaUserTie style={{ color: "#4f46e5", fontSize: "1.5rem" }} />
                </div>
                <h3 style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#334155"
                }}>Total Guiders</h3>
              </div>
              <p style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1e293b",
                marginLeft: "3.5rem"
              }}>{stats.totalGuiders}</p>
            </div>
            
            <div style={{
              backgroundColor: "white",
              borderRadius: "0.75rem",
              padding: "1.5rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              borderLeft: "4px solid #10b981"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem"
              }}>
                <div style={{
                  marginRight: "1rem",
                  padding: "0.5rem",
                  borderRadius: "50%",
                  backgroundColor: "rgba(16, 185, 129, 0.1)"
                }}>
                  <FaClock style={{ color: "#10b981", fontSize: "1.5rem" }} />
                </div>
                <h3 style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#334155"
                }}>Avg Experience</h3>
              </div>
              <p style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1e293b",
                marginLeft: "3.5rem"
              }}>{stats.avgExperience} years</p>
            </div>
            
            <div style={{
              backgroundColor: "white",
              borderRadius: "0.75rem",
              padding: "1.5rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              borderLeft: "4px solid #3b82f6"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem"
              }}>
                <div style={{
                  marginRight: "1rem",
                  padding: "0.5rem",
                  borderRadius: "50%",
                  backgroundColor: "rgba(59, 130, 246, 0.1)"
                }}>
                  <FaGlobe style={{ color: "#3b82f6", fontSize: "1.5rem" }} />
                </div>
                <h3 style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#334155"
                }}>Languages</h3>
              </div>
              <p style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1e293b",
                marginLeft: "3.5rem"
              }}>{stats.languagesCount}</p>
            </div>
          </div>

          {/* Experience Distribution */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "0.75rem",
            padding: "2rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#1e293b",
              marginBottom: "1.5rem"
            }}>Experience Distribution</h3>
            
            {stats.experienceDistribution.map((item, index) => (
              <div key={index} style={{ marginBottom: "1rem" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem"
                }}>
                  <span style={{ fontWeight: "500" }}>{item.range}</span>
                  <span style={{ color: "#64748b" }}>
                    {item.count} {item.count === 1 ? "guider" : "guiders"} ({item.percentage}%)
                  </span>
                </div>
                <div style={{
                  height: "8px",
                  width: "100%",
                  backgroundColor: "#e2e8f0",
                  borderRadius: "4px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    height: "100%",
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                    borderRadius: "4px"
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuiderDashboard;