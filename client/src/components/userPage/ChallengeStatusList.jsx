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
    members: [
      { alias: 'JaneDope', streaks: 13, duration: 14 },
      { alias: 'EverEric', streaks: 5, duration: 14 },
      { alias: 'EvelynCats', streaks: 10, duration: 14 }
    ],
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
        <React.Fragment>
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
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          {this.state.memers.slice(0, 4).map((memer, i) => (
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
        </React.Fragment>
      );
    }
  }
}

export default ChallengeStatusList;
