const express = require('express');
const {
  getPersonalInformations,
  getPersonalInformationById,
  createPersonalInformation,
  updatePersonalInformation,
  deletePersonalInformation,
} = require('../controllers/personalInformationController');

const router = express.Router();

router.get('/', getPersonalInformations);
router.get('/:id', getPersonalInformationById);
router.post('/', createPersonalInformation);
router.put('/:id', updatePersonalInformation);
router.delete('/:id', deletePersonalInformation);

module.exports = router;
