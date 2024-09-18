const express = require('express');
const Patient = require('../models/Patient');
const router = express.Router();

// POST route to handle signup
router.post('/signup', async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json({ message: 'Patient created successfully!', patient: newPatient });
  } catch (error) {
    res.status(400).json({ message: 'Error creating patient', error });
  }
});

module.exports = router;