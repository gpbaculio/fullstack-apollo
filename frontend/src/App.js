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

import Todo from './components/Home/Todos/Todo'

const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn @client 
  }
`;
export const PAGE = gql`
query page {
  page @client 
}
`
export const FETCH_VIEWER = gql`
  query FetchViewer($page: Int) {
    viewer(page: $page) {
      id
      email
      confirmed
      todos {
        ...Todo
      }
      todosCount
    }
  }
  ${Todo.fragments.todo}
`

function App() {
  return (
    <ApolloConsumer>
      {client => {
        const { page } = client.readQuery({ query: PAGE })
        return (
          <Query query={FETCH_VIEWER} variables={{ page }}>
            {({ data: { viewer }, loading }) => {
              client.writeData({ data: { todosRefetching: loading } })
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
              const { isLoggedIn } = client.readQuery({ query: IS_LOGGED_IN })
              if (!isLoggedIn && loading) {
                return <Loading loading={loading} />
              }
              return (
                <Fragment>
                  <Header />
                  {isLoggedIn ? (
                    <Router primary={false} component={Fragment}>
                      <Home path="/" />
                    </Router>
                  ) : (
                      <Router primary={false} component={Fragment}>
                        <Welcome path="/" />
                        <Confirmation path="/confirmation/:token" />
                      </Router>
                    )}
                </Fragment>
              )
            }}
          </Query>
        )
      }}
    </ApolloConsumer>
  )
}

export default App
