
import Login from "./component/Login";
import PatientHomePage from "./component/PatientHomePage";
import OpdBooking from "./component/OpdBooking";
import HospitalLogin from "./component/hospitalLogin";
import Dashboard from "./component/Dashboard";
import HospitalInventoryForm from "./component/HospitalInventoryForm";
import PatientHistory from "./component/PatientHistory";
import AddDoctor from "./component/AddDoctor";
import PatientSignup from "./component/PatientSignup";
import DoctorLogin from "./component/DoctorLogin";
import DoctorDashboard from "./component/DoctorDashboard";
import DoctorSearch from "./component/DoctorSearch";
import ProductSearch from "./component/ProductSearch";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/signup' element={<PatientSignup/>}/>
          <Route path="/hospitalLogin" element={<HospitalLogin/>} />
          <Route path="/patients/home" element={<PatientHomePage/>} />
          <Route path="/patients/opdBooking" element={<OpdBooking/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/add-doctor" element={<AddDoctor/>} />
          <Route path="/inventory" element={<HospitalInventoryForm/>} />
          <Route path="/patientHistory" element={<PatientHistory/>} />
          <Route path="/patient-checkup" element={<DoctorLogin/>}/>
          <Route path="/doctor-dashboard" element={<DoctorDashboard/>}/>
          <Route path="/check-doctor-details" element={<DoctorSearch/>}/>
          <Route path="/track-medicine" element={<ProductSearch/>}/>

        </Routes>
      </Router>
  );
}

export default App;
