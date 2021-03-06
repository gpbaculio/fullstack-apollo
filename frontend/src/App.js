import React, { Fragment } from 'react'
import { Router } from '@reach/router';
import { Query } from 'react-apollo'
import gql from 'graphql-tag';

import {
  Home,
  Welcome,
  Confirmation,
  Header,
  Loading
} from './components'

import Todo from './components/Home/Todos/Todo'

export const VIEWER = gql`
  query Viewer($page: Int, $sort: String, $search: String ) {
    __typename
    viewer(page: $page, sort:$sort, search:$search) {
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
    <Query query={VIEWER}>
      {({ data: { viewer }, loading }) => {
        if (loading) {
          return <Loading loading={loading} />
        }
        return (
          <Fragment>
            <Header />
            {viewer ? (
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
