// Dependencies
import { getFriend } from '../../firebase.js';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Chakra
import { Spinner, SimpleGrid } from '@chakra-ui/core';
import { StyledButton } from '../../styledComponents/ericStyles.js';

// Components
import Friend from './Friend.jsx';

class FriendsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: []
    };
  }

  async componentDidMount() {
    const friends = [];
    for (let friend of this.props.friends) {
      if (friend !== this.props.user) {
        let { photoURL, displayName } = await getFriend(friend);
        friends.push({ photoURL, displayName, friend });
      }
    }
    this.setState({ friends });
  }

  render() {
    if (this.state.friends.lengh === 0) {
      return <Spinner size="xl" />;
    } else {
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
          <Link to="/profile">
            <StyledButton>Profile</StyledButton>
          </Link>
        </SimpleGrid>
      );
    }
  }
}

export default FriendsList;

// {
//   photoURL:
//     'https://lh4.googleusercontent.com/-lwkKptiRKDw/AAA…AAAA/AAKWJJN74m7vjEVbDK6ZDz3yUHc250eKVw/photo.jpg',
//   displayName: 'Eric Lau',
//   friend: 'C8gVA1A8ddcaQnawSKoJMVUOTRv2'
// },
// {
//   photoURL: null,
//   displayName: 'Joshie',
//   friend: 'ZGjTOZNOeHcu2g1yJMNp0Q9tjlY2'
// },
// {
//   photoURL: null,
//   displayName: 'Test User #1',
//   friend: 'A3ggHPGhlYYvX0AevZ0tyy2tQEt1'
// },
// {
//   photoURL: null,
//   displayName: 'Test User #2',
//   friend: 'KMgRuIxINMetOinCtvQm3fwxMkb2'
// },
// {
//   photoURL:
//     'https://lh3.googleusercontent.com/a-/AOh14Gi4Y-vK45bZ2bGiwIncc9_GN6DKavRdDYjJKdH_Kw',
//   displayName: 'Eric Lau',
//   friend: 'kQrkwatQaggxtHcWpR2Yc1tlOxT2'
// }
