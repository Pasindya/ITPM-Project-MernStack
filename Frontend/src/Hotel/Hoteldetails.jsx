import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import Hotelnav from './Hotelnav';
import Hbooking from './Hbooking';

const API_URL = "http://localhost:5000/hbookings";

function Hoteldetails() {
  const [hbookings, setHbookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('hotelName');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        const data = response.data.data || response.data;
        
        if (Array.isArray(data)) {
          setHbookings(data);
          setFilteredBookings(data);
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

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredBookings(hbookings);
    } else {
      const filtered = hbookings.filter(booking => {
        const searchValue = booking[searchOption]?.toString().toLowerCase() || '';
        return searchValue.includes(searchTerm.toLowerCase());
      });
      setFilteredBookings(filtered);
    }
  }, [searchTerm, searchOption, hbookings]);

  const handleDelete = (id) => {
    setHbookings(hbookings.filter(booking => booking._id !== id));
    setFilteredBookings(filteredBookings.filter(booking => booking._id !== id));
  };

  const generatePDF = async () => {
    if (!tableRef.current || isGeneratingPDF) return;
    setIsGeneratingPDF(true);

    try {
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      container.style.width = '800px';
      document.body.appendChild(container);

      const reportContent = document.createElement('div');
      reportContent.style.padding = '20px';
      reportContent.style.fontFamily = 'Arial, sans-serif';
      reportContent.style.backgroundColor = 'white';
      
      const now = new Date();
      reportContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #3182ce;">Hotel Bookings Report</h1>
          <p style="font-size: 14px; color: #555;">
            Generated on ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}
          </p>
          ${searchTerm ? `<p style="font-size: 14px;">Filtered by: ${searchOption} containing "${searchTerm}"</p>` : ''}
        </div>
      `;

      const tableClone = tableRef.current.cloneNode(true);
      tableClone.style.width = '100%';
      tableClone.style.fontSize = '12px';
      reportContent.appendChild(tableClone);
      
      const dataUrl = await toPng(reportContent);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`hotel_bookings_report_${now.getTime()}.pdf`);

      document.body.removeChild(container);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="hotel-details-container">
      <Hotelnav />
      
      <div className="content">
        <div className="header-section">
          <h1 className="page-title">Hotel Booking Management</h1>
          <p className="page-subtitle">View and manage all hotel reservations</p>
        </div>
        
        <div className="controls">
          <div className="search-section">
            <div className="search-controls">
              <select
                value={searchOption}
                onChange={(e) => setSearchOption(e.target.value)}
                className="search-select"
              >
                <option value="hotelName">Hotel Name</option>
                <option value="name">Guest Name</option>
                <option value="_id">Booking ID</option>
                <option value="email">Email</option>
              </select>
              
              <div className="search-input-container">
                <svg className="search-icon" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <input
                  type="text"
                  placeholder={`Search by ${searchOption.replace(/([A-Z])/g, ' $1').toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="clear-search-button"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="action-buttons">
            <button
              onClick={generatePDF}
              disabled={isGeneratingPDF || filteredBookings.length === 0}
              className="download-button"
            >
              <svg className="download-icon" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
              {isGeneratingPDF ? 'Generating PDF...' : 'Download Report'}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-message">Loading hotel bookings...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <svg className="error-icon" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <div>
              <h3>Error Loading Data</h3>
              <p>{error}</p>
              <button onClick={() => window.location.reload()} className="retry-button">
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <div ref={tableRef} className="bookings-grid">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((hbooking) => (
                <Hbooking 
                  key={hbooking._id} 
                  hbooking={hbooking} 
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="no-results">
                <svg className="no-results-icon" viewBox="0 0 24 24">
                  <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"/>
                </svg>
                <h3>{searchTerm 
                  ? `No bookings found matching "${searchTerm}"` 
                  : 'No hotel bookings available'}</h3>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')} 
                    className="clear-search-button"
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

// CSS Styles
const pageStyles = `
  .hotel-details-container {
    display: flex;
    min-height: 100vh;
    background-color: #f8fafc;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .content {
    flex: 1;
    padding: 2rem 3rem;
    margin-left: 250px;
  }

  .header-section {
    margin-bottom: 2rem;
  }

  .page-title {
    font-size: 2rem;
    color: #1e293b;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .page-subtitle {
    color: #64748b;
    font-size: 1rem;
    margin: 0;
  }

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .search-section {
    flex: 1;
    min-width: 300px;
  }

  .search-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .search-select {
    padding: 0.6rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background-color: white;
    font-size: 0.9rem;
    color: #334155;
    cursor: pointer;
    transition: all 0.2s;
  }

  .search-select:hover {
    border-color: #cbd5e1;
  }

  .search-select:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 2px #bfdbfe;
  }

  .search-input-container {
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 250px;
  }

  .search-icon {
    position: absolute;
    left: 12px;
    width: 18px;
    height: 18px;
    fill: #94a3b8;
  }

  .search-input {
    padding: 0.6rem 1rem 0.6rem 40px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    width: 100%;
    font-size: 0.9rem;
    color: #334155;
    transition: all 0.2s;
  }

  .search-input:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 2px #bfdbfe;
  }

  .clear-search-button {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    cursor: pointer;
    color: #94a3b8;
    font-size: 1rem;
    transition: color 0.2s;
  }

  .clear-search-button:hover {
    color: #64748b;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
  }

  .download-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.5rem;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    font-size: 0.9rem;
    transition: background-color 0.2s;
  }

  .download-button:hover {
    background-color: #1d4ed8;
  }

  .download-button:disabled {
    background-color: #cbd5e1;
    cursor: not-allowed;
  }

  .download-icon {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }

  .bookings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 1.5rem;
  }

  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #e2e8f0;
    border-top-color: #2563eb;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .loading-message {
    color: #64748b;
    font-size: 1rem;
    margin: 0;
  }

  .error-message {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem;
    background-color: #fef2f2;
    border-radius: 12px;
    color: #b91c1c;
  }

  .error-icon {
    width: 24px;
    height: 24px;
    fill: #dc2626;
    flex-shrink: 0;
  }

  .error-message h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
  }

  .error-message p {
    margin: 0 0 1rem 0;
    font-size: 0.9rem;
  }

  .retry-button {
    padding: 0.5rem 1rem;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.2s;
  }

  .retry-button:hover {
    background-color: #1d4ed8;
  }

  .no-results {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    text-align: center;
    grid-column: 1 / -1;
  }

  .no-results-icon {
    width: 48px;
    height: 48px;
    fill: #94a3b8;
    margin-bottom: 1rem;
  }

  .no-results h3 {
    color: #334155;
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
  }

  .clear-search-button {
    padding: 0.5rem 1.5rem;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.2s;
  }

  .clear-search-button:hover {
    background-color: #1d4ed8;
  }

  @media (max-width: 768px) {
    .content {
      padding: 1.5rem;
      margin-left: 0;
    }

    .controls {
      flex-direction: column;
      align-items: stretch;
    }

    .search-controls {
      flex-direction: column;
      gap: 0.75rem;
    }

    .search-select, .search-input {
      width: 100%;
    }

    .action-buttons {
      justify-content: flex-end;
    }

    .bookings-grid {
      grid-template-columns: 1fr;
    }
  }
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', `<style>${pageStyles}</style>`);

export default Hoteldetails;