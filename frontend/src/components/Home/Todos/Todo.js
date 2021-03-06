import React, { Component } from 'react'
import { Mutation, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Input
} from 'reactstrap'
import PropTypes from 'prop-types'
import { Icon } from 'react-icons-kit'
import { remove } from 'react-icons-kit/fa/remove'

import { UpdateTodoText } from '../../Forms'
import { timeDifferenceForDate } from '../../../utils/timeDifference'

import { VIEWER } from '../../../App'
import { CLIENT } from '../Home'

const UPDATE_TODO_TEXT = gql`
  mutation UpdateTodoText($input: UpdateTodoTextInput!) {
    __typename
    updateTodoText(input: $input) {
      __typename
      todo {
        __typename
        _id
        updatedAt
        text
      }
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($input: DeleteTodoInput!) {
    deleteTodo(input: $input) {
      __typename
      _id # the deleted _id
    }
  }
`;

export const TOGGLE_COMPLETE = gql`
  mutation ToggleComplete($input: ToggleCompleteInput!) {
    toggleComplete(input: $input) {
      __typename
      toggledIds # the deleted _id
    }
  }
`;

class Todo extends Component {

  state = {
    isEditing: false,
  }

  componentDidMount = () => {
    const { subscribeToTodoUpdatedText } = this.props
    subscribeToTodoUpdatedText()
  }

  handleIsEditing = () => {
    this.setState(({ isEditing }) => ({
      isEditing: !isEditing
    }))
  }

  render() {
    const { isEditing } = this.state
    const { todo: { _id, complete, createdAt, updatedAt, text } } = this.props
    return (
      <ApolloConsumer>
        {client => {
          const { viewer } = client.readQuery({ query: VIEWER })
          const { sort } = client.readQuery({ query: CLIENT })
          const removeTodo = () => {
            client.writeQuery({
              query: VIEWER,
              data: {
                __typename: 'Query',
                viewer: {
                  __typename: 'User',
                  ...viewer,
                  todos: viewer.todos.filter(t => t._id !== _id),
                  todosCount: viewer.todosCount - 1
                },
              }
            })
          }
          return (
            <Col lg="4" md="6" sm="12">
              <Card className="mx-auto mt-4 w-75 p-3">
                <CardBody>
                  <CardTitle className="d-flex align-items-center justify-content-between">
                    <Mutation mutation={TOGGLE_COMPLETE}>
                      {toggleComplete => (
                        <Input
                          onChange={async () => {
                            client.writeFragment({ // we render todos on Todos component from client readQuery
                              id: _id,
                              fragment: gql`
                                fragment ToggleCompleteFragment on Todo {
                                  __typename
                                  _id
                                  complete
                                  updatedAt
                                }
                              `,
                              data: {
                                __typename: 'Todo',
                                _id,
                                complete: !complete,
                                updatedAt: new Date().toISOString(),
                              },
                            });
                            await toggleComplete({
                              variables: {
                                input: {
                                  _ids: [_id], // pass as an array because we can use this mutation for multiple todos
                                  complete: !complete // the opposite value of boolean will be set to the selected todo
                                }
                              }
                            })
                            if (sort !== 'all') {
                              console.log('sort', sort)
                              console.log('remove todo!')
                              removeTodo()
                            }
                          }}
                          checked={complete}
                          type="checkbox"
                        />
                      )}
                    </Mutation>
                    {isEditing ? (
                      <Mutation mutation={UPDATE_TODO_TEXT}>
                        {mutate => (
                          <UpdateTodoText
                            _id={_id}
                            text={text}
                            handleIsEditing={this.handleIsEditing}
                            updateTodoText={input =>
                              mutate({
                                variables: { input: { ...input } },
                                optimisticResponse: {
                                  __typename: "Mutation",
                                  updateTodoText: {
                                    __typename: "UpdateTodoTextResponse",
                                    todo: {
                                      __typename: "Todo",
                                      _id,
                                      text: input.text,
                                      updatedAt: new Date().toISOString(),
                                    }
                                  }
                                }
                              })
                            }
                          />
                        )}
                      </Mutation>
                    ) : (
                        <div
                          onDoubleClick={this.handleIsEditing}
                          style={{
                            textDecoration: complete ? 'line-through' : 'none',
                            cursor: 'pointer'
                          }}
                          className="mx-auto"
                        >
                          {text}
                        </div>
                      )}
                    <Mutation
                      mutation={DELETE_TODO}>
                      {(mutate, { client: deleteClient }) => (
                        <Icon
                          onClick={async () => {
                            removeTodo()
                            if (viewer.todosCount > 9) {
                              client.writeData({ data: { showRefresh: true } })
                            }
                            await mutate({
                              variables: { input: { _id } },
                            })
                            const {
                              viewer: deleteViewer,
                            } = deleteClient.readQuery({ query: VIEWER })
                            const {
                              page: deletePage,
                              sort: deleteSort
                            } = deleteClient.readQuery({ query: CLIENT })
                            if (!deleteViewer.todos.length && viewer.todosCount > 1) {
                              deleteClient.writeData({ data: { todosRefetching: true } })
                              await deleteClient.query({
                                query: VIEWER,
                                variables: { page: deletePage, sort: deleteSort },
                                fetchPolicy: 'network-only'
                              })
                              deleteClient.writeData({
                                data: {
                                  todosRefetching: false,
                                  showRefresh: false
                                }
                              })
                            }
                          }}
                          style={{
                            color: 'red',
                            cursor: 'pointer'
                          }}
                          icon={remove}
                        />
                      )}
                    </Mutation>
                  </CardTitle>
                  <CardText
                    className="mt-2 text-center"
                    style={{ borderTop: 'solid black 1px' }}
                  >
                    {createdAt === updatedAt ?
                      `Added ${timeDifferenceForDate(createdAt)}`
                      : `Updated ${timeDifferenceForDate(updatedAt)}`}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          )
        }}
      </ApolloConsumer>
    )
  }
}

Todo.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  subscribeToTodoUpdatedText: PropTypes.func.isRequired,
}

Todo.fragments = {
  todo: gql`
    fragment Todo on Todo {
      __typename
      _id
      complete
      createdAt
      updatedAt
      text
    }
  `
}

export default Todo

