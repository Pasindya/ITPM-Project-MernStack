import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaFileDownload, FaCheckCircle, FaCar, FaUser, FaCalendarAlt, FaPassport, FaHome } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const receiptRef = useRef();

  const bookingData = location.state?.bookingData || {};

  // Format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const bookingDate = formatDate(bookingData.bookingdate);
  const handoverDate = formatDate(bookingData.handoverDate);

  // New PDF download function using html2canvas and jsPDF
  const downloadPDF = () => {
    const input = receiptRef.current;
    
    html2canvas(input, {
      scale: 2, // Higher quality
      logging: false,
      useCORS: true,
      allowTaint: true
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190; // A4 page width minus margins
      const pageHeight = 277; // A4 page height
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 10; // Top margin

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add new page if content is too long
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`booking_receipt_${bookingData._id || Date.now()}.pdf`);
    });
  };

  if (!location.state?.bookingData) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        textAlign: 'center',
        padding: '20px'
      }}>
        <h2 style={{ color: '#e74c3c' }}>Booking Not Found</h2>
        <p>You will be redirected to the homepage...</p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '40px 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        padding: '30px'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <FaCheckCircle style={{
            fontSize: '3rem',
            color: '#2ecc71',
            marginBottom: '15px'
          }} />
          <h1 style={{
            color: '#2c3e50',
            fontSize: '2rem',
            marginBottom: '10px'
          }}>Booking Confirmed!</h1>
          <p style={{ color: '#7f8c8d' }}>
            Thank you for your reservation. Here are your booking details.
          </p>
        </div>

        {/* Receipt - This will be converted to PDF */}
        <div ref={receiptRef} style={{
          backgroundColor: 'white',
          border: '1px solid #eee',
          borderRadius: '8px',
          padding: '25px',
          marginBottom: '30px',
          width: '100%'
        }}>
          {/* Company Header Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '20px',
            borderBottom: '1px solid #eee',
            paddingBottom: '20px'
          }}>
            <h2 style={{ color: '#2c3e50', marginBottom: '5px' }}>Travel Trails</h2>
            <p style={{ margin: '3px 0', color: '#555' }}>Flower park 336/A, colombo, SriLanka</p>
            <p style={{ margin: '3px 0', color: '#555' }}>+1(300) 1234 6543</p>
            <p style={{ margin: '3px 0', color: '#555' }}>traveltrails@gmail.com</p>
          </div>

          <h2 style={{
            color: '#2c3e50',
            borderBottom: '1px solid #eee',
            paddingBottom: '10px',
            marginBottom: '20px'
          }}>Booking Receipt</h2>

          {/* Customer Name Section */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '5px',
            marginBottom: '20px'
          }}>
            <h3 style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#2c3e50',
              fontSize: '1.1rem',
              margin: 0
            }}>
              <FaUser /> Customer: {bookingData.name || 'N/A'}
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '30px'
          }}>
            {/* Vehicle Info */}
            <div>
              <h3 style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#2c3e50',
                fontSize: '1.1rem'
              }}>
                <FaCar /> Vehicle Information
              </h3>
              <div style={{ marginTop: '10px' }}>
                <p><strong>Type:</strong> {bookingData.vehicleType || 'N/A'}</p>
                <p><strong>Price/KM:</strong> LKR {bookingData.pricePerKm?.toLocaleString() || '0'}</p>
              </div>
            </div>

            {/* Booking Info */}
            <div>
              <h3 style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#2c3e50',
                fontSize: '1.1rem'
              }}>
                <FaCalendarAlt /> Booking Details
              </h3>
              <div style={{ marginTop: '10px' }}>
                <p><strong>Mobile:</strong> {bookingData.mobile || 'N/A'}</p>
                
              </div>
            </div>
          </div>

          {/* Dates */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div>
              <h3 style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#2c3e50',
                fontSize: '1.1rem'
              }}>
                <FaCalendarAlt /> Dates
              </h3>
              <div style={{ marginTop: '10px' }}>
                <p><strong>Booking Date:</strong> {bookingDate}</p>
                <p><strong>Handover Date:</strong> {handoverDate}</p>
              </div>
            </div>

            <div>
              <h3 style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#2c3e50',
                fontSize: '1.1rem'
              }}>
                <FaPassport /> Passport
              </h3>
              <div style={{ marginTop: '10px' }}>
                <p><strong>Passport No:</strong> {bookingData.passportNumber || 'N/A'}</p>
                
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '5px',
            textAlign: 'center',
            borderTop: '1px solid #eee'
          }}>
            <p style={{ marginBottom: '5px' }}>Thank you for choosing Travel Trails!</p>
            <p style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
              Please present this confirmation when picking up your vehicle.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={downloadPDF}
            style={{
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '1rem'
            }}
          >
            <FaFileDownload /> Download Receipt
          </button>

          <button
            onClick={() => navigate('/')}
            style={{
              backgroundColor: 'white',
              color: '#2c3e50',
              border: '1px solid #ddd',
              padding: '12px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '1rem'
            }}
          >
            <FaHome /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;