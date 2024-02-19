const express = require('express');
const router = express.Router();
const { getAdmissions, getAdmissionById, createAdmission, updateAdmission, deleteAdmission } = require('../controllers/admissionController');

// Get all admissions
router.get('/', getAdmissions);

// Get a single admission by id
router.get('/:id', getAdmissionById);

// Create a new admission
router.post('/', createAdmission);

// Update an admission by id
router.put('/:id', updateAdmission);

// Delete an admission by id
router.delete('/:id', deleteAdmission);

module.exports = router;
