// src/components/AddPersonalInfo.js
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_PERSONAL_INFORMATION = gql`
  mutation CreatePersonalInformation($firstName: String!, $lastName: String!) {
    createPersonalInformation(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

function AddPersonalInfo() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [createPersonalInformation, { data, loading, error }] = useMutation(CREATE_PERSONAL_INFORMATION);

  const handleSubmit = (e) => {
    e.preventDefault();
    createPersonalInformation({ variables: { firstName, lastName } });
  };

  return (
    <div>
      <h2>Add Personal Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            required
          />
        </div>
        <button type="submit" disabled={loading}>Submit</button>
      </form>
      {loading && <p>Submitting...</p>}
      {error && <p>Error submitting information: {error.message}</p>}
      {data && <p>Added: {data.createPersonalInformation.firstName} {data.createPersonalInformation.lastName}</p>}
    </div>
  );
}

export default AddPersonalInfo;
