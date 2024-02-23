import React, { useEffect, useState } from 'react';

// Place the function at the top of your component file
function getUserIdFromToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload).userId; // Assuming the payload has a userId field
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

function PersonalInformation() {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPersonalInformation = async () => {
      const token = localStorage.getItem('token'); // Get the token from storage
      if (!token) {
        setError('No token found');
        return;
      }

      const userId = getUserIdFromToken(token); // Use the function to get userId
      if (!userId) {
        setError('Failed to decode token');
        return;
      }

      // Update the URL with the userId
      const url = `http://localhost:3001/api/personalinformation/${userId}`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setPersonalInfo(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPersonalInformation();
  }, []); // Empty dependency array means this effect runs once on mount

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  if (!personalInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Personal Information</h1>
      {/* Render your personal information here */}
      <div>First Name: {personalInfo.firstName}</div>
      {/* Add more fields as needed */}
    </div>
  );
}

export default PersonalInformation;
