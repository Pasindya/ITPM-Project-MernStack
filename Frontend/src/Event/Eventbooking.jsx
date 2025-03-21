import React, { useState } from "react";
import axios from "axios";

const EventBooking = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    City: "",
    Number: "",
    Gmail: "",
    NumberAdult: "",
    Date: "",
    Time: "",
    Location: "",
    EventCategory: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict input types for specific fields
    let sanitizedValue = value;
    if (name === "FirstName" || name === "LastName" || name === "City" || name === "Location" || name === "EventCategory") {
      // Allow only alphabets and spaces
      sanitizedValue = value.replace(/[^a-zA-Z\s]/g, "");
    } else if (name === "Number" || name === "NumberAdult") {
      // Allow only numbers
      sanitizedValue = value.replace(/\D/g, "");
    }

    setFormData({ ...formData, [name]: sanitizedValue });

    // Validate the field as the user types
    validateField(name, sanitizedValue);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "FirstName":
      case "LastName":
      case "City":
      case "Location":
      case "EventCategory":
        if (!value.trim()) {
          error = "This field is required.";
        }
        break;
      case "Number":
        if (!/^\d{10}$/.test(value)) {
          error = "Phone number must be 10 digits.";
        }
        break;
      case "Gmail":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email address.";
        }
        break;
      case "NumberAdult":
        if (!/^\d+$/.test(value) || parseInt(value) <= 0) {
          error = "Number of adults must be a positive integer.";
        }
        break;
      case "Date":
      case "Time":
        const selectedDateTime = new Date(`${formData.Date}T${formData.Time}`);
        const currentDateTime = new Date();
        if (selectedDateTime <= currentDateTime) {
          error = "Date and time must be in the future.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/events", formData);
      alert("Event booked successfully!");
    } catch (error) {
      console.error("Error booking event", error);
      alert("Failed to book event");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Event Booking Form</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {[
            "FirstName",
            "LastName",
            "City",
            "Number",
            "Gmail",
            "NumberAdult",
            "Date",
            "Time",
            "Location",
            "EventCategory",
          ].map((field) => (
            <div key={field} style={styles.inputContainer}>
              <label style={styles.label}>
                {field.replace(/([A-Z])/g, " $1").trim()}:
              </label>
              <input
                type={
                  field === "Date"
                    ? "date"
                    : field === "Time"
                    ? "time"
                    : field === "Number" || field === "NumberAdult"
                    ? "number"
                    : "text"
                }
                name={field}
                placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").trim()}`}
                value={formData[field]}
                onChange={handleChange}
                onBlur={(e) => validateField(field, e.target.value)}
                required
                style={styles.input}
              />
              {errors[field] && <span style={styles.error}>{errors[field]}</span>}
            </div>
          ))}
          <button type="submit" style={styles.button}>
            Book Event
          </button>
        </form>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
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

          @keyframes gradientBackground {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    animation: "gradientBackground 10s ease infinite",
    backgroundSize: "200% 200%",
    padding: "2rem",
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    padding: "2.5rem",
    width: "100%",
    maxWidth: "500px",
    animation: "fadeIn 1s ease-in-out",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontSize: "1rem",
    fontWeight: "500",
    color: "#555",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    "&:focus": {
      borderColor: "#6a11cb",
      boxShadow: "0 0 8px rgba(106, 17, 203, 0.3)",
      outline: "none",
    },
  },
  error: {
    color: "#ff4d4f",
    fontSize: "0.875rem",
    marginTop: "0.25rem",
  },
  button: {
    backgroundColor: "#6a11cb",
    color: "white",
    border: "none",
    padding: "0.75rem",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    borderRadius: "10px",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    animation: "pulse 2s infinite",
    marginTop: "1rem",
    "&:hover": {
      backgroundColor: "#2575fc",
      transform: "scale(1.05)",
    },
  },
};

export default EventBooking;