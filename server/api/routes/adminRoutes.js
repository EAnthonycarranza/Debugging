// server/api/routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware'); // Ensure this path accurately points to your authMiddleware file
const isAdmin = require('../../middleware/isAdmin'); // Ensure this path accurately points to your isAdmin file

// Apply authMiddleware globally to all routes in this router
// This ensures every route in this file checks for a valid user token first
router.use(authMiddleware);

// Define a route that is only accessible to admin users
// This route will first check if the user is authenticated (thanks to authMiddleware)
// Then, it will check if the authenticated user is an admin (thanks to isAdmin)
router.get('/admin-only', isAdmin, (req, res) => {
  // Implement the logic for this admin-only route
  // Since this middleware sequence includes isAdmin, you can assume here that
  // the user is not only authenticated but also an admin
  res.json({ message: "Welcome, admin!" });
});

module.exports = router;
