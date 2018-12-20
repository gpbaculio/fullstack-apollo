import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'reactstrap'

class UpdateTodoTextInput extends Component {

  state = {
    text: ''
  };

  componentDidMount = () => {
    const { text } = this.props
    this.setState({ text })
  }

  onSubmit = e => {
    e.preventDefault()
    const { text } = this.state
    const {
      handleIsEditing,
      _id,
      text: textProp,
      updateTodoText
    } = this.props
    if (text && text !== textProp) {
      updateTodoText({ _id, text })
    } else {
      this.setState({ text: textProp })
    }
    handleIsEditing()
  }

  onChange = e => {
    const { value } = e.target
    this.setState({
      text: value
    });
  }

  render() {
    const { text } = this.state
    return (
      <Form onSubmit={this.onSubmit}>
        <Input
          type="text"
          value={text}
          onChange={this.onChange}
          onBlur={this.onSubmit}
        />
      </Form>
    )
  }
}

UpdateTodoTextInput.propTypes = {
  handleIsEditing: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  updateTodoText: PropTypes.func.isRequired,
}


export default UpdateTodoTextInput

