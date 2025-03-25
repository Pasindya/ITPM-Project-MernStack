import React, { useState, useEffect } from "react";
import axios from "axios";
import Event from "../Event/AddEvent"; // Ensure the Event component is correctly imported
import jsPDF from "jspdf";
import "jspdf-autotable";

const URL = "http://localhost:5000/events";

// Fetch event data from the server
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Eventm() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setEvents(data.events));
  }, []);

  // Function to generate PDF with event details
  const generatePDF = (event) => {
    const doc = new jsPDF();
    const eventDetails = [
      ["Field", "Value"],
      ["First Name", event.FirstName],
      ["Last Name", event.LastName],
      ["City", event.City],
      ["Phone Number", event.Number],
      ["Email", event.Gmail],
      ["Number of Adults", event.NumberAdult],
      ["Date", event.Date],
      ["Time", event.Time],
      ["Location", event.Location],
      ["Event Category", event.EventCategory],
    ];

    doc.text("Event Details", 14, 10); // Title for PDF
    doc.autoTable({
      startY: 20, // Table starts after title
      head: [["Field", "Value"]],
      body: eventDetails,
    });

    // Save PDF with the event's first and last name as the filename
    doc.save(`${event.FirstName}_${event.LastName}_Event_Details.pdf`);
  };

  return (
    <div>
      <h1>Event Details</h1>
      <div>
        {events.length > 0 ? (
          events.map((event, i) => (
            <div key={event._id || i}>
              <Event event={event} />
              {/* Removed the button as requested */}
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
}

export default Eventm;