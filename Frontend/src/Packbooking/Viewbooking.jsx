import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom

const URL = "http://localhost:5009/bookings"; // Ensure your backend API is running and the URL is correct

// Function to fetch booking data
const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data; // Return the data received from the backend
  } catch (error) {
    console.error("Error fetching bookings:", error); // Log error to help debugging
    return { bookings: [] }; // Return an empty array in case of error
  }
};

function Viewbooking() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the bookings when the component mounts
    fetchHandler().then((data) => {
      if (data && data.bookings) {
        setBookings(data.bookings); // Set bookings if available
      } else {
        console.warn("No bookings found or data format incorrect.");
      }
    });
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:5009/bookings/${id}`);
      // Refresh the bookings list after deletion
      fetchHandler().then((data) => {
        if (data && data.bookings) {
          setBookings(data.bookings);
        }
      });
    } catch (error) {
      console.error('Failed to delete the booking:', error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">View Bookings</h1>
      <div className="space-y-4">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="p-4 bg-white shadow rounded">
              <h2 className="text-xl font-bold mb-2">Booking Information</h2>
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Mobile:</strong> {booking.mobile}</p>
              <p><strong>Email:</strong> {booking.email}</p>
              <p><strong>Living Country:</strong> {booking.livingCountry}</p>
              <p><strong>Package:</strong> {booking.package}</p>
              <p><strong>Arrival Date:</strong> {booking.arrivalDate}</p>
              <p><strong>Number of Travellers:</strong> {booking.noOfTravellers}</p>
              <div className="mt-4">
                <Link to={`/bookingdetails/${booking._id}`}>
                  <button className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600">
                    Update
                  </button>
                </Link>
                <button
                  onClick={() => deleteHandler(booking._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No bookings available.</p> // Message if no bookings found
        )}
      </div>
    </div>
  );
}

export default Viewbooking;