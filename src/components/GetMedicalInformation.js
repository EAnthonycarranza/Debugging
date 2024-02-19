import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_MEDICAL_INFORMATION = gql`
  query GetMedicalInformation {
    medicalInformations {
      id
      healthCareProvider
      terminalIllnesses
      currentMedications {
        name
        dosage
        frequency
      }
    }
  }
`;

function GetMedicalInformation() {
  const { loading, error, data } = useQuery(GET_MEDICAL_INFORMATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Medical Information</h2>
      <ul>
        {data.medicalInformations.map((info) => (
          <li key={info.id}>
            <p>Healthcare Provider: {info.healthCareProvider}</p>
            <p>Terminal Illnesses: {info.terminalIllnesses.join(', ')}</p>
            <p>Current Medications:</p>
            <ul>
              {info.currentMedications.map((medication, index) => (
                <li key={index}>
                  <p>Name: {medication.name}</p>
                  <p>Dosage: {medication.dosage}</p>
                  <p>Frequency: {medication.frequency}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetMedicalInformation;
