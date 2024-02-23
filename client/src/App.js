import React from 'react';
import { ApolloProvider } from '@apollo/client';
import ApolloClient from './apolloClient';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import UserData from './components/UserData'; // Import UserData component
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

function App() {
  return (
    <ApolloProvider client={ApolloClient}>
      <AuthProvider>
        <Router>
          <div>
            <h1>CSM Test</h1>
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              {/* Render UserData for the '/' route */}
              <Route path="/" element={<ProtectedRoute><UserData /></ProtectedRoute>} />
              <Route path="*" element={<Navigate replace to="/login" />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
