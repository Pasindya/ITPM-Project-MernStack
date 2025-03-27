import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Eventm from './Eventm'; // Import your Eventm component
import EventDashboard from '../Event/EventCharts'; // Import your EventDashboard component
import { useNavigate } from 'react-router-dom'; // Import useNavigate for logout functionality

const Taskboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate(); // Initialize navigate for logout

  const tabs = {
    home: {
      title: "Welcome, Event Manager",
      content: "Manage your event operations efficiently using the options in the sidebar.",
      action: "Explore Events"
    },
    local: {
      title: "User Details",
      content: "View and manage all registered users and their event details."
    },
    report: {
      title: "View Report",
      content: "Generate and analyze detailed event attendance reports."
    },
    summary: {
      title: "Main Summary",
      content: "Get an overview of all your event operations at a glance."
    }
  };

  const handleLogout = () => {
    // Add your logout logic here (clear tokens, etc.)
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: 'radial-gradient(circle at 10% 20%, #f5f7fa 0%, #e4e8f0 100%)',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Glassmorphic Sidebar */}
      <motion.div
        initial={{ x: -320 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25 }}
        style={{
          width: '280px',
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          borderRight: '1px solid rgba(255, 255, 255, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10
        }}
      >
        {/* Brand Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
        }}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '20px'
            }}>
              EM
            </div>
            <h1 style={{
              fontSize: '22px',
              fontWeight: '700',
              background: 'linear-gradient(90deg, #6B73FF 0%, #000DFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              EventMaster
            </h1>
          </motion.div>
          <p style={{
            color: '#64748B',
            fontSize: '14px',
            marginTop: '8px',
            marginLeft: '52px'
          }}>Creating Memorable Experiences</p>
        </div>

        {/* Navigation */}
        <nav style={{
          flex: 1,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {[
            { id: 'home', icon: '🏠', label: 'Home' },
            { id: 'local', icon: '👥', label: 'User Details' },
            { id: 'report', icon: '📊', label: 'View Report' },
            { id: 'summary', icon: '📋', label: 'Main Summary' }
          ].map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ 
                scale: 1.02,
                backgroundColor: 'rgba(107, 115, 255, 0.1)'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 16px',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === item.id ? 'rgba(107, 115, 255, 0.15)' : 'transparent',
                color: activeTab === item.id ? '#6B73FF' : '#475569',
                fontWeight: '500',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              {item.label}
              {activeTab === item.id && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  style={{
                    width: '4px',
                    height: '24px',
                    background: 'linear-gradient(to bottom, #6B73FF, #000DFF)',
                    borderRadius: '2px',
                    marginLeft: 'auto'
                  }}
                />
              )}
            </motion.button>
          ))}
        </nav>

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          style={{
            margin: '16px',
            padding: '12px 16px',
            background: 'rgba(255, 99, 71, 0.1)',
            borderRadius: '12px',
            border: 'none',
            color: 'tomato',
            fontWeight: '500',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            transition: 'all 0.2s ease'
          }}
        >
          <span style={{ fontSize: '20px' }}>🚪</span>
          Log Out
        </motion.button>

        {/* Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            margin: '16px',
            padding: '10px',
            background: 'rgba(107, 115, 255, 0.1)',
            borderRadius: '50%',
            border: 'none',
            color: '#6B73FF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-start'
          }}
        >
          <motion.span
            animate={{ rotate: sidebarOpen ? 180 : 0 }}
            style={{ display: 'block', fontSize: '20px' }}
          >
            →
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: '32px',
        overflowY: 'auto', // This enables scrolling
        position: 'relative',
        height: '100vh' // Ensure it takes full viewport height
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(12px)',
              borderRadius: '24px',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '32px',
              minHeight: 'calc(100vh - 64px)', // Adjust height for padding
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Animated Background Elements */}
            <motion.div
              style={{
                position: 'absolute',
                top: '-100px',
                right: '-100px',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(107, 115, 255, 0.15) 0%, rgba(107, 115, 255, 0) 70%)',
                borderRadius: '50%'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              style={{
                position: 'absolute',
                bottom: '-50px',
                left: '-50px',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(255, 171, 0, 0.15) 0%, rgba(255, 171, 0, 0) 70%)',
                borderRadius: '50%'
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />

            {/* Content */}
            <motion.h2
              style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#1E293B',
                marginBottom: '16px',
                background: 'linear-gradient(90deg, #1E293B 0%, #475569 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
              initial={{ x: -10 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {tabs[activeTab].title}
            </motion.h2>

            <motion.p
              style={{
                color: '#64748B',
                fontSize: '18px',
                lineHeight: '1.6',
                maxWidth: '600px',
                marginBottom: '32px'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {tabs[activeTab].content}
            </motion.p>

            {activeTab === 'home' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.h3
                  style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#334155',
                    marginBottom: '16px'
                  }}
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Event Management System
                </motion.h3>
                <motion.p
                  style={{
                    color: '#64748B',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    maxWidth: '600px',
                    marginBottom: '32px'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Easily manage all your events. View, edit, and generate reports for attendees. Track your main summary and make updates effortlessly.
                </motion.p>
                <motion.button
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: '0 10px 25px -5px rgba(107, 115, 255, 0.4)'
                  }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: 'linear-gradient(90deg, #6B73FF 0%, #000DFF 100%)',
                    color: 'white',
                    padding: '16px 32px',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px -1px rgba(107, 115, 255, 0.2), 0 2px 4px -1px rgba(107, 115, 255, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {tabs.home.action}
                </motion.button>

                {/* Event Cards Grid */}
                <motion.div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                    gap: '20px',
                    marginTop: '40px'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {[
                    { title: 'Cultural Events', color: '#FF9E9E' },
                    { title: 'DJ Events', color: '#A5B4FC' },
                    { title: 'Beach Party', color: '#FBCFE8' },
                    { title: 'Other Events', color: '#B9FBC0' }
                  ].map((card, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5 }}
                      style={{
                        background: `linear-gradient(135deg, ${card.color} 0%, ${lightenColor(card.color, 20)} 100%)`,
                        borderRadius: '16px',
                        padding: '20px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        color: '#1E293B'
                      }}
                    >
                      <h4 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        marginBottom: '8px'
                      }}>{card.title}</h4>
                      <p style={{
                        fontSize: '14px',
                        opacity: 0.8,
                        marginBottom: '16px'
                      }}>Manage all your {card.title.toLowerCase()} in one place</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          background: 'rgba(255, 255, 255, 0.3)',
                          border: '1px solid rgba(255, 255, 255, 0.5)',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          backdropFilter: 'blur(4px)'
                        }}
                      >
                        View Events
                      </motion.button>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* User Details Tab Content */}
            {activeTab === 'local' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ minHeight: '500px' }} // Ensure enough space for content
              >
                <Eventm />
              </motion.div>
            )}

            {/* Report Tab Content */}
            {activeTab === 'report' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ minHeight: '500px' }}
              >
                <EventDashboard />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Helper function to lighten colors
function lightenColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  )
    .toString(16)
    .slice(1)}`;
}

export default Taskboard;