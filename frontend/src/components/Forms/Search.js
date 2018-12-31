import React, { Component } from 'react'
import { Input, Form } from 'reactstrap'
import PropTypes from 'prop-types'

class Search extends Component {
  
  state = {
    text: ''
  }

  onChange = e => {
    const { clearText } = this.props
    this.setState({ text: e.target.value.trim() })
    clearText()
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const { text } = this.state
    const { search }  = this.props
    if(text) {
      await search({ text })
    }
  }


  render() {
    const { text} = this.state
    return (
      <Form
        className="
          form-inline
          justify-content-center
          mx-auto
          mt-4
          mb-xs-1
          mb-md-5
          align-items-start
        "
        onSubmit={this.onSubmit}
      >
      <Input
        placeholder="Search your todos"
        value={text}
        className="form-control w-75"
        onChange={this.onChange}
      />
    </Form>
    )
  }
}

Search.propTypes = {
  clearText: PropTypes.func.isRequired,
}

export default Search