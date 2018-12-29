import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'
import isEmail from 'validator/lib/isEmail'

class LogIn extends Component {

  state = {
    data: {
      email: "",
      password: ""
    },
    formErrors: {},
  };

  componentDidUpdate = () => {
    const { data } = this.props
    if (data && data.logIn.error) {
      this.setState({ formErrors: { server: data.logIn.error } })
    }
  }

  onChange = e => {
    const { name, value } = e.target
    this.setState(({ data }) => ({
      data: { ...data, [name]: value }
    }));
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { data } = this.state
    const formErrors = this.validate(data);
    this.setState({ formErrors })
    if (Object.keys(formErrors).length === 0) {
      const { logIn, fetchUser } = this.props
      const { data: { logIn: { token } } } = await logIn({
        variables: { ...data },
      });
      await fetchUser(token)
    }
  };

  validate = ({ email, password }) => {
    const formErrors = {};
    if (!isEmail(email)) {
      formErrors.email = "Invalid email";
    }
    if (!password) {
      formErrors.password = "Can't be blank";
    }
    return formErrors;
  };

  render() {
    const { data, formErrors } = this.state;
    const { loading, viewerFetching } = this.props
    return (
      <Form
        className="header-login-form"
        inline
        onSubmit={e => {
          this.onSubmit(e)
        }}
      >
        {formErrors.server && (
          <div className="alert alert-danger">{formErrors.server}</div>
        )}
        <FormGroup className="header-email-container mr-sm-2 mb-0">
          <Label for="exampleEmail" className="mr-sm-2">Email</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="something@idk.cool"
            bsSize="sm"
            value={data.email}
            onChange={this.onChange}
            className={
              formErrors.email ? "form-control is-invalid" : "form-control"
            }
          />
        </FormGroup>
        <FormGroup className="header-password-container mr-sm-2 mb-0">
          <Label for="examplePassword" className="mr-sm-2">Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="don't tell!"
            bsSize="sm"
            value={data.password}
            onChange={this.onChange}
            className={
              formErrors.password ? "form-control is-invalid" : "form-control"
            }
          />
        </FormGroup>
        <Button
          disabled={viewerFetching || loading}
          className="header-login-button"
          color="primary"
          size="sm"
        >
          Log In
        </Button>
      </Form>
    )
  }
}

LogIn.defaultProps = {
  data: {
    logIn: {
      error: null
    }
  }
}

LogIn.propTypes = {
  data: PropTypes.shape({
    logIn: PropTypes.shape({
      error: PropTypes.string,
    }).isRequired,
  }),
  viewerFetching: PropTypes.bool.isRequired,
  logIn: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default LogIn