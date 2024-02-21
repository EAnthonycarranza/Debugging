const AdmissionAgreement = require('../models/AdmissionAgreement');

const getAdmissions = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const admissions = await AdmissionAgreement.find();
    res.json(admissions);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const getAdmissionById = async (req, res) => {
  try {
    const admission = await AdmissionAgreement.findById(req.params.id);
    if (!admission) return res.status(404).json({ msg: 'Admission not found' });
    res.json(admission);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const createAdmission = async (req, res) => {
  try {
    const newAdmission = new AdmissionAgreement(req.body);
    const savedAdmission = await newAdmission.save();
    res.status(201).json(savedAdmission);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const updateAdmission = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const admission = await AdmissionAgreement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!admission) return res.status(404).json({ msg: 'Admission not found' });
    res.json(admission);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const deleteAdmission = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const admission = await AdmissionAgreement.findById(req.params.id);
    if (!admission) return res.status(404).json({ msg: 'Admission not found' });
    await admission.remove();
    res.json({ msg: 'Admission removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAdmissions,
  getAdmissionById,
  createAdmission,
  updateAdmission,
  deleteAdmission
};
