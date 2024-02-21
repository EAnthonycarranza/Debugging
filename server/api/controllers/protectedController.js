// server/api/controllers/protectedController.js

// Example protected action
exports.getProtectedData = (req, res) => {
    // Assuming the user has been authenticated and added to req by your middleware
    if (!req.user) {
      return res.status(401).json({ message: 'You must be logged in to view this.' });
    }
  
    // Send back some protected data
    res.json({
      message: 'This is protected data.',
      user: req.user,
    });
  };
  