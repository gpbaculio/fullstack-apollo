import React, { Component } from 'react'
import { Form, Input } from 'reactstrap'
import PropTypes from 'prop-types'

class AddTodo extends Component {

  state = {
    text: '',
  }

  onChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    });
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const { addTodo } = this.props
    const { text } = this.state
    if(text){
      await addTodo({ variables: { text:text.trim() } })
      this.setState({ text: '' });
    }
  };

  render() {
    const { text } = this.state
    const { loading } = this.props
    return (
      <Form
        className="
          mx-auto
          my-3
          align-items-start
        "
        onSubmit={this.onSubmit}
      >
        <Input
          type="text"
          id="text"
          name="text"
          value={text}
          placeholder="Add Todo"
          disabled={loading}
          onChange={this.onChange}
          className="form-control w-75"
        />
      </Form>
    )
  }
}

AddTodo.propTypes = {
  loading: PropTypes.bool.isRequired,
}

export default AddTodo