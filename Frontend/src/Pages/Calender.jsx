import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default calendar styles

function Calender() {
  const [date, setDate] = useState(new Date()); // Selected date
  const [holidays, setHolidays] = useState([]); // List of holidays
  const API_KEY = 'd2wQfrpvjiFNG8GPfRTo70JDJLnFo5l9'; // Replace with your API key

  // Fetch holidays for the selected year
  const fetchHolidays = async (year) => {
    try {
      const response = await axios.get(
        `https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=LK&year=${year}`
      );
      setHolidays(response.data.response.holidays);
    } catch (error) {
      console.error('Error fetching holidays:', error);
    }
  };

  // Fetch holidays when the component mounts or the year changes
  useEffect(() => {
    fetchHolidays(date.getFullYear());
  }, [date]);

  return (
    <div
      style={{
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#1e293b',
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        Sri Lankan Holiday Calendar
      </h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '1.5rem',
          }}
        >
          <Calendar
            onChange={setDate}
            value={date}
            style={{
              width: '100%',
              border: 'none',
              borderRadius: '0.5rem',
            }}
          />
        </div>

        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '1.5rem',
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '1rem',
            }}
          >
            Holidays & Special Days in {date.getFullYear()}
          </h2>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {holidays.map((holiday) => (
              <li
                key={holiday.date.iso}
                style={{
                  padding: '0.75rem',
                  borderBottom: '1px solid #e2e8f0',
                  fontSize: '1rem',
                  color: '#1e293b',
                }}
              >
                {new Date(holiday.date.iso).toLocaleDateString()} - {holiday.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Calender;