const AgreementAcknowledgement = require('../models/schemas/AgreementAcknowledgement');

const getAllAcknowledgements = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const acknowledgements = await AgreementAcknowledgement.find();
    res.json(acknowledgements);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const getAcknowledgementById = async (req, res) => {
  try {
    const acknowledgement = await AgreementAcknowledgement.findById(req.params.id);
    if (!acknowledgement) return res.status(404).json({ msg: 'Acknowledgement not found' });
    res.json(acknowledgement);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const createAcknowledgement = async (req, res) => {
  try {
    const newAcknowledgement = new AgreementAcknowledgement(req.body);
    const savedAcknowledgement = await newAcknowledgement.save();
    res.status(201).json(savedAcknowledgement);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const updateAcknowledgement = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const acknowledgement = await AgreementAcknowledgement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!acknowledgement) return res.status(404).json({ msg: 'Acknowledgement not found' });
    res.json(acknowledgement);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const deleteAcknowledgement = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const acknowledgement = await AgreementAcknowledgement.findById(req.params.id);
    if (!acknowledgement) return res.status(404).json({ msg: 'Acknowledgement not found' });
    await acknowledgement.remove();
    res.json({ msg: 'Acknowledgement removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllAcknowledgements,
  getAcknowledgementById,
  createAcknowledgement,
  updateAcknowledgement,
  deleteAcknowledgement
};
