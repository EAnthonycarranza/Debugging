import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const AuthContext = createContext();

// Hook for child components to get the auth object and re-render when it changes.
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component that wraps your app and makes the auth object available to any child component that calls useAuth().
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Optionally store user details

  // Attempt to retrieve the token from localStorage when the component mounts
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'token') {
        setIsAuthenticated(!!event.newValue);
        // Optionally update user details based on the new token
      }
    };
  
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  

  // Login updates the state with the user's auth token and stores it in localStorage
  const login = (token, userData = null) => {
    console.log("Logging in", { token, userData });
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setUser(userData);
  };
  
  const logout = () => {
    console.log("Logging out");
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };  

  // The value passed to the provider's children
  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
