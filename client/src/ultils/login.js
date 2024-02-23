// src/utils/login.js
// src/utils/login.js
export const loginUser = async (credentials) => {
    try {
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const { token, user } = await response.json();
  
      // Store token and user ID in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.id);
  
      // Optionally, redirect the user or update the UI
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };
  