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
import { VIEWER } from '../../App';
import { CLIENT } from '../Home/Home';

const LOGIN_USER = gql`
  mutation LogIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      error {
        email
        password
      }
      token
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
      <ApolloConsumer>
        {client => (
          <Query query={CLIENT}>
            {({ data: { viewerFetching } }) => (<Query query={VIEWER}>
              {({ data: { viewer } }) => <Navbar
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
                      {viewer ? (
                        <Fragment>
                          <NavItem>
                            {viewer.email}
                          </NavItem>
                          <NavItem>
                            <Button
                              size="sm"
                              color="primary"
                              className="ml-2"
                              onClick={() => {
                                client.writeQuery({
                                  query: VIEWER,
                                  data: {
                                    __typename: 'User',
                                    viewer: null
                                  }
                                })
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
                            onCompleted={async ({ logIn: { token, error } }) => {
                              if (error === null) {
                                localStorage.setItem('token', token)
                              }
                            }}
                          >
                            {(logIn, attr = {}) => {
                              if (attr.error) return <p>An error occurred</p>;

                              const fetchUser = async (token) => {
                                client.writeData({
                                  data: { viewerFetching: true }
                                })
                                await client.query({ // ONLY viewer data, no client field included
                                  query: VIEWER,
                                  fetchPolicy: 'network-only',
                                  context: {
                                    headers: {
                                      "authorization": token
                                    }
                                  },
                                })
                                client.writeData({
                                  data: { viewerFetching: false }
                                })
                              }

                              return (
                                <NavItem className="login-container">
                                  <LogInForm viewerFetching={viewerFetching} fetchUser={fetchUser} {...attr} logIn={logIn} />
                                </NavItem>
                              )
                            }}
                          </Mutation>
                        )}
                    </Nav>
                  </Collapse>
                </Container>
              </Navbar>}
            </Query>
            )}
          </Query>
        )}
      </ApolloConsumer>
    )
  }
}

export default Header
