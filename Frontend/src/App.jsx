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
import Taskboard from './Event/Taskboard';
import EventCharts from './Event/EventCharts'; // Import the EventCharts component
import Calender from './Pages/Calender';

import Map from './Pages/Map';

import EmergencyService from './Pages/EmergencyService';








//Transport Function 
import Transport from './Pages/Transport';
import VehicleCategory from './Pages/VehicleCategory';
import TransportNav from './Pages/TransportNav';
import Vehicleadmin from './Pages/Vehicleadmin';
import VehicleBooking from './Pages/Transport CRUD/VehicleBooking';
import Booking from './Pages/Transport CRUD/Booking';
import UpdateVehicle from './Pages/Transport CRUD/UpdateVehicle';
import TransportSummary from './Pages/Transport CRUD/TransportSummary';
import TransportHome from './Pages/TransportHome';
import TransportDetails from './Pages/Transport CRUD/TransportDetails';
import BookingConfirmation from './Pages/Transport CRUD/BookingConfirmation';









// import Guider from './Pages/Guider';
// import AllGuiders from './Pages/AllGuiders';




import DashNav from './Pages/DashNav';
import Cultural from './Pages/Cultural';
import Currency from './Pages/Currency';
import Beach from './Pages/Beach';
import Safari from './Pages/Safari';
import Hill from './Pages/Hill';
import Adminpkg from './Pages/Adminpkg';
import Packnav from './Packbooking/Packnav';
import Packreport from './Pages/Packreport';
import Packdetails from './Pages/Packdetails';
import Updatepbook from './Pages/Updatepbook';
import Packsummary from './Pages/Packsummary';
import Ayur from './Pages/Ayur';
import Adwenture from './Pages/Adwenture';


import Hotels from './Hotel/Hotels';
import Hoteladmin from './Hotel/Hoteladmin';
import Hotelnav from './Hotel/Hotelnav';
import Hbooking from './Hotel/Hbooking';
import Hoteldetails from './Hotel/Hoteldetails';
import Updatehbook from './Hotel/Updatehbook';
import Viewhotel from './Hotel/Viewhotel';
import Hotelhome from './Hotel/Hotelhome';
import Hotelsummary from './Hotel/Hotelsummary';

import AddGuider from './Guider/AddGuider';
import ManageGuiders from './Guider/ManageGuiders';
import GuiderList from './Guider/GuiderList';
// import Guidernav from './Guider/Guidernav';
import GuiderDashboard from './Guider/GuiderDashboard';
import Guidertak from './Guider/Guidertak';



import Packrecipt from './Pages/Packrecipt';
import ContactUs from './Pages/ContactUs';







const App = () => {
  const location = useLocation(); // Get the current location

  // Define routes where Navbar and Footer should be hidden

  const hideNavbarFooterRoutes = ['/dashboard', '/adminpkg', '/dashNav','/packnav','/viewbooking','/packdetails','/updatepbook/PBK_12837','/updatepbook/PBK_48926','/updatepbook/PBK_54806','/packreport','/packsummary','/hoteladmin','/hotelnav','/hoteldetails','/TransportNav','/vehicleadmin','/vehiclebooking','/addbooking','/updatevehicle','/transportsummary','/hoteldetails','/viewhotel'
    ,'/hotelsummary','/taskboard','/transportdetails','/guiderdashboard','/adds','/all','/guidertak'
  ];



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
        <Route path="/taskboard" element={<Taskboard />} />
        <Route path="/eventcharts" element={<EventCharts />} /> {/* Add the EventCharts route */}
        <Route path="/calender" element={<Calender />} />
        {/* <Route path="/guider" element={<Guider />} />
        <Route path="/allGuiders" element={<AllGuiders />} />
      */}
        <Route path="/dashNav" element={<DashNav />} />
        <Route path="/emergency" element={<EmergencyService />} />
       
        

       
        
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
        <Route path="/transporthome" element={<TransportHome />} />
        <Route path="/transportdetails" element={<TransportDetails />} />
        <Route path="/bookingconfirmation" element={<BookingConfirmation />} />
        
        
       
       
      
        


        <Route path="/cultural" element={<Cultural />} />
        <Route path="/currency" element={<Currency />} />
        <Route path="/beach" element={<Beach />} />
        <Route path="/safari" element={<Safari />} />
        <Route path="/hill" element={<Hill />} />
        <Route path="/adminpkg" element={<Adminpkg />} />
        <Route path="/Packnav" element={<Packnav />} />
        <Route path="/packdetails" element={<Packdetails />} />
        <Route path="/packreport" element={<Packreport />} />
        <Route path="/packsummary" element={<Packsummary />} />
        <Route path="/ayur" element={<Ayur />} />
        <Route path="/adwenture" element={<Adwenture />} />
        <Route path="/map" element={<Map />} />
    
        
        <Route path="/updatepbook/:id" element={<Updatepbook />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hoteladmin" element={<Hoteladmin />} />
        <Route path="/hotelnav" element={<Hotelnav />} />
        <Route path="/hbooking" element={<Hbooking />} />
        <Route path="/hoteldetails" element={<Hoteldetails />} />
        <Route path="/updatehbook/:id" element={<Updatehbook />} />
        <Route path="/viewhotel" element={<Viewhotel />} />
        <Route path="/hotelhome" element={<Hotelhome />} />
        <Route path="/hotelsummary" element={<Hotelsummary />} />

        <Route path='/glist' element={<GuiderList />} />
        <Route path='/adds' element={<AddGuider />} />
        <Route path='/all' element={<ManageGuiders />} />
        <Route path='/list' element={<GuiderList />} />
        {/* <Route path='/list' element={<GuiderList />} /> */}

        <Route path="/guiderdashboard" element={<GuiderDashboard />} />
        <Route path="/packrecipt" element={<Packrecipt />} />

        <Route path="/guidertak" element={<Guidertak />} />

        <Route path="/contactUs" element={<ContactUs />} />




      </Routes>

      {/* Conditionally render Footer */}
      {!shouldHideNavbarFooter && <Footer />}
    </div>
  );
};

export default App;
