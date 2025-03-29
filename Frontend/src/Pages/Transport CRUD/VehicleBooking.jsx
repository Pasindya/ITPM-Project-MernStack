import React, { useEffect, useState, useRef } from 'react';
import TransportNav from '../transportNav';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaEdit, FaTrash, FaFileDownload } from 'react-icons/fa';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

const URL = "http://localhost:5000/htransports";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function VehicleBooking() {
  const [htransports, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const navigate = useNavigate();
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHandler();
        setBookings(data.htransports || []);
      } catch (err) {
        setError("Failed to load bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = (booking) => {
    navigate('/updatevehicle', { state: { booking } });
  };

  const handleDelete = async (id) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete this booking?");
      if (!isConfirmed) return;
      
      await axios.delete(`${URL}/${id}`);
      setBookings(prev => prev.filter(booking => booking._id !== id));
      alert('Booking deleted successfully!');
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert('Failed to delete booking. Please try again.');
    }
  };

  const generatePDF = async () => {
    if (!tableRef.current || isGeneratingPDF) return;
    
    setIsGeneratingPDF(true);
    
    try {
      // Create a temporary container
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = '800px';
      document.body.appendChild(container);

      // Create report content
      const reportContent = document.createElement('div');
      reportContent.style.padding = '20px';
      reportContent.style.fontFamily = 'Arial, sans-serif';
      reportContent.style.backgroundColor = 'white';
      
      // Add header with logo placeholder
      const now = new Date();
      reportContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
          <div id="pdf-logo" style="height: 80px; margin-bottom: 10px;"></div>
          <h1 style="font-size: 22px; margin-bottom: 5px; color: #2c3e50;">TravelTrails Vehicle Bookings</h1>
          <div style="margin-bottom: 15px; font-size: 12px; color: #555;">
            <p><FaPhone style="display: inline; margin-right: 5px;" /> +1 (300) 1234 6543</p>
            <p><FaEnvelope style="display: inline; margin-right: 5px;" /> traveltrails@email.com</p>
            <p><FaMapMarkerAlt style="display: inline; margin-right: 5px;" /> Flower Park 336/A, Colombo, Sri Lanka</p>
          </div>
        </div>
        <h2 style="text-align: center; font-size: 18px; margin-bottom: 15px;">Vehicle Booking Report</h2>
        <p style="text-align: right; font-size: 10px; margin-bottom: 15px; color: #555;">
          Generated: ${now.toLocaleString()}
        </p>
      `;

      // Load logo image
      const loadLogo = () => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = '/Images/Transport/logo.png';
          img.onload = () => resolve(img);
          img.onerror = () => {
            console.warn('Logo failed to load, continuing without it');
            resolve(null);
          };
        });
      };

      const logoImg = await loadLogo();
      if (logoImg) {
        const logoContainer = reportContent.querySelector('#pdf-logo');
        if (logoContainer) {
          logoContainer.innerHTML = '';
          logoImg.style.height = '80px';
          logoImg.style.maxWidth = '200px';
          logoContainer.appendChild(logoImg);
        }
      }

      // Create compact table
      const table = document.createElement('table');
      table.style.width = '100%';
      table.style.fontSize = '8px';
      table.style.borderCollapse = 'collapse';
      
      // Table header
      const thead = document.createElement('thead');
      thead.innerHTML = `
        <tr style="background-color: #2c3e50; color: white;">
          <th style="padding: 6px; text-align: left; width: 15%;">ID</th>
          <th style="padding: 6px; text-align: left; width: 15%;">Name</th>
          <th style="padding: 6px; text-align: left; width: 12%;">Passport</th>
          <th style="padding: 6px; text-align: left; width: 12%;">Mobile</th>
          <th style="padding: 6px; text-align: left; width: 15%;">Vehicle</th>
          <th style="padding: 6px; text-align: left; width: 15%;">Book Date</th>
          <th style="padding: 6px; text-align: left; width: 16%;">Handover</th>
        </tr>
      `;
      table.appendChild(thead);
      
      // Table body
      const tbody = document.createElement('tbody');
      htransports.forEach(booking => {
        const row = document.createElement('tr');
        row.style.borderBottom = '1px solid #eee';
        row.innerHTML = `
          <td style="padding: 6px; color: #3498db; font-weight: 500;">
            ${booking.customId || booking._id.substring(0, 8)}
          </td>
          <td style="padding: 6px;">${booking.name}</td>
          <td style="padding: 6px;">${booking.passportNumber || '--'}</td>
          <td style="padding: 6px;">${booking.mobile}</td>
          <td style="padding: 6px;">${booking.vehicleType}</td>
          <td style="padding: 6px;">
            ${booking.bookingdate ? new Date(booking.bookingdate).toLocaleDateString() : '--'}
          </td>
          <td style="padding: 6px;">
            ${booking.handoverDate ? new Date(booking.handoverDate).toLocaleDateString() : '--'}
          </td>
        `;
        tbody.appendChild(row);
      });
      table.appendChild(tbody);
      
      reportContent.appendChild(table);
      
      // Signature section
      reportContent.innerHTML += `
        <div style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #ddd;">
          <div style="text-align: center;">
            <p style="font-weight: bold; margin-bottom: 15px; font-size: 10px;">Verified by Transport Administrator</p>
            <div style="display: flex; justify-content: space-between; margin-top: 15px; font-size: 8px;">
              <div style="text-align: center; flex: 1;">
                <div style="border-top: 1px solid #000; width: 80%; margin: 0 auto 5px;"></div>
                <p style="margin: 0;">Name</p>
              </div>
              <div style="text-align: center; flex: 1;">
                <div style="border-top: 1px solid #000; width: 80%; margin: 0 auto 5px;"></div>
                <p style="margin: 0;">Signature</p>
              </div>
              <div style="text-align: center; flex: 1;">
                <div style="border-top: 1px solid #000; width: 80%; margin: 0 auto 5px;"></div>
                <p style="margin: 0;">Date</p>
              </div>
            </div>
          </div>
        </div>
      `;

      container.appendChild(reportContent);

      // Generate image
      const dataUrl = await toPng(reportContent, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: 'white'
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm'
      });
      
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // Add margins
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      // Center the image on the page
      const xPos = (pdf.internal.pageSize.getWidth() - pdfWidth) / 2;
      pdf.addImage(dataUrl, 'PNG', xPos, 10, pdfWidth, pdfHeight);
      
      pdf.save(`Vehicle_Booking_Report_${now.getTime()}.pdf`);

      // Clean up
      document.body.removeChild(container);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Styles (same as before)
  const pageStyle = {
    fontFamily: "'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif",
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const headerContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '30px',
    width: '100%',
    maxWidth: '1200px'
  };

  const logoStyle = {
    height: '80px',
    width: 'auto',
    marginBottom: '15px',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
  };

  const contactInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    textAlign: 'center',
    marginBottom: '20px'
  };

  const contactItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '16px',
    color: '#333',
    margin: '5px 0'
  };

  const titleStyle = {
    fontSize: '2.2rem',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '15px',
    textAlign: 'center',
    textShadow: '0 2px 4px rgba(0,0,0,0.05)'
  };

  const subtitleStyle = {
    fontSize: '1.1rem',
    color: '#7f8c8d',
    marginBottom: '30px',
    textAlign: 'center'
  };

  const tableContainerStyle = {
    margin: '0 auto',
    maxWidth: '1200px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    width: '100%',
    border: '1px solid #e0e0e0'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0'
  };

  const thStyle = {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '15px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '14px',
    borderBottom: '2px solid #3498db'
  };

  const tdStyle = {
    padding: '12px 15px',
    borderBottom: '1px solid #eaeaea',
    color: '#333',
    transition: 'all 0.2s ease'
  };

  const trHoverStyle = {
    ':hover': {
      backgroundColor: '#f8fafc',
      td: {
        color: '#2c3e50'
      }
    }
  };

  const actionButtonStyle = {
    padding: '8px 12px',
    margin: '0 4px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  const editButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#3498db',
    color: 'white',
    '&:hover': {
      backgroundColor: '#2980b9',
      transform: 'translateY(-1px)'
    }
  };

  const deleteButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#e74c3c',
    color: 'white',
    '&:hover': {
      backgroundColor: '#c0392b',
      transform: 'translateY(-1px)'
    }
  };

  const downloadButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '30px auto',
    padding: '12px 24px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(46, 204, 113, 0.3)',
    '&:hover': {
      backgroundColor: '#27ae60',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(46, 204, 113, 0.4)'
    }
  };

  if (loading) {
    return (
      <div style={pageStyle}>
        <TransportNav />
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h3>Loading vehicle bookings...</h3>
          <div style={{ marginTop: '20px', display: 'inline-block' }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '5px solid #f3f3f3',
              borderTop: '5px solid #3498db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={pageStyle}>
        <TransportNav />
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <div style={{
            backgroundColor: '#fee',
            padding: '20px',
            borderRadius: '8px',
            display: 'inline-block',
            borderLeft: '4px solid #e74c3c'
          }}>
            <h3 style={{ color: '#e74c3c' }}>{error}</h3>
            <button 
              onClick={() => window.location.reload()} 
              style={{
                padding: '10px 20px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                marginTop: '20px',
                transition: 'all 0.2s ease'
              }}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <TransportNav />
      
      <div style={headerContainerStyle}>
        <img 
          src="/Images/Transport/logo.png" 
          alt="TravelTrails Logo" 
          style={logoStyle}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        
        <div style={contactInfoStyle}>
          <div style={contactItemStyle}>
            <FaPhone /> +1 (300) 1234 6543
          </div>
          <div style={contactItemStyle}>
            <FaEnvelope /> traveltrails@email.com
          </div>
          <div style={contactItemStyle}>
            <FaMapMarkerAlt /> Flower Park 336/A, Colombo, Sri Lanka
          </div>
        </div>

        <h1 style={titleStyle}>Vehicle Bookings</h1>
        <p style={subtitleStyle}>View and manage all vehicle bookings</p>
      </div>

      {htransports.length > 0 ? (
        <>
          <div style={tableContainerStyle}>
            <table style={tableStyle} ref={tableRef}>
              <thead>
                <tr>
                  <th style={thStyle}>Booking ID</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Passport No</th>
                  <th style={thStyle}>Mobile</th>
                  <th style={thStyle}>Vehicle Type</th>
                  <th style={thStyle}>Booking Date</th>
                  <th style={thStyle}>Handover Date</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {htransports.map((booking) => (
                  <tr key={booking._id} style={trHoverStyle}>
                    <td style={{...tdStyle, color: '#3498db', fontWeight: '500'}}>
                      {booking.customId || booking._id.substring(0, 8)}
                    </td>
                    <td style={tdStyle}>{booking.name}</td>
                    <td style={tdStyle}>{booking.passportNumber || '--'}</td>
                    <td style={tdStyle}>{booking.mobile}</td>
                    <td style={tdStyle}>{booking.vehicleType}</td>
                    <td style={tdStyle}>
                      {booking.bookingdate ? new Date(booking.bookingdate).toLocaleDateString() : '--'}
                    </td>
                    <td style={tdStyle}>
                      {booking.handoverDate ? new Date(booking.handoverDate).toLocaleDateString() : '--'}
                    </td>
                    <td style={tdStyle}>
                      <button 
                        style={editButtonStyle}
                        onClick={() => handleUpdate(booking)}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button 
                        style={deleteButtonStyle}
                        onClick={() => handleDelete(booking._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button 
            style={downloadButtonStyle}
            onClick={generatePDF}
            disabled={isGeneratingPDF}
            aria-label="Download PDF report"
          >
            <FaFileDownload /> {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF Report'}
          </button>
        </>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          marginTop: '40px',
          backgroundColor: '#f8f9fa',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          border: '1px dashed #ddd'
        }}>
          <h3 style={{ color: '#7f8c8d' }}>No vehicle bookings found</h3>
          <p style={{ color: '#95a5a6' }}>When bookings are made, they will appear here</p>
        </div>
      )}
    </div>
  );
}

export default VehicleBooking;