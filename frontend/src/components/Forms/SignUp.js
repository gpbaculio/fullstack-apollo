import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
} from 'reactstrap'
import isEmail from 'validator/lib/isEmail'

// const SIGN_UP = gql`
//   query signUp {
//     signUp @client {
//       success
//       message
//     }
//   }
// `;

class SignUp extends Component {

  state = {
    data: {
      email: "",
      password: ""
    },
    formErrors: {},
  };

  componentDidUpdate = () => {
    const { data } = this.props
    if (data && data.signUp.error) {
      const { formErrors } = this.state
      if (formErrors.email !== data.signUp.error) {
        this.setState({ formErrors: { email: data.signUp.error } })
      }
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
      const { signUp } = this.props
      signUp({ variables: { ...data } });
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

  clearAler = () => {
    this.setState({ formErrors: { email: '' } })
  }

  render() {
    const {
      data,
      formErrors,
    } = this.state;
    const { loading } = this.props
    return (
      <Container style={{ height: "75vh" }}>
        <Row className="align-items-center justify-content-center" style={{ height: "75vh" }}>
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
                          formErrors.email ? "form-control is-invalid" : "form-control"
                        }
                      />
                      <div className="invalid-feedback">{formErrors.email}</div>
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
                          formErrors.password ? "form-control is-invalid" : "form-control"
                        }
                      />
                      <div className="invalid-feedback">{formErrors.password}</div>
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

SignUp.defaultProps = {
  data: {
    signUp: {
      error: null
    }
  }
}

SignUp.propTypes = {
  data: PropTypes.shape({
    signUp: PropTypes.shape({
      error: PropTypes.string,
    }).isRequired,
  }),
  signUp: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default SignUp
