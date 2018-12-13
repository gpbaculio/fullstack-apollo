import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container
} from 'reactstrap';

class Header extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  }

  render() {
    const { isOpen } = this.state
    return (
      <Navbar style={{ borderBottom: '1px solid rgba(0,0,0,.125)' }} color="light" light expand="lg">
        <Container className="my-2">
          <NavbarBrand href="/">Glendon Philipp Baculio</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="login-container">
                <Form className="header-login-form" inline>
                  <FormGroup className="header-email-container mr-sm-2 mb-0">
                    <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="something@idk.cool" bsSize="sm" />
                  </FormGroup>
                  <FormGroup className="header-password-container mr-sm-2 mb-0">
                    <Label for="examplePassword" className="mr-sm-2">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" bsSize="sm" />
                  </FormGroup>
                  <Button className="header-login-button" color="primary" size="sm">Log In</Button>
                </Form>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default Header
