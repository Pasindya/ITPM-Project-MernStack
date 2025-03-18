import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Welcome from './Pages/Welcome'; // Import the Welcome page
import Home from './Pages/Home';
import Footer from './Components/Footer';
import Packages from './Pages/Packages';
import Weather from './Pages/Weather';

const App = () => {
  return (
    <div>
      <Navbar /> {/* Include the Navbar here */}
      <Routes>
        <Route path="/" element={<Welcome />} /> {/* Welcome page as the home route */}
        <Route path="/home" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/weather" element={<Weather />} />
      
      </Routes>
      <Footer /> {/* Include the Footer here */}
    </div>
  );
};

export default App;