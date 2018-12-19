import React, { Component } from 'react'
import { Input, Form } from 'reactstrap'
import PropTypes from 'prop-types'


class EditTodoTextInput extends Component {

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
      id,
      text: textProp
    } = this.props
    if (text && text !== textProp) {
      console.log('edit todo!')
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

EditTodoTextInput.propTypes = {
  handleIsEditing: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}


export default EditTodoTextInput
