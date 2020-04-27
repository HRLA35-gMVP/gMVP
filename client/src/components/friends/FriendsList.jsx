// Dependencies
import { getUser } from '../../firebase.js';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Chakra
import {
  Box,
  Divider,
  Flex,
  IconButton,
  SimpleGrid,
  Skeleton,
  Text
} from '@chakra-ui/core';
import { FiChevronsLeft } from 'react-icons/fi';
import { StyledButton } from '../../styledComponents/ericStyles.js';

// Components
import Friend from './Friend.jsx';
import MoreFriends from './MoreFriends.jsx';

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
        <Flex position="absolute" top="0" height="100%" width="100%">
          <Box
            bg="#BEEBE9"
            pt="5%"
            pb="30%"
            pr="8%"
            pl="8%"
            width="100%"
            align="center"
          >
            <Flex
              bg="#F7EEC7"
              pt="0.5rem"
              pb="0.5rem"
              pr="0.25rem"
              pl="0.25rem"
              marginBottom="3rem"
              boxShadow="1px 2px 3px #A2A2A2"
              justify="center"
            >
              <Text textAlign="center" fontSize="md" color="#464646">
                Add Friends to Your Challenge!
              </Text>
            </Flex>

            <SimpleGrid columns="1" spacing="1rem" spacingY="10%" mb="20%">
              {this.state.friends.map((friend) => (
                <Friend
                  key={friend.friend}
                  UID={friend.friend}
                  photoURL={friend.photoURL}
                  displayName={friend.displayName}
                />
              ))}
            </SimpleGrid>
          </Box>

          <Box position="absolute" bottom="0" width="100%">
            <Flex position="relative" justify="center">
              <MoreFriends />
            </Flex>

            <Box paddingBottom="1rem"></Box>

            <Flex
              align="center"
              justify="center"
              justifyContent="space-between"
              bg="#F7EEC7"
              paddingLeft="1rem"
              paddingRight="1rem"
            >
              {window.location.href.slice(window.location.href.length - 7) ===
              'friends' ? (
                <IconButton
                  as={Link}
                  to="/profile"
                  icon={FiChevronsLeft}
                  variant="solid"
                  bg="#F7EEC7"
                />
              ) : (
                <IconButton
                  as={Link}
                  to={`/challenge/view/${this.props.CUID}`}
                  icon={FiChevronsLeft}
                  variant="solid"
                  bg="#F7EEC7"
                />
              )}

              <IconButton variant="solid" bg="#F7EEC7" isDisabled />

              <IconButton variant="solid" bg="#F7EEC7" isDisabled />

              <IconButton variant="solid" bg="#F7EEC7" isDisabled />
            </Flex>
          </Box>
        </Flex>
      );
    } else {
      return (
        <Flex position="absolute" top="0" height="100%" width="100%">
          <Box
            bg="#BEEBE9"
            pt="5%"
            pb="30%"
            pr="8%"
            pl="8%"
            width="100%"
            align="center"
          >
            <Flex
              bg="#F7EEC7"
              pt="0.5rem"
              pb="0.5rem"
              pr="0.25rem"
              pl="0.25rem"
              marginBottom="3rem"
              boxShadow="1px 2px 3px #A2A2A2"
              justify="center"
            >
              <Text textAlign="center" fontSize="md" color="#464646">
                Add Friends to Your Challenge!
              </Text>
            </Flex>

            <SimpleGrid columns="1" spacing="1rem" spacingY="10%" mb="20%">
              {this.props.friends.map((friend, index) => {
                if (index !== this.props.friends.length - 1) {
                  return <Skeleton key={index} height="48px" />;
                }
              })}
            </SimpleGrid>
          </Box>

          <Box position="absolute" bottom="0" width="100%">
            <Flex position="relative" justify="center">
              <MoreFriends />
            </Flex>

            <Box paddingBottom="1rem"></Box>

            <Flex
              align="center"
              justify="center"
              justifyContent="space-between"
              bg="#F7EEC7"
              paddingLeft="1rem"
              paddingRight="1rem"
            >
              {window.location.href.slice(window.location.href.length - 7) ===
              'friends' ? (
                <IconButton
                  as={Link}
                  to="/profile"
                  icon={FiChevronsLeft}
                  variant="solid"
                  bg="#F7EEC7"
                  isDisabled
                />
              ) : (
                <IconButton
                  as={Link}
                  to={`/challenge/view/${this.props.CUID}`}
                  icon={FiChevronsLeft}
                  variant="solid"
                  bg="#F7EEC7"
                  isDisabled
                />
              )}

              <IconButton variant="solid" bg="#F7EEC7" isDisabled />

              <IconButton variant="solid" bg="#F7EEC7" isDisabled />

              <IconButton variant="solid" bg="#F7EEC7" isDisabled />
            </Flex>
          </Box>
        </Flex>
      );
    }
  }
}

export default FriendsList;

{
  /* <SimpleGrid
columns="1"
spacing="1rem"
paddingLeft="1rem"
paddingRight="1rem"
> */
}
