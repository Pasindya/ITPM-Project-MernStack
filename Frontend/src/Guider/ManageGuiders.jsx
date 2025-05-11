import { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import {
  FaEdit,
  FaTrash,
  FaTimes,
  FaEye,
  FaPlus,
  FaSignOutAlt,
  FaUserFriends,
  FaFileAlt,
  FaChartBar,
  FaHome,
  FaUserPlus,
  FaUsers,
  FaChartPie,
  FaDownload,
  FaSearch
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import React from "react";

const ManageGuiders = () => {
  const [guiders, setGuiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [currentGuider, setCurrentGuider] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchGuiders();
  }, []);

  const fetchGuiders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/guiders");
      setGuiders(response.data);
      const uniqueLocations = [...new Set(response.data.map((g) => g.location))];
      setLocations(uniqueLocations);
    } catch (err) {
      setError("Failed to load guiders.");
    } finally {
      setLoading(false);
    }
  };

  const filteredGuiders = guiders.filter((guider) => {
    const matchesName = guider.name.toLowerCase().includes(searchQuery.toLowerCase());
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
          pdf.text(`Languages: ${guider.languages.join(", ")}`, 50, yOffset + 40);

          pdf.setDrawColor(200);
          pdf.line(10, yOffset + 45, 200, yOffset + 45);
          yOffset += 50;
          resolve();
        };
      });
    }

    pdf.save("Guider_Report.pdf");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this guider?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/guiders/${id}`);
      setGuiders(guiders.filter((guider) => guider._id !== id));
    } catch (err) {
      alert("Failed to delete guider.");
    }
  };

  const handleEdit = (guider) => {
    setEditMode(true);
    setCurrentGuider({ ...guider, languages: guider.languages.join(", ") });
    setSelectedImage(null);
  };

  const handleView = (guider) => {
    setViewMode(true);
    setCurrentGuider(guider);
  };

  const validateForm = () => {
    const errors = {};
    if (!currentGuider.name || !/^[a-zA-Z\s]*$/.test(currentGuider.name))
      errors.name = "Name must only contain letters and spaces.";
    if (!currentGuider.gender) errors.gender = "Gender is required.";
    if (!currentGuider.contactNumber || !/^\d{10}$/.test(currentGuider.contactNumber))
      errors.contactNumber = "Contact number must be 10 digits.";
    if (!currentGuider.email || !/\S+@\S+\.\S+/.test(currentGuider.email))
      errors.email = "Invalid email address.";
    if (!currentGuider.location) errors.location = "Location is required.";
    if (!currentGuider.bio) errors.bio = "Bio is required.";
    
    // Enhanced language validation
    if (!currentGuider.languages) {
      errors.languages = "Languages are required.";
    } else {
      // Split by commas and trim each language
      const languageArray = currentGuider.languages.split(',').map(lang => lang.trim());
      
      // Check if any language is empty after splitting
      if (languageArray.some(lang => lang === "")) {
        errors.languages = "Empty language detected (check for extra commas)";
      }
      
      // Check each language for valid characters (letters and spaces)
      const invalidLanguages = languageArray.filter(
        lang => !/^[a-zA-Z\s-]+$/.test(lang)
      );
      
      if (invalidLanguages.length > 0) {
        errors.languages = `Invalid characters in language(s): ${invalidLanguages.join(', ')}`;
      }
    }
    
    if (!/^\d+$/.test(currentGuider.experience)) errors.experience = "Experience must be a number.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", currentGuider.name);
    formData.append("gender", currentGuider.gender);
    formData.append("contactNumber", currentGuider.contactNumber);
    formData.append("email", currentGuider.email);
    formData.append("location", currentGuider.location);
    formData.append("experience", currentGuider.experience);
    
    // Convert comma-separated string back to array for the backend
    const languagesArray = currentGuider.languages.split(',').map(lang => lang.trim());
    formData.append("languages", JSON.stringify(languagesArray));
    
    formData.append("bio", currentGuider.bio);

    if (selectedImage) {
      formData.append("guiderpic", selectedImage);
    }

    try {
      await axios.put(
        `http://localhost:5000/api/guiders/${currentGuider._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      fetchGuiders();
      setEditMode(false);
      setCurrentGuider(null);
    } catch (err) {
      alert("Failed to update guider.");
    }
  };

  const handleChange = (e) => {
    setCurrentGuider({ ...currentGuider, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return text;
    }
    const regex = new RegExp(`(${highlight})`, "gi");
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-300">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      backgroundColor: "#f8f9fa",
      fontFamily: "'Inter', sans-serif",
      overflow: "hidden"
    }}>
      {/* Sidebar - Fixed height with scroll */}
      <div style={{
        width: "250px",
        backgroundColor: "#1e293b",
        color: "white",
        padding: "1.5rem",
        height: "100vh",
        flexShrink: 0,
        overflowY: "auto",
        position: "sticky",
        top: 0
      }}>
        <h2 style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          marginBottom: "2rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid #334155"
        }}>
          Guider Admin
        </h2>
        
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

        <div style={{ marginTop: "2rem" }}>
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

      {/* Main Content - Scrollable area */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        height: "100vh",
        padding: "2rem",
        backgroundColor: "#f8f9fa"
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          backgroundColor: 'white', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
          borderRadius: '8px', 
          padding: '2rem',
          minHeight: 'calc(100vh - 4rem)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#007bff', 
              marginBottom: 0
            }}>
              Manage Guiders
            </h2>
            <button 
              onClick={generatePDF}
              style={{
                padding: '10px 15px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: '600'
              }}
            >
              <FaDownload /> Export as PDF
            </button>
          </div>

          <div style={{ 
            marginBottom: '1.5rem', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative' }}>
                <FaSearch style={{
                  position: 'absolute',
                  left: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748b'
                }} />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  style={{ 
                    padding: '10px 15px 10px 40px', 
                    borderRadius: '4px', 
                    border: '1px solid #ccc', 
                    width: '250px'
                  }}
                />
              </div>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                style={{ 
                  padding: '10px 15px', 
                  borderRadius: '4px', 
                  border: '1px solid #ccc',
                  width: '180px'
                }}
              >
                <option value="">All Locations</option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>{location}</option>
                ))}
              </select>

              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                style={{ 
                  padding: '10px 15px', 
                  borderRadius: '4px', 
                  border: '1px solid #ccc',
                  width: '200px'
                }}
              >
                <option value="">All Experience Levels</option>
                <option value="1">1+ years</option>
                <option value="3">3+ years</option>
                <option value="5">5+ years</option>
                <option value="10">10+ years</option>
              </select>
            </div>
            
            <span style={{ color: '#555' }}>
              Total Guiders: {filteredGuiders.length}
            </span>
          </div>
          
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          
          {loading ? (
            <p style={{ textAlign: 'center' }}>Loading...</p>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '1.5rem' 
            }}>
              {filteredGuiders.map((guider) => (
                <div key={guider._id} style={{ 
                  backgroundColor: '#f7f7f7', 
                  padding: '1rem', 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                  position: 'relative' 
                }}>
                  <img
                    src={guider.guiderpic}
                    alt={guider.name}
                    style={{ 
                      width: '96px', 
                      height: '96px', 
                      objectFit: 'cover', 
                      borderRadius: '50%', 
                      marginBottom: '1rem', 
                      marginLeft: 'auto', 
                      marginRight: 'auto',
                      display: 'block'
                    }}
                  />
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: 'bold', 
                    textAlign: 'center' 
                  }}>
                    {highlightText(guider.name, searchQuery)}
                  </h3>
                  <p style={{ 
                    color: '#555', 
                    textAlign: 'center' 
                  }}>
                    {guider.email}
                  </p>
                  <p style={{ 
                    color: '#555', 
                    textAlign: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    {guider.location}
                  </p>
                  <p style={{ 
                    color: '#555', 
                    textAlign: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    Experience: {guider.experience} years
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '1rem', 
                    marginTop: '1rem' 
                  }}>
                    <button
                      style={{ 
                        color: '#28a745', 
                        fontSize: '20px', 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer' 
                      }}
                      onClick={() => handleEdit(guider)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      style={{ 
                        color: '#dc3545', 
                        fontSize: '20px', 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer' 
                      }}
                      onClick={() => handleDelete(guider._id)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      style={{ 
                        color: '#000', 
                        fontSize: '20px', 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer' 
                      }}
                      onClick={() => handleView(guider)}
                    >
                      <FaEye />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {editMode && (
            <div style={{ 
              position: 'fixed', 
              inset: '0', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              backgroundColor: 'rgba(0, 0, 0, 0.5)', 
              zIndex: '1000' 
            }}>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '1.5rem', 
                borderRadius: '8px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                width: '400px',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '1rem' 
                }}>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: 'bold' 
                  }}>
                    Edit Guider
                  </h3>
                  <button
                    style={{ 
                      color: '#dc3545', 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer' 
                    }}
                    onClick={() => setEditMode(false)}
                  >
                    <FaTimes />
                  </button>
                </div>
                <form onSubmit={handleUpdate}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>NIC</label>
                    <input
                      type="text"
                      name="nic"
                      value={currentGuider.nic}
                      readOnly
                      style={{ 
                        padding: '0.5rem', 
                        width: '100%', 
                        borderRadius: '4px', 
                        border: '1px solid #ccc',
                        backgroundColor: '#f5f5f5',
                        cursor: 'not-allowed'
                      }}
                    />
                    <p style={{ color: '#666', fontSize: '0.8rem' }}>NIC cannot be changed</p>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={currentGuider.name}
                      onChange={handleChange}
                      style={{ 
                        padding: '0.5rem', 
                        width: '100%', 
                        borderRadius: '4px', 
                        border: '1px solid #ccc' 
                      }}
                    />
                    {formErrors.name && <p style={{ color: 'red', fontSize: '0.8rem' }}>{formErrors.name}</p>}
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Gender</label>
                    <select
                      name="gender"
                      value={currentGuider.gender}
                      onChange={handleChange}
                      style={{ 
                        padding: '0.5rem', 
                        width: '100%', 
                        borderRadius: '4px', 
                        border: '1px solid #ccc' 
                      }}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {formErrors.gender && <p style={{ color: 'red', fontSize: '0.8rem' }}>{formErrors.gender}</p>}
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Contact Number</label>
                    <input
                      type="text"
                      name="contactNumber"
                      value={currentGuider.contactNumber}
                      onChange={handleChange}
                      style={{ 
                        padding: '0.5rem', 
                        width: '100%', 
                        borderRadius: '4px', 
                        border: '1px solid #ccc' 
                      }}
                    />
                    {formErrors.contactNumber && <p style={{ color: 'red', fontSize: '0.8rem' }}>{formErrors.contactNumber}</p>}
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                    <input
                      type="text"
                      name="email"
                      value={currentGuider.email}
                      onChange={handleChange}
                      style={{ 
                        padding: '0.5rem', 
                        width: '100%', 
                        borderRadius: '4px', 
                        border: '1px solid #ccc' 
                      }}
                    />
                    {formErrors.email && <p style={{ color: 'red', fontSize: '0.8rem' }}>{formErrors.email}</p>}
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={currentGuider.location}
                      onChange={handleChange}
                      style={{ 
                        padding: '0.5rem', 
                        width: '100%', 
                        borderRadius: '4px', 
                        border: '1px solid #ccc' 
                      }}
                    />
                    {formErrors.location && <p style={{ color: 'red', fontSize: '0.8rem' }}>{formErrors.location}</p>}
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Languages</label>
                    <input
                      type="text"
                      name="languages"
                      value={currentGuider.languages}
                      onChange={handleChange}
                      placeholder="Comma separated list (e.g., English, Sinhala, Tamil)"
                      style={{ 
                        padding: '0.5rem', 
                        width: '100%', 
                        borderRadius: '4px', 
                        border: '1px solid #ccc' 
                      }}
                    />
                    {formErrors.languages && <p style={{ color: 'red', fontSize: '0.8rem' }}>{formErrors.languages}</p>}
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Experience (Years)</label>
                    <input
                      type="number"
                      name="experience"
                      value={currentGuider.experience}
                      onChange={handleChange}
                      style={{ 
                        padding: '0.5rem', 
                        width: '100%', 
                        borderRadius: '4px', 
                        border: '1px solid #ccc' 
                      }}
                    />
                    {formErrors.experience && <p style={{ color: 'red', fontSize: '0.8rem' }}>{formErrors.experience}</p>}
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Bio</label>
                    <textarea
                      name="bio"
                      value={currentGuider.bio}
                      onChange={handleChange}
                      style={{ 
                        padding: '0.5rem', 
                        width: '100%', 
                        borderRadius: '4px', 
                        border: '1px solid #ccc',
                        minHeight: '100px'
                      }}
                    ></textarea>
                    {formErrors.bio && <p style={{ color: 'red', fontSize: '0.8rem' }}>{formErrors.bio}</p>}
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Profile Picture</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ padding: '0.5rem' }}
                    />
                  </div>
                  <div style={{ 
                    marginTop: '1rem', 
                    display: 'flex', 
                    justifyContent: 'center' 
                  }}>
                    <button
                      type="submit"
                      style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: '100%'
                      }}
                    >
                      Update Guider
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {viewMode && (
            <div style={{ 
              position: 'fixed', 
              inset: '0', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              backgroundColor: 'rgba(0, 0, 0, 0.5)', 
              zIndex: '1000' 
            }}>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '1.5rem', 
                borderRadius: '8px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                width: '400px' 
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '1rem' 
                }}>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: 'bold' 
                  }}>
                    Guider Details
                  </h3>
                  <button
                    style={{ 
                      color: '#dc3545', 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer' 
                    }}
                    onClick={() => setViewMode(false)}
                  >
                    <FaTimes />
                  </button>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <img
                    src={currentGuider.guiderpic}
                    alt={currentGuider.name}
                    style={{ 
                      width: '120px', 
                      height: '120px', 
                      objectFit: 'cover', 
                      borderRadius: '50%', 
                      marginBottom: '1rem',
                      marginLeft: 'auto',
                      marginRight: 'auto'
                    }}
                  />
                  <h4 style={{ 
                    fontSize: '20px', 
                    fontWeight: 'bold', 
                    marginBottom: '0.5rem' 
                  }}>
                    {currentGuider.name}
                  </h4>
                  <p style={{ marginBottom: '0.5rem' }}>
                    <strong>NIC:</strong> {currentGuider.nic}
                  </p>
                  <p style={{ marginBottom: '0.5rem' }}>
                    <strong>Gender:</strong> {currentGuider.gender}
                  </p>
                  <p style={{ marginBottom: '0.5rem' }}>
                    <strong>Contact:</strong> {currentGuider.contactNumber}
                  </p>
                  <p style={{ marginBottom: '0.5rem' }}>
                    <strong>Email:</strong> {currentGuider.email}
                  </p>
                  <p style={{ marginBottom: '0.5rem' }}>
                    <strong>Location:</strong> {currentGuider.location}
                  </p>
                  <p style={{ marginBottom: '0.5rem' }}>
                    <strong>Languages:</strong> {currentGuider.languages.join(', ')}
                  </p>
                  <p style={{ marginBottom: '0.5rem' }}>
                    <strong>Experience:</strong> {currentGuider.experience} years
                  </p>
                  <p style={{ marginBottom: '0.5rem' }}>
                    <strong>Bio:</strong> {currentGuider.bio}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageGuiders;