import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap'
import PropTypes from 'prop-types'

import { UpdateTodoText } from '../../Forms'
import { timeDifferenceForDate } from '../../../utils/timeDifference'

const UPDATE_TODO_TEXT = gql`
  mutation UpdateTodoText($input: UpdateTodoTextInput!) {
    updateTodoText(input: $input) {
      __typename
      todo {
        __typename
        _id
        text
        complete
        createdAt
        updatedAt
      }
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
      <Col lg="4" md="6" sm="12">
        <Card className="mx-auto mt-4 w-75 p-3">
          <CardBody>
            <CardTitle className="d-flex justify-content-between">
              {isEditing ? (
                <Mutation
                  mutation={UPDATE_TODO_TEXT}
                >
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
                                updatedAt: new Date().toISOString()
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
      _id
      complete
      createdAt
      updatedAt
      text
    }
  `
}

export default Todo
