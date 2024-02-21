const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware'); // Adjust the path as needed
const isAdmin = require('../../middleware/isAdmin'); // Adjust the path as needed
const personalInformationController = require('../controllers/personalInformationController'); // Adjust the path as needed

router.use(authMiddleware);

const {
  getPersonalInformations,
  getPersonalInformationById,
  createPersonalInformation,
  updatePersonalInformation,
  deletePersonalInformation
} = require('../controllers/personalInformationController'); // Adjust the path as necessary

// Define routes
router.get('/', isAdmin, personalInformationController.getPersonalInformations);
router.get('/:id', personalInformationController.getPersonalInformationById);
router.post('/', createPersonalInformation); // Create
router.put('/:id', updatePersonalInformation); // Update
router.delete('/:id', deletePersonalInformation); // Delete

module.exports = router;
