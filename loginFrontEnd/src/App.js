import logo from "./logo.svg";
import "./App.css";
import Login from "./conponent/Login";
import PatientHomePage from "./conponent/PatientHomePage";
import OpdBooking from "./conponent/OpdBooking";
import HospitalLogin from "./conponent/hospitalLogin";
import Dashboard from "./conponent/Dashboard";
import HospitalInventoryForm from "./conponent/HospitalInventoryForm";
import AddPatientBed from "./conponent/AddPatientBed";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/hospitalLogin" element={<HospitalLogin/>} />
          <Route path="/patients/home" element={<PatientHomePage/>} />
          <Route path="/patients/opdBooking" element={<OpdBooking/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/inventory" element={<HospitalInventoryForm/>} />
          <Route path="/add-patient" element={<AddPatientBed/>} />
          app.use("/hospital", hospitalRoutes);
        </Routes>
      </Router>
  );
}

export default App;
