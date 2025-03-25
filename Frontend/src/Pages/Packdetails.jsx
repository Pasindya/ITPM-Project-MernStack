import React, { useEffect, useState, useRef } from 'react';
import DashNav from './DashNav';
import axios from 'axios';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router-dom';

// Import your logo image
import logoImage from '../assets/Travel Trails.png'; // Update path as needed

const URL = "http://localhost:5000/packbookings";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { packbookings: [] };
  }
};

const Packbooking = ({ packbooking, onDelete }) => {
  const { _id, name, mobile, email, livingCountry, tpackage, arrivalDate } = packbooking;
  const navigate = useNavigate();

  const handleUpdate = () => navigate(`/updatepbook/${_id}`);

  const handleDeleteClick = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this booking?');
    if (!isConfirmed) return;

    try {
      await axios.delete(`${URL}/${_id}`);
      onDelete(_id);
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div style={styles.bookingCard}>
      <div style={styles.bookingId}>Booking ID: {_id}</div>
      <div style={styles.bookingName}>{name}</div>
      
      <div style={styles.detailsContainer}>
        {[
          { label: 'Mobile', value: mobile },
          { label: 'Email', value: email },
          { label: 'Country', value: livingCountry },
          { label: 'Package', value: tpackage },
          { label: 'Arrival Date', value: new Date(arrivalDate).toLocaleDateString() }
        ].map((item, index) => (
          <div key={index}>
            <div style={styles.detailLabel}>{item.label}</div>
            <div style={styles.detailValue}>{item.value}</div>
          </div>
        ))}
      </div>

      <div style={styles.actionButtons}>
        <button onClick={handleUpdate} style={styles.updateButton}>
          Update
        </button>
        <button onClick={handleDeleteClick} style={styles.deleteButton}>
          Delete
        </button>
      </div>
    </div>
  );
};

function Packdetails() {
  const [packbookings, setPackbookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('package');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchHandler();
      setPackbookings(data.packbookings || []);
      setFilteredBookings(data.packbookings || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredBookings(packbookings);
    } else {
      const filtered = packbookings.filter(booking => {
        const searchValue = searchOption === 'package' 
          ? booking.tpackage.toLowerCase() 
          : booking._id.toLowerCase();
        return searchValue.includes(searchTerm.toLowerCase());
      });
      setFilteredBookings(filtered);
    }
  }, [searchTerm, searchOption, packbookings]);

  const handleDelete = (id) => {
    setPackbookings(packbookings.filter(booking => booking._id !== id));
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
          <img src="${logoImage}" alt="Travel Trails Logo" style="height: 80px; margin-bottom: 10px;">
          <div style="margin-bottom: 15px; font-size: 12px; color: #555;">
            <p>Phone: +1 (300) 1234 6543</p>
            <p>Email: traveltrails@email.com</p>
            <p>Address: Flowe Park 336/A, Colombo, Sri Lanka</p>
          </div>
        </div>
        <h2 style="text-align: center; font-size: 18px; margin-bottom: 15px;">
          Package Booking Report (Filtered: ${searchTerm ? `"${searchTerm}"` : 'All'})
        </h2>
        <p style="text-align: right; font-size: 10px; margin-bottom: 15px; color: #555;">
          Generated: ${now.toLocaleString()}
        </p>
      `;

      const tableClone = tableRef.current.cloneNode(true);
      tableClone.style.width = '100%';
      tableClone.style.fontSize = '10px';
      tableClone.style.borderCollapse = 'collapse';
      
      reportContent.appendChild(tableClone);
      
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

      const dataUrl = await toPng(reportContent, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: 'white'
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`travel_trails_packageBooking_report_${now.getTime()}.pdf`);

      document.body.removeChild(container);
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div style={styles.container}>
      <DashNav />
      
      <div style={styles.content}>
        {/* Header with Logo */}
        <div style={styles.header}>
          <img src={logoImage} alt="Travel Trails Logo" style={styles.logo} />
          <div style={styles.companyInfo}>
            <p>Phone: +1 (300) 1234 6543</p>
            <p>Email: traveltrails@email.com</p>
            <p>Address: Flowe Park 336/A, Colombo, Sri Lanka</p>
          </div>
        </div>

        {/* Page Title */}
        <h1 style={styles.pageTitle}>Package Booking Details</h1>

        {/* Search and Download Controls */}
        <div style={styles.controls}>
          <div style={styles.searchControls}>
            <select
              value={searchOption}
              onChange={(e) => setSearchOption(e.target.value)}
              style={styles.searchSelect}
            >
              <option value="package">Package Name</option>
              <option value="id">Booking ID</option>
            </select>
            
            <div style={styles.searchInputContainer}>
              <input
                type="text"
                placeholder={`Search by ${searchOption === 'package' ? 'package name' : 'booking ID'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={styles.clearSearchButton}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          
          <button
            onClick={generatePDF}
            disabled={isGeneratingPDF}
            style={styles.downloadButton}
          >
            {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>

        {/* Bookings Grid */}
        <div ref={tableRef}>
          {filteredBookings.length > 0 ? (
            <div style={styles.bookingsGrid}>
              {filteredBookings.map((packbooking, i) => (
                <Packbooking 
                  key={i} 
                  packbooking={packbooking} 
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div style={styles.noResults}>
              {searchTerm 
                ? `No bookings found matching "${searchTerm}"` 
                : 'No bookings available'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: "'Inter', sans-serif",
  },
  content: {
    flex: 1,
    padding: '2rem',
    marginLeft: '250px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  logo: {
    height: '100px',
    marginBottom: '1rem',
  },
  companyInfo: {
    marginBottom: '1rem',
    color: '#64748b',
  },
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: '2rem',
    letterSpacing: '-0.025em',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  searchControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  searchSelect: {
    padding: '0.5rem',
    border: '1px solid #e2e8f0',
    borderRadius: '0.25rem',
    outline: 'none',
  },
  searchInputContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  searchInput: {
    padding: '0.5rem',
    border: '1px solid #e2e8f0',
    borderRadius: '0.25rem',
    outline: 'none',
    minWidth: '300px',
  },
  clearSearchButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#64748b',
    marginLeft: '0.5rem',
  },
  downloadButton: {
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    color: 'white',
    padding: '0.5rem 1.5rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    ':hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
    },
  },
  bookingsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    padding: '1rem',
  },
  noResults: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    color: '#64748b',
  },
  bookingCard: {
    backgroundColor: '#ffffff',
    borderRadius: '1rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    fontFamily: "'Inter', sans-serif",
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
  },
  bookingId: {
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    marginBottom: '1rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  bookingName: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #1e293b, #334155)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginBottom: '1.5rem',
    width: '100%',
  },
  detailLabel: {
    fontSize: '0.875rem',
    color: '#64748b',
  },
  detailValue: {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#1e293b',
  },
  actionButtons: {
    display: 'flex',
    gap: '0.75rem',
  },
  updateButton: {
    background: 'linear-gradient(135deg, #10b981, #059669)',
    color: 'white',
    padding: '0.5rem 1.5rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    ':hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
    },
  },
  deleteButton: {
    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    color: 'white',
    padding: '0.5rem 1.5rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    ':hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
    },
  },
};

export default Packdetails;