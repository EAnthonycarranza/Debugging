// Assuming PersonalInformation is your Mongoose model
const PersonalInformation = require('../models/schemas/PersonalInformation'); // Update the path as per your project structure

// Get all personal information entries
exports.getPersonalInformations = async (req, res) => {
  try {
    const personalInfos = await PersonalInformation.find();
    res.json(personalInfos);
  } catch (error) {
    console.error('Error fetching personal informations:', error);
    res.status(500).send('Server Error');
  }
};

// Get a single personal information entry by ID
exports.getPersonalInformationById = async (req, res) => {
  try {
    const personalInfo = await PersonalInformation.findById(req.params.id);
    if (!personalInfo) {
      return res.status(404).json({ msg: 'Personal information not found' });
    }
    res.json(personalInfo);
  } catch (error) {
    console.error('Error fetching personal information by ID:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Personal information not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Create a new personal information entry
exports.createPersonalInformation = async (req, res) => {
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
exports.updatePersonalInformation = async (req, res) => {
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
exports.deletePersonalInformation = async (req, res) => {
  try {
    await PersonalInformation.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Personal information deleted' });
  } catch (error) {
    console.error('Error deleting personal information:', error);
    res.status(500).send('Server Error');
  }
};
