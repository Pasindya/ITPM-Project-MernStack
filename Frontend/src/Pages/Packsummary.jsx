import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import DashNav from './DashNav';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
const API_URL = "http://localhost:5000/packbookings";

function Packsummary() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(API_URL);
        setBookings(response.data.packbookings || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Process data for charts
  const processData = () => {
    const packageCounts = {};
    const countryCounts = {};
    const monthlyCounts = {};

    bookings.forEach(booking => {
      // Package distribution
      packageCounts[booking.tpackage] = (packageCounts[booking.tpackage] || 0) + 1;
      
      // Country distribution
      countryCounts[booking.livingCountry] = (countryCounts[booking.livingCountry] || 0) + 1;
      
      // Monthly distribution
      const month = new Date(booking.arrivalDate).toLocaleString('default', { month: 'short' });
      monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
    });

    return {
      packageData: Object.entries(packageCounts).map(([name, value]) => ({ name, value })),
      countryData: Object.entries(countryCounts).map(([name, value]) => ({ name, value })),
      monthlyData: Object.entries(monthlyCounts).map(([name, count]) => ({ name, count }))
    };
  };

  const { packageData, countryData, monthlyData } = processData();

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <DashNav />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>Loading booking data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <DashNav />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ color: 'red' }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <DashNav />
      
      <div style={{ flex: 1, padding: '2rem', marginLeft: '250px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1e293b' }}>Package Booking Analytics</h1>
        
        {bookings.length === 0 ? (
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', textAlign: 'center' }}>
            <p>No booking data available</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            {/* Package Distribution Pie Chart */}
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h2 style={{ marginBottom: '1rem', color: '#334155' }}>Package Popularity</h2>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={packageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {packageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly Bookings Bar Chart */}
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h2 style={{ marginBottom: '1rem', color: '#334155' }}>Monthly Bookings</h2>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" name="Bookings" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Country Distribution Bar Chart */}
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h2 style={{ marginBottom: '1rem', color: '#334155' }}>Top Destinations</h2>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={countryData.slice(0, 5)}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" name="Bookings" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Bookings Table */}
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', gridColumn: '1 / -1' }}>
              <h2 style={{ marginBottom: '1rem', color: '#334155' }}>Recent Bookings</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f1f5f9' }}>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Booking ID</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Customer</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Package</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Destination</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Arrival Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map(booking => (
                      <tr key={booking._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '12px' }}>{booking._id}</td>
                        <td style={{ padding: '12px' }}>{booking.name}</td>
                        <td style={{ padding: '12px' }}>{booking.tpackage}</td>
                        <td style={{ padding: '12px' }}>{booking.livingCountry}</td>
                        <td style={{ padding: '12px' }}>{new Date(booking.arrivalDate).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Packsummary;