import React, { Component } from 'react'
import isEmail from 'validator/lib/isEmail'
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button
} from 'reactstrap'

class Welcome extends Component {

  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {},
    loading: false,
  };

  onChange = e => {
    const { data } = this.state
    const { name, value } = e.target
    this.setState({
      data: { ...data, [name]: value }
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    console.log('submit!')
  };

  validate = data => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
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
              <CardHeader><h4 className="mb-0">Join the Club!</h4></CardHeader>
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

export default Welcome