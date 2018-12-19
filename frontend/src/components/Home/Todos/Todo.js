import React, { Component } from 'react'
import gql from 'graphql-tag'
import {
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap'
import PropTypes from 'prop-types'

import EditTodoTextInput from './EditTodoTextInput'
import { timeDifferenceForDate } from '../../../utils/timeDifference'

class Todo extends Component {

  state = {
    isEditing: false,
  }

  handleIsEditing = () => {
    this.setState(state => ({
      isEditing: !state.isEditing
    }))
  }

  render() {
    const { isEditing } = this.state
    const { todo: { id, complete, createdAt, updatedAt, text } } = this.props
    return (
      <Col lg="4" md="6" sm="12">
        <Card className="mx-auto mt-4 w-75 p-3">
          <CardBody>
            <CardTitle className="d-flex justify-content-between">
              {isEditing ? (
                <EditTodoTextInput
                  id={id}
                  text={text}
                  handleIsEditing={this.handleIsEditing}
                />
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
    id: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
}

Todo.fragments = {
  todo: gql`
    fragment Todo on Todo {
      id: _id #alias
      complete
      createdAt
      updatedAt
      text
    }
  `
}

export default Todo

