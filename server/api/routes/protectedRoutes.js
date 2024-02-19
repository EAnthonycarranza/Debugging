// server/api/routes/protectedRoutes.js

const express = require('express');
const { protect } = require('../../middleware/authMiddleware');
const { getProtectedData } = require('../controllers/protectedController');
const router = express.Router();

// Example protected route
router.get('/data', protect, getProtectedData);

module.exports = router;
