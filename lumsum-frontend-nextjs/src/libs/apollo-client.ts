import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import withApollo from 'next-with-apollo';
import { setContext } from "apollo-link-context";
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { createUploadLink } from 'apollo-upload-client';
const link = createHttpLink({
  fetch, // Switches between unfetch & node-fetch for client & server.
  uri: process.env.NEXT_PUBLIC_API_URL
}); 

const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_API_URL
});

const authLink = setContext((_, { headers }) => {
  let token: any = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

// Export a HOC from next-with-apollo
// Docs: https://www.npmjs.com/package/next-with-apollo
export default withApollo(
  // You can get headers and ctx (context) from the callback params
  // e.g. ({ headers, ctx, initialState })
  ({ initialState }) =>
    new ApolloClient({
      link: typeof window === 'undefined' ? link : authLink.concat(uploadLink).concat(link),
      cache: new InMemoryCache()
        //  rehydrate the cache using the initial data passed from the server:
        .restore(initialState || {})
    })
);
