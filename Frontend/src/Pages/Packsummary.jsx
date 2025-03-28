import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import DashNav from './DashNav';
import axios from 'axios';
import { FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
const API_URL = "http://localhost:5000/packbookings";

function Packsummary() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

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

    bookings.forEach(booking => {
      // Package distribution
      packageCounts[booking.tpackage] = (packageCounts[booking.tpackage] || 0) + 1;
      
      // Country distribution
      countryCounts[booking.livingCountry] = (countryCounts[booking.livingCountry] || 0) + 1;
    });

    return {
      packageData: Object.entries(packageCounts).map(([name, value]) => ({ name, value })),
      countryData: Object.entries(countryCounts).map(([name, value]) => ({ name, value }))
    };
  };

  const { packageData, countryData } = processData();

  if (loading) {
    return (
      <div className="dashboard-container">
        <DashNav />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading booking data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <DashNav />
        <div className="error-container">
          <p className="error-message">Error: {error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <DashNav />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Package Booking Analytics</h1>
          <div className="user-profile">
            <FaUserCircle size={32} />
            <span>Admin</span>
          </div>
        </div>
        
        <div className="dashboard-tabs">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
        
        </div>
        
        {activeTab === 'overview' && (
          <>
            <div className="metrics-container">
              <div className="metric-card">
                <div className="metric-icon" style={{ backgroundColor: '#EFF6FF' }}>
                  <FiUsers size={24} color="#3B82F6" />
                </div>
                <div className="metric-info">
                  <h3>Total Bookings</h3>
                  <p>{bookings.length}</p>
                  <span className="metric-trend positive">+12% from last month</span>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon" style={{ backgroundColor: '#F5F3FF' }}>
                  <FiMapPin size={24} color="#8B5CF6" />
                </div>
                <div className="metric-info">
                  <h3>Destinations</h3>
                  <p>{countryData.length}</p>
                  <span className="metric-trend positive">+3 new</span>
                </div>
              </div>
            </div>
            
            {bookings.length === 0 ? (
              <div className="empty-state">
                <p>No booking data available</p>
                <button className="primary-button">Import Data</button>
              </div>
            ) : (
              <div className="charts-grid">
                {/* Package Distribution Pie Chart */}
                <div className="chart-card">
                  <div className="chart-header">
                    <h2>Package Popularity</h2>
                    <select className="chart-filter">
                      <option>This Year</option>
                      <option>Last Year</option>
                      <option>All Time</option>
                    </select>
                  </div>
                  <div className="chart-container">
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
                        <Tooltip 
                          formatter={(value) => [`${value} bookings`, 'Count']}
                          contentStyle={{
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                          }}
                        />
                        <Legend 
                          layout="horizontal" 
                          verticalAlign="bottom" 
                          align="center"
                          wrapperStyle={{ paddingTop: '20px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Country Distribution Bar Chart */}
                <div className="chart-card">
                  <div className="chart-header">
                    <h2>Top Destinations</h2>
                    <select className="chart-filter">
                      <option>Top 5</option>
                      <option>Top 10</option>
                      <option>All</option>
                    </select>
                  </div>
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={countryData.slice(0, 5)}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis 
                          type="number" 
                          tick={{ fill: '#6B7280' }}
                          axisLine={{ stroke: '#E5E7EB' }}
                        />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          width={100} 
                          tick={{ fill: '#6B7280' }}
                          axisLine={{ stroke: '#E5E7EB' }}
                        />
                        <Tooltip 
                          contentStyle={{
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                          }}
                        />
                        <Bar 
                          dataKey="value" 
                          fill="#10B981" 
                          name="Bookings"
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Bookings Table */}
                <div className="table-card full-width">
                  <div className="table-header">
                    <h2>Recent Bookings</h2>
                    <button className="secondary-button">View All</button>
                  </div>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Booking ID</th>
                          <th>Customer</th>
                          <th>Package</th>
                          <th>Destination</th>
                          <th>Arrival Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.slice(0, 5).map(booking => (
                          <tr key={booking._id}>
                            <td>#{booking._id.slice(0, 8)}</td>
                            <td>
                              <div className="customer-cell">
                                <FaUserCircle size={20} />
                                <span>{booking.name}</span>
                              </div>
                            </td>
                            <td>{booking.tpackage}</td>
                            <td>{booking.livingCountry}</td>
                            <td>
                              <div className="date-cell">
                                <FiCalendar size={16} />
                                <span>{new Date(booking.arrivalDate).toLocaleDateString()}</span>
                              </div>
                            </td>
                            <td>
                              <span className={`status-badge ${booking.status || 'confirmed'}`}>
                                {booking.status || 'Confirmed'}
                              </span>
                            </td>
                            <td>
                              <button className="action-button">View</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        
        
        
        
      </div>
    </div>
  );
}

export default Packsummary;

// Add these styles to your CSS file
const styles = `
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: #F9FAFB;
  font-family: 'Inter', sans-serif;
}

.dashboard-content {
  flex: 1;
  padding: 2rem;
  margin-left: 250px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #111827;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #4B5563;
}

.dashboard-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #E5E7EB;
  padding-bottom: 0.5rem;
}

.tab-button {
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  border-radius: 0.375rem;
  color: #6B7280;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.tab-button:hover {
  color: #111827;
  background-color: #F3F4F6;
}

.tab-button.active {
  color: #111827;
  background-color: #E5E7EB;
}

.metrics-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.metric-card {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  gap: 1rem;
}

.metric-icon {
  width: 48px;
  height: 48px;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.metric-info h3 {
  font-size: 0.875rem;
  color: #6B7280;
  margin-bottom: 0.25rem;
}

.metric-info p {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.metric-trend {
  font-size: 0.75rem;
  font-weight: 500;
}

.metric-trend.positive {
  color: #10B981;
}

.metric-trend.negative {
  color: #EF4444;
}

.metric-trend.neutral {
  color: #6B7280;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.chart-card {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.chart-card.full-width {
  grid-column: 1 / -1;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.chart-header h2 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.chart-filter {
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #E5E7EB;
  background-color: white;
  font-size: 0.875rem;
  color: #4B5563;
}

.chart-container {
  height: 300px;
}

.table-card {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.table-header h2 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  padding: 0.75rem 1rem;
  text-align: left;
  background-color: #F9FAFB;
  color: #6B7280;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #E5E7EB;
}

td {
  padding: 1rem;
  color: #111827;
  font-size: 0.875rem;
  border-bottom: 1px solid #E5E7EB;
}

.customer-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.date-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.confirmed {
  background-color: #D1FAE5;
  color: #065F46;
}

.status-badge.pending {
  background-color: #FEF3C7;
  color: #92400E;
}

.status-badge.cancelled {
  background-color: #FEE2E2;
  color: #991B1B;
}

.action-button {
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #E5E7EB;
  background-color: white;
  color: #4B5563;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.action-button:hover {
  background-color: #F9FAFB;
}

.primary-button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  background-color: #4F46E5;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.primary-button:hover {
  background-color: #4338CA;
}

.secondary-button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid #E5E7EB;
  background-color: white;
  color: #4B5563;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.secondary-button:hover {
  background-color: #F9FAFB;
}

.loading-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #E5E7EB;
  border-top-color: #4F46E5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.error-message {
  color: #EF4444;
  font-weight: 500;
}

.retry-button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  background-color: #4F46E5;
  color: white;
  font-weight: 500;
  cursor: pointer;
}

.empty-state {
  background-color: white;
  padding: 3rem;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.empty-state p {
  margin-bottom: 1rem;
  color: #6B7280;
}
`;

// Inject styles
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);