const mongoose = require('mongoose');

const AgreementAcknowledgementSchema = new mongoose.Schema({
  studentSignature: String,
  witnessSignature: String,
  dateSigned: String,
});

const AgreementAcknowledgement = mongoose.model('AgreementAcknowledgement', AgreementAcknowledgementSchema);
module.exports = AgreementAcknowledgement;
