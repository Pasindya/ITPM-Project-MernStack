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

    useEffect(() => {
        if (booking) {
            setFormData(booking);
        }
    }, [booking]);

    const today = new Date().toISOString().split("T")[0];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

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

    // Styles
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

    const disabledInputStyle = {
        ...baseInputStyle,
        backgroundColor: "#f5f5f5",
        color: "#666",
        cursor: "not-allowed"
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
                        style={disabledInputStyle}
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
                        style={disabledInputStyle}
                        disabled
                    />
                </div>

                {/* Mobile */}
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Mobile:</label>
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        style={disabledInputStyle}
                        disabled
                    />
                </div>

                {/* Passport Number */}
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Passport Number:</label>
                    <input
                        type="text"
                        name="passportNumber"
                        value={formData.passportNumber}
                        style={disabledInputStyle}
                        disabled
                    />
                </div>

                {/* Expected Days */}
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Expected Days:</label>
                    <input
                        type="number"
                        name="expectedDays"
                        value={formData.expectedDays}
                        style={disabledInputStyle}
                        disabled
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