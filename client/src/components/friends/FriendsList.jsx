// Dependencies
import { getUser } from '../../firebase.js';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MoreFriends from './MoreFriends.jsx';

// Chakra
import {
  SimpleGrid,
  Skeleton,
  Text,
  Box,
  Divider,
  Flex
} from '@chakra-ui/core';
import { StyledButton } from '../../styledComponents/ericStyles.js';

// Components
import Friend from './Friend.jsx';

const promiseGen = async (friend) => {
  let data = await getUser(friend);
  data.friend = friend;
  return data;
};

class FriendsList extends Component {
  state = {
    friends: []
  };

  componentDidMount = async () => {
    let promises = this.props.friends.map((friend) => {
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
        <div>
          <Box pl="8%" pr="8%" pt="5%" align="center" pb="30%" bg="#BEEBE9" position="relative">
            <Box
              bg="#F7EEC7"
              w="90%"
              pt="10px"
              pb="10px"
              pr="3px"
              pl="3px"
              mr="auto"
              ml="auto"
              mb="10%"
              boxShadow="1px 2px 3px #A2A2A2"
              justify="center"
            >
              <Text textAlign="center" fontSize="md" color="#464646">
                Add Friends to Your Challenge!
              </Text>
            </Box>
            <SimpleGrid columns="1" spacing="1rem" spacingY="10%" mb="20%" >
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
                     <Divider borderColor="gray.400" mt="3px" />
                  <StyledButton>Return</StyledButton>
                </Link>
              ) : (
                <Link to={`/challenge/view/${this.props.CUID}`}>
                     <Divider borderColor="gray.400" mt="3px" />
                  <StyledButton>Return</StyledButton>
                </Link>
              )}
            </SimpleGrid>
         
          </Box>
          <Flex
            position="relative"
            
            direction="column"
            align="center"
         
            mt="20%"
            zIndex="2"
          >
            <MoreFriends />
          </Flex>
          <Box
            bg="#F7EEC7"
            w="100%"
            h="40px"
            bottom="0"
            left="0"
            right="0"
            zIndex="1"
            position="fixed"
          ></Box>
        </div>
      );
    } else {
      return (
        <div>
          <Box pl="8%" pr="8%" pt="5%" align="center" pb="80%" bg="#BEEBE9">
            <Box
              bg="#F7EEC7"
              w="90%"
              pt="10px"
              pb="10px"
              pr="3px"
              pl="3px"
              mr="auto"
              ml="auto"
              boxShadow="1px 2px 3px #A2A2A2"
              justify="center"
            >
              <Text textAlign="center" fontSize="md" color="#464646">
                Add Friends to Your Challenge!
              </Text>
            </Box>
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
            <Divider borderColor="gray.400" mt="3px" />
          </Box>
          <Flex
            position="relative"
            direction="column"
            align="center"
            mb="10%"
            pb="20%"
            pt="20%"
          >
            <MoreFriends />
          </Flex>
          <Box
            bg="#F7EEC7"
            w="100%"
            h="40px"
            bottom="0"
            left="0"
            right="0"
            position="fixed"
          ></Box>
        </div>
      );
    }
  }
}

export default FriendsList;
