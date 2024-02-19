import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_EMPLOYMENT = gql`
  query GetEmployment {
    employments {
      id
      currentEmployer
      employmentType
      endDate
      hourlyIncome
      paymentFrequency
      position
      reasonForLeaving
      specialSkills
      startDate
    }
  }
`;

function GetEmployment() {
  const { loading, error, data } = useQuery(GET_EMPLOYMENT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Employment History</h2>
      <ul>
        {data.employments.map((employment) => (
          <li key={employment.id}>
            <p>Current Employer: {employment.currentEmployer}</p>
            <p>Employment Type: {employment.employmentType}</p>
            <p>Start Date: {employment.startDate}</p>
            <p>End Date: {employment.endDate}</p>
            <p>Position: {employment.position}</p>
            <p>Hourly Income: {employment.hourlyIncome}</p>
            <p>Payment Frequency: {employment.paymentFrequency}</p>
            <p>Reason for Leaving: {employment.reasonForLeaving}</p>
            <p>Special Skills: {employment.specialSkills.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetEmployment;
