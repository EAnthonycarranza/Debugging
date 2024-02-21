const History = require('../models/schemas/History');

const getHistories = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const histories = await History.find();
    res.json(histories);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const getHistoryById = async (req, res) => {
  try {
    const history = await History.findById(req.params.id);
    if (!history) return res.status(404).json({ msg: 'History record not found' });
    res.json(history);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const createHistory = async (req, res) => {
  try {
    const newHistory = new History(req.body);
    const savedHistory = await newHistory.save();
    res.status(201).json(savedHistory);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const updateHistory = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const history = await History.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!history) return res.status(404).json({ msg: 'History record not found' });
    res.json(history);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const deleteHistory = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const history = await History.findById(req.params.id);
    if (!history) return res.status(404).json({ msg: 'History record not found' });
    await history.remove();
    res.json({ msg: 'History record removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getHistories,
  getHistoryById,
  createHistory,
  updateHistory,
  deleteHistory
};
