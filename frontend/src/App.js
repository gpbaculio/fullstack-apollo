import React, { Fragment } from 'react'
import { Router } from '@reach/router';
import { Query } from 'react-apollo'
import gql from 'graphql-tag';

import { Home, Welcome, Confirmation, Header } from './components'

const IS_LOGGED_IN = gql`
  query LogInState {
    logIn @client {
      isLoggedIn
    }
  }
`;

function App() {
  return (
    <Fragment>
      <Header />
      <Query query={IS_LOGGED_IN}>
        {({ data: { logIn: { isLoggedIn } } }) => isLoggedIn ? (
          <Fragment>
            <Router primary={false} component={Fragment}>
              <Home path="/" />
            </Router>
          </Fragment>
        ) : (
            <Fragment>
              <Router primary={false} component={Fragment}>
                <Welcome path="/" />
                <Confirmation path="/confirmation/:token" />
              </Router>
            </Fragment>
          )}
      </Query>
    </Fragment>
  )
}

export default App
