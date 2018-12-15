import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';

const token = localStorage.getItem('token')
const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:8000/graphql',
    headers: {
      authorization: token,
    },
  }),
  initializers: {
    logIn: () => ({
      __typename: 'LogInState',
      isLoggedIn: false,
      user: {
        __typename: 'User',
        email: '',
        token,
        confirmed: false,
        id: ''
      }
    }),
    signUp: () => ({
      __typename: 'SignUpState',
      success: false,
      email: ''
    }),
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
