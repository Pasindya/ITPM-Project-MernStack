import React, { useState } from "react";
import axios from "axios";
import { 
  FaCamera, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, 
  FaStar, FaLanguage, FaInfoCircle, FaHome, FaUserPlus, 
  FaUsers, FaChartPie, FaSignOutAlt 
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const AddGuider = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nic: "",
    name: "",
    gender: "",
    contactNumber: "",
    email: "",
    location: "",
    experience: "",
    languages: "",
    bio: "",
  });

  const [guiderPic, setGuiderPic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateNIC = (nic) => {
    const oldFormat = /^[0-9]{9}[vV]$/;
    const newFormat = /^[0-9]{12}$/;
    return oldFormat.test(nic) || newFormat.test(nic);
  };

  const validateName = (name) => {
    return /^[a-zA-Z\s.'-]+$/.test(name);
  };

  const validateEmail = (email) => {
    // Updated to allow both uppercase and lowercase letters
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(email);
  };

  const validateLanguages = (languages) => {
    return /^[a-zA-Z\s,]+$/.test(languages);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "nic":
        if (!/^[0-9vV]*$/.test(value)) return;
        if (value.length > 12 || (value.toLowerCase().includes('v') && value.length > 10)) return;
        break;
      
      case "name":
        if (!validateName(value) && value !== "") return;
        break;
      
      case "email":
        // Allow both uppercase and lowercase letters
        if (!/^[a-zA-Z0-9@._-]*$/.test(value)) return;
        break;
      
      case "contactNumber":
        if (/[^0-9]/.test(value)) return;
        if (value.length > 10) return;
        break;
      
      case "experience":
        if (/[^0-9]/.test(value)) return;
        if (value.length > 2) return;
        if (parseInt(value) > 40) return;
        break;
      
      case "languages":
        if (!validateLanguages(value) && value !== "") return;
        break;
      
      default:
        break;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGuiderPic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateNIC(formData.nic)) {
      setError("Invalid NIC format. Please enter 12 digits or 9 digits followed by V");
      setLoading(false);
      return;
    }

    if (!validateName(formData.name)) {
      setError("Name can only contain letters and spaces");
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address (must contain @ and .)");
      setLoading(false);
      return;
    }

    if (!validateLanguages(formData.languages)) {
      setError("Languages can only contain letters and commas");
      setLoading(false);
      return;
    }

    if (!guiderPic) {
      setError("Please upload a profile photo");
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) formDataToSend.append(key, formData[key]);
    formDataToSend.append("guiderpic", guiderPic);

    try {
      await axios.post("http://localhost:5000/api/guiders", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/all");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      backgroundColor: "#f8f9fa",
      fontFamily: "'Inter', sans-serif",
      overflow: "hidden"
    }}>
      {/* Main container with single scroll */}
      <div style={{
        display: "flex",
        flex: 1,
        overflow: "auto"
      }}>
        {/* Sidebar - No individual scrolling */}
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

        {/* Main Content - No individual scrolling */}
        <div style={{
          flex: 1,
          padding: "2rem",
          background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
          overflow: "auto"
        }}>
          <div style={{
            width: "100%",
            maxWidth: "900px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
            overflow: "hidden",
            margin: "0 auto"
          }}>
            {/* Header with travel-themed gradient */}
            <div style={{
              background: "linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)",
              padding: "1.5rem",
              color: "white",
              textAlign: "center"
            }}>
              <h1 style={{
                fontSize: "1.8rem",
                fontWeight: "600",
                margin: "0",
                letterSpacing: "0.5px"
              }}>Become a Certified Travel Guide</h1>
              <p style={{
                opacity: "0.9",
                margin: "0.5rem 0 0",
                fontSize: "0.95rem"
              }}>Join our network of professional guides and share your local expertise</p>
            </div>

            <div style={{ padding: "2rem" }}>
              {error && (
                <div style={{
                  background: "#fff5f5",
                  borderLeft: "4px solid #ef4444",
                  color: "#dc2626",
                  padding: "0.8rem 1rem",
                  marginBottom: "1.5rem",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  <svg style={{ flexShrink: "0" }} width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Profile Photo Upload */}
              <div style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "2rem"
              }}>
                <div style={{
                  position: "relative",
                  width: "120px",
                  height: "120px"
                }}>
                  <div style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    border: "3px solid #e0e7ff",
                    overflow: "hidden",
                    background: preview ? "none" : "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {preview ? (
                      <img src={preview} alt="Preview" style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }} />
                    ) : (
                      <FaCamera style={{
                        fontSize: "2rem",
                        color: "#94a3b8"
                      }} />
                    )}
                  </div>
                  <div style={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    background: "#4f46e5",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
                  }}>
                    <FaCamera style={{ color: "white", fontSize: "0.9rem" }} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        opacity: "0",
                        cursor: "pointer"
                      }}
                    />
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1.25rem",
                  marginBottom: "1.25rem"
                }}>
                  {/* NIC */}
                  <div style={{ position: "relative" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#4b5563"
                    }}>NIC Number</label>
                    <div style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center"
                    }}>
                      <div style={{
                        position: "absolute",
                        left: "0.75rem",
                        color: "#9ca3af"
                      }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="nic"
                        value={formData.nic}
                        onChange={handleChange}
                        placeholder="123456789V or 123456789012"
                        required
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem 0.75rem 2.5rem",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          fontSize: "0.95rem",
                          transition: "all 0.2s",
                          background: "#f9fafb"
                        }}
                      />
                    </div>
                    <div style={{
                      fontSize: "0.75rem",
                      color: "#6b7280",
                      marginTop: "0.25rem"
                    }}>
                      Format: 123456789V or 123456789012
                    </div>
                  </div>

                  {/* Full Name */}
                  <div style={{ position: "relative" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#4b5563"
                    }}>Full Name</label>
                    <div style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center"
                    }}>
                      <div style={{
                        position: "absolute",
                        left: "0.75rem",
                        color: "#9ca3af"
                      }}>
                        <FaUser />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        required
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem 0.75rem 2.5rem",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          fontSize: "0.95rem",
                          transition: "all 0.2s",
                          background: "#f9fafb"
                        }}
                      />
                    </div>
                    <div style={{
                      fontSize: "0.75rem",
                      color: "#6b7280",
                      marginTop: "0.25rem"
                    }}>
                      Only letters and spaces allowed
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#4b5563"
                    }}>Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        fontSize: "0.95rem",
                        transition: "all 0.2s",
                        background: "#f9fafb",
                        appearance: "none",
                        backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em"
                      }}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Contact Number */}
                  <div style={{ position: "relative" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#4b5563"
                    }}>Contact Number</label>
                    <div style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center"
                    }}>
                      <div style={{
                        position: "absolute",
                        left: "0.75rem",
                        color: "#9ca3af"
                      }}>
                        <FaPhone />
                      </div>
                      <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="0771234567"
                        required
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem 0.75rem 2.5rem",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          fontSize: "0.95rem",
                          transition: "all 0.2s",
                          background: "#f9fafb"
                        }}
                      />
                    </div>
                    <div style={{
                      fontSize: "0.75rem",
                      color: "#6b7280",
                      marginTop: "0.25rem"
                    }}>
                      10 digits only
                    </div>
                  </div>

                  {/* Email */}
                  <div style={{ position: "relative" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#4b5563"
                    }}>Email Address</label>
                    <div style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center"
                    }}>
                      <div style={{
                        position: "absolute",
                        left: "0.75rem",
                        color: "#9ca3af"
                      }}>
                        <FaEnvelope />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem 0.75rem 2.5rem",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          fontSize: "0.95rem",
                          transition: "all 0.2s",
                          background: "#f9fafb"
                        }}
                      />
                    </div>
                    <div style={{
                      fontSize: "0.75rem",
                      color: "#6b7280",
                      marginTop: "0.25rem"
                    }}>
                      Must contain @ and .
                    </div>
                  </div>

                  {/* Location */}
                  <div style={{ position: "relative" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#4b5563"
                    }}>Location</label>
                    <div style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center"
                    }}>
                      <div style={{
                        position: "absolute",
                        left: "0.75rem",
                        color: "#9ca3af"
                      }}>
                        <FaMapMarkerAlt />
                      </div>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Colombo, Sri Lanka"
                        required
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem 0.75rem 2.5rem",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          fontSize: "0.95rem",
                          transition: "all 0.2s",
                          background: "#f9fafb"
                        }}
                      />
                    </div>
                  </div>

                  {/* Experience */}
                  <div style={{ position: "relative" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#4b5563"
                    }}>Years of Experience</label>
                    <div style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center"
                    }}>
                      <div style={{
                        position: "absolute",
                        left: "0.75rem",
                        color: "#9ca3af"
                      }}>
                        <FaStar />
                      </div>
                      <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="5"
                        required
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem 0.75rem 2.5rem",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          fontSize: "0.95rem",
                          transition: "all 0.2s",
                          background: "#f9fafb"
                        }}
                      />
                    </div>
                    <div style={{
                      fontSize: "0.75rem",
                      color: "#6b7280",
                      marginTop: "0.25rem"
                    }}>
                      Max 40 years
                    </div>
                  </div>

                  {/* Languages */}
                  <div style={{ position: "relative" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#4b5563"
                    }}>Languages Spoken</label>
                    <div style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center"
                    }}>
                      <div style={{
                        position: "absolute",
                        left: "0.75rem",
                        color: "#9ca3af"
                      }}>
                        <FaLanguage />
                      </div>
                      <input
                        type="text"
                        name="languages"
                        value={formData.languages}
                        onChange={handleChange}
                        placeholder="English, Sinhala, Tamil"
                        required
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem 0.75rem 2.5rem",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          fontSize: "0.95rem",
                          transition: "all 0.2s",
                          background: "#f9fafb"
                        }}
                      />
                    </div>
                    <div style={{
                      fontSize: "0.75rem",
                      color: "#6b7280",
                      marginTop: "0.25rem"
                    }}>
                      Separate with commas (no numbers or symbols)
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#4b5563"
                  }}>About You</label>
                  <div style={{ position: "relative" }}>
                    <div style={{
                      position: "absolute",
                      top: "0.75rem",
                      left: "0.75rem",
                      color: "#9ca3af"
                    }}>
                      <FaInfoCircle />
                    </div>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about your guiding experience, specialties, and why travelers should choose you..."
                      required
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem 0.75rem 2.5rem",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        fontSize: "0.95rem",
                        transition: "all 0.2s",
                        background: "#f9fafb",
                        minHeight: "120px"
                      }}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    background: loading ? "#a5b4fc" : "linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)",
                    color: "white",
                    padding: "0.9rem",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: "0 4px 6px -1px rgba(79, 70, 229, 0.3), 0 2px 4px -1px rgba(79, 70, 229, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem"
                  }}
                >
                  {loading ? (
                    <>
                      <div style={{
                        width: "1.25rem",
                        height: "1.25rem",
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "white",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite"
                      }} />
                      Processing Registration...
                    </>
                  ) : (
                    "Register as Professional Guide"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: #a5b4fc;
          box-shadow: 0 0 0 3px rgba(199, 210, 254, 0.5);
        }
      `}</style>
    </div>
  );
};

export default AddGuider;