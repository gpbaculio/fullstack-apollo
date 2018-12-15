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
    console.log('add submit')
  };

  render() {
    const { text } = this.state
    const { loading } = this.props
    return (
      <Form
        className="
          mx-auto
          mt-4
          mb-xs-1
          mb-md-5
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