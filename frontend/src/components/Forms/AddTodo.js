import React, { Component } from 'react'
import { Form, Input } from 'reactstrap'
import PropTypes from 'prop-types'

class AddTodo extends Component {

  state = {
    text: '',
    loading: false
  }

  onChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    });
  }

  onSubmit = async (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    const { submit } = this.props
    const { text } = this.state
    if(text){
      await submit({ text:text.trim() })
      this.setState({ text: '', loading: false });
    }
  };

  render() {
    const { text, loading } = this.state
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
  submit: PropTypes.func.isRequired,
}

export default AddTodo