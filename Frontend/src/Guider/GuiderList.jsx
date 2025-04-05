import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const GuiderList = () => {
  const [guiders, setGuiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchGuiders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/guiders");
        setGuiders(response.data);

        const uniqueLocations = [...new Set(response.data.map((guider) => guider.location))];
        setLocations(uniqueLocations);
      } catch (err) {
        setError("Failed to load guiders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGuiders();
  }, []);

  const filteredGuiders = guiders.filter((guider) => {
    const matchesName = guider.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation ? guider.location.toLowerCase() === selectedLocation.toLowerCase() : true;
    const matchesExperience = selectedExperience ? guider.experience >= selectedExperience : true;

    return matchesName && matchesLocation && matchesExperience;
  });

  const generatePDF = () => {
    const input = document.getElementById("guider-list");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const pageHeight = 297;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("guiders_list.pdf");
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Meet Our Guiders</h2>
      
      <button onClick={generatePDF} style={styles.pdfButton}>Download PDF</button>

      <div id="guider-list">
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by name..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={styles.filterContainer}>
          <select
            style={styles.select}
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Select Location</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>

          <select
            style={styles.select}
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
          >
            <option value="">Select Experience</option>
            <option value="1">1+ years</option>
            <option value="3">3+ years</option>
            <option value="5">5+ years</option>
            <option value="10">10+ years</option>
          </select>
        </div>

        {loading ? (
          <div style={styles.loaderContainer}>
            <div style={styles.loader}></div>
          </div>
        ) : error ? (
          <p style={styles.error}>{error}</p>
        ) : (
          <div style={styles.guiderGrid}>
            {filteredGuiders.length > 0 ? (
              filteredGuiders.map((guider) => (
                <div key={guider._id} style={styles.card}>
                  <div style={styles.imageContainer}>
                    <img
                      style={styles.image}
                      src={guider.guiderpic}
                      alt={guider.name}
                    />
                  </div>

                  <div style={styles.cardContent}>
                    <h3 style={styles.name}>{guider.name}</h3>
                    <p style={styles.details}><strong>Email:</strong> {guider.email}</p>
                    <p style={styles.details}><strong>Contact:</strong> {guider.contactNumber}</p>
                    <p style={styles.details}><strong>Experience:</strong> {guider.experience} years</p>
                    <p style={styles.details}><strong>Location:</strong> {guider.location}</p>
                    <p style={styles.details}><strong>Languages:</strong> {guider.languages}</p>
                  </div>

                  <button style={styles.bookButton}>Book Now</button>
                </div>
              ))
            ) : (
              <p style={styles.noGuiders}>No guiders found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    padding: "40px 20px",
    textAlign: "center",
  },
  header: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "30px",
  },
  pdfButton: {
    padding: "12px 20px",
    fontSize: "16px",
    backgroundColor: "#27ae60",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    marginBottom: "20px",
  },
  searchContainer: {
    marginBottom: "20px",
  },
  searchInput: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "300px",
    fontSize: "16px",
    outline: "none",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "30px",
  },
  select: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "200px",
    fontSize: "16px",
    outline: "none",
  },
  guiderGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    cursor: "pointer",
  },
  imageContainer: {
    width: "100%",
    height: "200px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  bookButton: {
    display: "block",
    width: "80%",
    margin: "20px auto",
    padding: "12px",
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
    border: "none",
  },
};

export default GuiderList;
