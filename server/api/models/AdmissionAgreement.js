const mongoose = require('mongoose');

const AdmissionAgreementSchema = new mongoose.Schema({
  personalInformation: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalInformation' },
  education: { type: mongoose.Schema.Types.ObjectId, ref: 'Education' },
  employment: { type: mongoose.Schema.Types.ObjectId, ref: 'Employment'},
  history: { type: mongoose.Schema.Types.ObjectId, ref: 'History'},
  medicalInformation: {type: mongoose.Schema.Types.ObjectId, ref: 'MedicalInformation'},
  agreementAcknowledgement: {type: mongoose.Schema.Types.ObjectId, ref: 'AgreementAcknowledgementSchema'},
}, { timestamps: true });

module.exports = mongoose.model('AdmissionAgreement', AdmissionAgreementSchema);