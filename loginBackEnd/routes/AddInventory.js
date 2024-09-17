const express = require('express');
const mongoose = require('mongoose');
const Hospital=require('../models/hospital')
const router = express.Router();
router.post("/inventory", async (req, res) => {
    console.log(req.body)
    const { hospitalID, products } = req.body;

    try {
        console.log("hospitalId",hospitalID);
        let hospital = await Hospital.findOne({ hospitalID:hospitalID });
        console.log(hospital);
        console.log("products",products);
        console.log("after delete the price schema ")
        let obj = {};
        obj.name = products.productName;
        obj.type = products.productType;
        obj.quantity = products.productQuantity;
        obj.inDate = new Date(Date.now()).toLocaleDateString();     
        obj.expiredDate = products.expiryDate;
          
        console.log("obj = ",obj);
        const updatedHospital = await Hospital.findOneAndUpdate(
            { hospitalID }, // Query to find the hospital
            { $push: { inventory: obj } }, // Update operation to push products to inventory
            { new: true, useFindAndModify: false } // Options: return the updated document, avoid deprecation warning
        );

        if (!updatedHospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }

        // Send the updated hospital data as response
        res.status(200).json(updatedHospital);
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;