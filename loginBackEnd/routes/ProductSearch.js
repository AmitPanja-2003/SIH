
const express = require('express');
const mongoose = require('mongoose');
const Hospital = require('../models/hospital')
const router = express.Router();
const cors = require("cors")
router.use(cors());

router.get("/searchProduct", async (req, res) => {
    const { productName } = req.query;
    // const { productName } = req.query;
    // console.log('Received productName:', productName);

    try {
        let hospitals;

        if (!productName) {
            hospitals = await Hospital.find(); // Fetch all hospitals with their inventories
        } else {
            hospitals = await Hospital.find({
                "inventory.name": { $regex: new RegExp(productName, "i") }
            });
        }

        if (!hospitals.length) {
            return res.status(404).json({ message: "No hospitals found with this product" });
        }
       
        const results = hospitals.flatMap(hospital => {
           
            return hospital.inventory
                .filter(product => {
                    // Convert both product name and search term to lowercase for case-insensitive search
                    let x =  (productName === '' || product.name.toLowerCase().includes(productName.toLowerCase())); 
                    return x;
                })
                .map(product => {
                    return {
                        hospitalName: hospital.hospitalName,
                        productName: product.name,
                        productType: product.type,
                        productQuantity: product.quantity,
                        hospitalContact: hospital.hospitalContact
                    };
                });
        });

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: "erro in map" });
    }
});

module.exports=router;