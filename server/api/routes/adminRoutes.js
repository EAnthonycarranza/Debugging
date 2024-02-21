const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware'); // Adjust path as necessary
const isAdmin = require('../../middleware/isAdmin'); // Adjust path as necessary

router.use(authMiddleware);

// Example route that uses the isAdmin middleware
router.get('/admin-only', isAdmin, (req, res) => {
  // route logic here
});

module.exports = router;
