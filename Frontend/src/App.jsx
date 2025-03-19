import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Welcome from './Pages/Welcome'; // Import the Welcome page
import Home from './Pages/Home';
import Footer from './Components/Footer';
import Packages from './Pages/Packages';
import Weather from './Pages/Weather';
import Event from './Pages/Event';
import Calender from './Pages/Calender';
import Cultural from './Pages/Cultural';
import Currency from './Pages/Currency';
import Beach from './Pages/Beach';
import Safari from './Pages/Safari';


const App = () => {
  return (
    <div>
      <Navbar /> {/* Include the Navbar here */}
      <Routes>
        <Route path="/" element={<Welcome />} /> {/* Welcome page as the home route */}
        <Route path="/home" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/event" element={<Event />} /> {/* Fixed: Added missing Event route */}
        <Route path="/calender" element={<Calender />} />
        <Route path="/cultural" element={<Cultural />} />
        <Route path="/currency" element={<Currency />} />
        <Route path="/beach" element={<Beach />} />
        <Route path="/safari" element={<Safari />} />
      
      </Routes>
      <Footer /> {/* Include the Footer here */}
    </div>
  );
};

export default App;
