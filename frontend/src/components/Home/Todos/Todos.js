import React from 'react'
import { ApolloConsumer, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Container, Row, Alert, Button } from 'reactstrap'
import Pagination from 'react-js-pagination'
import Loading from '../../Loading'

import Todo from './Todo'

import { VIEWER, CLIENT } from '../../../App'

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
          <Query query={CLIENT}>
            {({
              data: {
                page,
                sort,
                todosRefetching,
                showRefresh
              }
            }) => (
                <Query query={VIEWER}>
                  {({
                    data: {
                      viewer: {
                        todos,
                        todosCount
                      },
                    },
                    loading,
                    refetch,
                    error
                  }) => {
                    const load = (todosRefetching || loading)
                    if (error) return `Error!: ${error}`;
                    if (!load && !todosCount && sort === 'all') {
                      return (
                        <Row>
                          <Alert color="info">
                            <h5>No todos</h5>
                          </Alert>
                        </Row>
                      )
                    }
                    if (!load && !todosCount) {
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
                          ) : todos.map(todo => <Todo key={todo._id} todo={todo} />)}
                        </Row>
                        <Row className="mt-2 d-flex flex-column justify-content-center align-items-center">
                          {showRefresh && (
                            <Button
                              color="primary"
                              className="btn-block w-25"
                              onClick={async () => {
                                await refetch({ page, sort })
                                client.writeData({ data: { showRefresh: false } })
                              }}
                            >
                              Refresh Page
                      </Button>
                          )}
                          <Pagination
                            activePage={page}
                            itemsCountPerPage={9}
                            totalItemsCount={todosCount}
                            pageRangeDisplayed={5}
                            onChange={async (currentPage) => {
                              client.writeData({ data: { page: currentPage } });
                              refetch({ page: currentPage, sort })
                            }}
                          />
                        </Row>
                      </React.Fragment>
                    )
                  }}
                </Query>)}
          </Query>
        </Container>
      )}
    </ApolloConsumer>
  )
}

export default Todos
