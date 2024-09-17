const express = require('express');
const router = express.Router();
const TimeSlot = require('../models/TimeSlot');  // Adjust the path based on your project structure
const Patient = require("../models/Patient");
const Hospital = require("../models/hospital");
// Route to get time slots based on department and hospital
router.get("/timeslots", async (req, res) => {
  const { department, hospital } = req.query;

  if (!hospital || !department) {
    return res.status(400).json({ message: "Hospital and department are required." });
  }

  try {
    const slots = await TimeSlot.find({ department, hospital });
    res.json(slots);
  } catch (error) {
    console.error('Error fetching time slots:', error);
    res.status(500).json({ message: "Error fetching time slots." });
  }
});

// Route to book a time slot for a specific department in a hospital
router.post('/book', async (req, res) => {
  const { slot, department, hospital , patient_detail } = req.body;
 let hospitalId = Hospital.findOne({hospitalName:hospital}).hospitalId;
  let patient = await Patient.findOne({patientId:patient_detail.patientId});
  let obj = {};
  obj.hospitalId = hospitalId;
  obj.hospitalName = hospital;
  obj.appointmentId = "123";
  obj.time=slot;
  obj.visitStatus = false;
  obj.department=department;
  obj.description = "";
  obj.medication = "";
  obj.date = new Date(Date.now()).toLocaleDateString();
//Checking for booking for same department
  let appoinment = patient.patientAppointments.find(appoinment=>{
    if(appoinment.department == department && appoinment.date == obj.date)
        return appoinment;
  })
  let timeconflict = patient.patientAppointments.find(appoinment=>{
    if(appoinment.department != department && appoinment.time == obj.time)
        return appoinment;
  })

  // console.log("appoinment = ",appoinment);
  // console.log(department);
if (!slot || !department || !hospital) {
    return res.status(400).json({ message: "Slot, department, and hospital are required." });
  }

  try {
    // Check if the slot already exists for the given department and hospital
    if(!appoinment && !timeconflict)
    {
    let timeSlot = await TimeSlot.findOne({ slot, department, hospital });

    if (!timeSlot) {
      // If no slot exists, create one
      timeSlot = new TimeSlot({ slot, department, hospital, isBooked: false });
    }

    if (timeSlot.isBooked) {
      return res.status(400).json({ success: false, message: "Slot is already booked for this department and hospital." });
    }

    // Mark the slot as booked
    timeSlot.isBooked = true;
    timeSlot.patientId=patient_detail.patientId;
    await timeSlot.save();
    let x = await Patient.updateOne({patientId:patient_detail.patientId},{$push:{patientAppointments:obj}})
    // console.log(x);
    res.json({ success: true, message: "Slot booked successfully!" });
}
else{
    res.json({ success: false, message: "appoinment Already exist"});
}
  } catch (error) {
    console.error('Error during booking:', error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

module.exports = router;
