import React from 'react';
import { ApolloProvider } from '@apollo/client';
import ApolloClient from './apolloClient';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PersonalInformationList from './components/GetPersonalInformation';
import GetEducation from './components/GetEducation';
import GetEmployment from './components/GetEmployment';
import GetAgreementAcknowledgement from './components/GetAgreementAcknowledgement';
import GetMedicalInformation from './components/GetMedicalInformation';
import GetHistory from './components/GetHistory';
import LoginForm from './components/LoginForm'; // Ensure this is correctly imported
import SignupForm from './components/SignupForm';

function App() {
  return (
    <ApolloProvider client={ApolloClient}>
            <AuthProvider> {/* Wrap your Router with AuthProvider */}
      <Router>
        <div>
          <h1>CSM Test</h1>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/" element={
              <>
                <PersonalInformationList />
                <GetEducation />
                <GetEmployment />
                <GetAgreementAcknowledgement />
                <GetMedicalInformation />
                <GetHistory />
              </>
            } />
            {/* Redirect users to the login page if the route is not recognized */}
            <Route path="*" element={<Navigate replace to="/login" />} />
          </Routes>
        </div>
      </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
