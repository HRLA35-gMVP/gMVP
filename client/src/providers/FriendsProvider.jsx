// Dependencies
import React, { Component, createContext } from 'react';

// Context
export const FriendsContext = createContext({});

class FriendsProvider extends Component {
  state = { friends: {} };

  addFriend = (uid) => {
    this.setState({ friends: { ...this.state.friends, [uid]: 1 } });
  };

  removeFriend = (uid) => {
    const newFriends = this.state.friends;
    delete newFriends[uid];

    this.setState({ friends: newFriends });
  };

  getFriends = () => Object.keys(this.state.friends);

  render() {
    const { children } = this.props;
    const { friends } = this.state;
    const { addFriend, removeFriend, getFriends } = this;
    const value = { friends, addFriend, removeFriend, getFriends };

    return (
      <FriendsContext.Provider value={value}>
        {children}
      </FriendsContext.Provider>
    );
  }
}

export default FriendsProvider;
