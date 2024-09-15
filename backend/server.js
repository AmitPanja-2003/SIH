import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import moment from 'moment-timezone';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB URI and connection to MongoDB Atlas
const dbURI = process.env.MONGODB_URI || 'mongodb+srv://rahul000:rahul123@cluster0.twhvfok.mongodb.net/HospitalDB?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('Failed to connect to MongoDB Atlas', err);
    process.exit(1);
  });

// Bed schema and model
const bedSchema = new mongoose.Schema({
  bedType: { type: String, required: true },
  bedsAvailable: { type: Number, required: true }
});

const Bed = mongoose.model('Bed', bedSchema);

// Patient schema and model
const patientSchema = new mongoose.Schema({
  date: { type: String, required: true },
  patientId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  phoneNo: { type: Number, required: true },
  address: { type: String, required: true },
  bedType: { type: String, required: true } 
});

const Patient = mongoose.model('Patient', patientSchema);

// Checked out patient schema and model
const checkedOutPatientSchema = new mongoose.Schema({
  date: { type: String, required: true },
  patientId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  phoneNo: { type: Number, required: true },
  address: { type: String, required: true },
  checkoutDate: {
    type: Date,
    default: () => moment().tz('Asia/Kolkata').toDate()
  },
  bedType: { type: String, required: true } 
});

const CheckedOutPatient = mongoose.model('CheckedOutPatient', checkedOutPatientSchema);

const initializeBedData = async () => {
  const bedTypes = [
    'Emergency Bed',
    'General Bed',
    'Mother\'s Bed',
    'Pediatrics Bed',
    'Surgery Bed',
    'Orthopaedics Bed',
    'ICU Bed'
  ];

  const bedsPerType = Math.floor(500 / bedTypes.length);

  try {
    await Bed.deleteMany({});

    for (const bedType of bedTypes) {
      const bedData = new Bed({
        bedType,
        bedsAvailable: bedsPerType
      });
      await bedData.save();
    }
    console.log('Bed data initialized with 500 beds');
  } catch (error) {
    console.error('Error initializing bed data:', error.message);
  }
};


app.get('/api/beds', async (req, res) => {
  try {
    const beds = await Bed.find({});
    res.json(beds);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bed data' });
  }
});

app.put('/api/beds/update', async (req, res) => {
  const { bedType, bedsAvailable } = req.body;

  if (!bedType || bedsAvailable === undefined) {
    return res.status(400).json({ error: 'Bed type and available beds are required' });
  }

  try {
    const bed = await Bed.findOneAndUpdate(
      { bedType },
      { bedsAvailable },
      { new: true }
    );

    if (!bed) {
      return res.status(404).json({ error: 'Bed type not found' });
    }

    res.json({ message: 'Bed availability updated', bed });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update bed availability' });
  }
});


app.post('/api/patients', async (req, res) => {
  const { date, patientId, name, age, gender, bloodGroup, phoneNo, address, bedType } = req.body;

  if (!date || !patientId || !name || !age || !gender || !bloodGroup || !phoneNo || !address || !bedType) {
    return res.status(400).json({ error: 'All patient details are required' });
  }

  try {
    const patient = new Patient({ date, patientId, name, age, gender, bloodGroup, phoneNo, address, bedType });

    // Decrement bed availability
    const bed = await Bed.findOne({ bedType });
    if (bed && bed.bedsAvailable > 0) {
      bed.bedsAvailable -= 1;
      await bed.save();
      await patient.save();
      return res.status(201).json({ message: 'Patient added successfully' });
    } else {
      return res.status(400).json({ error: 'No available beds for the selected type' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to add patient' });
  }
});


app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});


app.post('/api/patients/checkout/:id', async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid patient ID' });
  }

  try {
    const patient = await Patient.findByIdAndDelete(id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    
    const checkedOutPatient = new CheckedOutPatient({
      date: patient.date,
      patientId: patient.patientId,
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      bloodGroup: patient.bloodGroup,
      phoneNo: patient.phoneNo,
      address: patient.address,
      bedType: patient.bedType 
    });
    await checkedOutPatient.save();

    // Increment bed availability
    const bed = await Bed.findOne({ bedType: patient.bedType });
    if (bed) {
      bed.bedsAvailable += 1;
      await bed.save();
    }

    res.json({ message: 'Patient checked out and data saved' });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ error: 'Failed to checkout patient', details: error.message });
  }
});


app.get('/api/checkedoutpatients', async (req, res) => {
  try {
    const checkedOutPatients = await CheckedOutPatient.find({});
    res.json(checkedOutPatients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch checked-out patients' });
  }
});

// Start  server 
app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
  initializeBedData();
});
