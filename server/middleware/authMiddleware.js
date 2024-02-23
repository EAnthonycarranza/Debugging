// server/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  console.log("Request path:", req.path);
  console.log("Authorization Header:", req.headers.authorization);

  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const token = bearerToken.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};



module.exports = authMiddleware;
