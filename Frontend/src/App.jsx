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


//Transport Function 
import Transport from './Pages/Transport';
import VehicleCategory from './Pages/VehicleCategory';
import TransportNav from './Pages/transportNav';
import Vehicleadmin from './Pages/Vehicleadmin';
import VehicleBooking from './Pages/Transport CRUD/VehicleBooking';
import Booking from './Pages/Transport CRUD/Booking';
import UpdateVehicle from './Pages/Transport CRUD/UpdateVehicle';
import TransportSummary from './Pages/Transport CRUD/TransportSummary';






import DashNav from './Pages/DashNav';




import Cultural from './Pages/Cultural';
import Currency from './Pages/Currency';
import Beach from './Pages/Beach';
import Safari from './Pages/Safari';
import Hill from './Pages/Hill';
import Adminpkg from './Pages/Adminpkg';


import Packagenav from './Pages/Packagenav';






const App = () => {
  const location = useLocation(); // Get the current location

  // Define routes where Navbar and Footer should be hidden
  const hideNavbarFooterRoutes = ['/dashboard', '/adminpkg','/dashNav','/TransportNav','/vehicleadmin','/vehiclebooking','/addbooking','/updatevehicle','/transportsummary'];

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
    
        <Route path="/packagenav" element={<Packagenav />} />
        <Route path="/dashNav" element={<DashNav />} />
       
        
        {/*Transport */}
        <Route path="/transport" element={<Transport />} />
        <Route path="/vehicles/:category" element={<VehicleCategory />} />
        <Route path="/transportnav" element={<TransportNav />} />
        <Route path="/vehicleadmin" element={<Vehicleadmin />} />
        <Route path="/vehiclebooking" element={<VehicleBooking />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/vehiclebooking/:id" element={<UpdateVehicle />} />
        <Route path="/updatevehicle" element={<UpdateVehicle />} />
        <Route path="/transportsummary" element={<TransportSummary />} />
       
       





        
        
      

        <Route path="/cultural" element={<Cultural />} />
        <Route path="/currency" element={<Currency />} />
        <Route path="/beach" element={<Beach />} />
        <Route path="/safari" element={<Safari />} />
        <Route path="/hill" element={<Hill />} />
        <Route path="/adminpkg" element={<Adminpkg />} />
        
        

      </Routes>

      {/* Conditionally render Footer */}
      {!shouldHideNavbarFooter && <Footer />}
    </div>

  );
};

export default App;