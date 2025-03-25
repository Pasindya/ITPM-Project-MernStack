import React, { useEffect, useState, useRef } from 'react';
import DashNav from './DashNav';
import axios from 'axios';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

// Import your logo image (make sure to place the image in your src/assets folder)
import logoImage from '../assets/Travel Trails.png'; // Update this path to your actual image

const URL = "http://localhost:5000/packbookings";

function Packreport() {
  const [packbookings, setPackbookings] = useState([]);
  const tableRef = useRef(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        setPackbookings(response.data.packbookings || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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
        <h2 style="text-align: center; font-size: 18px; margin-bottom: 15px;">Package Booking Report</h2>
        <p style="text-align: right; font-size: 10px; margin-bottom: 15px; color: #555;">
          Generated: ${now.toLocaleString()}
        </p>
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
      pdf.save(`travel_trails_report_${now.getTime()}.pdf`);

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
      <DashNav />
      
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
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Package Bookings</h2>
          <button 
            onClick={generatePDF}
            disabled={isGeneratingPDF}
            style={{
              background: '#3b82f6',
              color: 'white',
              padding: '0.5rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto', backgroundColor: 'white', borderRadius: '0.5rem' }}>
          <table ref={tableRef} style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#3b82f6', color: 'white' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Booking ID</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Country</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Package</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Arrival Date</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {packbookings.map((booking, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{booking._id}</td>
                  <td style={{ padding: '12px' }}>{booking.name}</td>
                  <td style={{ padding: '12px' }}>{booking.email}</td>
                  <td style={{ padding: '12px' }}>{booking.livingCountry}</td>
                  <td style={{ padding: '12px' }}>{booking.tpackage}</td>
                  <td style={{ padding: '12px' }}>
                    {new Date(booking.arrivalDate).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <button 
                      onClick={() => window.location.href = `/updatepbook/${booking._id}`}
                      style={{ marginRight: '8px', padding: '6px 12px', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px' }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(booking._id)}
                      style={{ padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Packreport;