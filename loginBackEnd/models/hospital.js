const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const url = "mongodb+srv://amit:amit123@cluster0.w8nn4gk.mongodb.net/company_database?retryWrites=true&w=majority&appName=Cluster0";mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error("Error connecting to MongoDB Atlas:", error));



// Mongoose Schema for hospitals
const hospitalSchema = new mongoose.Schema({
    hospitalContact: { type: Number, required: true },
    hospitalID: { type: Number, required: true, unique: true },
    hospitalPassword: { type: String, required: true },
    hospitalName: { type: String, required: true },
    totalBeds: {
        totalEmergencyBed: { type: Number, required: true },
        totalGeneralBed: { type: Number, required: true },
        totalMothersBed: { type: Number, required: true },
        totalPediatrics: { type: Number, required: true },
        totalSurgery: { type: Number, required: true },
        totalOrthopaedics: { type: Number, required: true },
        totalICU: { type: Number, required: true },
        all: { type: Number, required: true },
    },
    inventory: [
        {
            type: { type: String, required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            inDate: { type: String, required: true ,default:new Date(Date.now()).toLocaleDateString()},
            expiredDate: { type: String, required: true },
        },
    ],
    bedPatientDetails: [
        {
            patientID: { type: Number, required: true },
            patientName: { type: String, required: true },
            presentInDate: { type: Date, required: true },
            patientAge: { type: Number, required: true },
            patientDetails: { type: String, required: true },
            patientStatus: { type: String, required: true },
            patientBloodGroup: { type: String, required: true },
            patientRoutineCheckup: [
                {
                    checkupNumber: { type: Number, required: true },
                    doctorName: { type: String, required: true },
                    condition: { type: String, required: true },
                    medicines: [
                        {
                            name: { type: String, required: true },
                            quantity: { type: Number, required: true },
                        },
                    ],
                },
            ],
        },
    ],
    doctorDetails: [
        {
            doctorName: { type: String, required: true },
            doctorID: { type: Number, required: true },
            department: { type: String, required: true },
            password: { type: String, required: true },
            phoneNumber: { type: String, required: true },
            emailID: { type: String, required: true },
            onDuty: { type: Boolean, required: true },
        },
    ],
    lat:{type:Number,require:true},
    lng:{type:Number,require:true}
});




const Hospital = mongoose.model("Hospitals_informations", hospitalSchema);
module.exports=Hospital;