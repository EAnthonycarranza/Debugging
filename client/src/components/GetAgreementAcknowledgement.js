import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_AGREEMENT_ACKNOWLEDGEMENT = gql`
  query GetAgreementAcknowledgement {
    agreementAcknowledgements {
      id
      acknowledgedAt
      acknowledgedBy
      studentSignature
      witnessSignature
    }
  }
`;

function GetAgreementAcknowledgement() {
  const { loading, error, data } = useQuery(GET_AGREEMENT_ACKNOWLEDGEMENT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Agreement Acknowledgements</h2>
      <ul>
        {data.agreementAcknowledgements.map((acknowledgement) => (
          <li key={acknowledgement.id}>
            <p>Acknowledged At: {acknowledgement.acknowledgedAt}</p>
            <p>Acknowledged By: {acknowledgement.acknowledgedBy}</p>
            <p>Student Signature: {acknowledgement.studentSignature}</p>
            <p>Witness Signature: {acknowledgement.witnessSignature}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetAgreementAcknowledgement;
