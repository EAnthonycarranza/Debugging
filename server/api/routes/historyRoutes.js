const express = require('express');
const router = express.Router();
const {
  getHistories,
  getHistoryById,
  createHistory,
  updateHistory,
  deleteHistory
} = require('../controllers/historyController');

router.get('/', getHistories); // Fetch all histories
router.get('/:id', getHistoryById); // Fetch a single history by ID
router.post('/', createHistory); // Create a new history record
router.put('/:id', updateHistory); // Update an existing history record by ID
router.delete('/:id', deleteHistory); // Delete a history record by ID

module.exports = router;
