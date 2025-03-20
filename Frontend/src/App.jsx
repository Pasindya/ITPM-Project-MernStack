import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Welcome from './Pages/Welcome'; // Import the Welcome page
import Home from './Pages/Home';
import Footer from './Components/Footer';
import Packages from './Pages/Packages';
import Weather from './Pages/Weather';
import Calender from './Pages/Calender';
import Transport from './Pages/Transport';
import Driver from './Pages/driver';




const App = () => {
  return (
    <div>
      <Navbar /> {/* Include the Navbar here */}
      <Routes>
        <Route path="/" element={<Welcome />} /> {/* Welcome page as the home route */}
        <Route path="/home" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/driver" element={<Driver />} />

        
        
      
      </Routes>
      <Footer /> {/* Include the Footer here */}
    </div>
  );
};

export default App;