const express = require('express');
const { uploadDocument } = require('../controllers/docController');
const auth = require('../../middleware/authMiddleware');
const router = express.Router();

router.post('/upload', auth, uploadDocument);

module.exports = router;
