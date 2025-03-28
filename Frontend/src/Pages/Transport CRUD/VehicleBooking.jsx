import React, { useEffect, useState } from 'react';
import TransportNav from '../transportNav';
import axios from "axios";
import Booking from '../Transport CRUD/Booking'

const URL ="http://localhost:5000/htransports"

const fetchHandler = async () =>{
  return await axios.get(URL).then((res) => res.data);
}


function VehicleBooking() {

  const[htransports,setBookings] = useState();
  useEffect(()=> {
    fetchHandler().then((data) => setBookings(data.htransports));
  },[])


   // Styles
   const pageStyle = {
    fontFamily: "'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif",
    backgroundColor: '#f8f9fa',
    minHeight: '100vh'
  };

  const headerStyle = {
    textAlign: 'center',
    margin: '30px 0',
    padding: '20px 0',
    position: 'relative'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '15px',
    position: 'relative',
    display: 'inline-block',
    paddingBottom: '10px'
  };

  const titleUnderline = {
    content: '""',
    position: 'absolute',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '4px',
    backgroundColor: '#3498db',
    borderRadius: '2px'
  };

  const subtitleStyle = {
    fontSize: '1.1rem',
    color: '#7f8c8d',
    marginTop: '10px'
  };



  return (


    <div>
        <TransportNav/>
        <div style={headerStyle}>
        <h1 style={titleStyle}>
          Vehicle Booking Details
          <span style={titleUnderline}></span>
        </h1>
        <p style={subtitleStyle}>View and manage all vehicle bookings</p>
      </div>
          {htransports && htransports.map((booking,i) =>(
            <div key={i}>
              <Booking booking={booking}/>

            </div>
          ))}
        </div>
    
  )
}

export default VehicleBooking