import React, { Fragment } from 'react'
import { Router } from '@reach/router';
import { Query, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag';

import {
  Home,
  Welcome,
  Confirmation,
  Header,
  Loading
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
          {({ data: { viewer }, loading }) => {
            if (loading) {
              return <Loading loading={loading} />
            }
            if (viewer) {
              client.writeData({
                data: {
                  logIn: {
                    __typename: 'LogInState',
                    isLoggedIn: true,
                    user: {
                      __typename: 'User',
                      id: viewer.id,
                      email: viewer.email,
                      confirmed: viewer.confirmed
                    }
                  }
                }
              })
            }
            return (
              <Fragment>
                <Header />
                <Query query={IS_LOGGED_IN}>
                  {({ data: { logIn: { isLoggedIn } } }) => isLoggedIn ? (
                    <Router primary={false} component={Fragment}>
                      <Home path="/" />
                    </Router>
                  ) : (
                      <Router primary={false} component={Fragment}>
                        <Welcome path="/" />
                        <Confirmation path="/confirmation/:token" />
                      </Router>
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
