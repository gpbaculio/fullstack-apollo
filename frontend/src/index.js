import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';


import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';

const token = localStorage.getItem('token')
const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'Todo': return object._id; // use `_id` as the primary key
      default: return defaultDataIdFromObject(object); // fall back to default handling
    }
  }
});
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:8000/graphql',
    headers: {
      authorization: token,
    },
  }),
  initializers: {
    isLoggedIn: () => false,
    signUp: () => ({
      __typename: 'SignUpState',
      success: false,
      email: ''
    }),
    currentUser: () => ({
      __typename: 'CurrentUser',
      email: '',
      token,
      confirmed: false,
      id: '',
    }),
    pagination: () => ({
      __typename: 'Pagination',
      activePage: 1,
      todosCount: 0
    }),
    todosRefetching: () => false,
    page: () => 1,
    sort: () => 'all'
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App style={{ height: '100%', width: '100%' }} />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
