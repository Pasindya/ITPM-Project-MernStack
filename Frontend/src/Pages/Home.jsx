import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleBookNowClick = () => {
    navigate('/packages'); // Navigate to the packages page
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        color: '#1e293b',
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          position: 'relative',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          <source src="/video/turt.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <h1
            style={{
              fontSize: '4rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: 'white'
            }}
          >
            Welcome to Sri Lanka
          </h1>
          <p
            style={{
              fontSize: '1.5rem',
              
            }}
          >
            Discover the pearl of the Indian Ocean.
          </p>
        </div>
      </div>

      {/* Popular Destinations Section */}
      <div
        style={{
          padding: '4rem 2rem',
          backgroundColor: '#f8f9fa',
        }}
      >
        <h2
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          Popular Destinations
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            <img
              src="/Images/si.jpg"
              alt="Sigiriya"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: '1rem 0',
              }}
            >
              Sigiriya
            </h3>
            <p
              style={{
                fontSize: '1rem',
                color: '#64748b',
                padding: '0 1rem 1rem',
              }}
            >
              Explore the ancient rock fortress.
            </p>
          </div>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            <img
              src="/Images/Kandy.jpg"
              alt="Kandy"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: '1rem 0',
              }}
            >
              Kandy
            </h3>
            <p
              style={{
                fontSize: '1rem',
                color: '#64748b',
                padding: '0 1rem 1rem',
              }}
            >
              Visit the Temple of the Sacred Tooth Relic.
            </p>
          </div>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            <img
              src="/Images/nine.jpg"
              alt="Ella"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: '1rem 0',
              }}
            >
              Ella
            </h3>
            <p
              style={{
                fontSize: '1rem',
                color: '#64748b',
                padding: '0 1rem 1rem',
              }}
            >
              Hike to the iconic Nine Arches Bridge.
            </p>
          </div>
        </div>
      </div>

      {/* Cultural Highlights Section */}
      <div
        style={{
          padding: '4rem 2rem',
          backgroundColor: 'white',
        }}
      >
        <h2
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          Cultural Highlights
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            <img
              src="/Images/dance.jpg"
              alt="Traditional Dance"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: '1rem 0',
              }}
            >
              Traditional Dance
            </h3>
            <p
              style={{
                fontSize: '1rem',
                color: '#64748b',
                padding: '0 1rem 1rem',
              }}
            >
              Experience vibrant cultural performances.
            </p>
          </div>
          <div
            style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            <img
              src="/Images/pera.jpg"
              alt="Festivals"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: '1rem 0',
              }}
            >
              Festivals
            </h3>
            <p
              style={{
                fontSize: '1rem',
                color: '#64748b',
                padding: '0 1rem 1rem',
              }}
            >
              Celebrate Sri Lanka's rich traditions.
            </p>
          </div>
          <div
            style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            <img
              src="/Images/temple.jpeg"
              alt="Temples"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: '1rem 0',
              }}
            >
              Temples
            </h3>
            <p
              style={{
                fontSize: '1rem',
                color: '#64748b',
                padding: '0 1rem 1rem',
              }}
            >
              Discover ancient Buddhist temples.
            </p>
          </div>
        </div>
      </div>

      {/* Cuisine Section */}
      <div
        style={{
          padding: '4rem 2rem',
          backgroundColor: '#f8f9fa',
        }}
      >
        <h2
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          Sri Lankan Cuisine
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            <img
              src="/Images/lkfood.jpg"
              alt="Rice and Curry"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: '1rem 0',
              }}
            >
              Rice and Curry
            </h3>
            <p
              style={{
                fontSize: '1rem',
                color: '#64748b',
                padding: '0 1rem 1rem',
              }}
            >
              Savor the island's staple dish.
            </p>
          </div>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            <img
              src="/Images/hopp.jpg"
              alt="Hoppers"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: '1rem 0',
              }}
            >
              Hoppers
            </h3>
            <p
              style={{
                fontSize: '1rem',
                color: '#64748b',
                padding: '0 1rem 1rem',
              }}
            >
              Try this delicious Sri Lankan pancake.
            </p>
          </div>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            <img
              src="/Images/kottu.jpg"
              alt="Kottu Roti"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: '1rem 0',
              }}
            >
              Kottu Roti
            </h3>
            <p
              style={{
                fontSize: '1rem',
                color: '#64748b',
                padding: '0 1rem 1rem',
              }}
            >
              Enjoy the island's favorite street food.
            </p>
          </div>
        </div>
      </div>

      {/* Adventure Activities Section */}
      <div
        style={{
          padding: '4rem 2rem',
          backgroundColor: 'white',
        }}
      >
        <h2
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          Adventure Activities
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            <img
              src="/Images/surf.jpg"
              alt="Surfing"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: '1rem 0',
              }}
            >
              Surfing
            </h3>
            <p
              style={{
                fontSize: '1rem',
                color: '#64748b',
                padding: '0 1rem 1rem',
              }}
            >
              Ride the waves in Arugam Bay.
            </p>
          </div>
          <div
            style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            <img
              src="/Images/saF.jpg"
              alt="Safari"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: '1rem 0',
              }}
            >
              Safari
            </h3>
            <p
              style={{
                fontSize: '1rem',
                color: '#64748b',
                padding: '0 1rem 1rem',
              }}
            >
              Spot elephants and leopards in Yala National Park.
            </p>
          </div>
          <div
            style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            <img
              src="/Images/hiking.jpg"
              alt="Hiking"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: '1rem 0',
              }}
            >
              Hiking
            </h3>
            <p
              style={{
                fontSize: '1rem',
                color: '#64748b',
                padding: '0 1rem 1rem',
              }}
            >
              Climb Adam's Peak for breathtaking views.
            </p>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div
        style={{
          padding: '4rem 2rem',
          backgroundColor: '#3b82f6',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
          }}
        >
          Ready to Explore Sri Lanka?
        </h2>
        <p
          style={{
            fontSize: '1.25rem',
            marginBottom: '2rem',
          }}
        >
          Start planning your dream trip today.
        </p>
        <button
          onClick={handleBookNowClick}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.375rem',
            border: 'none',
            backgroundColor: 'white',
            color: '#3b82f6',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Home;