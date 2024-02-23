import React from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust the path as necessary
import GetPersonalInformation from './GetPersonalInformation'; // Import the GetPersonalInformation component
import GetMedicalInformation from './GetMedicalInformation';
import GetHistory from './GetHistory';
import GetEducation from './GetEducation';
import GetEmployment from './GetEmployment';
import GetAgreementAcknowledgement from './GetAgreementAcknowledgement';

export default function UserData() {
  const { user } = useAuth(); // Assuming useAuth provides access to the authenticated user's data

  return (
    <div>
      <GetPersonalInformation />

    </div>
  );
}
