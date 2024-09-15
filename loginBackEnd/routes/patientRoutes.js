const express = require('express');
const Patient = require('../models/Patient');
const bcrypt = require('bcrypt');
const router = express.Router();


// POST route to handle login
router.post('/login', async (req, res) => {
  let { phoneNo, password } = req.body;

  try {
    // Find patient by phone number
    let patient = await Patient.findOne({phoneNo:req.body.phoneNo});
    console.log(patient);
    console.log(patient.patientId);
    
    if (!patient) {
        console.log("hii");
        
      return res.status(400).json({ message: 'Invalid mobile number or password' });
    }
    console.log("Hello");
    // Check if the password matches
    // const isMatch = await bcrypt.compare(password, patient.password);
    console.log(password, patient.patient_password);
    let isMatch = (patient.patient_password == password);
    console.log(isMatch);
    if (!isMatch) {
    console.log("isMatch");
      return res.status(400).json({ message: 'Invalid mobile number or password' });
    }

    // If login is successful
    res.json(patient)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
