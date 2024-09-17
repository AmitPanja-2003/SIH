import mongoose from 'mongoose';

const bedSchema = new mongoose.Schema({
    bedType: { type: String, required: true },
    bedsAvailable: { type: Number, required: true }
  });

const Patient = mongoose.model('', bedSchema);