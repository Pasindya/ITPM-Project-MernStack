import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: 'Roboto', sans-serif;
  padding: 20px;
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  padding: 20px 0;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto 25px;
  color: #666;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Divider = styled.div`
  width: 80px;
  height: 3px;
  background: #2c7be5;
  margin: 20px auto;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
`;

const CardImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  margin: 0 0 12px;
  color: #333;
  font-weight: 600;
`;

const CardDescription = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
`;

const FacilitiesList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  margin-bottom: 20px;
`;

const FacilityItem = styled.li`
  font-size: 0.9rem;
  color: #555;
  padding: 5px 0;
  display: flex;
  align-items: center;
  
  &:before {
    content: '•';
    color: #2c7be5;
    margin-right: 8px;
    font-size: 1.2rem;
  }
`;

const ViewButton = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 6px;
  background-color: #2c7be5;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #1a68d1;
  }
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  
  &:focus {
    outline: none;
    border-color: #2c7be5;
    box-shadow: 0 2px 12px rgba(44,123,229,0.2);
  }
`;

function Transport() {
  const navigate = useNavigate();

  
  

  const vehicleCategories = [
    {
      id: 1,
      type: 'Premium Cars',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Luxury and comfort for your personal travel with premium amenities',
      vehicles: [
        { 
          name: 'Hatchback', 
          pricePerKm: 130, 
          image: '/Images/Transport/Hatchback.jpg',
          seats: 5,
          ac: true,
          facilities: ['Bluetooth', 'USB Charger', 'GPS Navigation', 'Air Conditioning']
        },
        { 
          name: 'Sedan', 
          pricePerKm: 120, 
          image: '/Images/Transport/Sedan.jpg',
          seats: 4,
          ac: true,
          facilities: ['Leather Seats', 'Sunroof', 'Climate Control', 'Air Conditioning']
        },
        { 
          name: 'Aqua', 
          pricePerKm: 110, 
          image: '/Images/Transport/aqua.jpg',
          seats: 4,
          ac: true,
          facilities: ['Massage Seats', 'Premium Sound System', 'Wi-Fi', 'Air Conditioning']
        },
        { 
          name: 'Prius', 
          pricePerKm: 140, 
          image: '/Images/Transport/prius.jpg',
          seats: 5,
          ac: true,
          facilities: ['Hybrid Engine', 'Eco-Friendly', 'Touchscreen Display', 'Air Conditioning']
        },
        {
          name: 'Hybrid Car', 
          pricePerKm: 150, 
          image: '/Images/Transport/hybrid.jpg',
          seats: 5,
          ac: true,
          facilities: ['Fuel Efficient', 'Regenerative Braking', 'Advanced Safety Features', 'Air Conditioning']
        },
        { 
          name: 'Wagoner Car', 
          pricePerKm: 110, 
          image: '/Images/Transport/wagonr.jpg',
          seats: 7,
          ac: true,
          facilities: ['Spacious Interior', 'All-Wheel Drive', 'Roof Rack', 'Air Conditioning']
        },
      ],
    },
    {
      id: 2,
      type: 'Vans & Shuttles',
      image: '/Images/Transport/van2.jpg',
      description: 'Spacious vehicles perfect for group travel and airport transfers',
      vehicles: [
        { 
          name: 'Standard Van', 
          pricePerKm: 100, 
          image: '/Images/Transport/van.jpg',
          seats: 8,
          ac: true,
          facilities: ['Rear AC Vents', 'Cup Holders', 'Spacious Interior', 'Air Conditioning']
        },
        { 
          name: 'Luxury Van', 
          pricePerKm: 200, 
          image: '/Images/Transport/luxuryvan.jpg',
          seats: 6,
          ac: true,
          facilities: ['Reclining Seats', 'Entertainment System', 'Mini Fridge', 'Air Conditioning']
        },
      ],
    },
    {
      id: 3,
      type: 'Buses & Coaches',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Comfortable transportation for large groups and corporate events',
      vehicles: [
        { 
          name: 'Mini Bus', 
          pricePerKm: 120, 
          image: '/Images/Transport/mini.jpg',
          seats: 20,
          ac: true,
          facilities: ['Reclining Seats', 'Overhead Storage', 'Air Conditioning']
        },
        { 
          name: 'Tourist Coach Bus', 
          pricePerKm: 200, 
          image: '/Images/Transport/coach bus.jpg',
          seats: 50,
          ac: true,
          facilities: ['Wi-Fi', 'Entertainment System','Air Conditioning']
        },
      ],
    },
    {
      id: 4,
      type: 'Self Rides',
      image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Environmentally friendly options for city exploration',
      vehicles: [
        { 
          name: 'Scooter', 
          pricePerKm: 70, 
          image: '/Images/Transport/scooter.jpg',
          seats: 2,
          ac: false,
          facilities: ['Lightweight', 'Eco-Friendly', 'USB Charger']
        },
        { 
          name: 'Motor Bicycle', 
          pricePerKm: 80, 
          image: '/Images/Transport/motorbick.jpg',
          seats: 2,
          ac: false,
          facilities: ['Fuel Efficient', 'Compact Design', 'USB Charger']
        },
        { 
          name: 'Tuk Tuk Wheel', 
          pricePerKm: 90, 
          image: '/Images/Transport/tuk tuk.jpg',
          seats: 3,
          ac: false,
          facilities: ['Open Air Design', 'Affordable', 'Easy to Maneuver']
        },
        { 
          name: 'Bicycle Ride', 
          pricePerKm: 50, 
          image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          seats: 1,
          facilities: ['Eco-Friendly Transportation','Helmet Provided',
            'Basket for Storage',
            'Adjustable Seat Height',
            'Lightweight Design']
        },
      ],
    },
    {
      id: 5,
      type: 'Adventure Rides',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Rugged vehicles for off-road adventures and safari tours',
      vehicles: [
        { 
          name: 'Jeep', 
          pricePerKm: 150, 
          image: '/Images/Transport/jeep.jpg',
          seats: 5,
          ac: true,
          facilities: ['4x4 Drive', 'Roof Rack', 'Air Conditioning']
        },
        { 
          name: '4x4 SUV', 
          pricePerKm: 180, 
          image: '/Images/Transport/suv.jpg',
          seats: 7,
          ac: true,
          facilities: ['All-Terrain Tires', 'Sunroof', 'Air Conditioning']
        },
      ],
    },
  ];

  const handleViewMore = (category) => {
    navigate(`/vehicles/${category.type.toLowerCase().replace(/\s+/g, '-')}`, { 
      state: { 
        category,
        vehicles: category.vehicles 
      } 
    });
  };



  


  return (
    <PageContainer>
      <ContentContainer>
        <Header>
          <Title>Premium Transport Solutions</Title>
          <Subtitle>Select from our curated collection of vehicles for every travel need</Subtitle>
          <Divider />
        </Header>

        <GridContainer>
          {vehicleCategories.map((category) => (
            <Card key={category.id} onClick={() => handleViewMore(category)}>
              <CardImageContainer>
                <CardImage src={category.image} alt={category.type} />
              </CardImageContainer>
              
              <CardContent>
                <CardTitle>{category.type}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
                
                <FacilitiesList>
                  {category.vehicles[0].facilities.slice(0, 4).map((facility, index) => (
                    <FacilityItem key={index}>{facility}</FacilityItem>
                  ))}
                  {category.vehicles[0].facilities.length > 4 && (
                    <FacilityItem>+{category.vehicles[0].facilities.length - 4} more</FacilityItem>
                  )}
                </FacilitiesList>
                
                <ViewButton>
                  View {category.type}
                </ViewButton>
              </CardContent>
            </Card>
          ))}
        </GridContainer>
      </ContentContainer>
    </PageContainer>
  );
}

export default Transport;