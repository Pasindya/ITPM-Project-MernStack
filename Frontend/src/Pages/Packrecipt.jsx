import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import logoImage from '../assets/Travel Trails.png';
import { FaDownload, FaEnvelope, FaCheckCircle, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import axios from 'axios';

function Packrecipt() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.formData || {};
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState({ message: '', success: false });
  const [receiptNumber] = useState(generateReceiptNumber());
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(null);
  const logoRef = useRef();

  // Load logo image
  useEffect(() => {
    const img = new Image();
    img.src = logoImage;
    img.onload = () => {
      logoRef.current = img;
      setLogoLoaded(true);
    };
  }, []);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Generate PDF on component mount and when data changes
  useEffect(() => {
    if (logoLoaded) {
      const pdf = generatePDF();
      setPdfGenerated(pdf);
    }
  }, [logoLoaded, bookingData]);

  // Get detailed package information
  const getPackageDetails = (packageName) => {
    const packages = {
      'Cultural Heritage Tour': {
        duration: '7 Days / 6 Nights',
        destinations: 'Kandy, Sigiriya, Anuradhapura',
        includes: [
          'Accommodation in 4-star hotels',
          'Private transport with AC',
          'English speaking guide',
          'All entrance fees',
          'Daily breakfast'
        ],
        price: 'Starting from $1200 per person',
        highlights: [
          'Visit Temple of the Tooth Relic',
          'Climb Sigiriya Rock Fortress',
          'Explore ancient ruins of Anuradhapura',
          'Cultural dance performance'
        ],
        cancellationPolicy: '50% refund if cancelled 30+ days before arrival',
        specialNotes: 'Comfortable walking shoes recommended'
      },
      'Beach Paradise Getaway': {
        duration: '5 Days / 4 Nights', 
        destinations: 'Mirissa, Unawatuna, Bentota',
        includes: [
          'Beachfront accommodation',
          'Daily breakfast',
          'Snorkeling equipment',
          'Whale watching tour (seasonal)',
          'Water sports activities'
        ],
        price: 'Starting from $900 per person',
        highlights: [
          'Relax on pristine beaches',
          'Sunset beach dinners',
          'Coral reef snorkeling',
          'Bentota river safari'
        ],
        cancellationPolicy: '40% refund if cancelled 21+ days before arrival',
        specialNotes: 'Bring swimwear and sunscreen'
      },
      'Wildlife Safari Adventure': {
        duration: '4 Days / 3 Nights',
        destinations: 'Yala, Udawalawe, Wilpattu National Parks',
        includes: [
          'Safari jeep with tracker',
          'National park fees',
          'Lodge accommodation',
          'All meals during safari',
          'Wildlife guide'
        ],
        price: 'Starting from $800 per person',
        highlights: [
          'Leopard spotting in Yala',
          'Elephant herds in Udawalawe',
          'Bird watching',
          'Night safari experience'
        ],
        cancellationPolicy: '30% refund if cancelled 14+ days before arrival',
        specialNotes: 'Neutral-colored clothing recommended'
      },
      'Hill Country Escape': {
        duration: '6 Days / 5 Nights',
        destinations: 'Nuwara Eliya, Ella, Horton Plains',
        includes: [
          'Mountain view hotels',
          'Train journey through tea country',
          'Hiking guide',
          'All transport',
          'Daily breakfast'
        ],
        price: 'Starting from $1100 per person',
        highlights: [
          'Visit tea plantations',
          'Hike to Little Adam\'s Peak',
          'World\'s End viewpoint',
          'Train ride through mountains'
        ],
        cancellationPolicy: '50% refund if cancelled 30+ days before arrival',
        specialNotes: 'Pack warm clothing for cool evenings'
      },
      'Ayurveda & Wellness Retreat': {
        duration: '5 Days / 4 Nights',
        destinations: 'Beruwala, Ahungalla, Tangalle',
        includes: [
          'Ayurveda doctor consultation',
          'Daily treatments',
          'Yoga and meditation',
          'Wellness meals',
          'Beachfront accommodation'
        ],
        price: 'Starting from $1000 per person',
        highlights: [
          'Panchakarma detox',
          'Abhyanga massage',
          'Shirodhara therapy',
          'Sunrise meditation'
        ],
        cancellationPolicy: 'Non-refundable within 14 days of arrival',
        specialNotes: 'Inform us of any medical conditions beforehand'
      },
      'Adventure & Trekking Expedition': {
        duration: '8 Days / 7 Nights',
        destinations: 'Adam\'s Peak, Knuckles Range, Sinharaja Forest',
        includes: [
          'Professional trekking guide',
          'All equipment',
          'Mountain lodge stays',
          'All meals during trek',
          'Transport between sites'
        ],
        price: 'Starting from $1500 per person',
        highlights: [
          'Sunrise climb of Adam\'s Peak',
          'Knuckles mountain range trek',
          'Rainforest exploration',
          'Waterfall swims'
        ],
        cancellationPolicy: '25% refund if cancelled 30+ days before arrival',
        specialNotes: 'Good physical fitness required'
      }
    };

    return packages[packageName] || {
      duration: 'Custom Package',
      destinations: 'Various Locations',
      includes: ['Details will be provided in confirmation'],
      price: 'Contact for pricing',
      highlights: ['Personalized itinerary'],
      cancellationPolicy: 'To be determined based on itinerary',
      specialNotes: 'Our team will contact you to finalize details'
    };
  };

  // Generate PDF receipt
  const generatePDF = () => {
    if (!logoLoaded) {
      return null;
    }

    const doc = new jsPDF();
    const packageInfo = getPackageDetails(bookingData.tpackage);
    
    // Add logo
    doc.addImage(logoRef.current, 'PNG', 80, 10, 50, 20);
    
    // Company Info
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Travel Trails', 105, 35, { align: 'center' });
    doc.text('Flowe Park 336/A, Colombo, Sri Lanka', 105, 40, { align: 'center' });
    doc.text('Tel: +1 (300) 1234 6543 | Email: traveltrails@email.com', 105, 45, { align: 'center' });
    
    // Receipt Title
    doc.setFontSize(16);
    doc.setTextColor(40, 53, 147);
    doc.text('BOOKING CONFIRMATION RECEIPT', 105, 55, { align: 'center' });
    
    // Receipt Details
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    // Left column
    doc.text(`Receipt No: ${receiptNumber}`, 20, 70);
    doc.text(`Generated Date: ${currentDateTime.toLocaleString()}`, 20, 75);
    doc.text(`Customer Name: ${bookingData.name || 'N/A'}`, 20, 85);
    doc.text(`Contact No: ${bookingData.mobile || 'N/A'}`, 20, 90);
    doc.text(`Email: ${bookingData.email || 'N/A'}`, 20, 95);
    
    // Right column
    doc.text(`Booking Date: ${currentDateTime.toLocaleDateString()}`, 140, 70);
    doc.text(`Package: ${bookingData.tpackage || 'N/A'}`, 140, 80);
    doc.text(`Arrival Date: ${formatDate(bookingData.arrivalDate) || 'N/A'}`, 140, 85);
    doc.text(`Country: ${bookingData.livingCountry || 'N/A'}`, 140, 90);
    
    // Horizontal line
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 100, 190, 100);
    
    // Package Details Section
    doc.setFontSize(12);
    doc.setTextColor(40, 53, 147);
    doc.text('Package Details:', 20, 110);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    // Package info
    doc.text(`Duration: ${packageInfo.duration}`, 20, 120);
    doc.text(`Destinations: ${packageInfo.destinations}`, 20, 125);
    doc.text(`Price: ${packageInfo.price}`, 20, 130);
    
    doc.setFontSize(11);
    doc.text('Includes:', 20, 140);
    doc.setFontSize(10);
    packageInfo.includes.forEach((item, index) => {
      doc.text(`• ${item}`, 25, 145 + (index * 5));
    });
    
    doc.setFontSize(11);
    doc.text('Highlights:', 20, 175);
    doc.setFontSize(10);
    packageInfo.highlights.forEach((item, index) => {
      doc.text(`• ${item}`, 25, 180 + (index * 5));
    });
    
    // Special Notes
    doc.setFontSize(11);
    doc.text('Special Notes:', 20, 210);
    doc.setFontSize(10);
    doc.text(packageInfo.specialNotes, 25, 215);
    
    // Terms and Conditions
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('Terms & Conditions:', 20, 230);
    doc.text('- This is an electronically generated receipt', 20, 235);
    doc.text('- Please present this receipt at arrival', 20, 240);
    doc.text(`- Cancellation policy: ${packageInfo.cancellationPolicy}`, 20, 245);
    doc.text('- Prices include all government taxes and service charges', 20, 250);
    doc.text('- Itinerary may change due to weather or other circumstances', 20, 255);
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(40, 53, 147);
    doc.text('Thank you for choosing Travel Trails!', 105, 270, { align: 'center' });
    doc.text('For any inquiries, please contact our customer support', 105, 275, { align: 'center' });
    doc.text('Hotline: +1 (300) 1234 6543 | Email: support@traveltrails.com', 105, 280, { align: 'center' });
    
    return doc;
  };

  // Send email with booking details
  const sendBookingConfirmation = async () => {
    if (!bookingData.email) {
      setEmailStatus({ message: 'No email address provided', success: false });
      return;
    }

    setIsSendingEmail(true);
    setEmailStatus({ message: 'Sending confirmation email...', success: true });

    try {
      // First approach: Using EmailJS (client-side only)
      try {
        await sendViaEmailJS();
        setEmailStatus({ message: 'Confirmation email sent successfully!', success: true });
        return;
      } catch (emailJSError) {
        console.log('EmailJS failed, trying backend approach:', emailJSError);
      }

      // Fallback approach: Using backend API
      await sendViaBackendAPI();
      setEmailStatus({ message: 'Confirmation email sent successfully!', success: true });
    } catch (error) {
      console.error('Error sending email:', error);
      setEmailStatus({ 
        message: `Failed to send confirmation email: ${error.message || 'Please try again later'}`, 
        success: false 
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Method 1: Send using EmailJS (client-side only)
  const sendViaEmailJS = async () => {
    // Initialize EmailJS with your credentials
    emailjs.init(process.env.REACT_APP_EMAILJS_USER_ID);

    const packageInfo = getPackageDetails(bookingData.tpackage);
    
    const templateParams = {
      to_name: bookingData.name,
      to_email: bookingData.email,
      receipt_number: receiptNumber,
      package_name: bookingData.tpackage,
      arrival_date: formatDate(bookingData.arrivalDate),
      duration: packageInfo.duration,
      destinations: packageInfo.destinations,
      price: packageInfo.price,
      includes: packageInfo.includes.join('\n• '),
      highlights: packageInfo.highlights.join('\n• '),
      special_notes: packageInfo.specialNotes,
      cancellation_policy: packageInfo.cancellationPolicy,
      current_date: currentDateTime.toLocaleDateString(),
      support_email: 'support@traveltrails.com',
      support_phone: '+1 (300) 1234 6543'
    };

    await emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      templateParams
    );
  };

  // Method 2: Send using backend API
  const sendViaBackendAPI = async () => {
    if (!pdfGenerated) {
      throw new Error('PDF generation failed');
    }
    
    // Convert PDF to base64 string
    const pdfBase64 = pdfGenerated.output('datauristring').split(',')[1];
    
    const payload = {
      email: bookingData.email,
      name: bookingData.name,
      package: bookingData.tpackage,
      arrivalDate: bookingData.arrivalDate,
      receiptNumber: receiptNumber,
      pdfBase64: pdfBase64,
      pdfFileName: `Travel_Trails_Receipt_${receiptNumber}.pdf`
    };

    const response = await axios.post(
      'https://your-backend-api.com/api/send-confirmation',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to send email');
    }
  };

  // Download PDF receipt
  const downloadReceipt = () => {
    if (!pdfGenerated) {
      alert('Receipt is still being generated, please try again');
      return;
    }
    
    pdfGenerated.save(`Travel_Trails_Receipt_${receiptNumber}.pdf`);
  };

  // Helper functions
  function generateReceiptNumber() {
    return 'TT-' + Math.floor(100000 + Math.random() * 900000);
  }

  function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Get package info for display
  const packageInfo = getPackageDetails(bookingData.tpackage);

  return (
    <div className="receipt-container">
      {/* Back button */}
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft /> Back to Booking
      </button>

      {/* Header with logo */}
      <div className="receipt-header">
        <img src={logoImage} alt="Travel Trails Logo" className="receipt-logo" />
        <h1>Travel Trails</h1>
        <div className="contact-info">
          <p>Flowe Park 336/A, Colombo, Sri Lanka</p>
          <p>Tel: +1 (300) 1234 6543 | Email: traveltrails@email.com</p>
        </div>
      </div>

      {/* Receipt status bar */}
      <div className="status-bar">
        <div className="status-item active">
          <span className="status-number">1</span>
          <span className="status-text">Booking Confirmed</span>
        </div>
        <div className="status-item">
          <span className="status-number">2</span>
          <span className="status-text">Payment Processed</span>
        </div>
        <div className="status-item">
          <span className="status-number">3</span>
          <span className="status-text">Travel Documents</span>
        </div>
        <div className="status-item">
          <span className="status-number">4</span>
          <span className="status-text">Trip Completed</span>
        </div>
      </div>

      {/* Receipt title */}
      <div className="receipt-title">
        <h2>BOOKING CONFIRMATION RECEIPT</h2>
        <p className="receipt-subtitle">Your adventure begins here</p>
      </div>

      {/* Booking details */}
      <div className="booking-details">
        <div className="detail-column">
          <div className="detail-item">
            <span className="detail-label">Receipt No:</span>
            <span className="detail-value">{receiptNumber}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Generated Date:</span>
            <span className="detail-value">{currentDateTime.toLocaleString()}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Customer Name:</span>
            <span className="detail-value">{bookingData.name || 'N/A'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Contact No:</span>
            <span className="detail-value">{bookingData.mobile || 'N/A'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{bookingData.email || 'N/A'}</span>
          </div>
        </div>
        <div className="detail-column">
          <div className="detail-item">
            <span className="detail-label">Booking Date:</span>
            <span className="detail-value">{currentDateTime.toLocaleDateString()}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Package:</span>
            <span className="detail-value">{bookingData.tpackage || 'N/A'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Arrival Date:</span>
            <span className="detail-value">{formatDate(bookingData.arrivalDate)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Country:</span>
            <span className="detail-value">{bookingData.livingCountry || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Package details */}
      <div className="package-details">
        <h3 className="section-title">
          <span className="title-decoration"></span>
          Package Information
          <span className="title-decoration"></span>
        </h3>
        
        <div className="package-grid">
          <div className="package-info-section">
            <h4>Duration</h4>
            <p>{packageInfo.duration}</p>
          </div>
          
          <div className="package-info-section">
            <h4>Destinations</h4>
            <p>{packageInfo.destinations}</p>
          </div>
          
          <div className="package-info-section">
            <h4>Price</h4>
            <p>{packageInfo.price}</p>
          </div>
          
          <div className="package-info-section">
            <h4>Special Notes</h4>
            <p>{packageInfo.specialNotes}</p>
          </div>
        </div>
        
        <div className="package-info-section">
          <h4>Includes</h4>
          <ul className="feature-list">
            {packageInfo.includes.map((item, index) => (
              <li key={index}>
                <span className="list-icon">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="package-info-section">
          <h4>Experience Highlights</h4>
          <ul className="feature-list">
            {packageInfo.highlights.map((item, index) => (
              <li key={index}>
                <span className="list-icon">★</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Next steps */}
      <div className="next-steps">
        <h3 className="section-title">Next Steps</h3>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Payment</h4>
              <p>Complete your payment within 7 days to confirm your booking</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Documents</h4>
              <p>We'll send your travel documents 14 days before departure</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Preparation</h4>
              <p>Check your packing list and prepare for your adventure</p>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and conditions */}
      <div className="terms-conditions">
        <h3 className="section-title">Terms & Conditions</h3>
        <ul className="terms-list">
          <li>This is an electronically generated receipt</li>
          <li>Please present this receipt at arrival</li>
          <li>Cancellation policy: {packageInfo.cancellationPolicy}</li>
          <li>Prices include all government taxes and service charges</li>
          <li>Itinerary may change due to weather or other unforeseen circumstances</li>
        </ul>
      </div>

      {/* Email status */}
      {emailStatus.message && (
        <div className={`email-status ${emailStatus.success ? 'success' : 'error'}`}>
          {emailStatus.success ? (
            <FaCheckCircle className="status-icon" />
          ) : (
            <FaExclamationTriangle className="status-icon" />
          )}
          <span>{emailStatus.message}</span>
        </div>
      )}

      {/* Action buttons */}
      <div className="action-buttons">
        <button 
          onClick={downloadReceipt} 
          className="download-btn" 
          disabled={!pdfGenerated}
        >
          <FaDownload className="button-icon" />
          {pdfGenerated ? 'Download Receipt' : 'Generating Receipt...'}
        </button>
        <button 
          onClick={sendBookingConfirmation} 
          className="email-btn"
          disabled={isSendingEmail || !bookingData.email || !pdfGenerated}
        >
          <FaEnvelope className="button-icon" />
          {isSendingEmail ? 'Sending...' : 'Email Confirmation'}
        </button>
      </div>

      {/* Support section */}
      <div className="support-section">
        <h3>Need Assistance?</h3>
        <p>Our customer support team is available 24/7 to help with any questions</p>
        <div className="support-contacts">
          <div className="contact-method">
            <span className="contact-icon">📞</span>
            <span>+1 (300) 1234 6543</span>
          </div>
          <div className="contact-method">
            <span className="contact-icon">✉️</span>
            <span>support@traveltrails.com</span>
          </div>
          <div className="contact-method">
            <span className="contact-icon">💬</span>
            <span>Live Chat on our website</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="receipt-footer">
        <p className="thank-you">Thank you for choosing Travel Trails!</p>
        <p>We look forward to providing you with an unforgettable experience</p>
        <div className="footer-links">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact Us</a>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .receipt-container {
          max-width: 900px;
          margin: 2rem auto;
          padding: 2rem;
          background: #ffffff;
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          line-height: 1.6;
          position: relative;
        }
        
        .back-button {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .back-button:hover {
          background: #e2e8f0;
        }
        
        .receipt-header {
          text-align: center;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #eaeaea;
        }
        
        .receipt-logo {
          height: 80px;
          margin-bottom: 1rem;
          object-fit: contain;
        }
        
        .receipt-header h1 {
          color: #2563eb;
          margin: 0.5rem 0;
          font-size: 1.8rem;
        }
        
        .contact-info {
          font-size: 0.9rem;
          color: #64748b;
        }
        
        .status-bar {
          display: flex;
          justify-content: space-between;
          margin: 2rem 0;
          position: relative;
        }
        
        .status-bar::before {
          content: '';
          position: absolute;
          top: 15px;
          left: 0;
          right: 0;
          height: 2px;
          background: #e0e0e0;
          z-index: 1;
        }
        
        .status-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
          flex: 1;
        }
        
        .status-number {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #e0e0e0;
          color: #888;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        
        .status-item.active .status-number {
          background: #2563eb;
          color: white;
        }
        
        .status-text {
          font-size: 0.8rem;
          text-align: center;
          color: #888;
        }
        
        .status-item.active .status-text {
          color: #2563eb;
          font-weight: 500;
        }
        
        .receipt-title {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          color: white;
          padding: 1.5rem;
          border-radius: 0.5rem;
          text-align: center;
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .receipt-title h2 {
          margin: 0;
          font-size: 1.5rem;
        }
        
        .receipt-subtitle {
          margin: 0.5rem 0 0;
          opacity: 0.9;
          font-size: 0.9rem;
        }
        
        .booking-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
        }
        
        .detail-item {
          margin-bottom: 0.8rem;
          display: flex;
          justify-content: space-between;
        }
        
        .detail-label {
          font-weight: 600;
          color: #4a5568;
          flex: 1;
        }
        
        .detail-value {
          flex: 1;
          text-align: right;
          color: #2d3748;
        }
        
        .package-details {
          background: #ffffff;
          padding: 1.5rem;
          border-radius: 0.5rem;
          margin-bottom: 2rem;
          border: 1px solid #e2e8f0;
        }
        
        .section-title {
          color: #2563eb;
          text-align: center;
          position: relative;
          margin: 2rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .title-decoration {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, #e2e8f0);
          margin: 0 1rem;
        }
        
        .title-decoration:last-child {
          background: linear-gradient(90deg, #e2e8f0, transparent);
        }
        
        .package-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .package-info-section {
          margin-bottom: 1.5rem;
        }
        
        .package-info-section h4 {
          color: #2b6cb0;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 0.3rem;
        }
        
        .feature-list {
          list-style: none;
          padding-left: 0;
          margin-top: 0.5rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 0.5rem 1.5rem;
        }
        
        .feature-list li {
          margin-bottom: 0.5rem;
          position: relative;
          padding-left: 1.5rem;
        }
        
        .list-icon {
          position: absolute;
          left: 0;
          color: #2563eb;
          font-weight: bold;
        }
        
        .next-steps {
          background: #f0f9ff;
          padding: 1.5rem;
          border-radius: 0.5rem;
          margin-bottom: 2rem;
          border: 1px solid #bae6fd;
        }
        
        .steps-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        
        .step {
          display: flex;
          gap: 1rem;
        }
        
        .step-number {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #2563eb;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          flex-shrink: 0;
        }
        
        .step-content h4 {
          margin: 0 0 0.3rem;
          color: #2b6cb0;
        }
        
        .step-content p {
          margin: 0;
          font-size: 0.9rem;
          color: #4a5568;
        }
        
        .terms-conditions {
          background: #fff5f5;
          padding: 1.5rem;
          border-radius: 0.5rem;
          margin-bottom: 2rem;
          border: 1px solid #fed7d7;
        }
        
        .terms-list {
          padding-left: 1.2rem;
        }
        
        .terms-list li {
          margin-bottom: 0.5rem;
          position: relative;
          padding-left: 1.5rem;
        }
        
        .terms-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #e53e3e;
          font-weight: bold;
        }
        
        .email-status {
          margin: 1rem 0;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }
        
        .email-status.success {
          background: #f0fff4;
          color: #2f855a;
          border: 1px solid #c6f6d5;
        }
        
        .email-status.error {
          background: #fff5f5;
          color: #c53030;
          border: 1px solid #fed7d7;
        }
        
        .status-icon {
          font-size: 1.2rem;
        }
        
        .action-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin: 2.5rem 0;
        }
        
        .download-btn, .email-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 600;
          min-width: 200px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .download-btn {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          color: white;
          box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
        }
        
        .download-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 8px rgba(37, 99, 235, 0.3);
        }
        
        .email-btn {
          background: linear-gradient(135deg, #38a169, #2f855a);
          color: white;
          box-shadow: 0 4px 6px rgba(56, 161, 105, 0.2);
        }
        
        .email-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 8px rgba(56, 161, 105, 0.3);
        }
        
        .email-btn:disabled, .download-btn:disabled {
          background: #e2e8f0;
          color: #a0aec0;
          cursor: not-allowed;
          box-shadow: none;
        }
        
        .button-icon {
          font-size: 1rem;
        }
        
        .support-section {
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 0.5rem;
          margin: 2rem 0;
          text-align: center;
        }
        
        .support-section h3 {
          color: #2b6cb0;
          margin-top: 0;
        }
        
        .support-contacts {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 1rem;
          flex-wrap: wrap;
        }
        
        .contact-method {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }
        
        .contact-icon {
          font-size: 1.2rem;
        }
        
        .receipt-footer {
          margin-top: 2rem;
          text-align: center;
          color: #64748b;
          font-size: 0.9rem;
          border-top: 1px solid #eaeaea;
          padding-top: 1.5rem;
        }
        
        .thank-you {
          color: #2563eb;
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }
        
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .footer-links a {
          color: #4a5568;
          text-decoration: none;
          transition: color 0.2s;
        }
        
        .footer-links a:hover {
          color: #2563eb;
          text-decoration: underline;
        }
        
        @media (max-width: 768px) {
          .booking-details {
            grid-template-columns: 1fr;
          }
          
          .action-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .download-btn, .email-btn {
            width: 100%;
          }
          
          .status-bar {
            flex-wrap: wrap;
            gap: 1rem;
          }
          
          .status-item {
            flex: 0 0 calc(50% - 0.5rem);
          }
          
          .status-bar::before {
            display: none;
          }
        }
        
        @media (max-width: 480px) {
          .receipt-container {
            padding: 1rem;
          }
          
          .feature-list {
            grid-template-columns: 1fr;
          }
          
          .steps-container {
            grid-template-columns: 1fr;
          }
          
          .support-contacts {
            flex-direction: column;
            gap: 1rem;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}

export default Packrecipt;