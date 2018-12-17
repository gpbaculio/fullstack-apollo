import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Pagination from 'react-js-pagination'

import Todo from './Todo'
import Loading from '../../Loading'

const FETCH_TODOS = gql`
  query FetchViewer($page: Int!) {
    viewer(page: $page) {
      todos {
        ...Todo
      }
      todosCount
    }
  }
  ${Todo.fragments.todo}
`

const Todos = () => (

  <Query query={FETCH_TODOS} variables={{ page: 1 }}>
    {({ data: { viewer }, loading, error, refetch }) => { // separate this into a different component tomorrow
      if (loading) {
        return <Loading loading={loading} />
      }
      if (error) {
        return <p>Something went wrong.</p>
      }
      return (
        <Fragment>
          {viewer.todos.map(todo => <Todo key={todo.id} todo={todo} />)}
        </Fragment>
      )
    }}
  </Query>
)

export default Todos
