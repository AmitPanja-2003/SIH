const express = require("express");
const router = express.Router();
const Hospital=require('../models/hospital.js')

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


const Inventory = require("../models/inventry");

// POST request to add or update hospital inventory
router.post("/addinventory", async (req, res) => {
    // console.log(req.body)
    const { hospitalID, products } = req.body;

    try {
        const inventory=await Inventory.findOne({})
        const hospital = await Hospital.findOne({ hospitalID });
        console.log(hospital);
        
        if (inventory) {
            inventory.products.push(...products);
            await inventory.save();
            res.status(200).json(inventory);
           // await Hospital.updateOne({hospitalID:hospitalID},{$set:{inventory:products}})
        } else {
            inventory = new Inventory(req.body);
            await inventory.save();
            res.status(201).json(inventory);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET route to fetch inventory by hospital ID
router.get("/:hospitalID", async (req, res) => {
    const { hospitalID } = req.params;

    try {
        const inventory = await Inventory.findOne({ hospitalID });
        if (!inventory) {
            return res.status(404).json({ message: "Hospital not found" });
        }
        res.status(200).json(inventory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Search route for product
router.get("/searchProduct", async (req, res) => {
    const { productName } = req.query;

    try {
        const hospitals = await Inventory.find({
            "products.productName": { $regex: new RegExp(productName, "i") },
        });

        if (!hospitals.length) {
            return res.status(404).json({ message: "No hospitals found with this product" });
        }

        const results = hospitals.flatMap((hospital) =>
            hospital.products
                .filter((product) =>
                    product.productName.toLowerCase().includes(productName.toLowerCase())
                )
                .map((product) => ({
                    hospitalName: hospital.hospitalName,
                    productName: product.productName,
                    productType: product.productType,
                    productQuantity: product.productQuantity,
                    phoneNumber: hospital.phoneNumber,
                }))
        );

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
