import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { 
  FaChartPie, FaChartBar, FaUsers, 
  FaUserPlus, FaSignOutAlt, FaHome 
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const GuiderAnalytics = () => {
  const [guiders, setGuiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuiders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/guiders");
        setGuiders(response.data);
        const uniqueLocations = [...new Set(response.data.map((g) => g.location))];
        setLocations(uniqueLocations);
      } catch (err) {
        setError("Failed to load guiders data.");
      } finally {
        setLoading(false);
      }
    };

    fetchGuiders();
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
    navigate("/dashboard"); // Redirect to login page
  };

  const filteredGuiders = guiders.filter((guider) => {
    const matchesName = guider.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation ? guider.location === selectedLocation : true;
    const matchesExperience = selectedExperience ? guider.experience >= parseInt(selectedExperience) : true;
    return matchesName && matchesLocation && matchesExperience;
  });

  // Data processing for charts
  const getLocationData = () => {
    const locationCounts = filteredGuiders.reduce((acc, guider) => {
      acc[guider.location] = (acc[guider.location] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(locationCounts).map(([name, value]) => ({
      name,
      value
    }));
  };

  const getExperienceData = () => {
    const ranges = [
      { name: "0-2 years", min: 0, max: 2 },
      { name: "3-5 years", min: 3, max: 5 },
      { name: "6-10 years", min: 6, max: 10 },
      { name: "10+ years", min: 10, max: Infinity }
    ];

    return ranges.map(range => ({
      name: range.name,
      count: filteredGuiders.filter(g => g.experience >= range.min && g.experience <= range.max).length
    }));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarHeader}>Guider Admin</h2>
        <nav>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <NavLink to="/guiderdashboard" style={styles.navLink}>
                <FaHome style={styles.navIcon} />
                Dashboard
              </NavLink>
            </li>
            <li style={styles.navItem}>
              <NavLink to="/adds" style={styles.navLink}>
                <FaUserPlus style={styles.navIcon} />
                Add Guider
              </NavLink>
            </li>
            <li style={styles.navItem}>
              <NavLink to="/all" style={styles.navLink}>
                <FaUsers style={styles.navIcon} />
                Manage Guiders
              </NavLink>
            </li>
            <li style={styles.navItem}>
              <NavLink to="/guidertak" style={({ isActive }) => ({
                ...styles.navLink,
                backgroundColor: isActive ? "#334155" : "transparent"
              })}>
                <FaChartPie style={styles.navIcon} />
                Reports
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div style={styles.logoutContainer}>
          <button onClick={handleLogout} style={styles.logoutButton}>
            <FaSignOutAlt style={styles.logoutIcon} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h1 style={styles.header}>Guider Analytics Dashboard</h1>

        {/* Filters */}
        <div style={styles.filterContainer}>
          <input
            type="text"
            placeholder="Search guiders..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            style={styles.select}
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
          <select
            style={styles.select}
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
          >
            <option value="">All Experience</option>
            <option value="1">1+ years</option>
            <option value="3">3+ years</option>
            <option value="5">5+ years</option>
            <option value="10">10+ years</option>
          </select>
        </div>

        {/* Summary Cards */}
        <div style={styles.summaryCards}>
          <div style={styles.summaryCard}>
            <FaUsers style={styles.summaryIcon} />
            <div>
              <h3>Total Guiders</h3>
              <p style={styles.summaryValue}>{filteredGuiders.length}</p>
            </div>
          </div>
          <div style={styles.summaryCard}>
            <FaChartPie style={styles.summaryIcon} />
            <div>
              <h3>Locations</h3>
              <p style={styles.summaryValue}>{new Set(filteredGuiders.map(g => g.location)).size}</p>
            </div>
          </div>
          <div style={styles.summaryCard}>
            <FaChartBar style={styles.summaryIcon} />
            <div>
              <h3>Avg. Experience</h3>
              <p style={styles.summaryValue}>
                {filteredGuiders.length > 0 
                  ? (filteredGuiders.reduce((sum, g) => sum + g.experience, 0) / filteredGuiders.length).toFixed(1)
                  : 0} years
              </p>
            </div>
          </div>
        </div>

        {/* Charts */}
        {loading ? (
          <div style={styles.loading}>Loading analytics data...</div>
        ) : error ? (
          <div style={styles.error}>{error}</div>
        ) : (
          <div style={styles.chartsContainer}>
            <div style={styles.chartWrapper}>
              <h2 style={styles.chartTitle}>
                <FaChartPie style={styles.chartIcon} /> Location Distribution
              </h2>
              <div style={styles.chart}>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={getLocationData()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {getLocationData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={styles.chartWrapper}>
              <h2 style={styles.chartTitle}>
                <FaChartBar style={styles.chartIcon} /> Experience Distribution
              </h2>
              <div style={styles.chart}>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={getExperienceData()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" name="Number of Guiders" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    fontFamily: "'Inter', sans-serif"
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#1e293b",
    color: "white",
    padding: "1.5rem",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  sidebarHeader: {
    fontSize: "1.5rem",
    fontWeight: "700",
    marginBottom: "2rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid #334155"
  },
  navList: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  navItem: {
    marginBottom: "0.5rem"
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    color: "#cbd5e1",
    textDecoration: "none",
    transition: "all 0.3s",
    ":hover": {
      backgroundColor: "#334155"
    }
  },
  navIcon: {
    marginRight: "0.75rem"
  },
  logoutContainer: {
    marginTop: "auto",
    paddingTop: "1rem",
    borderTop: "1px solid #334155"
  },
  logoutButton: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    backgroundColor: "transparent",
    color: "#cbd5e1",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s",
    ":hover": {
      backgroundColor: "#334155"
    }
  },
  logoutIcon: {
    marginRight: "0.75rem"
  },
  mainContent: {
    flex: 1,
    padding: "2rem",
    overflow: "auto"
  },
  header: {
    color: "#333",
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "2rem"
  },
  filterContainer: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    flexWrap: "wrap"
  },
  searchInput: {
    flex: 1,
    minWidth: "200px",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid #ddd",
    fontSize: "1rem"
  },
  select: {
    flex: 1,
    minWidth: "200px",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid #ddd",
    fontSize: "1rem",
    backgroundColor: "white"
  },
  summaryCards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem"
  },
  summaryCard: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    gap: "1rem"
  },
  summaryIcon: {
    fontSize: "2rem",
    color: "#4CAF50"
  },
  summaryValue: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: "0.5rem 0 0",
    color: "#333"
  },
  chartsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "2rem",
    marginTop: "2rem"
  },
  chartWrapper: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  chartTitle: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "0",
    marginBottom: "1.5rem",
    color: "#333"
  },
  chartIcon: {
    color: "#4CAF50"
  },
  chart: {
    height: "400px"
  },
  loading: {
    textAlign: "center",
    padding: "2rem",
    fontSize: "1.2rem",
    color: "#666"
  },
  error: {
    textAlign: "center",
    padding: "2rem",
    fontSize: "1.2rem",
    color: "#f44336"
  }
};

export default GuiderAnalytics;