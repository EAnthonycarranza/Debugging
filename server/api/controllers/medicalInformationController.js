const MedicalInformation = require('../models/schemas/MedicalInformation');

exports.getMedicalInformations = async (req, res) => {
  try {
    console.log("Fetching all medical information records...");
    const medicalInfos = await MedicalInformation.find();
    console.log("Medical information records fetched:", medicalInfos);
    res.json(medicalInfos);
  } catch (err) {
    console.error("Error fetching medical information records:", err);
    res.status(500).send('Server Error');
  }
};

exports.getMedicalInformationById = async (req, res) => {
  try {
    console.log(`Fetching medical information record with ID: ${req.params.id}`);
    const medicalInfo = await MedicalInformation.findById(req.params.id);
    if (!medicalInfo) {
      console.log("Medical information record not found");
      return res.status(404).json({ msg: 'Medical information not found' });
    }
    console.log("Medical information record found:", medicalInfo);
    res.json(medicalInfo);
  } catch (err) {
    console.error("Error fetching medical information record by ID:", err);
    res.status(500).send('Server Error');
  }
};

exports.createMedicalInformation = async (req, res) => {
  try {
    console.log("Creating new medical information record:", req.body);
    const newMedicalInfo = new MedicalInformation(req.body);
    const savedMedicalInfo = await newMedicalInfo.save();
    console.log("New medical information record saved:", savedMedicalInfo);
    res.status(201).json(savedMedicalInfo);
  } catch (err) {
    console.error("Error creating new medical information record:", err);
    res.status(500).send('Server Error');
  }
};

exports.updateMedicalInformation = async (req, res) => {
  try {
    console.log(`Updating medical information record with ID: ${req.params.id}`, req.body);
    const medicalInfo = await MedicalInformation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!medicalInfo) {
      console.log("Medical information record not found for update");
      return res.status(404).json({ msg: 'Medical information not found' });
    }
    console.log("Medical information record updated:", medicalInfo);
    res.json(medicalInfo);
  } catch (err) {
    console.error("Error updating medical information record:", err);
    res.status(500).send('Server Error');
  }
};

exports.deleteMedicalInformation = async (req, res) => {
  try {
    console.log(`Deleting medical information record with ID: ${req.params.id}`);
    const medicalInfo = await MedicalInformation.findById(req.params.id);
    if (!medicalInfo) {
      console.log("Medical information record not found for deletion");
      return res.status(404).json({ msg: 'Medical information not found' });
    }
    await medicalInfo.remove();
    console.log("Medical information record deleted");
    res.json({ msg: 'Medical information removed' });
  } catch (err) {
    console.error("Error deleting medical information record:", err);
    res.status(500).send('Server Error');
  }
};
