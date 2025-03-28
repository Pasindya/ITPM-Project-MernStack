import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie, Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  BarElement,
  CategoryScale, 
  LinearScale,
  Tooltip, 
  Legend,
  Title
} from 'chart.js';
import jsPDF from "jspdf";
import "jspdf-autotable";

// Register ChartJS components
ChartJS.register(
  ArcElement, 
  BarElement,
  CategoryScale, 
  LinearScale,
  Tooltip, 
  Legend,
  Title
);

const URL = "http://localhost:5000/events";

// Fetch event data from the server
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [chartType, setChartType] = useState('pie');
  const [chartData, setChartData] = useState({
    pie: { labels: [], datasets: [] },
    bar: { labels: [], datasets: [] }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHandler();
        setEvents(data.events);
        processChartData(data.events);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Process data for charts
  const processChartData = (eventsData) => {
    if (!eventsData || eventsData.length === 0) {
      setChartData({
        pie: { labels: [], datasets: [] },
        bar: { labels: [], datasets: [] }
      });
      return;
    }

    // Process data for pie chart
    const eventCounts = eventsData.reduce((acc, event) => {
      const category = event.EventCategory || 'Uncategorized';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    // Process data for bar chart
    const attendeesByCategory = eventsData.reduce((acc, event) => {
      const category = event.EventCategory || 'Uncategorized';
      acc[category] = (acc[category] || 0) + parseInt(event.NumberAdult || 0);
      return acc;
    }, {});

    setChartData({
      pie: {
        labels: Object.keys(eventCounts),
        datasets: [{
          data: Object.values(eventCounts),
          backgroundColor: [
            'rgba(101, 116, 255, 0.7)',
            'rgba(0, 207, 190, 0.7)',
            'rgba(255, 159, 67, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(153, 102, 255, 0.7)',
          ],
          borderColor: [
            'rgba(101, 116, 255, 1)',
            'rgba(0, 207, 190, 1)',
            'rgba(255, 159, 67, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        }],
      },
      bar: {
        labels: Object.keys(attendeesByCategory),
        datasets: [{
          label: 'Number of Attendees',
          data: Object.values(attendeesByCategory),
          backgroundColor: 'rgba(101, 116, 255, 0.7)',
          borderColor: 'rgba(101, 116, 255, 1)',
          borderWidth: 1,
          borderRadius: 4,
        }],
      }
    });
  };

  // Generate PDF report
  const generatePDF = (event) => {
    const doc = new jsPDF();
    
    // Add gradient background to header
    doc.setFillColor(101, 116, 255);
    doc.rect(0, 0, 220, 30, 'F');
    
    // Add title with white color
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("Event Details", 14, 20);
    
    // Reset text color
    doc.setTextColor(0, 0, 0);
    
    const eventDetails = [
      ["Field", "Value"],
      ["First Name", event.FirstName],
      ["Last Name", event.LastName],
      ["Email", event.Gmail],
      ["Phone", event.Number],
      ["Event Type", event.EventCategory],
      ["Date", event.Date],
      ["Time", event.Time],
      ["Location", event.Location],
      ["Attendees", event.NumberAdult],
    ];

    doc.autoTable({
      startY: 40,
      head: [["Field", "Value"]],
      body: eventDetails,
      headStyles: {
        fillColor: [101, 116, 255],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 255]
      },
      margin: { top: 40 }
    });

    doc.save(`${event.FirstName}_${event.LastName}_Event_Details.pdf`);
  };

  // Chart options
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#64748B',
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        titleFont: {
          family: "'Inter', sans-serif",
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 12,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 6,
      },
    },
  };

  const pieOptions = {
    ...commonOptions,
    cutout: '68%',
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  const barOptions = {
    ...commonOptions,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#64748B',
          font: {
            family: "'Inter', sans-serif",
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(226, 232, 240, 0.5)',
          drawBorder: false,
        },
        ticks: {
          color: '#64748B',
          font: {
            family: "'Inter', sans-serif",
          },
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
      padding: '24px',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '800',
          color: '#1E293B',
          margin: '0',
          background: 'linear-gradient(90deg, #6574ff 0%, #00cfbe 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block'
        }}>Event Management Dashboard</h1>
        <p style={{
          color: '#64748B',
          marginTop: '8px',
          fontSize: '16px'
        }}>Visualize and manage all event registrations</p>
      </div>

      {isLoading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '400px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid rgba(101, 116, 255, 0.2)',
            borderTopColor: '#6574ff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              backdropFilter: 'blur(10px)',
              transform: 'translateY(0)',
              transition: 'all 0.3s ease',
              animation: 'fadeInUp 0.6s ease-out'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'rgba(101, 116, 255, 0.1)',
                  color: '#6574ff',
                  marginRight: '16px'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 19V5L21 3V17M9 19L21 17M9 19L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#64748B',
                    margin: '0 0 4px 0'
                  }}>Total Events</p>
                  <p style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#1E293B',
                    margin: '0'
                  }}>{events.length}</p>
                </div>
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              backdropFilter: 'blur(10px)',
              transform: 'translateY(0)',
              transition: 'all 0.3s ease',
              animation: 'fadeInUp 0.6s ease-out 0.1s forwards',
              opacity: 0
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'rgba(0, 207, 190, 0.1)',
                  color: '#00cfbe',
                  marginRight: '16px'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#64748B',
                    margin: '0 0 4px 0'
                  }}>Total Attendees</p>
                  <p style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#1E293B',
                    margin: '0'
                  }}>
                    {events.reduce((sum, event) => sum + parseInt(event.NumberAdult || 0), 0)}
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              backdropFilter: 'blur(10px)',
              transform: 'translateY(0)',
              transition: 'all 0.3s ease',
              animation: 'fadeInUp 0.6s ease-out 0.2s forwards',
              opacity: 0
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'rgba(255, 159, 67, 0.1)',
                  color: '#ff9f43',
                  marginRight: '16px'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#64748B',
                    margin: '0 0 4px 0'
                  }}>Event Categories</p>
                  <p style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#1E293B',
                    margin: '0'
                  }}>
                    {new Set(events.map(event => event.EventCategory)).size}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(226, 232, 240, 0.5)',
            backdropFilter: 'blur(10px)',
            marginBottom: '32px',
            animation: 'fadeInUp 0.6s ease-out 0.3s forwards',
            opacity: 0
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '24px'
            }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#1E293B',
                margin: '0 0 16px 0'
              }}>
                {chartType === 'pie' ? 'Event Distribution' : 'Attendees Overview'}
              </h2>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setChartType('pie')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: chartType === 'pie' ? 'rgba(101, 116, 255, 0.1)' : 'transparent',
                    color: chartType === 'pie' ? '#6574ff' : '#64748B',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.21 15.89C20.5738 17.3945 19.5788 18.7202 18.3119 19.7513C17.045 20.7824 15.5448 21.4874 13.9424 21.8048C12.34 22.1222 10.6843 22.0421 9.12012 21.5718C7.55593 21.1014 6.13059 20.2551 4.96898 19.1067C3.80737 17.9582 2.94473 16.5428 2.45661 14.9839C1.96848 13.4251 1.86971 11.7705 2.16861 10.1646C2.46751 8.55878 3.15544 7.05063 4.17204 5.77203C5.18864 4.49343 6.50283 3.48338 8 2.83M22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V12H22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Pie Chart</span>
                </button>
                <button
                  onClick={() => setChartType('bar')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: chartType === 'bar' ? 'rgba(101, 116, 255, 0.1)' : 'transparent',
                    color: chartType === 'bar' ? '#6574ff' : '#64748B',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 7H5C4.44772 7 4 7.44772 4 8V16C4 16.5523 4.44772 17 5 17H9C9.55228 17 10 16.5523 10 16V8C10 7.44772 9.55228 7 9 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 11H15C14.4477 11 14 11.4477 14 12V16C14 16.5523 14.4477 17 15 17H19C19.5523 17 20 16.5523 20 16V12C20 11.4477 19.5523 11 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Bar Chart</span>
                </button>
              </div>
            </div>

            <div style={{ height: '400px' }}>
              {events.length > 0 ? (
                chartType === 'pie' ? (
                  <Pie data={chartData.pie} options={pieOptions} />
                ) : (
                  <Bar data={chartData.bar} options={barOptions} />
                )
              ) : (
                <div style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748B'
                }}>
                  No event data available to display charts
                </div>
              )}
            </div>
          </div>

          {/* Event Registrations Table */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(226, 232, 240, 0.5)',
            backdropFilter: 'blur(10px)',
            animation: 'fadeInUp 0.6s ease-out 0.4s forwards',
            opacity: 0
          }}>
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid rgba(226, 232, 240, 0.5)'
            }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#1E293B',
                margin: '0'
              }}>Event Registrations</h2>
            </div>

            {events.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: 'rgba(248, 250, 252, 0.8)' }}>
                    <tr>
                      <th style={{
                        padding: '16px 24px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#64748B',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>Name</th>
                      <th style={{
                        padding: '16px 24px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#64748B',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>Email</th>
                      <th style={{
                        padding: '16px 24px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#64748B',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>Event Type</th>
                      <th style={{
                        padding: '16px 24px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#64748B',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>Date</th>
                      <th style={{
                        padding: '16px 24px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#64748B',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>Attendees</th>
                      <th style={{
                        padding: '16px 24px',
                        textAlign: 'right',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#64748B',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event, index) => (
                      <tr key={index} style={{
                        borderBottom: '1px solid rgba(226, 232, 240, 0.5)',
                        backgroundColor: index % 2 === 0 ? 'rgba(255, 255, 255, 0.7)' : 'rgba(248, 250, 252, 0.5)',
                        animation: 'fadeIn 0.5s ease-out forwards',
                        opacity: 0,
                        animationDelay: `${index * 0.05}s`
                      }}>
                        <td style={{
                          padding: '16px 24px',
                          fontSize: '14px',
                          fontWeight: '500',
                          color: '#1E293B'
                        }}>
                          {event.FirstName} {event.LastName}
                        </td>
                        <td style={{
                          padding: '16px 24px',
                          fontSize: '14px',
                          color: '#64748B'
                        }}>
                          {event.Gmail}
                        </td>
                        <td style={{
                          padding: '16px 24px',
                          fontSize: '14px',
                          color: '#64748B'
                        }}>
                          <span style={{
                            padding: '4px 12px',
                            fontSize: '12px',
                            fontWeight: '600',
                            borderRadius: '9999px',
                            background: 'rgba(101, 116, 255, 0.1)',
                            color: '#6574ff'
                          }}>
                            {event.EventCategory}
                          </span>
                        </td>
                        <td style={{
                          padding: '16px 24px',
                          fontSize: '14px',
                          color: '#64748B'
                        }}>
                          {new Date(event.Date).toLocaleDateString()}
                        </td>
                        <td style={{
                          padding: '16px 24px',
                          fontSize: '14px',
                          color: '#64748B',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#6574ff',
                            marginRight: '8px'
                          }}></div>
                          {event.NumberAdult}
                        </td>
                        <td style={{
                          padding: '16px 24px',
                          textAlign: 'right'
                        }}>
                          <button
                            onClick={() => generatePDF(event)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#6574ff',
                              fontWeight: '500',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginLeft: 'auto',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15M17 10L12 15M12 15L7 10M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>PDF</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{
                padding: '40px 24px',
                textAlign: 'center',
                color: '#64748B'
              }}>
                No event registrations found
              </div>
            )}
          </div>
        </>
      )}

      {/* Global styles */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default EventDashboard;