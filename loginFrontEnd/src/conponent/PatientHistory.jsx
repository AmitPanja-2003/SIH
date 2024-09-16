import React from 'react'
import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../CSS/PatientHistory.css'
const PatientHistory = () => {

    const location = useLocation();
    const patient_detail = location.state;
    // console.log(patient_detail);

 
    const [selectedAppointment, setSelectedAppointment] = useState(null); // Track the selected appointment
  // // Function to handle the click on an appointment
    const handleAppointmentClick = (index) => {
      setSelectedAppointment(selectedAppointment === index ? null : index); // Toggle between open/close
    };
  
  
return (
    <div className="container">
      <h1>{patient_detail.patientName}'s Medical History</h1>
      <p>Age: {patient_detail.patientAge}</p>
      <h2>Appointments</h2>
      {patient_detail.patientAppointments
        .filter(appointment => appointment.visitStatus) // Filter to show only appointments with visitStatus === true
        .map((appointment, index) => (
          <div key={index} className="appointment">
            <h3 onClick={() => handleAppointmentClick(index)}>
              Appointment {index + 1} {selectedAppointment === index ? '▲' : '▼'}
            </h3>
            
            {selectedAppointment === index && ( // Conditionally render details when appointment is clicked
              <div className="appointment-details">
                <p><strong>Hospital Name:</strong> {appointment.hospitalName}</p>
                <p><strong>Appointment_Id:</strong> {appointment.appointmentId}</p>
                <p><strong>Department:</strong> {appointment.department}</p>
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p><strong>Description:</strong> {appointment.description}</p>
                <p><strong>Medication:</strong> {appointment.medication}</p>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default PatientHistory;

