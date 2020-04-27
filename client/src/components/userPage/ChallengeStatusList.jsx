// Dependencies
import { getChallenge, getUser } from '../../firebase';
import React, { Component } from 'react';

// Chakra
import { Box, Text, Grid, Skeleton, SimpleGrid } from '@chakra-ui/core';

const promiseGen = async (user, currentStreak) => {
  let data = await getUser(user);
  data = { ...data, ...currentStreak, user };
  return data;
};

class ChallengeStatusList extends Component {
  state = {
    members: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    memers: []
  };

  componentDidMount = async () => {
    const challengeData = await getChallenge(this.props.challenge.CUID);

    let promises = Object.keys(challengeData.members).map((member) =>
      promiseGen(member, challengeData.members[member])
    );

    let memers = await Promise.all(promises);

    this.setState({ memers, duration: challengeData.duration });
  };

  UNSAFE_componentWillReceiveProps = async () => {
    await this.componentDidMount();
  };

  render() {
    if (this.state.memers.length === 0) {
      return (
        <Box maxHeight="10rem" height="100%" overflowY="scroll">
          {this.state.members.map((doNotUse, i) => (
            <Grid
              templateColumns="1fr 2fr 1fr"
              gap={6}
              key={i}
              pl="5%"
              pr="5%"
              pb="2%"
            >
              <Box textAlign="center">
                <Text as={Skeleton}>Placeholder</Text>
              </Box>
              <Box w="100%" h="4" mt="5px">
                <Box as={Skeleton} h="4">
                  Placeholder
                </Box>
              </Box>
              <Box textAlign="center">
                <Text as={Skeleton}>Placeholder</Text>
              </Box>
            </Grid>
          ))}
        </Box>
      );
    } else {
      return (
        <Box maxHeight="10rem" height="100%" overflowY="scroll">
          {this.state.memers.map((memer, i) => (
            <SimpleGrid columns={3} gap={6} key={i} pl="5%" pr="5%" pb="2%">
              <Box textAlign="center">
                <Text>{memer.displayName}</Text>
              </Box>
              <Box w="100%" bg="blue.500" h="4" alignSelf="center">
                <Box
                  w={(memer.currentStreak / this.state.duration) * 100 + '%'}
                  h="4"
                  bg="red.400"
                />
              </Box>
              <Box textAlign="center" alignSelf="center">
                <Text>{`${memer.currentStreak}/${this.state.duration}`}</Text>
              </Box>
            </SimpleGrid>
          ))}
        </Box>
      );
    }
  }
}

export default ChallengeStatusList;
