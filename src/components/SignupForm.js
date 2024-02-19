import React from 'react';
import { useMutation, gql } from '@apollo/client';

const SIGNUP_MUTATION = gql`
mutation Signup($email: String!, $password: String!, $name: String!, $username: String!) {
  signup(email: $email, password: $password, name: $name, username: $username) {
    token
    user {
      id
      email
      name
      username
    }
  }
}
`;

const SignupForm = () => {
  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION);

  const handleSignup = async (event) => {
    event.preventDefault();
    const { email, password, name, username } = event.target.elements;

    try {
      const { data } = await signup({
        variables: {
          email: email.value,
          password: password.value,
          name: name.value,
          username: username.value,
        },
      });
      console.log('Signup success:', data);
      // Handle success, e.g., redirect to login page or display success message
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <div>
        <label>Email: <input type="email" name="email" required /></label>
      </div>
      <div>
        <label>Password: <input type="password" name="password" required /></label>
      </div>
      <div>
        <label>Name: <input type="text" name="name" required /></label>
      </div>
      <div>
        <label>Username: <input type="text" name="username" placeholder="Username" required /></label>
      </div>
      <button type="submit" disabled={loading}>Sign Up</button>
      {error && <p>Error signing up! {error.message}</p>}
    </form>
  );
};

export default SignupForm;
