import React from 'react';
import TransportNav from './transportNav';

const URL ="http://localhost:5000/htransports"

function VehicleBooking() {
  return (

    <div>
        <TransportNav/>
        <h1>Vehicle Details Display page</h1>
    </div>
  )
}

export default VehicleBooking