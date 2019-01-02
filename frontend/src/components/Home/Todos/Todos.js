import React from 'react'
import { ApolloConsumer, Query } from 'react-apollo'
import { Container, Row, Alert, Button } from 'reactstrap'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Pagination from 'react-js-pagination'
import Loading from '../../Loading'

import Todo from './Todo'

import { VIEWER } from '../../../App'
import { CLIENT } from '../Home'

const TODO_UPDATED_TEXT_SUBSCRIPTION = gql`
  subscription todoUpdatedText {
    todoUpdatedText {
      __typename
        _id
        text
        complete
        createdAt
        updatedAt
    }
  }
`;

class Todos extends React.Component {

  componentDidMount = () => {
    const { subscribeToNewTodos } = this.props
    subscribeToNewTodos()
  }

  render() {
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
                        viewer,
                      },
                      loading,
                      refetch,
                      error,
                      subscribeToMore
                    }) => {
                      const load = (todosRefetching || loading)
                      if (error) return `Error!: ${error}`;
                      if (!load && !viewer.todosCount && sort === 'all') {
                        return (
                          <Row>
                            <Alert color="info">
                              <h5>No todos</h5>
                            </Alert>
                          </Row>
                        )
                      }
                      if (!load && !viewer.todosCount) {
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
                            ) : viewer.todos.map(todo => (
                              <Todo
                                key={todo._id}
                                todo={todo}
                                subscribeToTodoUpdatedText={() => subscribeToMore({
                                  document: TODO_UPDATED_TEXT_SUBSCRIPTION,
                                  updateQuery: (prev, { subscriptionData }) => {
                                    if (!subscriptionData.data) return prev;
                                    const updatedTodoText = subscriptionData.data.todoUpdatedText;
                                    return ({
                                      __typename: 'Query',
                                      viewer: {
                                        ...viewer,
                                        __typename: 'User',
                                        todos: [...viewer.todos].map(t => {
                                          if (t._id === updatedTodoText._id) {
                                            return updatedTodoText
                                          }
                                          return t
                                        }),
                                      },
                                    });
                                  }
                                })}
                              />
                            ))}
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
                              totalItemsCount={viewer.todosCount}
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
}

Todos.propTypes = {
  subscribeToNewTodos: PropTypes.func.isRequired,
}

export default Todos
