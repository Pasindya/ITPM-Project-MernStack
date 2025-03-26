import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Booking(props) {
    const { _id, vehicleType, name, mobile, passportNumber, expectedDays, bookingdate, handoverDate, pricePerKm } = props.booking;
    const navigate = useNavigate();

    const handleUpdate = () => {
        console.log("Navigating with booking data:", props.booking);
        navigate('/updatevehicle', { 
            state: { 
                booking: props.booking 
            } 
        });
    };

    const handleDelete = async () => {
        try {
            const isConfirmed = window.confirm(`Are you sure you want to delete the booking for ${name}?`);
            
            if (!isConfirmed) return;
            
            await axios.delete(`http://localhost:5000/htransports/${_id}`);
            
            alert('Booking deleted successfully!');
            
            if (props.onDelete) {
                props.onDelete(_id);
            }
            
        } catch (error) {
            console.error("Error deleting booking:", error);
            alert('Failed to delete booking. Please try again.');
        }
    };

    // Enhanced Styles
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '20px',
    };

    const cardStyle = {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',
        padding: '30px',
        fontFamily: "'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif",
        color: '#333',
        maxWidth: '800px',
        width: '100%',
        border: '1px solid #e0e0e0',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        ':hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.12)'
        }
    };

    const titleStyle = {
        fontSize: '28px',
        fontWeight: '600',
        marginBottom: '25px',
        color: '#2c3e50',
        textAlign: 'center',
        paddingBottom: '15px',
        borderBottom: '2px solid #3498db'
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: '0',
        marginBottom: '25px',
        borderRadius: '8px',
        overflow: 'hidden'
    };

    const thStyle = {
        backgroundColor: '#3498db',
        color: 'white',
        padding: '15px',
        textAlign: 'left',
        fontWeight: '500',
        fontSize: '16px'
    };

    const tdStyle = {
        padding: '15px',
        borderBottom: '1px solid #eaeaea',
        transition: 'background-color 0.2s ease'
    };

    const trHoverStyle = {
        ':hover': {
            backgroundColor: '#f5f9ff'
        }
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '15px',
        marginTop: '25px'
    };

    const updateButtonStyle = {
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '15px',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        ':hover': {
            backgroundColor: '#2980b9',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
        }
    };

    const deleteButtonStyle = {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '15px',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        ':hover': {
            backgroundColor: '#c0392b',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
        }
    };

    const fieldCellStyle = {
        fontWeight: '600',
        color: '#2c3e50',
        width: '35%'
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <div style={titleStyle}>Booking Details</div>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Field</th>
                            <th style={thStyle}>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={trHoverStyle}>
                            <td style={{...tdStyle, ...fieldCellStyle}}>ID</td>
                            <td style={tdStyle}>{_id}</td>
                        </tr>
                        <tr style={trHoverStyle}>
                            <td style={{...tdStyle, ...fieldCellStyle}}>Vehicle Type</td>
                            <td style={tdStyle}>{vehicleType}</td>
                        </tr>
                        <tr style={trHoverStyle}>
                            <td style={{...tdStyle, ...fieldCellStyle}}>Name</td>
                            <td style={tdStyle}>{name}</td>
                        </tr>
                        <tr style={trHoverStyle}>
                            <td style={{...tdStyle, ...fieldCellStyle}}>Mobile</td>
                            <td style={tdStyle}>{mobile}</td>
                        </tr>
                        <tr style={trHoverStyle}>
                            <td style={{...tdStyle, ...fieldCellStyle}}>Passport Number</td>
                            <td style={tdStyle}>{passportNumber}</td>
                        </tr>
                        <tr style={trHoverStyle}>
                            <td style={{...tdStyle, ...fieldCellStyle}}>Expected Days</td>
                            <td style={tdStyle}>{expectedDays}</td>
                        </tr>
                        <tr style={trHoverStyle}>
                            <td style={{...tdStyle, ...fieldCellStyle}}>Booking Date</td>
                            <td style={tdStyle}>{new Date(bookingdate).toLocaleDateString()}</td>
                        </tr>
                        <tr style={trHoverStyle}>
                            <td style={{...tdStyle, ...fieldCellStyle}}>Handover Date</td>
                            <td style={tdStyle}>{new Date(handoverDate).toLocaleDateString()}</td>
                        </tr>
                        <tr style={trHoverStyle}>
                            <td style={{...tdStyle, ...fieldCellStyle}}>Price Per Km</td>
                            <td style={tdStyle}>Rs. {pricePerKm.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>
                <div style={buttonContainerStyle}>
                    <button 
                        style={updateButtonStyle}
                        onClick={handleUpdate}
                    >
                        Update
                    </button>
                    <button 
                        style={deleteButtonStyle}
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Booking;