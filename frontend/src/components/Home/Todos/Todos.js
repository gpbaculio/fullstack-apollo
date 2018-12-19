import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Container, Row } from 'reactstrap'
import Pagination from 'react-js-pagination'

import Todo from './Todo'
import Loading from '../../Loading'

const FETCH_TODOS = gql`
  query FetchViewer($page: Int) {
    viewer(page: $page) {
      todos {
        ...Todo
      }
      todosCount
    }
  }
  ${Todo.fragments.todo}
`

class Todos extends Component {

  state = {
    activePage: 1
  }

  onPageChange = page => {
    this.setState({ activePage: page })
  }

  render() {
    const { activePage } = this.state
    return (
      <Query query={FETCH_TODOS} variables={{ page: activePage }} pollInterval={50000}>
        {({ data: { viewer }, loading, error, refetch }) => {
          if (error) {
            return <p>Something went wrong.</p>
          }
          if (viewer) {
            const { todosCount, todos } = viewer
            return (
              <Container>
                <div style={{
                  display: 'grid',
                  width: '100%',
                  gridAutoRows: 'minmax(60vh, auto)'
                }}>
                  <Row>
                    {loading ? (
                      <Loading loading={loading} />
                    ) : (
                        todos.map(todo => (
                          <Todo key={todo.id} todo={todo} />
                        )))}
                  </Row>
                </div>
                <Row className="justify-content-center">
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={9}
                    totalItemsCount={todosCount}
                    pageRangeDisplayed={5}
                    onChange={async (page) => {
                      this.onPageChange(page)
                      await refetch({ page })
                    }}
                  />
                </Row>
              </Container>
            )
          }
          return <Loading loading={loading} />
        }}
      </Query>
    )
  }
}


export default Todos

