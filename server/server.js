const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

require('dotenv').config();

// Import typeDefs and resolvers
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');

// Initialize Express
const app = express();

// Use CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Error handling for JSON parsing
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON format' });
  }
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Import routes
const protectedRoutes = require('./api/routes/protectedRoutes');
const admissionRoutes = require('./api/routes/admissionRoutes');
const authRoutes = require('./api/routes/authRoutes');
const personalInformationRoutes = require('./api/routes/personalInformationRoutes');
const medicalInformationRoutes = require('./api/routes/medicalInformationRoutes');
const historyRoutes = require('./api/routes/historyRoutes');
const educationRoutes = require('./api/routes/educationRoutes');
const employmentRoutes = require('./api/routes/employmentRoutes');
const agreementAcknowledgementRoutes = require('./api/routes/agreementAcknowledgementRoutes');

// Use REST API routes
app.use('/api/protected', protectedRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/users', authRoutes);
app.use('/api/personalInformation', personalInformationRoutes);
app.use('/api/medicalInformation', medicalInformationRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/employment', employmentRoutes);
app.use('/api/agreementAcknowledgement', agreementAcknowledgementRoutes);

// Initialize Apollo Server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  // If you're using context to pass down the user info, define it here
  context: ({ req }) => {
    // Example of extracting user from request headers
    // Adjust according to your authentication logic
    const token = req.headers.authorization || '';
    const user = getUserFromToken(token); // Implement this function based on your auth logic
    return { user: req.user };
  },
});

// Apply Apollo GraphQL middleware and specify the path
async function startServer() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });
}

startServer();

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}, GraphQL available at /graphql`));
