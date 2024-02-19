const AdmissionAgreement = require('../models/AdmissionAgreement');

// Get all admission agreements
exports.getAdmissions = async (req, res) => {
  try {
    const admissions = await AdmissionAgreement.find();
    res.json(admissions);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get a single admission agreement by ID
exports.getAdmissionById = async (req, res) => {
  try {
    const admission = await AdmissionAgreement.findById(req.params.id);
    if (!admission) return res.status(404).json({ msg: 'Admission not found' });
    res.json(admission);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Create a new admission agreement
exports.createAdmission = async (req, res) => {
  try {
    const newAdmission = new AdmissionAgreement(req.body);
    const savedAdmission = await newAdmission.save();
    res.status(201).json(savedAdmission);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Update an admission agreement by ID
exports.updateAdmission = async (req, res) => {
  try {
    const admission = await AdmissionAgreement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!admission) return res.status(404).json({ msg: 'Admission not found' });
    res.json(admission);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Delete an admission agreement by ID
exports.deleteAdmission = async (req, res) => {
  try {
    const admission = await AdmissionAgreement.findById(req.params.id);
    if (!admission) return res.status(404).json({ msg: 'Admission not found' });
    await admission.remove();
    res.json({ msg: 'Admission removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
