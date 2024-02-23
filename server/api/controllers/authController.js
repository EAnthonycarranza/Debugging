const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure this path matches your project structure

const register = async (req, res) => {
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

const loginUser = async (email, password) => {
  // Attempt to find the user by email
  const user = await User.findOne({ email });
  
  if (!user) {
    // User does not exist
    return { error: "User not found" };
  }

  // Check if the password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    // Password does not match
    return { error: "Invalid credentials" };
  }

  // User found and password matches, generate token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return { token, userId: user.id }; // Return both the token and userId
};

// Correct way to export both functions
module.exports = { register, loginUser };
