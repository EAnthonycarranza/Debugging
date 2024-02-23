const express = require('express');
const { register, loginUser } = require('../controllers/authController');
console.log(register); // Check if this logs a function or undefined
console.log(loginUser); // Check if this logs a function or undefined
const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password);
  
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  res.json({ token: result.token, userId: result.userId });
});

router.post('/register', register);

module.exports = router;
