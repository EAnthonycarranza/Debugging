const express = require('express');
const router = express.Router();

// Middleware for authentication
const authMiddleware = require('../../middleware/authMiddleware'); // Adjust the path as needed

// Middleware for checking if the user is an admin
const isAdmin = require('../../middleware/isAdmin'); // Adjust the path as needed

// Controller for handling personal information routes
const personalInformationController = require('../controllers/personalInformationController'); // Adjust the path as needed

// Apply authentication middleware to all routes in this router
router.use(authMiddleware);

// Destructuring methods from the controller for easier use
const {
  getPersonalInformations,
  getPersonalInformationById,
  createPersonalInformation,
  updatePersonalInformation,
  deletePersonalInformation
} = personalInformationController;

// Route to get all personal information entries (protected and for admin use)
router.get('/', isAdmin, getPersonalInformations);

// Route to get a specific personal information entry by ID (protected, available to authenticated users)
router.get('/:id', getPersonalInformationById); // Redundant authMiddleware removed

// Route to create a new personal information entry (protected)
router.post('/', createPersonalInformation);

// Route to update a specific personal information entry by ID (protected)
router.put('/:id', updatePersonalInformation);

// Route to delete a specific personal information entry by ID (protected)
router.delete('/:id', deletePersonalInformation);

module.exports = router;
