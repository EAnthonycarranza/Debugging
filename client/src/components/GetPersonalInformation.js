import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_PERSONAL_INFORMATION = gql`
  query GetPersonalInformation($id: ID!) {
    personalInformation(id: $id) {
      lastName
      address
      age
      cityStateZip
      dateOfBirth
      dlOrIdNumber
      firstName
      gender
      homePhone
      id
    }
  }
`;

const GetPersonalInformation = () => {
  const userId = localStorage.getItem('userId');
  const { loading, error, data } = useQuery(GET_PERSONAL_INFORMATION, {
    variables: { id: userId },
    skip: !userId,
    fetchPolicy: 'network-only',
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.personalInformation) return <p>No personal information found</p>;

  const info = data.personalInformation;
  return (
    <div>
      <h2>Personal Information</h2>
      <p>Name: {info.firstName} {info.lastName}</p>
      <p>Address: {info.address}, {info.cityStateZip}</p>
      <p>Date of Birth: {new Date(info.dateOfBirth).toLocaleDateString()}</p>
      <p>DL or ID Number: {info.dlOrIdNumber}</p>
      <p>Gender: {info.gender}</p>
      <p>Home Phone: {info.homePhone}</p>
    </div>
  );
};

export default GetPersonalInformation;
