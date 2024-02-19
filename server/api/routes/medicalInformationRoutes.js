const express = require('express');
const router = express.Router();
const {
  getMedicalInformations,
  getMedicalInformationById,
  createMedicalInformation,
  updateMedicalInformation,
  deleteMedicalInformation
} = require('../controllers/medicalInformationController');

// Fetch all medical information records
router.get('/', getMedicalInformations);

// Fetch a single medical information record by ID
router.get('/:id', getMedicalInformationById);

// Create a new medical information record
router.post('/', createMedicalInformation);

// Update an existing medical information record by ID
router.put('/:id', updateMedicalInformation);

// Delete a medical information record by ID
router.delete('/:id', deleteMedicalInformation);

module.exports = router;
