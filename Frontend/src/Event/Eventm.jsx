import React, { useState, useEffect } from "react";
import axios from "axios";
import Event from "../Event/AddEvent";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";

const URL = "http://localhost:5000/events";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Eventm() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      setEvents(data.events);
      setFilteredEvents(data.events);
    });
  }, []);

  useEffect(() => {
    const results = events.filter(event =>
      event.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.LastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.City.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.Gmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.EventCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.Location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(results);
  }, [searchTerm, events]);

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

    doc.text("Event Details", 14, 10);
    doc.autoTable({
      startY: 20,
      head: [["Field", "Value"]],
      body: eventDetails,
    });

    doc.save(`${event.FirstName}_${event.LastName}_Event_Details.pdf`);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div>
      <h1>Event Details</h1>
      
      {/* Enhanced Search Input with Animations */}
      <motion.div 
        style={{ margin: "20px 0", position: "relative" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          style={{
            position: "relative",
            display: "inline-block",
            transformOrigin: "center"
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiSearch 
            style={{
              position: "absolute",
              left: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              color: isSearchFocused ? "#4a6bff" : "#aaa",
              transition: "all 0.3s ease"
            }} 
          />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            style={{
              padding: "12px 20px 12px 40px",
              width: "300px",
              borderRadius: "25px",
              border: `2px solid ${isSearchFocused ? "#4a6bff" : "#ddd"}`,
              outline: "none",
              fontSize: "14px",
              boxShadow: isSearchFocused ? "0 5px 15px rgba(74, 107, 255, 0.1)" : "0 2px 10px rgba(0,0,0,0.05)",
              transition: "all 0.3s ease",
              backgroundColor: "#fff"
            }}
          />
          <AnimatePresence>
            {searchTerm && (
              <motion.button
                onClick={clearSearch}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#999",
                  fontSize: "16px",
                  padding: "5px"
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                whileHover={{ color: "#ff4a4a", scale: 1.1 }}
              >
                <FiX />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Animated search results count */}
        {searchTerm && (
          <motion.div
            style={{
              marginTop: "8px",
              fontSize: "12px",
              color: "#666",
              textAlign: "center"
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Found {filteredEvents.length} matching {filteredEvents.length === 1 ? "event" : "events"}
          </motion.div>
        )}
      </motion.div>
      
      <div>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, i) => (
            <div key={event._id || i}>
              <Event event={event} />
            </div>
          ))
        ) : (
          <p>No events found matching your search.</p>
        )}
      </div>
    </div>
  );
}

export default Eventm;