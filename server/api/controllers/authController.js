const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure this path is correct

exports.register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with role set to 'user' by default
    user = new User({
      email,
      password: hashedPassword,
      username,
      role: 'user' // Default role for new registrations
    });

    // Save the new user
    await user.save();

    // Generate a token for the new user
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Respond with the token
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.login = async (req, res) => {
  console.log('Login function hit');
  try {
    const { email, password } = req.body;

    console.log('Attempting to log in user:', email);

    // Attempt to find the user by their email
    const user = await User.findOne({ email });

    // Log the retrieved user object
    console.log('Retrieved user:', user); // This line is added

    if (!user) {
      console.log('User not found:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`User ${user.username} found with role ${user.role}.`); // This should log the actual username and role, if found

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password does not match for user:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

// server/api/controllers/authController.js
const token = jwt.sign(
  { userId: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Server error');
  }
};
