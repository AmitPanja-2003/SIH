// Inventory Schema
const mongoose = require('mongoose');
const inventorySchema = new mongoose.Schema({
    hospitalName: { type: String, required: true },
    hospitalID: { type: Number, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    products: [
        {
            productType: { type: String, required: true },
            productName: { type: String, required: true },
            productQuantity: { type: Number, required: true },
            price: { type: Number, required: true },
            expiryDate: { type: Date, required: true },
        },
    ],
});

const Inventory = mongoose.model("HospotalInventory", inventorySchema);
module.exports = Inventory;


