import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../CSS/PatientHistory.module.css'; // Import the CSS Module

const PatientHistory = () => {
  const location = useLocation();
  const patient_detail = location.state;

  const [selectedAppointment, setSelectedAppointment] = useState(null); // Track the selected appointment

  const handleAppointmentClick = (index) => {
    setSelectedAppointment(selectedAppointment === index ? null : index); // Toggle between open/close
  };

  return (
    <div className={styles.container}>
      <h1>{patient_detail.patientName}'s Medical History</h1>
      <p>Age: {patient_detail.patientAge}</p>
      <h2>Appointments</h2>
      {patient_detail.patientAppointments
        .filter((appointment) => appointment.visitStatus) // Filter to show only appointments with visitStatus === true
        .map((appointment, index) => (
          <div key={index} className={styles.appointment}>
            <h3 onClick={() => handleAppointmentClick(index)}>
              Appointment {index + 1} {selectedAppointment === index ? '▲' : '▼'}
            </h3>

            {selectedAppointment === index && (
              <div className={styles.appointmentDetailsRow}>
                <div className={styles.detailsColumn}>
                  <p><strong>Hospital Name:</strong> {appointment.hospitalName}</p>
                  <p><strong>Appointment_Id:</strong> {appointment.appointmentId}</p>
                  <p><strong>Department:</strong> {appointment.department}</p>
                  <p><strong>Date:</strong> {appointment.date}</p>
                  <p><strong>Time:</strong> {appointment.time}</p>
                </div>
                <div className={styles.detailsColumn}>
                  <p><strong>Description:</strong></p>
                  <div className={styles.description}>
                    {appointment.description}
                  </div>
                </div>
                <div className={styles.detailsColumn}>
                  <p><strong>Medication:</strong></p>
                  <div className={styles.medication}>
                    {appointment.medication && appointment.medication.length > 0 ? (
                      <ul>
                        {appointment.medication.map((med, medIndex) => (
                          <li  key={medIndex}>
                            <strong>Medicine:</strong> {med.medicine} | <strong>Quantity:</strong> {med.quantity}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No medication prescribed.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default PatientHistory;