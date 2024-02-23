import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// HTTP link
const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
  // Removed cache initialization from here
});

// Auth link
const authLink = setContext((_, { headers }) => {
  // Retrieve the authentication token from local storage
  const token = localStorage.getItem('token');
  // Return the headers to the context so the HTTP link can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

// Combine the auth link, error link, and HTTP link
const link = from([
  errorLink,
  authLink.concat(httpLink), // Now combining authLink with httpLink and errorLink
]);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
