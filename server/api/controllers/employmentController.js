const Employment = require('../models/schemas/Employment');

const getEmployments = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const employments = await Employment.find();
    res.json(employments);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const getEmploymentById = async (req, res) => {
  try {
    const employment = await Employment.findById(req.params.id);
    if (!employment) return res.status(404).json({ msg: 'Employment record not found' });
    res.json(employment);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const createEmployment = async (req, res) => {
  try {
    const newEmployment = new Employment(req.body);
    const savedEmployment = await newEmployment.save();
    res.status(201).json(savedEmployment);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const updateEmployment = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const employment = await Employment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employment) return res.status(404).json({ msg: 'Employment record not found' });
    res.json(employment);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const deleteEmployment = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const employment = await Employment.findById(req.params.id);
    if (!employment) return res.status(404).json({ msg: 'Employment record not found' });
    await employment.remove();
    res.json({ msg: 'Employment record removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getEmployments,
  getEmploymentById,
  createEmployment,
  updateEmployment,
  deleteEmployment
};
