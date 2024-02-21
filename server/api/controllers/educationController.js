const Education = require('../models/schemas/Education');

const getEducations = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const educations = await Education.find();
    res.json(educations);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) return res.status(404).json({ msg: 'Education record not found' });
    res.json(education);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const createEducation = async (req, res) => {
  try {
    const newEducation = new Education(req.body);
    const savedEducation = await newEducation.save();
    res.status(201).json(savedEducation);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const updateEducation = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!education) return res.status(404).json({ msg: 'Education record not found' });
    res.json(education);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const deleteEducation = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const education = await Education.findById(req.params.id);
    if (!education) return res.status(404).json({ msg: 'Education record not found' });
    await education.remove();
    res.json({ msg: 'Education record removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getEducations,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation
};
