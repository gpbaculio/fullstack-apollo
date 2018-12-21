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

import { FETCH_VIEWER } from '../../../App'

const UPDATE_TODO_TEXT = gql`
  mutation UpdateTodoText($input: UpdateTodoTextInput!) {
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

const TOGGLE_COMPLETE = gql`
  mutation ToggleComplete($input: ToggleCompleteInput!) {
    toggleComplete(input: $input) {
      __typename
      toggledTodos # the deleted _id
    }
  }
`;

class Todo extends Component {

  state = {
    isEditing: false,
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
      <ApolloConsumer>{client => <Col lg="4" md="6" sm="12">
        <Card className="mx-auto mt-4 w-75 p-3">
          <CardBody>
            <CardTitle className="d-flex align-items-center justify-content-between">
              <Input
                onClick={() => {
                  /** WORK ON MUTATE TOMORROW!! */
                }}
                checked={complete}
                type="checkbox"
              />
              {isEditing ? (
                <Mutation
                  mutation={UPDATE_TODO_TEXT}
                >
                  {mutate => (
                    <UpdateTodoText
                      _id={_id}
                      text={text}
                      handleIsEditing={this.handleIsEditing}
                      updateTodoText={input => {
                        client.writeFragment({ // we render todos on Todos component from client readQuery
                          id: _id,
                          fragment: gql`
                            fragment TodoFragment on Todo {
                              __typename
                              _id
                              updatedAt
                              text
                            }
                          `,
                          data: {
                            __typename: 'Todo',
                            _id,
                            text: input.text,
                            updatedAt: new Date().toISOString(),
                          },
                        });
                        return mutate({
                          variables: { input: { ...input } },
                          optimisticResponse: { /* THIS WILL NOT WORK BECAUSE WE RENDER TODOS ON CLIENT! */
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
                      }}
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
                {mutate => (
                  <Icon
                    onClick={() => {
                      const { viewer } = client.readQuery({ query: FETCH_VIEWER })
                      client.writeQuery({
                        query: FETCH_VIEWER,
                        data: {
                          __typename: 'Query',
                          viewer: {
                            __typename: 'User',
                            ...viewer,
                            todos: viewer.todos.filter(t => t._id !== _id)
                          },
                          todosCount: viewer.todosCount - 1
                        }
                      })
                      return mutate({
                        variables: { input: { _id } },
                      })
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
      </Col>}</ApolloConsumer>

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

