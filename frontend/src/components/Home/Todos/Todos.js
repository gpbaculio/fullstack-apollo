import React from 'react'
import { ApolloConsumer, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Container, Row } from 'reactstrap'
import Pagination from 'react-js-pagination'
import Loading from '../../Loading'

import Todo from './Todo'

import { FETCH_VIEWER } from '../../../App'

import { SORT } from '../../Filter'

export const REFETCHING = gql`
  query todosRefetching {
    todosRefetching @client 
  }
`;

class Todos extends React.Component {

  state = {
    activePage: 1
  }

  onPageChange = page => {
    this.setState({ activePage: page })
  }

  render() {
    const { activePage } = this.state
    return (
      <ApolloConsumer>
        {client => (
          <Query query={FETCH_VIEWER}>
            {({ data: { viewer }, loading, refetch, error }) => {

              if (error) return `Error!: ${error}`;
              return (
                <Container>
                  <Row style={{ minHeight: '60vh' }}>
                    {(loading) ? (
                      <div className="position-relative w-100">
                        <Loading loading={loading} />
                      </div>
                    ) : (
                        viewer.todos.map(todo => (
                          <Todo key={todo._id} todo={todo} />
                        )))}
                  </Row>
                  <Row className="justify-content-center mt-2">
                    <Pagination
                      activePage={activePage}
                      itemsCountPerPage={9}
                      totalItemsCount={viewer.todosCount}
                      pageRangeDisplayed={5}
                      onChange={async (currentPage) => {
                        this.onPageChange(currentPage)
                        refetch({ page: currentPage })
                      }}
                    />
                  </Row>
                </Container>
              )
            }}
          </Query>
        )}
      </ApolloConsumer>
    )
  }
}

export default Todos
