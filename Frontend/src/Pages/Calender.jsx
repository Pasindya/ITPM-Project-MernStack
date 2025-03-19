import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default calendar styles
import '../CSS/Calender.css'; // Custom styles for holidays

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
    <div className="calendar-container">
      <h1>Sri Lankan Holiday Calendar</h1>
      <div className="calendar-layout">
        <div className="calendar-wrapper">
          <Calendar
            onChange={setDate}
            value={date}
          />
        </div>
        <div className="holiday-list">
          <h2>Holidays & Specials Days in {date.getFullYear()}</h2>
          <ul>
            {holidays.map((holiday) => (
              <li key={holiday.date.iso}>
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