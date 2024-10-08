const express = require('express');
const mongoose = require('mongoose');
const patientRoutes = require('./routes/patientRoutes');
const timeSlotRoutes = require('./routes/timeSlotRoutes');
const hospitalRoutes = require("./routes/hospitalRoutes"); 
const DoctorRoutes = require("./routes/DoctorAddRoutes")
const Inventory = require("./routes/AddInventory");
const patientSignup = require('./routes/patientSignupRoutes')
const DoctorLogin =require('./routes/DoctorLogin')
const DoctorSearch = require('./routes/DoctorSearch')
const ProductSearch = require("./routes/ProductSearch")
const cors = require('cors'); 
const app = express(); 

// Middleware for parsing JSON
app.use(express.json());
app.use(cors());


// const url = "mongodb+srv://demouser:demo123@cluster0.ap4zayq.mongodb.net/company?retryWrites=true&w=majority&appName=Cluster0";
const url = "mongodb+srv://amit:amit123@cluster0.w8nn4gk.mongodb.net/company_database?retryWrites=true&w=majority&appName=Cluster0";
// MongoDB Connection
mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// API Routes
app.use('/patients', patientRoutes);
app.use('/patient_timeslot', timeSlotRoutes);
app.use("/hospital", hospitalRoutes);
app.use('/doctors',DoctorRoutes);
app.use("/addInventory",Inventory);
app.use('/patient', patientSignup);
app.use('/doctor',DoctorLogin)
app.use('/doctors',DoctorSearch);
app.use("/searchproducts",ProductSearch);
// Start the server
// const PORT = process.env.PORT || 5000;
app.listen(5000, () => console.log(`Server running on port 5000`));
