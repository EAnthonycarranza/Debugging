import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_PERSONAL_INFORMATION = gql`
  query GetPersonalInformation {
    personalInformations {
      id
      firstName
      lastName
      address
      age
      cityStateZip
      dateOfBirth
      dlOrIdNumber
      gender
      homePhone
      maritalStatus
      middleName
      nationality
      primaryLanguageSpoken
      race
      referredBy
      residencyNumber
      revokedOrSuspendedDate
      ssn
      stateIssued
      usCitizen
      workPhone
    }
  }
`;

function PersonalInformationList() {
  const { loading, error, data } = useQuery(GET_PERSONAL_INFORMATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Personal Information</h2>
      <ul>
        {data.personalInformations.map((info) => (
          <li key={info.id}>
            <p>Name: {info.firstName} {info.middleName} {info.lastName}</p>
            <p>Address: {info.address}, {info.cityStateZip}</p>
            <p>Date of Birth: {new Date(info.dateOfBirth).toLocaleDateString()}</p>
            <p>DL or ID Number: {info.dlOrIdNumber}</p>
            <p>Gender: {info.gender}</p>
            <p>Marital Status: {info.maritalStatus}</p>
            <p>Nationality: {info.nationality}</p>
            <p>Race: {info.race}</p>
            <p>Primary Language: {info.primaryLanguageSpoken}</p>
            <p>Referred By: {info.referredBy}</p>
            <p>Residency Number: {info.residencyNumber}</p>
            <p>SSN: {info.ssn}</p>
            <p>State Issued: {info.stateIssued}</p>
            <p>US Citizen: {info.usCitizen ? 'Yes' : 'No'}</p>
            <p>Home Phone: {info.homePhone}</p>
            <p>Work Phone: {info.workPhone}</p>
            {/* Add any other fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PersonalInformationList;
