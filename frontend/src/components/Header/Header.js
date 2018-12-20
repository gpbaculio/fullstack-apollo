import React, { Component, Fragment } from 'react'
import { Mutation, ApolloConsumer, Query } from 'react-apollo'
import gql from 'graphql-tag';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  Button
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

const IS_LOGGED_IN_VIEWER = gql`
  query LogInState {
    isLoggedIn @client 
    currentUser @client {
      email
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
      <Navbar
        style={{ borderBottom: '1px solid rgba(0,0,0,.125)' }}
        color="light"
        light
        expand="lg"
      >
        <Container className="my-2">
          <NavbarBrand href="/">Glendon Philipp Baculio</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <ApolloConsumer>
                {client => (
                  <Query query={IS_LOGGED_IN_VIEWER}>
                    {({ data: { isLoggedIn, currentUser } }) => isLoggedIn && currentUser ? (
                      <Fragment>
                        <NavItem>
                          {currentUser.email}
                        </NavItem>
                        <NavItem>
                          <Button
                            size="sm"
                            color="primary"
                            className="ml-2"
                            onClick={() => {
                              client.writeData({
                                data: {
                                  isLoggedIn: false,
                                  currentUser: null
                                }
                              });
                              localStorage.clear();
                            }}
                          >
                            Logout
                          </Button>
                        </NavItem>
                      </Fragment>
                    ) : (
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
                                    user: {
                                      __typename: 'User',
                                      ...logIn.user
                                    }
                                  }
                                }
                              });
                            }
                          }}
                        >
                          {(logIn, attr = {}) => {
                            if (attr.error) return <p>An error occurred</p>;
                            return (
                              <NavItem className="login-container">
                                <LogInForm {...attr} logIn={logIn} />
                              </NavItem>
                            )
                          }}
                        </Mutation>
                      )}
                  </Query>
                )}
              </ApolloConsumer>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default Header
