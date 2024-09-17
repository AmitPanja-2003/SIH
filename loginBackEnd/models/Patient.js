const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Function to generate a patient ID starting with the last two digits of the current year
const generatePatientId = () => {
  const year = new Date().getFullYear().toString().slice(-2); // Get last two digits of the current year
  const randomNumber = Math.floor(10000000 + Math.random() * 90000000); // Generate an 8-digit random number
  return `${year}${randomNumber}`; // Concatenate the year with the random number
};

const patientSchema = new mongoose.Schema({
  patientId: { 
    type: Number, 
    default: generatePatientId, // Automatically generates a 10-digit ID
    unique: true // Ensures the patientId is unique
  },
  patientName: {
    type: String,
    required: true
  },
  patientAge: {
    type: Number,
    required: true
  },
  patient_password: {
    type: String,
    required: true
  },
  patientGender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  patientEmail: {
    type: String,
    required: false
  },
  phoneNo: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  patientAppointments: [
    {
      hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Hospital' // assuming you have a Hospital model
      },
      hospitalName: {
        type: String,
        required: true
      },
      appointmentId: {
        type: String,
        required: false
      },
      time: {
        type: String,
        required: true
      },
      date:{
        type:String,
        default:new Date(Date.now()).toLocaleDateString()
      },
      department: {
        type: String,
        required: true
      },
      visitStatus: {
        type: Boolean,
        required: true
      },
      description: {
        type: String
      },
      medication: [{ 
        medicine: { type: String, required: true }, // Medication name
        quantity: { type: Number, required: true } // Medication quantity/dosage
      }]
    }
  ] // Array of embedded appointments
});

// Pre-save hook to hash password before saving the patient
patientSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

const Patient = mongoose.model('patients_informations', patientSchema);

module.exports = Patient;
