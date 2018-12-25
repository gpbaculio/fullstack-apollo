import React from 'react'
import { ApolloConsumer, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Container, Row, Alert } from 'reactstrap'
import Pagination from 'react-js-pagination'
import Loading from '../../Loading'

import Todo from './Todo'

import { FETCH_VIEWER } from '../../../App'

export const REFETCHING = gql`
  query todosRefetching {
    todosRefetching @client 
  }
`;

function Todos() {
  return (
    <ApolloConsumer>
      {client => (
        <Container>
          <Query query={FETCH_VIEWER}>
            {({ data: { viewer: { todos, todosCount }, page, sort, todosRefetching }, loading, refetch, error }) => {
              const load = (todosRefetching || loading)
              if (error) return `Error!: ${error}`;
              if (!todosCount && sort === 'all') {
                return (
                  <Row>
                    <Alert color="info">
                      <h5>No todos</h5>
                    </Alert>
                  </Row>
                )
              }
              if (!todosCount) {
                return (
                  <Alert color="info">
                    <h5 className="m-0">{`No ${sort}d todos`}</h5>
                  </Alert>
                )
              }
              return (
                <React.Fragment>
                  <Row style={{ minHeight: '60vh' }}>
                    {load ? (
                      <div className="position-relative w-100">
                        <Loading loading={load} />
                      </div>
                    ) : (
                        todos.map(todo => (
                          <Todo key={todo._id} todo={todo} />
                        )))}
                  </Row>
                  <Row className="justify-content-center mt-2">
                    <Pagination
                      activePage={page}
                      itemsCountPerPage={9}
                      totalItemsCount={todosCount}
                      pageRangeDisplayed={5}
                      onChange={async (currentPage) => {
                        client.writeData({ data: { page: currentPage } });
                        refetch({ page, sort })
                      }}
                    />
                  </Row>
                </React.Fragment>
              )
            }}
          </Query>
        </Container>
      )}
    </ApolloConsumer>
  )
}

export default Todos
