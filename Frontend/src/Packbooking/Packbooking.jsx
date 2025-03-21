import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashNav from '../Pages/DashNav';  // Ensure this is the correct path to DashNav component

const URL = "http://Localhost:5000/packbookings";  // Ensure your backend API is running and the URL is correct

// Function to fetch packbooking data
const fetchHandler = async () => {
    try {
        const response = await axios.get(URL);
        return response.data;  // Return the data received from the backend
    } catch (error) {
        console.error("Error fetching packbookings:", error);  // Log error to help debugging
        return { packbookings: [] };  // Return an empty array in case of error
    }
}

function Packbooking() {
    const [packbookings, setPackbookings] = useState([]);

    useEffect(() => {
        // Fetch the packbookings when the component mounts
        fetchHandler().then((data) => {
            if (data && data.packbookings) {
                setPackbookings(data.packbookings);  // Set packbookings if available
            } else {
                console.warn("No packbookings found or data format incorrect.");
            }
        });
    }, []);  // Empty dependency array ensures this effect runs only once on mount

    return (
        <div className="flex">
            <DashNav />  {/* Include the navigation bar */}
            <main className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">Packbooking Details</h1>

                {/* Render packbooking details if available */}
                <div className="booking-cards-container">
                    {packbookings.length > 0 ? (
                        packbookings.map((packbooking, i) => (
                            <PackbookingCard key={i} packbooking={packbooking} />  // Render each packbooking
                        ))
                    ) : (
                        <p>No packbookings available.</p>  // Message if no packbookings found
                    )}
                </div>
            </main>
        </div>
    );
}

export default Packbooking;