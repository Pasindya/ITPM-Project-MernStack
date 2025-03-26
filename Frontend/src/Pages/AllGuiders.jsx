import React, { useEffect, useState } from 'react';
import '../CSS/AllGuiders.css';
import axios from 'axios';

const URL = "http://localhost:5000/guiders";

// Fetch handler function
const FetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("There was an error fetching the data: " + error.message);
  }
};

function AllGuiders() {
  const [allGuiders, setAllGuiders] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch data when the component mounts
    FetchHandler()
      .then((data) => {
        setAllGuiders(data.allGuiders); // Set the data
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message); // Set error message
        setLoading(false); // Stop loading
      });
  }, []);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Handle case when there's no data
  if (!allGuiders || allGuiders.length === 0) {
    return <div>No guides available</div>;
  }

  return (
    <div className="guiders-container">
      <h2>All Guides</h2>
      <div className="guiders-list">
        {allGuiders.map((guider) => (
          <div key={guider._id} className="guider-card"> {/* Use a unique key */}
            <h3>{guider.name}</h3>
            <div className="guider-details">
              <p><strong>NID:</strong> {guider.Nid || 'Not Provided'}</p>
              <p><strong>Age:</strong> {guider.age || 'Not Provided'}</p>
              <p><strong>Gender:</strong> {guider.gender || 'Not Provided'}</p>
              <p><strong>Contact Number:</strong> {guider.contactNumber || 'Not Provided'}</p>
              <p><strong>Email:</strong> {guider.email || 'Not Provided'}</p>
              <p><strong>Location:</strong> {guider.location || 'Not Provided'}</p>
              <p><strong>Experience:</strong> {guider.experience || 'Not Provided'} years</p>
              <p><strong>Languages:</strong> {guider.languages ? guider.languages.join(', ') : 'Not Provided'}</p>
              <p><strong>Availability:</strong> {guider.availability || 'Not Provided'}</p>
              <p><strong>Bio:</strong> {guider.bio || 'Not Provided'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllGuiders;
