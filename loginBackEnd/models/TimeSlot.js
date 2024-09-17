const mongoose=require("mongoose")
const timeSlotSchema = new mongoose.Schema({

    slot: String,
    department: String, // Store department info
    hospital: String, // Store hospital info
    patientId:Number,
    appointmentId: {
      type: Number,
      unique: true, 
      default: () => Math.floor(100000 + Math.random() * 900000),
    },
    isBooked: { type: Boolean, default: false }
   
    
  });
  
  const TimeSlot = mongoose.model("TimeSlot", timeSlotSchema);
  module.exports=TimeSlot;