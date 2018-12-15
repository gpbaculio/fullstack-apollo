import React, { Component } from 'react'
import { Mutation, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from 'reactstrap';

import { LogInForm } from '../Forms'

const LOGIN_USER = gql`
  mutation LogIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      error
      user {
        id
        confirmed
        email
        token
      }
    }
  }
`;

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
                <ApolloConsumer>
                  {client => (
                    <Mutation
                      mutation={LOGIN_USER}
                      onCompleted={({ logIn }) => {
                        if (logIn.error === null) {
                          localStorage.setItem('token', logIn.user.token)
                          client.writeData({
                            data: {
                              logIn: {
                                __typename: 'LogInState',
                                isLoggedIn: true,
                                user: { ...logIn.user }
                              }
                            }
                          });
                        }
                      }}
                    >
                      {(logIn, attr = {}) => {
                        if (attr.error) return <p>An error occurred</p>;
                        return <LogInForm {...attr} logIn={logIn} />
                      }}
                    </Mutation>
                  )}
                </ApolloConsumer>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default Header
