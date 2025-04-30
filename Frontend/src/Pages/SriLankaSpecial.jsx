import React from 'react';

const SriLankaSpecial = () => {
  // Inline CSS styles
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f9f3e9',
      borderRadius: '10px',
      boxShadow: '0 0 15px rgba(0,0,0,0.1)'
    },
    header: {
      textAlign: 'center',
      color: '#00534C',
      marginBottom: '30px',
      borderBottom: '2px solid #FFB700',
      paddingBottom: '10px'
    },
    section: {
      marginBottom: '40px',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    sectionTitle: {
      color: '#8E1B1B',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px'
    },
    card: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      overflow: 'hidden',
      transition: 'transform 0.3s ease'
    },
    cardHover: {
      transform: 'translateY(-5px)'
    },
    cardImage: {
      width: '100%',
      height: '180px',
      objectFit: 'cover'
    },
    cardContent: {
      padding: '15px'
    },
    cardTitle: {
      margin: '0 0 10px 0',
      color: '#00534C'
    },
    cardDesc: {
      color: '#666',
      fontSize: '14px',
      margin: '0'
    },
    mapContainer: {
      position: 'relative',
      width: '100%',
      height: '500px',
      backgroundColor: '#e8f4f3',
      borderRadius: '8px',
      overflow: 'hidden'
    },
    mapImage: {
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    },
    province: {
      position: 'absolute',
      background: 'rgba(0, 83, 76, 0.3)',
      border: '2px solid #FFB700',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    provinceHover: {
      background: 'rgba(142, 27, 27, 0.7)',
      transform: 'scale(1.1)'
    }
  };

  // Sri Lankan data
  const sriLankanFoods = [
    {
      name: 'Rice and Curry',
      description: 'The staple dish with various curries and sambols',
      image: '/Images/Riceandcurry.jpg'
    },
    {
      name: 'Hoppers (Appa)',
      description: 'Bowl-shaped pancakes made from fermented rice flour',
      image: '/Images/Hoppers.jpg'
    },
    {
      name: 'Kottu Roti',
      description: 'Chopped roti stir-fried with vegetables, egg, and meat',
      image: 'https://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/kottu-roti.jpg?itok=Y6Y6Y6Y6'
    },
    {
      name: 'String Hoppers',
      description: 'Steamed rice noodle patties served with curry',
      image: '/Images/string hoppers.jpg'
    }
  ];

  const sriLankanSports = [
    {
      name: 'Volleyball',
      description: 'National sport of Sri Lanka',
      image: 'https://www.srilankasports.com/wp-content/uploads/2020/05/Volleyball-Sri-Lanka.jpg'
    },
    {
      name: 'Cricket',
      description: 'Most popular sport in the country',
      image: 'https://www.ft.lk/wp-content/uploads/2021/03/Sri-Lanka-Cricket-1.jpg'
    },
    {
      name: 'Elle',
      description: 'Traditional Sri Lankan sport similar to baseball',
      image: 'https://www.srilankaview.com/wp-content/uploads/2020/05/Elle-Sri-Lanka.jpg'
    }
  ];

  const sriLankanFlowers = [
    {
      name: 'Blue Water Lily (Nil Manel)',
      description: 'National flower of Sri Lanka',
      image: 'https://www.srilankaview.com/wp-content/uploads/2020/05/Blue-Water-Lily.jpg'
    },
    {
      name: 'Frangipani (Araliya)',
      description: 'Fragrant flower commonly found in temples',
      image: 'https://www.srilankaview.com/wp-content/uploads/2020/05/Frangipani.jpg'
    },
    {
      name: 'Orchids',
      description: 'Sri Lanka has over 180 endemic orchid species',
      image: 'https://www.srilankaview.com/wp-content/uploads/2020/05/Orchids.jpg'
    }
  ];

  const sriLankanDresses = [
    {
      name: 'Saree (Osariya)',
      description: 'Traditional women\'s attire with Kandyan style',
      image: 'https://www.srilankaview.com/wp-content/uploads/2020/05/Saree.jpg'
    },
    {
      name: 'Sarong',
      description: 'Traditional men\'s garment wrapped around the waist',
      image: 'https://www.srilankaview.com/wp-content/uploads/2020/05/Sarong.jpg'
    },
    {
      name: 'Lama Sariya',
      description: 'Traditional Kandyan bridal dress',
      image: 'https://www.srilankaview.com/wp-content/uploads/2020/05/Lama-Sariya.jpg'
    }
  ];

  // Province coordinates for the map (approximate)
  const provinces = [
    { name: 'Western', top: '30%', left: '20%', width: '15%', height: '15%' },
    { name: 'Central', top: '35%', left: '40%', width: '15%', height: '15%' },
    { name: 'Southern', top: '60%', left: '30%', width: '15%', height: '15%' },
    { name: 'Northern', top: '10%', left: '40%', width: '15%', height: '15%' },
    { name: 'Eastern', top: '30%', left: '70%', width: '15%', height: '15%' },
    { name: 'North Western', top: '20%', left: '25%', width: '15%', height: '15%' },
    { name: 'North Central', top: '25%', left: '50%', width: '15%', height: '15%' },
    { name: 'Uva', top: '45%', left: '50%', width: '15%', height: '15%' },
    { name: 'Sabaragamuwa', top: '50%', left: '35%', width: '15%', height: '15%' }
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Discover Sri Lanka</h1>
      
      {/* Sri Lankan Map */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <span style={{ marginRight: '10px' }}>🗺️</span>
          Sri Lanka - 9 Provinces
        </h2>
        <div style={styles.mapContainer}>
          <img 
            src="https://www.worldatlas.com/r/w1200/upload/9e/1e/23/lk-01.jpg" 
            alt="Sri Lanka Map" 
            style={styles.mapImage}
          />
          {provinces.map((province, index) => (
            <div 
              key={index}
              style={{
                ...styles.province,
                top: province.top,
                left: province.left,
                width: province.width,
                height: province.height
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(142, 27, 27, 0.7)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 83, 76, 0.3)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {province.name}
            </div>
          ))}
        </div>
      </div>
      
      {/* Sri Lankan Food */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <span style={{ marginRight: '10px' }}>🍛</span>
          Sri Lankan Cuisine
        </h2>
        <div style={styles.grid}>
          {sriLankanFoods.map((food, index) => (
            <div 
              key={index} 
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <img src={food.image} alt={food.name} style={styles.cardImage} />
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{food.name}</h3>
                <p style={styles.cardDesc}>{food.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Sri Lankan Sports */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <span style={{ marginRight: '10px' }}>⚽</span>
          Traditional Sports
        </h2>
        <div style={styles.grid}>
          {sriLankanSports.map((sport, index) => (
            <div 
              key={index} 
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <img src={sport.image} alt={sport.name} style={styles.cardImage} />
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{sport.name}</h3>
                <p style={styles.cardDesc}>{sport.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Sri Lankan Flowers */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <span style={{ marginRight: '10px' }}>🌸</span>
          Beautiful Flowers
        </h2>
        <div style={styles.grid}>
          {sriLankanFlowers.map((flower, index) => (
            <div 
              key={index} 
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <img src={flower.image} alt={flower.name} style={styles.cardImage} />
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{flower.name}</h3>
                <p style={styles.cardDesc}>{flower.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Sri Lankan Dresses */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <span style={{ marginRight: '10px' }}>👘</span>
          Traditional Attire
        </h2>
        <div style={styles.grid}>
          {sriLankanDresses.map((dress, index) => (
            <div 
              key={index} 
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <img src={dress.image} alt={dress.name} style={styles.cardImage} />
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{dress.name}</h3>
                <p style={styles.cardDesc}>{dress.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SriLankaSpecial;