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
  query IsLoggedIn {
    isLoggedIn @client 
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
                  isLoggedIn: true,
                  currentUser: {
                    __typename: 'CurrentUser',
                    id: viewer.id,
                    email: viewer.email,
                    confirmed: viewer.confirmed,
                  }
                }
              })
            }
            return (
              <Fragment>
                <Header />
                <Query query={IS_LOGGED_IN}>
                  {({ data: { isLoggedIn } }) => isLoggedIn ? (
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
