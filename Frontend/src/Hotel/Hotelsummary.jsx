import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import styled from 'styled-components';
import Hotelnav from './Hotelnav';
import { FiTrendingUp, FiCalendar } from 'react-icons/fi';

// Styled Components
const SummaryContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  margin-left: 250px;
  background-color: transparent;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  color: #1a365d;
  margin: 0;
  font-weight: 700;
  background: linear-gradient(90deg, #3182ce, #805ad5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: #718096;
  font-size: 1rem;
  margin: 0;
`;

const SummaryCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border-left: 4px solid ${props => props.themeColor || '#3182ce'};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.h3`
  font-size: 0.9rem;
  color: #718096;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
`;

const CardChange = styled.div`
  font-size: 0.8rem;
  color: ${props => props.positive ? '#38a169' : '#e53e3e'};
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${props => props.bgColor || 'rgba(49, 130, 206, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color || '#3182ce'};
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
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ChartTitle = styled.h3`
  font-size: 1.1rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3182ce;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  background-color: #fff5f5;
  color: #e53e3e;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #e53e3e;
`;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

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

  const getBookingStatusDistribution = () => {
    const statusMap = {};
    
    bookings.forEach(booking => {
      const status = booking.status || 'confirmed';
      if (!statusMap[status]) {
        statusMap[status] = 0;
      }
      statusMap[status]++;
    });
    
    return Object.entries(statusMap).map(([name, value]) => ({
      name,
      value
    }));
  };

  // Key metrics
  const totalBookings = bookings.length;
  const monthlyGrowth = bookings.filter(booking => {
    const bookingDate = new Date(booking.checkIn);
    const currentDate = new Date();
    return bookingDate.getMonth() === currentDate.getMonth() && 
           bookingDate.getFullYear() === currentDate.getFullYear();
  }).length;

  if (loading) {
    return (
      <SummaryContainer>
        <Hotelnav />
        <Content>
          <Header>
            <Title>Hotel Booking Analytics</Title>
            <Subtitle>Key metrics and visualizations of your hotel bookings</Subtitle>
          </Header>
          <LoadingContainer>
            <LoadingSpinner />
          </LoadingContainer>
        </Content>
      </SummaryContainer>
    );
  }

  if (error) {
    return (
      <SummaryContainer>
        <Hotelnav />
        <Content>
          <Header>
            <Title>Hotel Booking Analytics</Title>
            <Subtitle>Key metrics and visualizations of your hotel bookings</Subtitle>
          </Header>
          <ErrorMessage>
            Error loading data: {error}
          </ErrorMessage>
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
          <Subtitle>Comprehensive insights into your hotel's performance</Subtitle>
        </Header>

        <SummaryCards>
          <Card themeColor="#3182ce">
            <CardHeader>
              <CardTitle>
                <IconWrapper bgColor="rgba(49, 130, 206, 0.1)" color="#3182ce">
                  <FiCalendar size={18} />
                </IconWrapper>
                Total Bookings
              </CardTitle>
            </CardHeader>
            <CardValue>{totalBookings}</CardValue>
            <CardChange positive={monthlyGrowth > 0}>
              <FiTrendingUp size={16} />
              {monthlyGrowth} this month
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
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#718096" />
                  <YAxis stroke="#718096" />
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                    contentStyle={{
                      background: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Revenue" 
                    fill="#3182ce"
                    radius={[4, 4, 0, 0]}
                  />
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
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#718096" />
                  <YAxis stroke="#718096" />
                  <Tooltip 
                    contentStyle={{
                      background: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="bookings" 
                    name="Bookings" 
                    fill="#38a169"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard>
            <ChartTitle>Booking Status Distribution</ChartTitle>
            <div style={{ height: '400px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getBookingStatusDistribution()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {getBookingStatusDistribution().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value} bookings`, name]}
                    contentStyle={{
                      background: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </ChartContainer>
      </Content>
    </SummaryContainer>
  );
}

export default Hotelsummary;