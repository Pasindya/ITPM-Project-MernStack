import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

const createCustomIcon = (type) => {
  const iconColors = {
    food: '#e74c3c',
    place: '#3498db',
    thing: '#2ecc71'
  };

  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${iconColors[type]}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; display: flex; justify-content: center; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
             <span style="font-size: 12px; color: white;">${type.charAt(0).toUpperCase()}</span>
           </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

function Map() {
  const [activeExperience, setActiveExperience] = useState(null);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [filter, setFilter] = useState('all');
  const [provinceFilter, setProvinceFilter] = useState('all');

  const authenticExperiences = [
    // Central Province
    { name: "Temple of the Tooth", location: "Kandy", province: "Central", type: "place", coords: [7.2939, 80.6414] },
    { name: "Kandyan Dancers", location: "Kandy", province: "Central", type: "thing", coords: [7.2939, 80.6414] },
    { name: "Ambul Thiyal", location: "Kandy", province: "Central", type: "food", coords: [7.294, 80.640] },

    // Western Province
    { name: "Colombo Street Food", location: "Colombo", province: "Western", type: "food", coords: [6.9271, 79.8612] },
    { name: "Gangaramaya Temple", location: "Colombo", province: "Western", type: "place", coords: [6.9157, 79.8560] },
    { name: "Beeralu Lace Making", location: "Moratuwa", province: "Western", type: "thing", coords: [6.767, 79.882] },

    // Southern Province
    { name: "Galle Fort Walk", location: "Galle", province: "Southern", type: "place", coords: [6.0273, 80.2179] },
    { name: "Kottu Roti", location: "Matara", province: "Southern", type: "food", coords: [5.9485, 80.5353] },
    { name: "Traditional Mask Making", location: "Ambalangoda", province: "Southern", type: "thing", coords: [6.2359, 80.0538] },

    // Northern Province
    { name: "Nallur Kovil", location: "Jaffna", province: "Northern", type: "place", coords: [9.6659, 80.0255] },
    { name: "Jaffna Crab Curry", location: "Jaffna", province: "Northern", type: "food", coords: [9.6685, 80.0074] },
    { name: "Palmyrah Crafts", location: "Jaffna", province: "Northern", type: "thing", coords: [9.6618, 80.0251] },

    // Eastern Province
    { name: "Arugam Bay Surfing", location: "Arugam Bay", province: "Eastern", type: "place", coords: [6.8431, 81.8350] },
    { name: "Batticaloa Fish Curry", location: "Batticaloa", province: "Eastern", type: "food", coords: [7.7102, 81.6924] },
    { name: "Fishing Catamaran", location: "Trincomalee", province: "Eastern", type: "thing", coords: [8.5874, 81.2152] },

    // North Central Province
    { name: "Sigiriya Rock Fortress", location: "Sigiriya", province: "North Central", type: "place", coords: [7.9575, 80.7603] },
    { name: "Polonnaruwa Rice & Curry", location: "Polonnaruwa", province: "North Central", type: "food", coords: [7.9403, 81.0188] },
    { name: "Stone Carvings", location: "Anuradhapura", province: "North Central", type: "thing", coords: [8.3114, 80.4037] },

    // North Western Province
    { name: "Munneswaram Temple", location: "Chilaw", province: "North Western", type: "place", coords: [7.5734, 79.7946] },
    { name: "Puttalam Lagoon Crab", location: "Puttalam", province: "North Western", type: "food", coords: [8.0334, 79.8415] },
    { name: "Toddy Tapping", location: "Wennappuwa", province: "North Western", type: "thing", coords: [7.3166, 79.8582] },

    // Uva Province
    { name: "Train to Ella", location: "Ella", province: "Uva", type: "place", coords: [6.8606, 81.0463] },
    { name: "Hoppers (Appa)", location: "Badulla", province: "Uva", type: "food", coords: [6.9897, 81.0550] },
    { name: "Tea Picking", location: "Bandarawela", province: "Uva", type: "thing", coords: [6.8296, 80.9875] },

    // Sabaragamuwa Province
    { name: "Ratnapura Gem Mines", location: "Ratnapura", province: "Sabaragamuwa", type: "place", coords: [6.6828, 80.3992] },
    { name: "Weli Thalapa", location: "Kegalle", province: "Sabaragamuwa", type: "food", coords: [7.2513, 80.3464] },
    { name: "Gem Cutting", location: "Ratnapura", province: "Sabaragamuwa", type: "thing", coords: [6.683, 80.399] },
  ];

  const provinces = [...new Set(authenticExperiences.map(exp => exp.province))];

  useEffect(() => {
    fetch('/sri-lanka.geojson')
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data));
  }, []);

  const filteredExperiences = authenticExperiences.filter(exp => {
    return (filter === 'all' || exp.type === filter) && 
           (provinceFilter === 'all' || exp.province === provinceFilter);
  });

  return (
    <div className="map-container">
      <div className="map-controls">
        <h2>Sri Lanka Authentic Experiences</h2>
        <div className="filters">
          <div className="filter-group">
            <label>Experience Type:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Types</option>
              <option value="food">Food</option>
              <option value="place">Places</option>
              <option value="thing">Activities</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Province:</label>
            <select value={provinceFilter} onChange={(e) => setProvinceFilter(e.target.value)}>
              <option value="all">All Provinces</option>
              {provinces.map((province, index) => (
                <option key={index} value={province}>{province}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="map-content">
        <MapContainer 
          center={[7.8731, 80.7718]} 
          zoom={7} 
          style={{ height: '600px', width: '100%', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          {geoJsonData && <GeoJSON 
            data={geoJsonData} 
            style={{ 
              color: '#555', 
              weight: 1, 
              fillOpacity: 0.1,
              fillColor: '#f8f9fa'
            }} 
          />}
          {filteredExperiences.map((experience, index) => (
            <Marker
              key={index}
              position={experience.coords}
              icon={createCustomIcon(experience.type)}
              eventHandlers={{
                click: () => setActiveExperience(experience),
              }}
            >
              <Popup>
                <div className="popup-content">
                  <h4>{experience.name}</h4>
                  <div className="popup-meta">
                    <span className={`tag ${experience.type}`}>{experience.type}</span>
                    <span className="location">{experience.location}, {experience.province}</span>
                  </div>
                  <p className="popup-description">{getExperienceDescription(experience.name)}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <div className="experience-sidebar">
          <div className="sidebar-header">
            <h3>{activeExperience ? activeExperience.name : 'Select an Experience'}</h3>
            {activeExperience && (
              <span className={`tag ${activeExperience.type}`}>
                {activeExperience.type}
              </span>
            )}
          </div>
          {activeExperience ? (
            <div className="experience-details">
              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{activeExperience.location}, {activeExperience.province}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Category:</span>
                <span className="detail-value">{activeExperience.type}</span>
              </div>
              <div className="description">
                <p>{getExperienceDescription(activeExperience.name)}</p>
              </div>
              <div className="experience-image">
                <img 
                  src={`/images/${activeExperience.name.replace(/\s+/g, '-').toLowerCase()}.jpg`} 
                  alt={activeExperience.name}
                  onError={(e) => {
                    e.target.src = '/images/default-experience.jpg';
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="welcome-message">
              <img src="/images/sri-lanka-welcome.jpg" alt="Sri Lanka" />
              <p>Explore authentic Sri Lankan experiences by clicking on markers or using the filters above.</p>
              <div className="legend">
                <div className="legend-item">
                  <div className="legend-icon food"></div>
                  <span>Food & Drink</span>
                </div>
                <div className="legend-item">
                  <div className="legend-icon place"></div>
                  <span>Places</span>
                </div>
                <div className="legend-item">
                  <div className="legend-icon thing"></div>
                  <span>Activities</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getExperienceDescription(name) {
  const descriptions = {
    "Temple of the Tooth": "A sacred Buddhist temple in Kandy housing the relic of the tooth of Buddha. This UNESCO World Heritage site is a must-visit for its spiritual significance and stunning architecture. Evening ceremonies with drummers and offerings are particularly atmospheric.",
    "Kandyan Dancers": "Colorful traditional dance performances with elaborate costumes and drumming. The Kandyan dance is one of Sri Lanka's most iconic cultural expressions, featuring acrobatics, intricate footwork, and vibrant masks.",
    "Ambul Thiyal": "A sour fish curry popular in the hill country, made with goraka (a souring fruit) and spices. This dish is traditionally cooked in a clay pot and has a unique tangy flavor that pairs perfectly with rice.",
    "Colombo Street Food": "Vibrant street stalls offering kottu, hoppers, and other local delights. Don't miss the egg hoppers (appa) with lunu miris sambol or the spicy isso vadai (shrimp fritters) along Galle Face Green.",
    "Gangaramaya Temple": "A famous Buddhist temple blending modern architecture and cultural elements. The temple complex includes a museum with rare artifacts and a beautiful bo tree surrounded by Buddha statues.",
    "Beeralu Lace Making": "An intricate lace craft passed down through generations in coastal towns. Visit the small workshops in Moratuwa to see artisans create delicate patterns using wooden bobbins.",
    "Galle Fort Walk": "Explore the charming Dutch fort with colonial architecture and sea views. The 400-year-old ramparts enclose boutique hotels, cafes, and artisan shops within its atmospheric streets.",
    "Kottu Roti": "Sri Lanka's famous chopped roti stir-fry with vegetables and meat. The rhythmic clanging of the metal blades as chefs prepare kottu on hot griddles is a signature sound of Sri Lankan nights.",
    "Traditional Mask Making": "Carving and painting vibrant ritual masks in Ambalangoda. These masks were traditionally used in healing rituals and folk dramas, and now make for unique souvenirs.",
    "Nallur Kovil": "A grand Hindu temple in Jaffna known for its festival. The annual Nallur Festival features processions with decorated chariots and devotees performing kavadi (penance dances).",
    "Jaffna Crab Curry": "A spicy and flavorful seafood dish from the north, cooked with roasted spices and coconut milk. The crabs from Jaffna's lagoons are particularly meaty and sweet.",
    "Palmyrah Crafts": "Handmade crafts from Palmyrah leaves, a Northern specialty. These include woven baskets, mats, and even notebooks made from the durable leaves of the palmyrah palm.",
    "Arugam Bay Surfing": "One of the world's top surfing destinations with consistent waves from May to October. The point break offers long rides perfect for intermediate surfers, with a laid-back beach vibe.",
    "Batticaloa Fish Curry": "Unique Eastern-style fish curry with coconut milk and tamarind. The local preparation uses fresh lagoon fish and a distinctive blend of spices including fenugreek and curry leaves.",
    "Fishing Catamaran": "Traditional wooden boats used by Eastern fishermen. These colorful outrigger canoes can be seen at sunrise bringing in the day's catch along the eastern coastline.",
    "Sigiriya Rock Fortress": "An ancient rock palace with frescoes and water gardens. Climb the 1,200 steps to see the famous 'mirror wall' and lion's paw gateway to this 5th-century citadel.",
    "Polonnaruwa Rice & Curry": "Hearty rice and curry dishes from the ancient city. The local version often includes jackfruit curry, brinjal moju (pickle), and coconut sambol.",
    "Stone Carvings": "Intricate stonework found in Anuradhapura and Polonnaruwa. The moonstones (sandakada pahana) with their concentric circles of animals and dancers are particularly noteworthy.",
    "Munneswaram Temple": "An ancient temple attracting pilgrims of all faiths. The temple's history dates back over 1000 years and features a massive chariot used in annual processions.",
    "Puttalam Lagoon Crab": "Delicious lagoon crab cooked in local spices. The shallow waters of Puttalam lagoon produce crabs with exceptionally sweet and tender meat.",
    "Toddy Tapping": "The art of extracting sap to make palm wine. Toddy tappers climb tall palm trees at dawn to collect the fermenting sap, which can be drunk fresh or distilled into arrack.",
    "Train to Ella": "A scenic ride through lush tea estates and mountains. The stretch from Hatton to Ella offers breathtaking views of waterfalls and misty peaks from the observation car.",
    "Hoppers (Appa)": "Crispy bowl-shaped pancakes served with sambol or curry. Try the egg hopper with a runny yolk in the center, or sweet versions with treacle and coconut milk.",
    "Tea Picking": "Experience plucking tea leaves in cool plantations. The best leaves are the 'two leaves and a bud' picked by skilled workers who harvest up to 20kg per day.",
    "Ratnapura Gem Mines": "Sri Lanka's gem capital with active mines. Visit small-scale operations where miners sift through river gravel for sapphires, rubies, and cat's eyes.",
    "Weli Thalapa": "A sweet coconut and jaggery treat wrapped in fragrant screwpine leaves. This traditional sweet has a distinctive pandan aroma and sticky, chewy texture.",
    "Gem Cutting": "Crafting precious stones into brilliant gems. Watch master cutters in Ratnapura transform rough stones into faceted jewels using techniques passed down for generations.",
  };
  return descriptions[name] || "An unforgettable Sri Lankan experience awaits you. This authentic encounter offers deep insight into the island's rich culture, history, and traditions.";
}

export default Map;