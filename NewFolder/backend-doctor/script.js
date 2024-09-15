const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const url = "mongodb+srv://amit:amit123@cluster0.w8nn4gk.mongodb.net/booking?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(url)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Schema for booking time slots with departments and disease details
const timeSlotSchema = new mongoose.Schema({
  slot: String,
  department: String,
  isBooked: { type: Boolean, default: false },
  disease: { type: String, default: '' }, // New field for disease details
});

const TimeSlot = mongoose.model("TimeSlot", timeSlotSchema);

// Get all available time slots for a department
app.get("/all-timeslots", async (req, res) => {
  const department = req.query.department;
  try {
    const slots = await TimeSlot.find({ department });
    res.json(slots);
  } catch (error) {
    console.error('Error fetching time slots:', error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// Get all booked slots for a department
app.get("/timeslots", async (req, res) => {
  const department = req.query.department;
  try {
    const slots = await TimeSlot.find({ department });
    res.json(slots);
  } catch (error) {
    console.error('Error fetching booked slots:', error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// Update disease details for a time slot
app.post('/update-disease', async (req, res) => {
  const { slot, department, disease } = req.body;

  try {
    const timeSlot = await TimeSlot.findOne({ slot, department });
    if (!timeSlot) {
      return res.status(404).json({ success: false, message: "Time slot not found for this department." });
    }

    timeSlot.disease = disease;
    await timeSlot.save();
    
    res.json({ success: true, message: "Disease details updated successfully!" });
  } catch (error) {
    console.error('Error updating disease details:', error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
