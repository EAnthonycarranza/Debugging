// src/utils/fetchPersonalInformation.js
export const fetchPersonalInformation = async () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!userId || !token) {
    console.error('User ID or token not found');
    return null;
  }

  try {
    const response = await fetch(`http://localhost:3001/api/personalinformation/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text(); // Changed to text to ensure you can see the raw response if JSON parsing fails
      throw new Error(`Failed to fetch personal information: ${errorData}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching personal information:', error);
    return null;
  }
};
