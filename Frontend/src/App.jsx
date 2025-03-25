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
import Eventbooking from './Event/Eventbooking';
import Eventm from './Event/Eventm';
import AddEvent from './Event/AddEvent';
import Add from './Event/Add';
import UpdateEvent from './Event/UpdateEvent';
import Calender from './Pages/Calender';
import Guider from './Pages/Guider';
import AllGuiders from './Pages/AllGuiders';
import Transport from './Pages/Transport';
import VehicleCategory from './Pages/VehicleCategory';
import TransportNav from './Pages/TransportNav';
import DashNav from './Pages/DashNav';
import Cultural from './Pages/Cultural';
import Currency from './Pages/Currency';
import Beach from './Pages/Beach';
import Safari from './Pages/Safari';
import Hill from './Pages/Hill';
import Adminpkg from './Pages/Adminpkg';
import Packnav from './Packbooking/Packnav';

import Packdetails from './Pages/Packdetails';
import Updatepbook from './Pages/Updatepbook';

const App = () => {
  const location = useLocation(); // Get the current location

  // Define routes where Navbar and Footer should be hidden
  const hideNavbarFooterRoutes = ['/dashboard', '/adminpkg', '/dashNav','/packnav','/viewbooking','/packdetails','/updatepbook/PBK_12837','/updatepbook/PBK_48926','/updatepbook/PBK_54806'];

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
        <Route path="/book-event" element={<Eventbooking />} />
        <Route path="/eventm" element={<Eventm />} />
        <Route path="/addevent" element={<AddEvent />} />
        <Route path="/add" element={<Add />} />
        <Route path="/updateevent/:id" element={<UpdateEvent />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/guider" element={<Guider />} />
        <Route path="/allGuiders" element={<AllGuiders />} />
     
        <Route path="/dashNav" element={<DashNav />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/vehicles/:category" element={<VehicleCategory />} />
        <Route path="/transportnav" element={<TransportNav />} />
        <Route path="/cultural" element={<Cultural />} />
        <Route path="/currency" element={<Currency />} />
        <Route path="/beach" element={<Beach />} />
        <Route path="/safari" element={<Safari />} />
        <Route path="/hill" element={<Hill />} />
        <Route path="/adminpkg" element={<Adminpkg />} />
        <Route path="/Packnav" element={<Packnav />} />
        <Route path="/packdetails" element={<Packdetails />} />
        
        <Route path="/updatepbook/:id" element={<Updatepbook />} />

      </Routes>

      {/* Conditionally render Footer */}
      {!shouldHideNavbarFooter && <Footer />}
    </div>
  );
};

export default App;
