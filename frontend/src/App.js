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

export const FETCH_VIEWER = gql`
  query FetchViewer($page: Int, $sort: String) {
    __typename
    viewer(page: $page, sort:$sort) {
      __typename
      id
      email
      confirmed
      todos {
        __typename
        ...Todo
      }
      todosCount
    }
  }
  ${Todo.fragments.todo}
`

function App() {
  return (
    <Query query={FETCH_VIEWER}>
      {({ data: { viewer }, loading }) => {
        if (loading) {
          return <Loading loading={loading} />
        }
        return (
          <Fragment>
            <Header />
            {viewer.id ? (
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
}

export default App
