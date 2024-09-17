import mongoose from 'mongoose';

const bedPatientSehema = new mongoose.Schema({
  
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
            doctorID: { type: String, required: true },
            condition: { type: String, required: true },
            medicines:  [
                {
                    name: { type: String, required: true },
                    quantity: { type: Number, required: true },
                },
            ],
        },
    ],
});

const Patient = mongoose.model('bed_patient_detail', bedPatientSehema);

export default Patient;
