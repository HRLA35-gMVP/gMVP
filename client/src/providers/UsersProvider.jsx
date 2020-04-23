// Dependencies
import React, { Component, createContext } from 'react';
import { auth, createUserProfileDocument } from '../../../firebase.js';

// Context
export const UserContext = createContext({});

class UsersProvider extends Component {
  state = { user: null };

  unsubscribeFromAuth = null;

  componentDidMount = async () => {
    /**
     * Fires upon user log in or out
     * Return is null, if log out
     * Return is some user object and the unsubscribe function, if log in
     */
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      console.log('userAuth:', userAuth);
      console.log('here');
      const user = await createUserProfileDocument(userAuth);
      this.setState({ user });
    });
  };

  componentWillUnmount = () => {
    console.log('there');
    this.unsubscribeFromAuth();
  };

  render() {
    const { user } = this.state;
    const { children } = this.props;

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
}

export default UsersProvider;
