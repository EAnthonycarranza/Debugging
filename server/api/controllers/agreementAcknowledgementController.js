const AgreementAcknowledgement = require('../models/schemas/AgreementAcknowledgement');

exports.getAllAcknowledgements = async (req, res) => {
  try {
    const acknowledgements = await AgreementAcknowledgement.find();
    res.json(acknowledgements);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getAcknowledgementById = async (req, res) => {
  try {
    const acknowledgement = await AgreementAcknowledgement.findById(req.params.id);
    if (!acknowledgement) return res.status(404).json({ msg: 'Acknowledgement not found' });
    res.json(acknowledgement);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.createAcknowledgement = async (req, res) => {
  try {
    const newAcknowledgement = new AgreementAcknowledgement(req.body);
    const savedAcknowledgement = await newAcknowledgement.save();
    res.status(201).json(savedAcknowledgement);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updateAcknowledgement = async (req, res) => {
  try {
    const acknowledgement = await AgreementAcknowledgement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!acknowledgement) return res.status(404).json({ msg: 'Acknowledgement not found' });
    res.json(acknowledgement);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.deleteAcknowledgement = async (req, res) => {
  try {
    const acknowledgement = await AgreementAcknowledgement.findById(req.params.id);
    if (!acknowledgement) return res.status(404).json({ msg: 'Acknowledgement not found' });
    await acknowledgement.remove();
    res.json({ msg: 'Acknowledgement removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
