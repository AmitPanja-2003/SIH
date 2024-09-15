const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  timeSlot: String,
  date: String,
  patientDetails: {
    name: String,
    disease: String,
  },
  isBooked: { type: Boolean, default: false },
});

module.exports = mongoose.model('Booking', bookingSchema);
