import React, { useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DashNav from "../Pages/DashNav";

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate NIC - 12 characters (9 digits and 1 letter 'V' at the end)
    if (name === "nic") {
      // Allow only numbers and letter "V" at the end for NIC validation
      if (/[^0-9V]/.test(value)) {
        return; // block invalid characters
      }
      // Check if NIC length is exactly 12 and ends with 'V'
      if (value.length > 13 || (value.length === 13 && value.charAt(12) !== 'V')) {
        return; // block if not 12 characters or doesn't end with 'V'
      }
    }

    // Validate email
    if (name === "email") {
      // Allow only valid email characters (letters, numbers, @, .)
      if (/[^a-zA-Z0-9@.]/.test(value)) {
        return; // block invalid characters
      }
    }

    // Validate phone number (allow only digits and 10 digits)
    if (name === "contactNumber") {
      if (/[^0-9]/.test(value)) {
        return; // block non-numeric characters
      }
      if (value.length > 10) {
        return; // restrict length to 10 digits
      }
    }

    // Validate Experience (only allow numbers and ensure experience <= 40)
    if (name === "experience") {
      if (/[^0-9]/.test(value)) {
        return; // block non-numeric characters
      }
      if (parseInt(value) > 40) {
        return; // restrict experience to 40 years or less
      }
    }

    // Set the form data value
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

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    if (guiderPic) {
      formDataToSend.append("guiderpic", guiderPic);
    } else {
      setError("Please upload a guider image.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/guiders", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/all");
    } catch (err) {
      setError("Failed to add guider. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      
      <div
        style={{
          maxWidth: "800px",
          margin: "auto",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          marginTop: "50px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
          <div
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              border: "4px solid #D1D5DB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              backgroundColor: "#F3F4F6",
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ position: "absolute", inset: "0", opacity: 0, cursor: "pointer" }}
            />
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
              />
            ) : (
              <FaCloudUploadAlt style={{ fontSize: "30px", color: "#333" }} />
            )}
          </div>
        </div>

        <h2 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", color: "#333", marginBottom: "30px" }}>
          Add New Guider
        </h2>

        {error && <p style={{ color: "red", textAlign: "center", marginBottom: "20px" }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
          {/* Form Inputs */}
          <input
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            placeholder="NIC Number (12 characters, ends with V)"
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            style={inputStyle}
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Experience (years)"
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
            placeholder="Languages"
            required
            style={inputStyle}
          />
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Bio"
            required
            style={{ ...inputStyle, height: "150px" }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#000",
              color: "#fff",
              padding: "15px",
              borderRadius: "8px",
              cursor: "pointer",
              border: "none",
              fontSize: "16px",
              transition: "background-color 0.3s",
            }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Add Guider"}
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  border: "1px solid #D1D5DB",
  padding: "12px",
  borderRadius: "8px",
  width: "100%",
  fontSize: "16px",
  color: "#333",
  backgroundColor: "#F9FAFB",
};

export default AddGuider;