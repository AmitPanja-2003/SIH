const mongoose=require("mongoose")
const timeSlotSchema = new mongoose.Schema({

    slot: String,
    department: String, // Store department info
    hospital: String, // Store hospital info
    isBooked: { type: Boolean, default: false },
   
    
  });
  
  const TimeSlot = mongoose.model("TimeSlot", timeSlotSchema);
  module.exports=TimeSlot;