import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Add() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        FirstName: "",
        LastName: "",
        City: "",
        Number: "",
        Gmail: "",
        NumberAdult: "",
        Date: "",
        Time: "",
        Location: "",
        EventCategory: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [shake, setShake] = useState(false);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const sendRequest = async () => {
        return await axios.post("http://localhost:5000/events", {
            FirstName: inputs.FirstName,
            LastName: inputs.LastName,
            City: inputs.City,
            Number: inputs.Number,
            Gmail: inputs.Gmail,
            NumberAdult: Number(inputs.NumberAdult),
            Date: inputs.Date,
            Time: inputs.Time,
            Location: inputs.Location,
            EventCategory: inputs.EventCategory,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate required fields
        if (!inputs.FirstName || !inputs.LastName || !inputs.Date || !inputs.Time) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
        }

        setIsSubmitting(true);
        try {
            await sendRequest();
            navigate("/eventm");
        } catch (error) {
            console.error("Error adding event:", error);
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            padding: '2rem',
            fontFamily: "'Poppins', sans-serif",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '20px',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                padding: '2.5rem',
                width: '100%',
                maxWidth: '700px',
                transform: shake ? 'translateX(0)' : 'translateY(0)',
                animation: shake ? 'shake 0.5s' : 'fadeInUp 0.6s ease-out'
            }}>
                <h1 style={{
                    textAlign: 'center',
                    marginBottom: '2rem',
                    fontSize: '2.2rem',
                    fontWeight: '600',
                    background: 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent'
                }}>Create New Event</h1>
                
                <form onSubmit={handleSubmit} style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1.5rem'
                }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            name="FirstName"
                            placeholder=" "
                            value={inputs.FirstName}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '1rem',
                                border: '2px solid #e0e0e0',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                ':focus': {
                                    borderColor: '#6a11cb',
                                    outline: 'none',
                                    boxShadow: '0 0 0 3px rgba(106, 17, 203, 0.2)'
                                }
                            }}
                        />
                        <label style={{
                            position: 'absolute',
                            left: '1rem',
                            top: inputs.FirstName ? '0' : '1rem',
                            transform: inputs.FirstName ? 'translateY(-50%) scale(0.9)' : 'none',
                            background: inputs.FirstName ? 'white' : 'transparent',
                            padding: inputs.FirstName ? '0 0.5rem' : '0',
                            color: inputs.FirstName ? '#6a11cb' : '#757575',
                            transition: 'all 0.2s ease',
                            pointerEvents: 'none',
                            fontSize: inputs.FirstName ? '0.9rem' : '1rem'
                        }}>
                            First Name
                        </label>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            name="LastName"
                            placeholder=" "
                            value={inputs.LastName}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '1rem',
                                border: '2px solid #e0e0e0',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                ':focus': {
                                    borderColor: '#6a11cb',
                                    outline: 'none',
                                    boxShadow: '0 0 0 3px rgba(106, 17, 203, 0.2)'
                                }
                            }}
                        />
                        <label style={{
                            position: 'absolute',
                            left: '1rem',
                            top: inputs.LastName ? '0' : '1rem',
                            transform: inputs.LastName ? 'translateY(-50%) scale(0.9)' : 'none',
                            background: inputs.LastName ? 'white' : 'transparent',
                            padding: inputs.LastName ? '0 0.5rem' : '0',
                            color: inputs.LastName ? '#6a11cb' : '#757575',
                            transition: 'all 0.2s ease',
                            pointerEvents: 'none',
                            fontSize: inputs.LastName ? '0.9rem' : '1rem'
                        }}>
                            Last Name
                        </label>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            name="City"
                            placeholder=" "
                            value={inputs.City}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '1rem',
                                border: '2px solid #e0e0e0',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                ':focus': {
                                    borderColor: '#6a11cb',
                                    outline: 'none',
                                    boxShadow: '0 0 0 3px rgba(106, 17, 203, 0.2)'
                                }
                            }}
                        />
                        <label style={{
                            position: 'absolute',
                            left: '1rem',
                            top: inputs.City ? '0' : '1rem',
                            transform: inputs.City ? 'translateY(-50%) scale(0.9)' : 'none',
                            background: inputs.City ? 'white' : 'transparent',
                            padding: inputs.City ? '0 0.5rem' : '0',
                            color: inputs.City ? '#6a11cb' : '#757575',
                            transition: 'all 0.2s ease',
                            pointerEvents: 'none',
                            fontSize: inputs.City ? '0.9rem' : '1rem'
                        }}>
                            City
                        </label>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            name="Number"
                            placeholder=" "
                            value={inputs.Number}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '1rem',
                                border: '2px solid #e0e0e0',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                ':focus': {
                                    borderColor: '#6a11cb',
                                    outline: 'none',
                                    boxShadow: '0 0 0 3px rgba(106, 17, 203, 0.2)'
                                }
                            }}
                        />
                        <label style={{
                            position: 'absolute',
                            left: '1rem',
                            top: inputs.Number ? '0' : '1rem',
                            transform: inputs.Number ? 'translateY(-50%) scale(0.9)' : 'none',
                            background: inputs.Number ? 'white' : 'transparent',
                            padding: inputs.Number ? '0 0.5rem' : '0',
                            color: inputs.Number ? '#6a11cb' : '#757575',
                            transition: 'all 0.2s ease',
                            pointerEvents: 'none',
                            fontSize: inputs.Number ? '0.9rem' : '1rem'
                        }}>
                            Phone Number
                        </label>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <input
                            type="email"
                            name="Gmail"
                            placeholder=" "
                            value={inputs.Gmail}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '1rem',
                                border: '2px solid #e0e0e0',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                ':focus': {
                                    borderColor: '#6a11cb',
                                    outline: 'none',
                                    boxShadow: '0 0 0 3px rgba(106, 17, 203, 0.2)'
                                }
                            }}
                        />
                        <label style={{
                            position: 'absolute',
                            left: '1rem',
                            top: inputs.Gmail ? '0' : '1rem',
                            transform: inputs.Gmail ? 'translateY(-50%) scale(0.9)' : 'none',
                            background: inputs.Gmail ? 'white' : 'transparent',
                            padding: inputs.Gmail ? '0 0.5rem' : '0',
                            color: inputs.Gmail ? '#6a11cb' : '#757575',
                            transition: 'all 0.2s ease',
                            pointerEvents: 'none',
                            fontSize: inputs.Gmail ? '0.9rem' : '1rem'
                        }}>
                            Email
                        </label>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <input
                            type="number"
                            name="NumberAdult"
                            placeholder=" "
                            value={inputs.NumberAdult}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '1rem',
                                border: '2px solid #e0e0e0',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                ':focus': {
                                    borderColor: '#6a11cb',
                                    outline: 'none',
                                    boxShadow: '0 0 0 3px rgba(106, 17, 203, 0.2)'
                                }
                            }}
                        />
                        <label style={{
                            position: 'absolute',
                            left: '1rem',
                            top: inputs.NumberAdult ? '0' : '1rem',
                            transform: inputs.NumberAdult ? 'translateY(-50%) scale(0.9)' : 'none',
                            background: inputs.NumberAdult ? 'white' : 'transparent',
                            padding: inputs.NumberAdult ? '0 0.5rem' : '0',
                            color: inputs.NumberAdult ? '#6a11cb' : '#757575',
                            transition: 'all 0.2s ease',
                            pointerEvents: 'none',
                            fontSize: inputs.NumberAdult ? '0.9rem' : '1rem'
                        }}>
                            Number of Adults
                        </label>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <input
                            type="date"
                            name="Date"
                            placeholder=" "
                            value={inputs.Date}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '1rem',
                                border: '2px solid #e0e0e0',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                ':focus': {
                                    borderColor: '#6a11cb',
                                    outline: 'none',
                                    boxShadow: '0 0 0 3px rgba(106, 17, 203, 0.2)'
                                }
                            }}
                        />
                        <label style={{
                            position: 'absolute',
                            left: '1rem',
                            top: inputs.Date ? '0' : '1rem',
                            transform: inputs.Date ? 'translateY(-50%) scale(0.9)' : 'none',
                            background: inputs.Date ? 'white' : 'transparent',
                            padding: inputs.Date ? '0 0.5rem' : '0',
                            color: inputs.Date ? '#6a11cb' : '#757575',
                            transition: 'all 0.2s ease',
                            pointerEvents: 'none',
                            fontSize: inputs.Date ? '0.9rem' : '1rem'
                        }}>
                            Date
                        </label>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <input
                            type="time"
                            name="Time"
                            placeholder=" "
                            value={inputs.Time}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '1rem',
                                border: '2px solid #e0e0e0',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                ':focus': {
                                    borderColor: '#6a11cb',
                                    outline: 'none',
                                    boxShadow: '0 0 0 3px rgba(106, 17, 203, 0.2)'
                                }
                            }}
                        />
                        <label style={{
                            position: 'absolute',
                            left: '1rem',
                            top: inputs.Time ? '0' : '1rem',
                            transform: inputs.Time ? 'translateY(-50%) scale(0.9)' : 'none',
                            background: inputs.Time ? 'white' : 'transparent',
                            padding: inputs.Time ? '0 0.5rem' : '0',
                            color: inputs.Time ? '#6a11cb' : '#757575',
                            transition: 'all 0.2s ease',
                            pointerEvents: 'none',
                            fontSize: inputs.Time ? '0.9rem' : '1rem'
                        }}>
                            Time
                        </label>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            name="Location"
                            placeholder=" "
                            value={inputs.Location}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '1rem',
                                border: '2px solid #e0e0e0',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                ':focus': {
                                    borderColor: '#6a11cb',
                                    outline: 'none',
                                    boxShadow: '0 0 0 3px rgba(106, 17, 203, 0.2)'
                                }
                            }}
                        />
                        <label style={{
                            position: 'absolute',
                            left: '1rem',
                            top: inputs.Location ? '0' : '1rem',
                            transform: inputs.Location ? 'translateY(-50%) scale(0.9)' : 'none',
                            background: inputs.Location ? 'white' : 'transparent',
                            padding: inputs.Location ? '0 0.5rem' : '0',
                            color: inputs.Location ? '#6a11cb' : '#757575',
                            transition: 'all 0.2s ease',
                            pointerEvents: 'none',
                            fontSize: inputs.Location ? '0.9rem' : '1rem'
                        }}>
                            Location
                        </label>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            name="EventCategory"
                            placeholder=" "
                            value={inputs.EventCategory}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '1rem',
                                border: '2px solid #e0e0e0',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                ':focus': {
                                    borderColor: '#6a11cb',
                                    outline: 'none',
                                    boxShadow: '0 0 0 3px rgba(106, 17, 203, 0.2)'
                                }
                            }}
                        />
                        <label style={{
                            position: 'absolute',
                            left: '1rem',
                            top: inputs.EventCategory ? '0' : '1rem',
                            transform: inputs.EventCategory ? 'translateY(-50%) scale(0.9)' : 'none',
                            background: inputs.EventCategory ? 'white' : 'transparent',
                            padding: inputs.EventCategory ? '0 0.5rem' : '0',
                            color: inputs.EventCategory ? '#6a11cb' : '#757575',
                            transition: 'all 0.2s ease',
                            pointerEvents: 'none',
                            fontSize: inputs.EventCategory ? '0.9rem' : '1rem'
                        }}>
                            Event Category
                        </label>
                    </div>

                    <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center' }}>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                padding: '1rem 2.5rem',
                                background: isSubmitting 
                                    ? '#9e9e9e' 
                                    : 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50px',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                fontSize: '1rem',
                                fontWeight: '600',
                                boxShadow: '0 4px 15px rgba(106, 17, 203, 0.3)',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                overflow: 'hidden',
                                ':hover': !isSubmitting && {
                                    boxShadow: '0 6px 20px rgba(106, 17, 203, 0.4)',
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            {isSubmitting ? (
                                <>
                                    <span style={{ position: 'relative', zIndex: 2 }}>Submitting...</span>
                                    <span style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '0%',
                                        height: '100%',
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        animation: 'loadingBar 1s linear infinite'
                                    }}></span>
                                </>
                            ) : 'Create Event'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Inline CSS for animations */}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                
                @keyframes loadingBar {
                    0% { width: 0%; left: 0; }
                    50% { width: 100%; left: 0; }
                    100% { width: 0%; left: 100%; }
                }
            `}</style>
        </div>
    );
}

export default Add;