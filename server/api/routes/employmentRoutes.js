const express = require('express');
const router = express.Router();
const {
  getEmployments,
  getEmploymentById,
  createEmployment,
  updateEmployment,
  deleteEmployment
} = require('../controllers/employmentController');

router.get('/', getEmployments);
router.get('/:id', getEmploymentById);
router.post('/', createEmployment);
router.put('/:id', updateEmployment);
router.delete('/:id', deleteEmployment);

module.exports = router;
