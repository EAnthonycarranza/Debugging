import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_HISTORY = gql`
  query GetHistory {
    histories {
      id
      alcoholOrDrugUse
      criminalHistory
      familyHealthHistory
      mentalHealthHistory
      physicalHealthHistory
      preferredSubstance
      lastUsed
      upcomingCourtDates
      probationOfficerDetails {
        name
        contact
      }
      incarcerationDetails {
        dateOfIncarceration
        charge
        location
      }
    }
  }
`;

function GetHistory() {
  const { loading, error, data } = useQuery(GET_HISTORY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>History</h2>
      <ul>
        {data.histories.map((history) => (
          <li key={history.id}>
            <p>Alcohol or Drug Use: {history.alcoholOrDrugUse ? 'Yes' : 'No'}</p>
            <p>Criminal History: {history.criminalHistory}</p>
            <p>Family Health History: {history.familyHealthHistory}</p>
            <p>Mental Health History: {history.mentalHealthHistory}</p>
            <p>Physical Health History: {history.physicalHealthHistory}</p>
            <p>Preferred Substance: {history.preferredSubstance}</p>
            <p>Last Used: {history.lastUsed}</p>
            <p>Upcoming Court Dates: {history.upcomingCourtDates.join(', ')}</p>
            <p>Probation Officer Details:</p>
            <ul>
              <li>Name: {history.probationOfficerDetails.name}</li>
              <li>Contact: {history.probationOfficerDetails.contact}</li>
            </ul>
            <p>Incarceration Details:</p>
            <ul>
              <li>Date of Incarceration: {history.incarcerationDetails.dateOfIncarceration}</li>
              <li>Charge: {history.incarcerationDetails.charge}</li>
              <li>Location: {history.incarcerationDetails.location}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetHistory;
