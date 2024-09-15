const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  isPresent: { type: Boolean, default: false },
  schedule: [
    {
      date: String,
      timeSlot: String,
      booked: { type: Boolean, default: false },
      patientDetails: {
        name: String,
        disease: String,
      },
    },
  ],
});

module.exports = mongoose.model('Doctor', doctorSchema);
