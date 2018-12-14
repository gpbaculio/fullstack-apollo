import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button
} from 'reactstrap'
import isEmail from 'validator/lib/isEmail'

class SignUp extends Component {

  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {},
    loading: false,
  };

  onChange = e => {
    const { name, value } = e.target
    this.setState(({ data }) => ({
      data: { ...data, [name]: value }
    }));
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { data } = this.state
    const { signUp } = this.props
    const errors = this.validate(data);
    this.setState({ errors })
    if (Object.keys(errors).length === 0) {
      const { email, password } = data
      signUp({ variables: { email, password } });
    }
  };

  validate = ({ email, password }) => {
    const errors = {};
    if (!isEmail(email)) {
      errors.email = "Invalid email";
    }
    if (!password) {
      errors.password = "Can't be blank";
    }
    return errors;
  };

  render() {
    const {
      data,
      errors,
      loading
    } = this.state;
    return (
      <Container style={{ height: "100vh" }}>
        <Row className="align-items-center justify-content-center" style={{ height: "100vh" }}>
          <Col xs="12" sm="8" lg="6">
            <Card>
              <CardHeader>
                <h4 className="mb-0">
                  Join the Club!
                </h4>
              </CardHeader>
              <CardBody>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label className="form-label w-100" htmlFor="email">
                      Email
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={this.onChange}
                        className={
                          errors.email ? "form-control is-invalid" : "form-control"
                        }
                      />
                      <div className="invalid-feedback">{errors.email}</div>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="form-label w-100" htmlFor="password">
                      Password
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={this.onChange}
                        className={
                          errors.password ? "form-control is-invalid" : "form-control"
                        }
                      />
                      <div className="invalid-feedback">{errors.password}</div>
                    </label>
                  </div>
                  <Button
                    disabled={loading}
                    type="submit"
                    color="primary"
                    className="btn-block"
                  >
                    Sign Up
                  </Button>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
}

export default SignUp
