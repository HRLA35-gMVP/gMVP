// Dependencies
import { getFriend } from '../../firebase.js';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Chakra
import { SimpleGrid, Skeleton } from '@chakra-ui/core';
import { StyledButton } from '../../styledComponents/ericStyles.js';

// Components
import Friend from './Friend.jsx';

const promiseGen = async (friend) => {
  let data = await getFriend(friend);
  data.friend = friend;
  return data;
};

class FriendsList extends Component {
  state = {
    friends: []
  };

  componentDidMount = async () => {
    let promises = this.props.friends.map((friend, index) => {
      if (friend !== this.props.user) {
        return promiseGen(friend);
      }
    });

    promises = promises.filter((promise) => promise !== undefined);

    let friends = await Promise.all(promises);

    this.setState({ friends });
  };

  render() {
    if (this.state.friends.length + 1 === this.props.friends.length) {
      return (
        <SimpleGrid
          columns="1"
          spacing="1rem"
          paddingLeft="1rem"
          paddingRight="1rem"
        >
          {this.state.friends.map((friend) => (
            <Friend
              key={friend.friend}
              UID={friend.friend}
              photoURL={friend.photoURL}
              displayName={friend.displayName}
            />
          ))}
          {window.location.href.slice(window.location.href.length - 7) ===
          'friends' ? (
            <Link to="/profile">
              <StyledButton>Return</StyledButton>
            </Link>
          ) : (
            <Link to={`/challenge/view/${this.props.CUID}`}>
              <StyledButton>Return</StyledButton>
            </Link>
          )}
        </SimpleGrid>
      );
    } else {
      return (
        <SimpleGrid
          columns="1"
          spacing="1rem"
          paddingLeft="1rem"
          paddingRight="1rem"
        >
          {this.props.friends.map((friend, index) => {
            if (index !== this.props.friends.length - 1) {
              return <Skeleton key={index} height="48px" />;
            }
          })}
          {window.location.href.slice(window.location.href.length - 7) ===
          'friends' ? (
            <Link to="/profile">
              <StyledButton>Return</StyledButton>
            </Link>
          ) : (
            <Link to={`/challenge/view/${this.props.CUID}`}>
              <StyledButton>Return</StyledButton>
            </Link>
          )}
        </SimpleGrid>
      );
    }
  }
}

export default FriendsList;
