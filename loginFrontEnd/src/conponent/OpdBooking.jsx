
import React from "react";
import TimeSlot from "./TimeSlot";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function OpdBooking() {

    const location = useLocation();
    const patient_detail = location.state;
    console.log("OPD booking patient detail",patient_detail);
    return (
      <div className="App">
       <div className="head-section">
       <h1>Patient OPD Booking</h1>
       </div>
       <div className="body-section">
       <TimeSlot patient_detail={patient_detail}/>
       </div>
      </div>
    );
  }
  
  export default OpdBooking;