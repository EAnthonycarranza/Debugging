// server/api/controllers/protectedController.js

exports.getProtectedData = (req, res) => {
    // Example response for a protected route
    res.json({ message: "This is protected data only accessible to authenticated users." });
  };
  