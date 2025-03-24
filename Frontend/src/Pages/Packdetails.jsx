import React, { useEffect, useState } from 'react';
import DashNav from './DashNav';
import axios from 'axios';
import Packbooking from './Packbooking';

const URL = "http://localhost:5000/packbookings";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Packdetails() {
  const [packbookings, setPackbookings] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setPackbookings(data.packbookings));
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Sidebar */}
      <DashNav />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: '2rem',
          marginLeft: '250px', // Adjust based on sidebar width
        }}
      >
        {/* Page Title (Centered) */}
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1e293b',
            textAlign: 'center',
            marginBottom: '2rem',
            letterSpacing: '-0.025em',
          }}
        >
          Package Booking Details
        </h1>

        {/* Booking Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            padding: '1rem',
          }}
        >
          {packbookings &&
            packbookings.map((packbooking, i) => (
              <Packbooking key={i} packbooking={packbooking} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Packdetails;