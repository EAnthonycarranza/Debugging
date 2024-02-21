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

const getPersonalInformationById = async (req, res) => {
  const { id } = req.params; // ID of the personal information entry
  const userId = req.user.id; // ID of the user from the decoded token

  try {
    // Query for personal information by ID and ensure it belongs to the logged-in user
    const personalInfo = await PersonalInformation.findOne({
      _id: id,
      userId: userId, // Match the user ID as well
    });

    if (!personalInfo) {
      return res.status(404).json({ message: 'Personal information not found or not authorized to access.' });
    }

    res.json(personalInfo);
  } catch (error) {
    console.error('Error fetching personal information:', error);
    res.status(500).send('Server error');
  }
};

// Create a new personal information entry
const createPersonalInformation = async (req, res) => {
  try {
    console.log("Creating personal information with data:", req.body);

    const newPersonalInfo = new PersonalInformation({
      ...req.body,
      userId: req.user.id, // Linking the personal information to the logged-in user's ID
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
  // Check if the user is an admin before allowing update
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

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
  // Check if the user is an admin before allowing deletion
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

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
