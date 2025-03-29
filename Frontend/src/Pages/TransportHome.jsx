import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomeTransport() {
  const navigate = useNavigate();

  const goToTransportPage = () => {
    navigate('/transport');
  };

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      color: '#333'
    }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        borderRadius: '10px',
        marginBottom: '40px'
      }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Explore Freely With Your Perfect Ride</h1>
        <p style={{ fontSize: '1.5rem', maxWidth: '800px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          Choose from our wide range of vehicles and enjoy the freedom to travel at your own pace
        </p>
        <button 
          style={{
            padding: '15px 30px',
            fontSize: '1.2rem',
            backgroundColor: '#FF6B6B',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            marginTop: '30px',
            transition: 'all 0.3s ease'
          }} 
          onMouseOver={(e) => e.target.style.backgroundColor = '#FF5252'} 
          onMouseOut={(e) => e.target.style.backgroundColor = '#FF6B6B'}
          onClick={goToTransportPage}
        >
          Book Your Vehicle Now
        </button>
      </div>

      {/* Advantages Section */}
      <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px', color: '#2C3E50' }}>Why Choose Your Own Vehicle?</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        marginBottom: '60px'
      }}>
        {/* Advantage 1 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '25px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s ease'
        }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{
            backgroundColor: '#4ECDC4',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto 20px'
          }}>
            <span style={{ fontSize: '2rem', color: 'white' }}>⏱️</span>
          </div>
          <h3 style={{ textAlign: 'center', color: '#2C3E50' }}>Flexible Schedule</h3>
          <p style={{ textAlign: 'center', lineHeight: '1.6' }}>
            Travel on your own timetable without being tied to public transport schedules.
          </p>
        </div>

        {/* Advantage 2 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '25px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s ease'
        }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{
            backgroundColor: '#FF6B6B',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto 20px'
          }}>
            <span style={{ fontSize: '2rem', color: 'white' }}>🗺️</span>
          </div>
          <h3 style={{ textAlign: 'center', color: '#2C3E50' }}>Explore Offbeat Paths</h3>
          <p style={{ textAlign: 'center', lineHeight: '1.6' }}>
            Discover hidden gems that aren't accessible by regular tourist buses or trains.
          </p>
        </div>

        {/* Advantage 3 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '25px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s ease'
        }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{
            backgroundColor: '#45B7D1',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto 20px'
          }}>
            <span style={{ fontSize: '2rem', color: 'white' }}>👨‍👩‍👧‍👦</span>
          </div>
          <h3 style={{ textAlign: 'center', color: '#2C3E50' }}>Comfort for Groups</h3>
          <p style={{ textAlign: 'center', lineHeight: '1.6' }}>
            Travel comfortably with your family or friends in a private vehicle.
          </p>
        </div>
      </div>

      {/* Vehicle Showcase */}
      <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px', color: '#2C3E50' }}>Our Vehicle Options</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '30px',
        marginBottom: '60px'
      }}>
        {/* Vehicle 1 */}
        <div style={{
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s ease'
        }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Luxury Sedan" 
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <div style={{ padding: '20px', backgroundColor: 'white' }}>
            <h3 style={{ margin: '0 0 10px', color: '#2C3E50' }}>Luxury Sedans</h3>
            <p style={{ margin: '0 0 15px', color: '#7F8C8D' }}>Travel in comfort and style</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              
              <button style={{
                padding: '8px 15px',
                backgroundColor: '#4ECDC4',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }} onClick={goToTransportPage}>View Options</button>
            </div>
          </div>
        </div>

        {/* Vehicle 2 */}
        <div style={{
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s ease'
        }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          <img 
            src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="SUV" 
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <div style={{ padding: '20px', backgroundColor: 'white' }}>
            <h3 style={{ margin: '0 0 10px', color: '#2C3E50' }}>SUVs</h3>
            <p style={{ margin: '0 0 15px', color: '#7F8C8D' }}>Perfect for adventure and rough terrain</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              
              <button style={{
                padding: '8px 15px',
                backgroundColor: '#4ECDC4',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }} onClick={goToTransportPage}>View Options</button>
            </div>
          </div>
        </div>

        {/* Vehicle 3 */}
        <div style={{
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s ease'
        }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          <img 
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Sports Car" 
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <div style={{ padding: '20px', backgroundColor: 'white' }}>
            <h3 style={{ margin: '0 0 10px', color: '#2C3E50' }}>Cars</h3>
            <p style={{ margin: '0 0 15px', color: '#7F8C8D' }}>For those who love speed and luxury</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              
              <button style={{
                padding: '8px 15px',
                backgroundColor: '#4ECDC4',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }} onClick={goToTransportPage}>View Options</button>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{
        backgroundColor: '#F8F9FA',
        padding: '50px',
        borderRadius: '10px',
        marginBottom: '60px'
      }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px', color: '#2C3E50' }}>What Our Customers Say</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {/* Testimonial 1 */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <img 
                src="https://randomuser.me/api/portraits/women/32.jpg" 
                alt="Sarah J." 
                style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }}
              />
              <div>
                <h4 style={{ margin: '0', color: '#2C3E50' }}>Sarah J.</h4>
                <div style={{ color: '#FFD700' }}>★★★★★</div>
              </div>
            </div>
            <p style={{ lineHeight: '1.6', fontStyle: 'italic' }}>
              "Renting a car through this service made our family vacation so much better! We could explore at our own pace and visit places we would have never seen otherwise."
            </p>
          </div>

          {/* Testimonial 2 */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <img 
                src="https://randomuser.me/api/portraits/men/45.jpg" 
                alt="Michael T." 
                style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }}
              />
              <div>
                <h4 style={{ margin: '0', color: '#2C3E50' }}>Michael T.</h4>
                <div style={{ color: '#FFD700' }}>★★★★☆</div>
              </div>
            </div>
            <p style={{ lineHeight: '1.6', fontStyle: 'italic' }}>
              "The SUV we rented was perfect for our mountain trip. The booking process was smooth and the vehicle was in excellent condition."
            </p>
          </div>

          {/* Testimonial 3 */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <img 
                src="https://randomuser.me/api/portraits/women/68.jpg" 
                alt="Emma R." 
                style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }}
              />
              <div>
                <h4 style={{ margin: '0', color: '#2C3E50' }}>Emma R.</h4>
                <div style={{ color: '#FFD700' }}>★★★★★</div>
              </div>
            </div>
            <p style={{ lineHeight: '1.6', fontStyle: 'italic' }}>
              "I loved the freedom of having my own car while traveling. The GPS system included was a lifesaver for navigating unfamiliar roads!"
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div style={{
        backgroundColor: '#2C3E50',
        color: 'white',
        padding: '50px',
        borderRadius: '10px',
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Ready for Your Adventure?</h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 30px' }}>
          Choose from our wide selection of vehicles and start planning your perfect trip today!
        </p>
        <button 
          style={{
            padding: '15px 30px',
            fontSize: '1.2rem',
            backgroundColor: '#FF6B6B',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }} 
          onMouseOver={(e) => e.target.style.backgroundColor = '#FF5252'} 
          onMouseOut={(e) => e.target.style.backgroundColor = '#FF6B6B'}
          onClick={goToTransportPage}
        >
          Browse Vehicles
        </button>
      </div>
    </div>
  );
}

export default HomeTransport;