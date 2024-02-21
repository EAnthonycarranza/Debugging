require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { ApolloServer } = require('apollo-server-express');
const bcrypt = require('bcrypt');

// Import typeDefs and resolvers
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');

// Import User model
const User = require('./api/models/User');


// Import routes
const adminRoutes = require('./api/routes/adminRoutes');
const protectedRoutes = require('./api/routes/protectedRoutes');
const admissionRoutes = require('./api/routes/admissionRoutes');
const authRoutes = require('./api/routes/authRoutes');
const personalInformationRoutes = require('./api/routes/personalInformationRoutes');
const medicalInformationRoutes = require('./api/routes/medicalInformationRoutes');
const historyRoutes = require('./api/routes/historyRoutes');
const educationRoutes = require('./api/routes/educationRoutes');
const employmentRoutes = require('./api/routes/employmentRoutes');
const agreementAcknowledgementRoutes = require('./api/routes/agreementAcknowledgementRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Middleware for decoding the token and attaching the user to the request
const checkUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded); // Check the structure of decoded token
      req.user = decoded;
    } catch (error) {
      console.error("Token verification error:", error);
    }
  }
  next();
};


app.use(checkUser);

// Use REST API routes
app.use('/api', adminRoutes);
app.use('/api/protected', checkUser, protectedRoutes);
app.use('/api/admissions', admissionRoutes);
console.log('Setting up routes...');
app.use('/api/users', authRoutes);
app.use('/api/personalInformation', personalInformationRoutes);
app.use('/api/medicalInformation', medicalInformationRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/employment', employmentRoutes);
app.use('/api/agreementAcknowledgement', agreementAcknowledgementRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    initializeAdminUser(); // Call the function to check/create the admin user
  })
  .catch(err => console.error(err));

async function initializeAdminUser() {
  try {
    const adminEmail = 'admin@example.com';
    let adminUser = await User.findOne({ email: adminEmail });
    
    if (!adminUser) {
      // Admin user doesn't exist, so create one
      const hashedPassword = await bcrypt.hash('adminPassword', 10); // You should choose a strong password
      adminUser = new User({
        username: 'admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin', // Assuming your User model has a role field
        // Include any other fields your User model requires
      });

      await adminUser.save();
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error initializing admin user:', error);
  }
}

// Initialize ApolloServer
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user }) // Pass the user in the context
});

async function startServer() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}

startServer().catch(error => console.error('Error starting ApolloServer:', error));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`);
});
