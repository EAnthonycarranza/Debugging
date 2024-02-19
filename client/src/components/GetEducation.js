import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_EDUCATION = gql`
  query GetEducation {
    educations {
      id
      highestLevelCompleted
      lastSchoolAttended
      yearGraduated
      collegeHoursCompleted
      degree
    }
  }
`;

function GetEducation() {
  const { loading, error, data } = useQuery(GET_EDUCATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Education History</h2>
      <ul>
        {data.educations.map((education) => (
          <li key={education.id}>
            <p>Highest Level Completed: {education.highestLevelCompleted}</p>
            <p>Last School Attended: {education.lastSchoolAttended}</p>
            <p>Year Graduated: {education.yearGraduated}</p>
            <p>College Hours Completed: {education.collegeHoursCompleted}</p>
            <p>Degree: {education.degree}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetEducation;
