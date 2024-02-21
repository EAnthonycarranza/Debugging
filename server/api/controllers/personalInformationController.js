// Assuming PersonalInformation is your Mongoose model
const PersonalInformation = require('../models/schemas/PersonalInformation'); // Update the path as per your project structure

// Get all personal information entries
const getPersonalInformations = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  try {
    const personalInfos = await PersonalInformation.find();
    res.json(personalInfos);
  } catch (error) {
    console.error('Error fetching personal informations:', error);
    res.status(500).send('Server Error');
  }
};

// Get a single personal information entry by ID
const getPersonalInformationById = async (req, res) => {
  try {
    const { id } = req.params;
    const personalInfo = await PersonalInformation.findById(id);

    if (!personalInfo) {
      return res.status(404).json({ message: 'Personal information not found' });
    }

    // Check if the requester is the owner or an admin
    if (personalInfo.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(personalInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};


// Create a new personal information entry
const createPersonalInformation = async (req, res) => {
  try {
    const newPersonalInfo = new PersonalInformation({
      ...req.body,
      user: req.user.id, // Assuming you have user ID in req.user.id
    });

    const savedPersonalInfo = await newPersonalInfo.save();
    res.json(savedPersonalInfo);
  } catch (error) {
    console.error('Error creating personal information:', error);
    res.status(500).send('Server Error');
  }
};

// Update an existing personal information entry by ID
const updatePersonalInformation = async (req, res) => {
  try {
    const personalInfo = await PersonalInformation.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(personalInfo);
  } catch (error) {
    console.error('Error updating personal information:', error);
    res.status(500).send('Server Error');
  }
};

// Delete a personal information entry by ID
const deletePersonalInformation = async (req, res) => {
  try {
    await PersonalInformation.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Personal information deleted' });
  } catch (error) {
    console.error('Error deleting personal information:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getPersonalInformations,
  getPersonalInformationById,
  createPersonalInformation,
  updatePersonalInformation,
  deletePersonalInformation
};
