import React, { useEffect, useState, useRef } from 'react';

import axios from 'axios';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

// Import your logo image (make sure to place the image in your src/assets folder)
import logoImage from '../assets/Travel Trails.png'; // Update this path to your actual image
import Hotelnav from './Hotelnav';

const URL = "http://localhost:5000/hbookings";

function Viewhotel() {
  const [hbookings, setHbookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('hotelName');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tableRef = useRef(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(URL);
        const data = response.data.data || response.data;
        
        if (Array.isArray(data)) {
          setHbookings(data);
        } else {
          setError("Unexpected data format received from server");
        }
      } catch (err) {
        setError(err.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = hbookings.filter(booking => {
    if (!searchTerm) return true;
    const searchValue = booking[searchOption]?.toString().toLowerCase() || '';
    return searchValue.includes(searchTerm.toLowerCase());
  });

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this hotel booking?');
    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:5000/hbookings/${id}`);
      setHbookings(hbookings.filter(booking => booking._id !== id));
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking');
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
      
      // Add header with logo
      const now = new Date();
      reportContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="${logoImage}" alt="Travel Trails Logo" style="height: 80px; margin-bottom: 10px;">
          <div style="margin-bottom: 15px; font-size: 12px; color: #555;">
            <p>Phone: +1 (300) 1234 6543</p>
            <p>Email: traveltrails@email.com</p>
            <p>Address: Flowe Park 336/A, Colombo, Sri Lanka</p>
          </div>
        </div>
        <h2 style="text-align: center; font-size: 18px; margin-bottom: 15px;">Hotel Booking Report</h2>
        <p style="text-align: right; font-size: 10px; margin-bottom: 15px; color: #555;">
          Generated: ${now.toLocaleString()}
        </p>
        ${searchTerm ? `<p style="font-size: 12px; margin-bottom: 10px;">Filtered by: ${searchOption} containing "${searchTerm}"</p>` : ''}
      `;

      // Clone and simplify the table
      const tableClone = tableRef.current.cloneNode(true);
      
      // Remove action buttons
      const actionCells = tableClone.querySelectorAll('td:last-child');
      actionCells.forEach(cell => { cell.innerHTML = ''; });
      
      // Simplify table styling
      tableClone.style.width = '100%';
      tableClone.style.fontSize = '10px';
      tableClone.style.borderCollapse = 'collapse';
      
      // Add to container
      reportContent.appendChild(tableClone);
      
      // Add signature
      reportContent.innerHTML += `
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: right;">
          <div style="display: inline-block; text-align: center; width: 200px;">
            <div style="border-top: 1px solid #000; margin: 20px 0; width: 100%"></div>
            <p style="margin: 0; font-size: 12px;">Authorized Signature</p>
            <p style="margin: 5px 0 0 0; font-size: 12px;">Administrator</p>
            <p style="margin: 5px 0 0 0; font-size: 10px; color: #555;">Date: ${now.toLocaleDateString()}</p>
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
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Hotel_Booking_Summary_${now.getTime()}.pdf`);

      // Clean up
      document.body.removeChild(container);
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Hotelnav/>
      
      <div style={{ flex: 1, padding: '2rem', marginLeft: '250px' }}>
        {/* Header with Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img 
            src={logoImage} 
            alt="Travel Trails Logo" 
            style={{ height: '100px', marginBottom: '1rem' }}
          />
          <div style={{ marginBottom: '1rem', color: '#64748b' }}>
            <p>Phone: +1 (300) 1234 6543</p>
            <p>Email: traveltrails@email.com</p>
            <p>Address: Flowe Park 336/A, Colombo, Sri Lanka</p>
          </div>
        </div>

        {/* Report controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <select
              value={searchOption}
              onChange={(e) => setSearchOption(e.target.value)}
              style={{
                padding: '0.5rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
                backgroundColor: 'white'
              }}
            >
              <option value="hotelName">Hotel Name</option>
              <option value="name">Guest Name</option>
              <option value="_id">Booking ID</option>
              <option value="email">Email</option>
            </select>
            
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder={`Search by ${searchOption.replace(/([A-Z])/g, ' $1').toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '0.5rem 2rem 0.5rem 1rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  width: '250px'
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    position: 'absolute',
                    right: '0.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#94a3b8'
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          
          <button 
            onClick={generatePDF}
            disabled={isGeneratingPDF || filteredBookings.length === 0}
            style={{
              background: '#3b82f6',
              color: 'white',
              padding: '0.5rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
          </button>
        </div>

        {/* Loading and Error States */}
        {loading ? (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '200px',
            backgroundColor: 'white',
            borderRadius: '0.5rem'
          }}>
            <div>Loading hotel bookings...</div>
          </div>
        ) : error ? (
          <div style={{ 
            backgroundColor: '#fef2f2',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            color: '#b91c1c',
            display: 'flex',
            gap: '1rem'
          }}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Error Loading Data</h3>
              <p style={{ margin: '0 0 1rem 0' }}>{error}</p>
              <button 
                onClick={() => window.location.reload()}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          /* Table */
          <div style={{ overflowX: 'auto', backgroundColor: 'white', borderRadius: '0.5rem' }}>
            {filteredBookings.length > 0 ? (
              <table ref={tableRef} style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#3b82f6', color: 'white' }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Booking ID</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Hotel Name</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Guest Name</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Check In</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Check Out</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Guests</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Contact</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px' }}>{booking._id}</td>
                      <td style={{ padding: '12px' }}>{booking.hotelName}</td>
                      <td style={{ padding: '12px' }}>{booking.name}</td>
                      <td style={{ padding: '12px' }}>
                        {new Date(booking.checkIn).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '12px' }}>
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '12px' }}>{booking.guests}</td>
                      <td style={{ padding: '12px' }}>
                        <div>{booking.email}</div>
                        <div>{booking.phone}</div>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <button 
                          onClick={() => window.location.href = `/updatehbook/${booking._id}`}
                          style={{ 
                            marginRight: '8px', 
                            padding: '6px 12px', 
                            background: '#10b981', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(booking._id)}
                          style={{ 
                            padding: '6px 12px', 
                            background: '#ef4444', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ 
                padding: '3rem', 
                textAlign: 'center',
                color: '#64748b'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📭</div>
                <h3 style={{ marginBottom: '1rem' }}>
                  {searchTerm 
                    ? `No bookings found matching "${searchTerm}"` 
                    : 'No hotel bookings available'}
                </h3>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    style={{
                      padding: '0.5rem 1.5rem',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Viewhotel;