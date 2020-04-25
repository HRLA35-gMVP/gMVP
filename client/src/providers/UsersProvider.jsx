// Dependencies
import React, { Component, createContext } from 'react';
import { auth, createUserProfileDocument } from '../firebase.js';

// Context
export const UserContext = createContext({});

class UsersProvider extends Component {
  state = { user: null };

  unsubscribeFromAuth = null;

  componentDidMount = async () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      /**
       * userAuth can come in as null or some truthy value
       * Null is when the user logs out, so we'll set that user state to null
       *   when the user logs out
       *
       * When userAuth is truthy, we want to get the location of the
       *   user's data in the database stored
       * Then we subscribe/listen to any further changes at that location
       *   and update state accordingly
       */
      if (userAuth) {
        const userReference = await createUserProfileDocument(userAuth);
        userReference.onSnapshot((snapshot) => {
          this.setState({ user: { uid: snapshot.id, ...snapshot.data() } });
        });
      } else {
        this.setState({ user: userAuth });
      }
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  };

  render() {
    const { user } = this.state;
    const { children } = this.props;

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
}

export default UsersProvider;
