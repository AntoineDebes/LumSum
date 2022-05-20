import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import { AuthProvider } from './context/AuthContext';
import GlobalStyle from './styled/global-style';
import client from './config/apollo-client';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <GlobalStyle />
          <Routes />
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
