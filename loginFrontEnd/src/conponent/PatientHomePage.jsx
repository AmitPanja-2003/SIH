import React from 'react';
import { Link } from 'react-router-dom';
import '../style/style.css'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PatientHomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const patient_detail = location.state.patient_detail;
  console.log("home patient detail",patient_detail);

  return (
    <div className="home-container">
      <h1>Home Page</h1>

      <nav className="navbar">
        <h1 className="logo">Hospital Management</h1>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/patient/profile">Profile</Link></li>
          <li><Link to="/patient/appointments">Appointments</Link></li>
          <li><Link to="/patient/contact">Contact Us</Link></li>
        </ul>
      </nav>

      {/* Card Section */}
      <div className="card-container">
        <div className="card" onClick={() =>{navigate('/patients/opdBooking',{state:patient_detail})  }}>
          <h3>Book OPD</h3>
          <p>Schedule your next outpatient appointment.</p>
        </div>
        <div className="card" onClick={() => {navigate('/patientHistory',{state:patient_detail}) }}>
          <h3>Patient History</h3>
          <p>View your medical history and records.</p>
        </div>
        <div className="card" onClick={() => alert('Emergency clicked!')}>
          <h3>Emergency</h3>
          <p>Contact emergency services or get immediate help.</p>
        </div>
      </div>
    </div>
  );
};

export default PatientHomePage;