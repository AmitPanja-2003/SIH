const express = require('express');
const mongoose = require('mongoose');
const Hospital = require('../models/hospital')
const router = express.Router();
router.get('/all', async (req, res) => {
    try {
      const hospitals = await Hospital.find({ hospitalID: 1001 }, 'doctorDetails');
    //   console.log(hospitals);
      const doctors = hospitals.flatMap(hospital => hospital.doctorDetails);
    //   console.log(doctors);
      res.json(doctors);
    } catch (err) {
      res.status(500).send('Error retrieving all doctor details');
    }
  });
  
  router.get('/search', async (req, res) => {
    const { searchTerm, isId } = req.query;
  
    if (!searchTerm) {
      return res.status(400).send('Search term is required');
    }
  
    try {
      let query = {};
  
      if (isId === 'true') {
        query = { 'doctorDetails.doctorID': Number(searchTerm) };
      } else {
        query = { 'doctorDetails.doctorName': new RegExp(searchTerm, 'i') };
      }
  
      const hospitals = await Hospital.find({ hospitalID: 1001 }, 'doctorDetails');
      console.log(hospitals);
  
      const doctors = hospitals.flatMap(hospital => hospital.doctorDetails.filter(doctor =>
        isId === 'true' ? doctor.doctorID === Number(searchTerm) : doctor.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
      ));
  
      res.json(doctors);
    } catch (err) {
      res.status(500).send('Error retrieving doctor details');
    }
  });
  router.put('/:doctorID', async (req, res) => {
    const { doctorID } = req.params;
    // console.log(req.params);
    
    const updatedData = req.body; // The updated doctor data sent from the frontend
    // console.log(req.body);
    
    try {
      // Find the hospital and update the specific doctor within the 'doctorDetails' array
      const updatedHospital = await Hospital.findOneAndUpdate(
        { 'doctorDetails.doctorID': doctorID, hospitalID: 1001 }, // Query for the doctor by doctorID and hospitalID
        { $set: { 'doctorDetails.$': updatedData } },  // $ refers to the matching array element
        { new: true } // Return the updated document
      );
  
      if (!updatedHospital) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
  
      res.status(200).json({ message: 'Doctor details updated successfully', doctor: updatedData });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating doctor details');
    }
  });


module.exports=router;