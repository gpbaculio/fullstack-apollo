import React, { Component } from 'react'
import { Input, Form, Button } from 'reactstrap'


class Search extends Component {
  
  state = {
    text: ''
  }

  onChange = e => {
    this.setState({ text: e.target.value.trim() })
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const { text } = this.state
    console.log('text = ', text)
  }

  onClearText = () => {
    console.log('clear!')
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
      <Button
        onClick={this.onClearText}
        style={{color: 'red', fontSize: '18px'}}
        className="border-0"
        color="link"
      >
        clear
      </Button>
    </Form>
    )
  }
}

export default Search