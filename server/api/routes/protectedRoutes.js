// server/api/routes/protectedRoutes.js

const express = require('express');
const router = express.Router();
const { getProtectedData } = require('../controllers/protectedController');

// Define a route that uses the protected controller action
router.get('/data', getProtectedData);

module.exports = router;
