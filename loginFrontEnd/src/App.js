import logo from "./logo.svg";
import "./App.css";
import Login from "./conponent/Login";
import PatientHomePage from "./conponent/PatientHomePage";
import OpdBooking from "./conponent/OpdBooking";
import HospitalLogin from "./conponent/hospitalLogin";
import Dashboard from "./conponent/Dashboard";
import HospitalInventoryForm from "./conponent/HospitalInventoryForm";
import PatientHistory from "./conponent/PatientHistory";
import AddDoctor from "./conponent/AddDoctor";
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
          <Route path="/add-doctor" element={<AddDoctor/>} />
          <Route path="/inventory" element={<HospitalInventoryForm/>} />
          <Route path="/patientHistory" element={<PatientHistory/>} />
          app.use("/hospital", hospitalRoutes);
        </Routes>
      </Router>
  );
}

export default App;
