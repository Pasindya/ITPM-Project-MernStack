import React from 'react';

import TransportNav from './transportNav';
import axios from "axios";


const URL ="http://localhost:5000/htransports"

const fetchHandler = async () =>{
  return await axios.get(URL).then((res) => res.data);
}


function VehicleBooking() {
  







  return (

    <div>
        <TransportNav/>
        <h1>Vehicle Details Display page</h1>
    </div>
  )
}

export default VehicleBooking