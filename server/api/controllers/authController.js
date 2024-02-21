const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure this path is correct

exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log('Attempting to register user:', email);

    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ email, password: hashedPassword, role });
    await user.save();

    // Correctly place JWT signing here where `user` is defined
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log('JWT signed with role:', user.role); // Log the role for debugging
    console.log('User registered:', email);

    res.json({ token }); // Send the signed token as response
  } catch (error) {
    console.error('Register error:', error);
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

    // If everything's correct, proceed to generate and send the token
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
