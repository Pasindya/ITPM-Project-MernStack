import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

function AddEvent({ event, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  if (!event) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        <h2 style={{
          color: '#4a4a4a',
          fontFamily: 'Poppins, sans-serif',
          animation: 'pulse 1.5s infinite'
        }}>Loading event details...</h2>
      </div>
    );
  }

  const { _id, FirstName, LastName, City, Number, Gmail, NumberAdult, Date, Time, Location, EventCategory } = event;
  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:5000/events/${_id}`);
      if (onDelete) {
        onDelete(_id);
      }
      setTimeout(() => {
        navigate("/eventm");
      }, 1000);
    } catch (error) {
      console.error("Error deleting event:", error);
      setIsDeleting(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Add logo or header
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text('EVENT DETAILS', 105, 20, { align: 'center' });
    
    // Add a line
    doc.setDrawColor(100, 100, 255);
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);
    
    // Client Information
    doc.setFontSize(16);
    doc.setTextColor(50, 50, 150);
    doc.text('Client Information', 20, 35);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`First Name: ${FirstName}`, 20, 45);
    doc.text(`Last Name: ${LastName}`, 20, 55);
    doc.text(`City: ${City}`, 20, 65);
    doc.text(`Phone Number: ${Number}`, 20, 75);
    doc.text(`Email: ${Gmail}`, 20, 85);
    
    // Event Details
    doc.setFontSize(16);
    doc.setTextColor(50, 50, 150);
    doc.text('Event Details', 20, 105);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Number of Adults: ${NumberAdult}`, 20, 115);
    doc.text(`Date: ${Date}`, 20, 125);
    doc.text(`Time: ${Time}`, 20, 135);
    doc.text(`Location: ${Location}`, 20, 145);
    doc.text(`Event Category: ${EventCategory}`, 20, 155);
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text('Generated by Event Management System', 105, 280, { align: 'center' });
    
    // Save the PDF
    doc.save(`Event_Details_${FirstName}_${LastName}.pdf`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '2rem',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        transform: 'translateY(0)',
        animation: 'fadeInUp 0.6s ease-out',
        transition: 'all 0.3s ease'
      }}>
        <h1 style={{
          color: '#3a3a3a',
          textAlign: 'center',
          marginBottom: '2rem',
          fontSize: '2.5rem',
          fontWeight: '600',
          background: 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Event Details</h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: '#f8f9fa',
            padding: '1.5rem',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            ':hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)'
            }
          }}>
            <h3 style={{ color: '#4a4a4a', borderBottom: '2px solid #e9ecef', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Client Information</h3>
            <p style={{ margin: '0.5rem 0' }}><strong style={{ color: '#6c757d' }}>First Name:</strong> <span style={{ color: '#495057' }}>{FirstName}</span></p>
            <p style={{ margin: '0.5rem 0' }}><strong style={{ color: '#6c757d' }}>Last Name:</strong> <span style={{ color: '#495057' }}>{LastName}</span></p>
            <p style={{ margin: '0.5rem 0' }}><strong style={{ color: '#6c757d' }}>City:</strong> <span style={{ color: '#495057' }}>{City}</span></p>
            <p style={{ margin: '0.5rem 0' }}><strong style={{ color: '#6c757d' }}>Phone Number:</strong> <span style={{ color: '#495057' }}>{Number}</span></p>
            <p style={{ margin: '0.5rem 0' }}><strong style={{ color: '#6c757d' }}>Email:</strong> <span style={{ color: '#495057' }}>{Gmail}</span></p>
          </div>
          
          <div style={{
            background: '#f8f9fa',
            padding: '1.5rem',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            ':hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)'
            }
          }}>
            <h3 style={{ color: '#4a4a4a', borderBottom: '2px solid #e9ecef', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Event Details</h3>
            <p style={{ margin: '0.5rem 0' }}><strong style={{ color: '#6c757d' }}>Number of Adults:</strong> <span style={{ color: '#495057' }}>{NumberAdult}</span></p>
            <p style={{ margin: '0.5rem 0' }}><strong style={{ color: '#6c757d' }}>Date:</strong> <span style={{ color: '#495057' }}>{Date}</span></p>
            <p style={{ margin: '0.5rem 0' }}><strong style={{ color: '#6c757d' }}>Time:</strong> <span style={{ color: '#495057' }}>{Time}</span></p>
            <p style={{ margin: '0.5rem 0' }}><strong style={{ color: '#6c757d' }}>Location:</strong> <span style={{ color: '#495057' }}>{Location}</span></p>
            <p style={{ margin: '0.5rem 0' }}><strong style={{ color: '#6c757d' }}>Event Category:</strong> <span style={{ 
              color: 'white', 
              backgroundColor: '#6a11cb',
              padding: '0.2rem 0.5rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: '500'
            }}>{EventCategory}</span></p>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '2rem',
          flexWrap: 'wrap'
        }}>
          <Link to={`/updateevent/${_id}`} style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '0.8rem 1.8rem',
              background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(79, 172, 254, 0.3)',
              transition: 'all 0.3s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              ':hover': {
                boxShadow: '0 6px 20px rgba(79, 172, 254, 0.4)',
                transform: 'scale(1.05)'
              }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
              Update Event
            </button>
          </Link>
          
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            style={{
              padding: '0.8rem 1.8rem',
              background: isDeleting 
                ? '#ff6b6b' 
                : 'linear-gradient(to right, #ff758c 0%, #ff7eb3 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: isDeleting ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              ':hover': !isDeleting && {
                boxShadow: '0 6px 20px rgba(255, 107, 107, 0.4)'
              }
            }}
          >
            {isDeleting ? (
              <>
                <span style={{
                  position: 'relative',
                  zIndex: 2
                }}>Deleting...</span>
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
            ) : 'Delete Event'}
          </button>

          <button 
            onClick={downloadPDF}
            style={{
              padding: '0.8rem 1.8rem',
              background: 'linear-gradient(to right, #38ef7d 0%, #11998e 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(56, 239, 125, 0.3)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              ':hover': {
                boxShadow: '0 6px 20px rgba(56, 239, 125, 0.4)',
                transform: 'scale(1.05)'
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
            Download PDF
          </button>
        </div>
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
        
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
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

export default AddEvent;