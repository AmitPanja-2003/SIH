const express = require('express');
const mongoose = require('mongoose');
const Hospital = require('../models/hospital')
const router = express.Router();

router.post("/doctorLogin", async (req, res) => {
    const { doctorID, password } = req.body;
    // console.log(req.body);

    try {
        // Check if doctor exists with given ID
        const hospital = await Hospital.findOne({
            doctorDetails: {
                $elemMatch: { doctorID: doctorID, password: password }
            }
        });
        console.log(hospital);
        // Extract the doctor details from the hospital document
        const doctor = hospital ? hospital.doctorDetails.find(
            (doc) => doc.doctorID.toString() === doctorID.toString()
        ) : null;
        // console.log(doctor);
        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        // Verify password
        const isPasswordValid = (password === doctor.password);
        // console.log(password);
        // console.log(doctor.password);
        // console.log(isPasswordValid);
        if (!isPasswordValid) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Login successful, send doctor's name and hospital details
        res.json({
            success: true,
            doctorName: doctor.doctorName,
            hospitalName: hospital.hospitalName, // Modify this as per your hospital details
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports=router;