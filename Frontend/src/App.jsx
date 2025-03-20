import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Welcome from './Pages/Welcome';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Packages from './Pages/Packages';
import Weather from './Pages/Weather';
import Event from './Pages/Event';
import Calender from './Pages/Calender';
import Cultural from './Pages/Cultural';
import Currency from './Pages/Currency';
import Beach from './Pages/Beach';
import Safari from './Pages/Safari';
import Hill from './Pages/Hill';
import Adminpkg from './Pages/Adminpkg';
import Packlogin from './Pages/Packlogin';

const App = () => {
  const location = useLocation(); // Get the current location

  // Define routes where Navbar and Footer should be hidden
  const hideNavbarFooterRoutes = ['/dashboard', '/adminpkg','/packlogin'];

  // Check if the current route is in the hideNavbarFooterRoutes array
  const shouldHideNavbarFooter = hideNavbarFooterRoutes.includes(location.pathname);

  return (
    <div>
      {/* Conditionally render Navbar */}
      {!shouldHideNavbarFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/event" element={<Event />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/cultural" element={<Cultural />} />
        <Route path="/currency" element={<Currency />} />
        <Route path="/beach" element={<Beach />} />
        <Route path="/safari" element={<Safari />} />
        <Route path="/hill" element={<Hill />} />
        <Route path="/adminpkg" element={<Adminpkg />} />
        <Route path="/packlogin" element={<Packlogin />} />
        
        
      </Routes>

      {/* Conditionally render Footer */}
      {!shouldHideNavbarFooter && <Footer />}
    </div>
  );
};

export default App;