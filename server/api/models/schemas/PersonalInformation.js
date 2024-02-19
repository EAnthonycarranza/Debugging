const mongoose = require('mongoose');

const PersonalInformationSchema = new mongoose.Schema({
    date: String,
    lastName: String,
    firstName: String,
    middleName: String,
    dateOfBirth: String,
    age: Number,
    ssn: String,
    dlOrIdNumber: String,
    stateIssued: String,
    revokedOrSuspendedDate: String,
    address: String,
    cityStateZip: String,
    homePhone: String,
    workPhone: String,
    gender: String,
    race: String,
    nationality: String,
    maritalStatus: String,
    usCitizen: Boolean,
    residencyNumber: String,
    primaryLanguageSpoken: String,
    referredBy: String
  });  

  module.exports = mongoose.model('PersonalInformation', PersonalInformationSchema);