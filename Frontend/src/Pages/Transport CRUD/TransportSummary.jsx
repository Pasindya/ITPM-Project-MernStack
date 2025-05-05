import React, { useEffect, useState } from 'react';
import TransportNav from '../TransportNav';
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const URL = "http://localhost:5000/htransports";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

function TransportSummary() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHandler().then((data) => {
      setBookings(data.htransports);
      setLoading(false);
    });
  }, []);

  // Process data for charts
  const getVehicleTypeDistribution = () => {
    const typeCount = {};
    bookings.forEach(booking => {
      typeCount[booking.vehicleType] = (typeCount[booking.vehicleType] || 0) + 1;
    });
    return Object.entries(typeCount).map(([name, value]) => ({ name, value }));
  };

  const getBookingTrend = () => {
    const monthlyCount = {};
    bookings.forEach(booking => {
      const date = new Date(booking.bookingdate);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      monthlyCount[monthYear] = (monthlyCount[monthYear] || 0) + 1;
    });
    return Object.entries(monthlyCount).map(([name, count]) => ({ name, count }));
  };

  const getRevenueByVehicleType = () => {
    const revenueByType = {};
    bookings.forEach(booking => {
      const revenue = booking.expectedDays * booking.pricePerKm * 10;
      revenueByType[booking.vehicleType] = (revenueByType[booking.vehicleType] || 0) + revenue;
    });
    return Object.entries(revenueByType).map(([name, revenue]) => ({ name, revenue }));
  };

  const vehicleTypeData = getVehicleTypeDistribution();
  const bookingTrendData = getBookingTrend();
  const revenueData = getRevenueByVehicleType();

  // Calculate key metrics
  const totalBookings = bookings.length;
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const avgDuration = bookings.length > 0 
    ? (bookings.reduce((sum, booking) => sum + booking.expectedDays, 0) / bookings.length)
    : 0;

  // Styles
  const pageStyle = {
    fontFamily: "'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif",
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    padding: '20px'
  };

  const headerStyle = {
    textAlign: 'center',
    margin: '30px 0',
    padding: '20px 0',
    position: 'relative'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '15px',
    position: 'relative',
    display: 'inline-block',
    paddingBottom: '10px'
  };

  const titleUnderline = {
    content: '""',
    position: 'absolute',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '4px',
    backgroundColor: '#3498db',
    borderRadius: '2px'
  };

  const chartContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: '30px',
    margin: '40px 0'
  };

  const chartCardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',
    padding: '20px',
    width: '45%',
    minWidth: '400px'
  };

  const chartTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: '20px',
    textAlign: 'center'
  };

  const metricCardStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    minWidth: '200px',
    textAlign: 'center',
    flex: '1',
    maxWidth: '300px'
  };

  const metricsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    margin: '30px 0'
  };

  return (
    <div style={pageStyle}>
      <TransportNav />
      <div style={headerStyle}>
        <h1 style={titleStyle}>
          Booking Analytics Dashboard
          <span style={titleUnderline}></span>
        </h1>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', margin: '50px' }}>Loading data...</div>
      ) : (
        <>
          {/* Key Metrics Section */}
          <div style={metricsContainerStyle}>
            <div style={metricCardStyle}>
              <h3>Total Bookings</h3>
              <div style={{ fontSize: '1.8rem', fontWeight: '600' }}>{totalBookings}</div>
            </div>
            <div style={metricCardStyle}>
              <h3>Total Revenue</h3>
              <div style={{ fontSize: '1.8rem', fontWeight: '600' }}>Rs. {totalRevenue.toLocaleString()}</div>
            </div>
            <div style={metricCardStyle}>
              <h3>Avg. Duration</h3>
              <div style={{ fontSize: '1.8rem', fontWeight: '600' }}>{avgDuration.toFixed(1)} days</div>
            </div>
          </div>

          {/* Charts Section */}
          <div style={chartContainerStyle}>
            <div style={chartCardStyle}>
              <h2 style={chartTitleStyle}>Vehicle Type Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={vehicleTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {vehicleTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div style={chartCardStyle}>
              <h2 style={chartTitleStyle}>Monthly Booking Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bookingTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" name="Bookings" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={chartCardStyle}>
              <h2 style={chartTitleStyle}>Revenue by Vehicle Type</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`Rs. ${value.toLocaleString()}`, 'Revenue']} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#82ca9d" name="Revenue (Rs.)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TransportSummary;