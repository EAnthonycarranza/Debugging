import React from 'react';
import { useMutation, gql } from '@apollo/client';

// Assuming this is your GraphQL mutation
const CREATE_PERSONAL_INFORMATION = gql`
  mutation CreatePersonalInformation($input: PersonalInformationInput!) {
    createPersonalInformation(input: $input) {
      id
      firstName
      lastName
      # Include other fields as needed
    }
  }
`;

function CreatePersonalInfoForm() {
    const [createPersonalInformation, { loading, error }] = useMutation(CREATE_PERSONAL_INFORMATION);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const variables = {
            input: {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                // Add other form fields as needed
            }
        };

        try {
            await createPersonalInformation({ variables });
            // Handle success
        } catch (error) {
            // Handle error
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>An error occurred: {error.message}</p>;

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="firstName"
                placeholder="First Name"
            />
            <input
                name="lastName"
                placeholder="Last Name"
            />
            {/* Add other input fields as necessary */}
            <button type="submit">Submit</button>
        </form>
    );
}

export default CreatePersonalInfoForm;
