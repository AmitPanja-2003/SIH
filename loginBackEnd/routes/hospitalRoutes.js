const express = require("express");
const router = express.Router();
const Hospital = require("../models/hospital"); // Import the Hospital model

// POST route for hospital login
router.post("/hospitalLogin", async (req, res) => {
    const { hospitalID, password } = req.body;

    try {
        const hospital = await Hospital.findOne({ hospitalID });

        if (!hospital) {
            return res.status(404).json({ success: false, message: "Hospital not found" });
        }

        if (hospital.hospitalPassword === password) {
            return res.status(200).json({ success: true, hospitalName: hospital.hospitalName });
        } else {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Error logging in" });
    }
});

module.exports = router;
