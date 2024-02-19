const express = require('express');
const router = express.Router();
const {
  getAllAcknowledgements,
  getAcknowledgementById,
  createAcknowledgement,
  updateAcknowledgement,
  deleteAcknowledgement
} = require('../controllers/agreementAcknowledgementController');

// Route to get all acknowledgements
router.get('/', getAllAcknowledgements);

// Route to get a single acknowledgement by ID
router.get('/:id', getAcknowledgementById);

// Route to create a new acknowledgement
router.post('/', createAcknowledgement);

// Route to update an acknowledgement by ID
router.put('/:id', updateAcknowledgement);

// Route to delete an acknowledgement by ID
router.delete('/:id', deleteAcknowledgement);

module.exports = router;
