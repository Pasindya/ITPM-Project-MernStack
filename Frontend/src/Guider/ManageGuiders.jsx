
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaEdit,
  FaTrash,
  FaTimes,
  FaEye,
  FaPlus,
  FaSignOutAlt,
  FaUserFriends,
  FaFileAlt,
  FaChartBar
} from "react-icons/fa";
import React from "react";

const ManageGuiders = () => {
  const [guiders, setGuiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [currentGuider, setCurrentGuider] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchGuiders();
  }, []);

  const fetchGuiders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/guiders");
      setGuiders(response.data);
    } catch (err) {
      setError("Failed to load guiders.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this guider?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/guiders/${id}`);
      setGuiders(guiders.filter((guider) => guider._id !== id));
    } catch (err) {
      alert("Failed to delete guider.");
    }
  };

  const handleEdit = (guider) => {
    setEditMode(true);
    setCurrentGuider({ ...guider, languages: guider.languages.join(", ") });
    setSelectedImage(null);
  };

  const handleView = (guider) => {
    setViewMode(true);
    setCurrentGuider(guider);
  };

  const validateForm = () => {
    const errors = {};
    if (!currentGuider.nic) errors.nic = "NIC is required.";
    if (!currentGuider.name || !/^[a-zA-Z\s]*$/.test(currentGuider.name))
      errors.name = "Name must only contain letters and spaces.";
    if (!currentGuider.gender) errors.gender = "Gender is required.";
    if (!currentGuider.contactNumber || !/^\d{10}$/.test(currentGuider.contactNumber))
      errors.contactNumber = "Contact number must be 10 digits.";
    if (!currentGuider.email || !/\S+@\S+\.\S+/.test(currentGuider.email))
      errors.email = "Invalid email address.";
    if (!currentGuider.location) errors.location = "Location is required.";
    if (!currentGuider.bio) errors.bio = "Bio is required.";
    if (!currentGuider.languages) errors.languages = "Languages are required.";
    if (!/^\d{9}[Vv]$/.test(currentGuider.nic) && !/^\d{12}$/.test(currentGuider.nic))
      errors.nic = "NIC must be 9 digits followed by 'V' or 12 digits.";
    if (!/^\d+$/.test(currentGuider.experience)) errors.experience = "Experience must be a number.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("nic", currentGuider.nic);
    formData.append("name", currentGuider.name);
    formData.append("gender", currentGuider.gender);
    formData.append("contactNumber", currentGuider.contactNumber);
    formData.append("email", currentGuider.email);
    formData.append("location", currentGuider.location);
    formData.append("experience", currentGuider.experience);
    formData.append("languages", currentGuider.languages);
    formData.append("bio", currentGuider.bio);

    if (selectedImage) {
      formData.append("guiderpic", selectedImage);
    }

    try {
      await axios.put(
        `http://localhost:5000/api/guiders/${currentGuider._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      fetchGuiders(); // Refresh the list
      setEditMode(false);
      setCurrentGuider(null);
    } catch (err) {
      alert("Failed to update guider.");
    }
  };

  const handleChange = (e) => {
    setCurrentGuider({ ...currentGuider, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return text;
    }
    const regex = new RegExp(`(${highlight})`, "gi");
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-300">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const filteredGuiders = guiders.filter((guider) =>
    guider.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '900px', margin: 'auto', padding: '2rem', backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', marginTop: '2rem' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', color: '#007bff', marginBottom: '1.5rem' }}>
        Manage Guiders
      </h2>

      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '48%' }}
        />
        <span style={{ color: '#555' }}>
          Total Guiders: {filteredGuiders.length}
        </span>
      </div>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {filteredGuiders.map((guider) => (
            <div key={guider._id} style={{ backgroundColor: '#f7f7f7', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
              <img
                src={guider.guiderpic}
                alt={guider.name}
                style={{ width: '96px', height: '96px', objectFit: 'cover', borderRadius: '50%', marginBottom: '1rem', marginLeft: 'auto', marginRight: 'auto' }}
              />
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>
                {guider.name}
              </h3>
              <p style={{ color: '#555', textAlign: 'center' }}>{guider.email}</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                <button
                  style={{ color: '#28a745', fontSize: '20px' }}
                  onClick={() => handleEdit(guider)}
                >
                  <FaEdit />
                </button>
                <button
                  style={{ color: '#dc3545', fontSize: '20px' }}
                  onClick={() => handleDelete(guider._id)}
                >
                  <FaTrash />
                </button>
                <button
                  style={{ color: '#000', fontSize: '20px' }}
                  onClick={() => handleView(guider)}
                >
                  <FaEye />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editMode && (
        <div style={{ position: 'fixed', inset: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: '1000' }}>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Edit Guider</h3>
              <button
                style={{ color: '#dc3545' }}
                onClick={() => setEditMode(false)}
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleUpdate}>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={currentGuider.name}
                  onChange={handleChange}
                  style={{ padding: '0.5rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}
              </div>
              <div>
                <label>NIC</label>
                <input
                  type="text"
                  name="nic"
                  value={currentGuider.nic}
                  onChange={handleChange}
                  style={{ padding: '0.5rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {formErrors.nic && <p style={{ color: 'red' }}>{formErrors.nic}</p>}
              </div>
              <div>
                <label>Gender</label>
                <select
                  name="gender"
                  value={currentGuider.gender}
                  onChange={handleChange}
                  style={{ padding: '0.5rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {formErrors.gender && <p style={{ color: 'red' }}>{formErrors.gender}</p>}
              </div>
              <div>
                <label>Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={currentGuider.contactNumber}
                  onChange={handleChange}
                  style={{ padding: '0.5rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {formErrors.contactNumber && <p style={{ color: 'red' }}>{formErrors.contactNumber}</p>}
              </div>
              <div>
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={currentGuider.email}
                  onChange={handleChange}
                  style={{ padding: '0.5rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
              </div>
              <div>
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={currentGuider.location}
                  onChange={handleChange}
                  style={{ padding: '0.5rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {formErrors.location && <p style={{ color: 'red' }}>{formErrors.location}</p>}
              </div>
              <div>
                <label>Languages</label>
                <input
                  type="text"
                  name="languages"
                  value={currentGuider.languages}
                  onChange={handleChange}
                  style={{ padding: '0.5rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {formErrors.languages && <p style={{ color: 'red' }}>{formErrors.languages}</p>}
              </div>
              <div>
                <label>Experience (Years)</label>
                <input
                  type="number"
                  name="experience"
                  value={currentGuider.experience}
                  onChange={handleChange}
                  style={{ padding: '0.5rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {formErrors.experience && <p style={{ color: 'red' }}>{formErrors.experience}</p>}
              </div>
              <div>
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={currentGuider.bio}
                  onChange={handleChange}
                  style={{ padding: '0.5rem', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
                ></textarea>
                {formErrors.bio && <p style={{ color: 'red' }}>{formErrors.bio}</p>}
              </div>
              <div>
                <label>Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ padding: '0.5rem' }}
                />
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                <button
                  type="submit"
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Update Guider
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGuiders;