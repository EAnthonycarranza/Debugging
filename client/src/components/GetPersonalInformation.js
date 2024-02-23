import React, { useState, useEffect } from 'react';
import { fetchPersonalInformation } from '../ultils/fetchPersonalInformation';

const GetPersonalInformation = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getInfo = async () => {
      setLoading(true);
      const info = await fetchPersonalInformation();
      if (info) {
        setPersonalInfo(info);
        setLoading(false);
      } else {
        setError('Failed to load personal information');
        setLoading(false);
      }
    };

    getInfo();
  }, []);

  if (loading) return <div>Loading personal information...</div>;
  if (error) return <div>{error}</div>;
  if (!personalInfo) return <div>No personal information found</div>;

  return (
    <div>
      <h2>Personal Information</h2>
      <p>Name: {personalInfo.firstName} {personalInfo.lastName}</p>
      <p>Email: {personalInfo.email}</p>
      {/* Display additional personal information fields as needed */}
    </div>
  );
};

export default GetPersonalInformation;
