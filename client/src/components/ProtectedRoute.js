import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the import path if necessary

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // This needs to correctly reflect auth status

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};


export default ProtectedRoute;
