const mongoose = require('mongoose');

const MedicalInformationSchema = new mongoose.Schema({
    healthCare: String,
    terminalIllnesses: [String],
    currentMedications: [{
      name: String,
      dosage: String,
      frequency: String
    }]
  });
  const MedicalInformation = mongoose.model('MedicalInformation', MedicalInformationSchema);
module.exports = MedicalInformation;
