// Inventory Schema
const mongoose = require('mongoose');
const inventorySchema = new mongoose.Schema({
    hospitalName: { type: String, required: true },
    hospitalID: { type: Number, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    products: [
        {
            
            type: { type: String, required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            inDate: { type: String,default: new Date(Date.now()).toLocaleDateString('en-GB')},
            price: { type: Number, required: true },
            expiredDate: { type: Date, required: true },
        },
    ],
});

const Inventory = mongoose.model("HospotalInventory", inventorySchema);
module.exports = Inventory;


