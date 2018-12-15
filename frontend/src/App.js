import React, { Fragment } from 'react'
import { Router } from '@reach/router';
import { Query, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag';

import {
  Home,
  Welcome,
  Confirmation,
  Header
} from './components'

const IS_LOGGED_IN = gql`
  query LogInState {
    logIn @client {
      isLoggedIn
    }
  }
`;

const FETCH_VIEWER = gql`
  query FetchViewer {
    viewer {
      id
      email
      confirmed
    }
  }
`

function App() {
  return (
    <ApolloConsumer>
      {client => (
        <Query query={FETCH_VIEWER}>
          {({ data: { viewer } }) => {
            console.log('viewer = ', viewer)
            if (viewer) {
              client.writeData({
                data: { logIn: { __typename: 'LogInState', isLoggedIn: true, user: { __typename: 'User', id: viewer.id, email: viewer.email, confirmed: viewer.confirmed } } }
              })
            }
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
          }}
        </Query>
      )}
    </ApolloConsumer>
  )
}

export default App
