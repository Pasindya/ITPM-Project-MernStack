import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateVehicle() {
    const location = useLocation();
    const navigate = useNavigate();
    const { booking } = location.state || {};

    const [formData, setFormData] = useState({
        _id: "",
        vehicleType: "",
        name: "",
        mobile: "",
        passportNumber: "",
        expectedDays: "",
        bookingdate: "",
        handoverDate: "",
        pricePerKm: "",
    });

    const [errors, setErrors] = useState({});
    const [inputValidity, setInputValidity] = useState({
        name: true,
        mobile: true,
        passportNumber: true
    });

    useEffect(() => {
        if (booking) {
            setFormData(booking);
        }
    }, [booking]);

    const today = new Date().toISOString().split("T")[0];

    const handleKeyPress = (e) => {
        // Prevent invalid characters based on field type
        switch (e.target.name) {
            case 'name':
                // Only allow letters and spaces
                if (!/^[A-Za-z\s]$/.test(e.key)) {
                    e.preventDefault();
                }
                break;
            case 'mobile':
                // Only allow numbers
                if (!/^\d$/.test(e.key)) {
                    e.preventDefault();
                }
                break;
            case 'passportNumber':
                // Only allow letters for first 2 characters, then digits
                const currentValue = e.target.value;
                if (currentValue.length < 2) {
                    if (!/^[A-Za-z]$/.test(e.key)) {
                        e.preventDefault();
                    }
                } else {
                    if (!/^\d$/.test(e.key)) {
                        e.preventDefault();
                    }
                }
                break;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedValue = value;

        // Format passport number to uppercase automatically and enforce format
        if (name === 'passportNumber') {
            // Remove any non-alphanumeric characters
            updatedValue = value.replace(/[^A-Za-z0-9]/g, '');
            
            // Convert first 2 characters to uppercase
            if (updatedValue.length > 2) {
                updatedValue = updatedValue.substring(0, 2).toUpperCase() + 
                               updatedValue.substring(2);
            } else {
                updatedValue = updatedValue.toUpperCase();
            }
            
            // Limit to 12 characters (2 letters + 10 digits)
            if (updatedValue.length > 12) {
                updatedValue = updatedValue.substring(0, 12);
            }
        }

        setFormData({ ...formData, [name]: updatedValue });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
            setInputValidity({ ...inputValidity, [name]: true });
        }
    };

    const validatePassportNumber = (passportNumber) => {
        // Strict validation: exactly 2 letters followed by exactly 10 digits
        const strictPattern = /^[A-Za-z]{2}\d{10}$/;
        return strictPattern.test(passportNumber);
    };

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        // Name validation (only alphabetic and spaces)
        if (!/^[A-Za-z\s]+$/.test(formData.name)) {
            tempErrors.name = "Name must contain only letters and spaces.";
            isValid = false;
            setInputValidity(prev => ({ ...prev, name: false }));
        }

        // Mobile number validation (exactly 10 digits)
        if (!/^\d{10}$/.test(formData.mobile)) {
            tempErrors.mobile = "Mobile must be exactly 10 digits (0-9).";
            isValid = false;
            setInputValidity(prev => ({ ...prev, mobile: false }));
        }

        // Enhanced Passport number validation
        if (!formData.passportNumber.trim()) {
            tempErrors.passportNumber = "Passport Number is required";
            isValid = false;
            setInputValidity(prev => ({ ...prev, passportNumber: false }));
        } else if (!validatePassportNumber(formData.passportNumber)) {
            tempErrors.passportNumber = "Passport must be 2 letters followed by 10 digits (e.g., AB1234567890)";
            isValid = false;
            setInputValidity(prev => ({ ...prev, passportNumber: false }));
        }

        // Date validations
        if (formData.bookingdate < today) {
            tempErrors.bookingdate = "Booking date cannot be in the past.";
            isValid = false;
        }

        if (formData.handoverDate < today) {
            tempErrors.handoverDate = "Handover date cannot be in the past.";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                const response = await axios.put(`http://localhost:5000/htransports/${formData._id}`, formData);
                console.log("Update successful:", response.data);
                alert("Booking updated successfully!");
                navigate("/vehiclebooking");
            } catch (error) {
                console.error("Error updating booking:", error);
                alert("Failed to update booking. Please try again.");
            }
        }
    };

    // Styles (same as before)
    const containerStyle = {
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ffffff"
    };

    const headerStyle = {
        textAlign: "center",
        color: "#2c3e50",
        marginBottom: "1.5rem",
        fontSize: "1.8rem",
        fontWeight: "600"
    };

    const formGroupStyle = {
        marginBottom: "1.25rem"
    };

    const labelStyle = {
        display: "block",
        marginBottom: "0.5rem",
        fontWeight: "500",
        color: "#34495e"
    };

    const baseInputStyle = {
        width: "100%",
        padding: "0.75rem",
        fontSize: "1rem",
        border: "1px solid #ddd",
        borderRadius: "4px",
        transition: "all 0.3s ease",
        boxSizing: "border-box"
    };

    const validInputStyle = {
        ...baseInputStyle,
        borderColor: "#3498db",
        boxShadow: "0 0 0 2px rgba(52, 152, 219, 0.2)"
    };

    const invalidInputStyle = {
        ...baseInputStyle,
        borderColor: "#e74c3c",
        boxShadow: "0 0 0 2px rgba(231, 76, 60, 0.2)"
    };

    const errorStyle = {
        color: "#e74c3c",
        fontSize: "0.875rem",
        marginTop: "0.25rem",
        height: "1rem"
    };

    const buttonStyle = {
        width: "100%",
        padding: "0.75rem",
        backgroundColor: "#3498db",
        color: "white",
        border: "none",
        borderRadius: "4px",
        fontSize: "1rem",
        fontWeight: "500",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        marginTop: "1rem"
    };

    const buttonHoverStyle = {
        backgroundColor: "#2980b9"
    };

    return (
        <div style={containerStyle}>
            <h2 style={headerStyle}>Update Booking</h2>
            <form onSubmit={handleSubmit}>
                {/* Vehicle Type */}
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Vehicle Type:</label>
                    <input
                        type="text"
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        style={baseInputStyle}
                        required
                        disabled
                    />
                </div>

                {/* Name */}
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        style={inputValidity.name ? validInputStyle : invalidInputStyle}
                        required
                    />
                    <div style={errorStyle}>{errors.name}</div>
                </div>

                {/* Mobile */}
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Mobile:</label>
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        maxLength="10"
                        style={inputValidity.mobile ? validInputStyle : invalidInputStyle}
                        required
                    />
                    <div style={errorStyle}>{errors.mobile}</div>
                </div>

                {/* Passport Number */}
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Passport Number:</label>
                    <input
                        type="text"
                        name="passportNumber"
                        value={formData.passportNumber}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        maxLength="12"
                        placeholder="AB1234567890"
                        style={inputValidity.passportNumber ? validInputStyle : invalidInputStyle}
                        required
                    />
                    <div style={errorStyle}>{errors.passportNumber}</div>
                </div>

                {/* Expected Days */}
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Expected Days:</label>
                    <input
                        type="number"
                        name="expectedDays"
                        value={formData.expectedDays}
                        onChange={handleChange}
                        min="1"
                        style={baseInputStyle}
                        required
                    />
                </div>

                {/* Booking Date */}
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Booking Date:</label>
                    <input
                        type="date"
                        name="bookingdate"
                        value={formData.bookingdate}
                        onChange={handleChange}
                        min={today}
                        style={errors.bookingdate ? invalidInputStyle : baseInputStyle}
                        required
                    />
                    <div style={errorStyle}>{errors.bookingdate}</div>
                </div>

                {/* Handover Date */}
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Handover Date:</label>
                    <input
                        type="date"
                        name="handoverDate"
                        value={formData.handoverDate}
                        onChange={handleChange}
                        min={today}
                        style={errors.handoverDate ? invalidInputStyle : baseInputStyle}
                        required
                    />
                    <div style={errorStyle}>{errors.handoverDate}</div>
                </div>

                {/* Price Per Km */}
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Price Per Km:</label>
                    <input
                        type="number"
                        name="pricePerKm"
                        value={formData.pricePerKm}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        style={baseInputStyle}
                        required
                        disabled
                    />
                </div>

                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                >
                    Update Booking
                </button>
            </form>
        </div>
    );
}

export default UpdateVehicle;