import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import Hotelnav from './Hotelnav';

// Styled Components
const SummaryContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  margin-left: 250px;
  background-color: #f8fafc;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1rem;
`;

const SummaryCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CardTitle = styled.h3`
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CardValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
`;

const CardChange = styled.div`
  font-size: 0.8rem;
  color: ${props => props.positive ? '#10b981' : '#ef4444'};
  margin-top: 0.5rem;
`;

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const ChartTitle = styled.h3`
  font-size: 1.1rem;
  color: #1e293b;
  margin-bottom: 1rem;
`;

function Hotelsummary() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/hbookings');
        setBookings(response.data.data || response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Process data for charts
  const getRevenueByHotel = () => {
    const revenueMap = {};
    
    bookings.forEach(booking => {
      const price = booking.price || 150; // Default price if not available
      if (!revenueMap[booking.hotelName]) {
        revenueMap[booking.hotelName] = 0;
      }
      revenueMap[booking.hotelName] += price;
    });
    
    return Object.entries(revenueMap).map(([name, value]) => ({
      name,
      value
    })).sort((a, b) => b.value - a.value).slice(0, 5);
  };

  const getBookingsByMonth = () => {
    const months = Array(12).fill(0).map((_, i) => ({
      name: new Date(0, i).toLocaleString('default', { month: 'short' }),
      bookings: 0
    }));
    
    bookings.forEach(booking => {
      const date = new Date(booking.checkIn);
      months[date.getMonth()].bookings++;
    });
    
    return months;
  };

  // Key metrics
  const totalBookings = bookings.length;

  if (loading) {
    return (
      <SummaryContainer>
        <Hotelnav />
        <Content>
          <p>Loading summary data...</p>
        </Content>
      </SummaryContainer>
    );
  }

  if (error) {
    return (
      <SummaryContainer>
        <Hotelnav />
        <Content>
          <p>Error loading data: {error}</p>
        </Content>
      </SummaryContainer>
    );
  }

  return (
    <SummaryContainer>
      <Hotelnav />
      <Content>
        <Header>
          <Title>Hotel Booking Analytics</Title>
          <Subtitle>Key metrics and visualizations of your hotel bookings</Subtitle>
        </Header>

        <SummaryCards>
          <Card>
            <CardTitle>Total Bookings</CardTitle>
            <CardValue>{totalBookings}</CardValue>
            <CardChange positive={totalBookings > 0}>
              {totalBookings > 0 ? '+' : ''}{totalBookings} this month
            </CardChange>
          </Card>
        </SummaryCards>

        <ChartContainer>
          <ChartCard>
            <ChartTitle>Revenue by Hotel (Top 5)</ChartTitle>
            <div style={{ height: '400px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getRevenueByHotel()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Legend />
                  <Bar dataKey="value" name="Revenue" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard>
            <ChartTitle>Bookings by Month</ChartTitle>
            <div style={{ height: '400px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getBookingsByMonth()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="bookings" name="Bookings" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </ChartContainer>
      </Content>
    </SummaryContainer>
  );
}

export default Hotelsummary;