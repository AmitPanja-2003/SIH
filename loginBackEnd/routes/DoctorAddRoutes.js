const express = require('express');
const mongoose = require('mongoose');
const Hospital = require('../models/hospital'); // Updated path to match your file structure
const router = express.Router();

// Generate 8-digit unique doctor_id
const generateDoctorId = () => {
  return Math.floor(10000000 + Math.random() * 90000000);
};

// POST route to add a new doctor to a hospital's doctorDetails array
router.post('/add', async (req, res) => {
  const { doctorName, department, phoneNumber, emailID, password, onDuty } = req.body;
console.log(req.body);

const hospitalID=req.body.hospitalID;

  const doctorId = generateDoctorId();

  const newDoctor = {
    doctorID:doctorId,
    doctorName:req.body.doctor.doctorName,
    department:req.body.doctor.department,
    password:req.body.doctor.password,
    phoneNumber:req.body.doctor.phoneNumber,
    emailID:req.body.doctor.emailID,
    onDuty:req.body.doctor.onDuty,
  };

  try {
    // Find the hospital with hospitalID 1001 and push the new doctor into doctorDetails
    const updatedHospital = await Hospital.findOneAndUpdate(
      { hospitalID: hospitalID }, // Find the hospital by hospitalID 1001
      { $push: { doctorDetails: newDoctor } }, // Push newDoctor into doctorDetails array
      { new: true } // Return the updated document
    );

    if (updatedHospital) {
      const x = await Hospital.findOne({hospitalID:hospitalID})
    //   console.log(x);
      res.status(201).json({ message: 'Doctor added successfully', doctorID: doctorId });
    } else {
      res.status(404).json({ message: 'Hospital with the given ID not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error adding doctor', error });
  }
});

module.exports = router;