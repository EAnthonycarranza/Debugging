const express = require('express');
const router = express.Router();
const {
  getEducations,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation
} = require('../controllers/educationController');

// Route to get all education records
router.get('/', getEducations);

// Route to get a single education record by ID
router.get('/:id', getEducationById);

// Route to create a new education record
router.post('/', createEducation);

// Route to update an education record by ID
router.put('/:id', updateEducation);

// Route to delete an education record by ID
router.delete('/:id', deleteEducation);

module.exports = router;
