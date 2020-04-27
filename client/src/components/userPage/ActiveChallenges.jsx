// Dependencies
import React, { Component } from 'react';
import { getChallenge } from '../../firebase.js';

// Chakra
import { Box, Text, SimpleGrid, Skeleton } from '@chakra-ui/core';
import Challenge from './Challenge.jsx';

const promiseGen = async (CUID) => {
  let data = await getChallenge(CUID);
  data.challengeUID = CUID;
  return data;
};

class ActiveChallenges extends Component {
  state = {
    challenges: []
  };

  componentDidMount = async () => {
    let promises = this.props.user.challenges.map((challenge) =>
      promiseGen(challenge)
    );

    let challenges = await Promise.all(promises);

    this.setState({ challenges });
  };

  render() {
    if (this.props.user.challenges.length === this.state.challenges.length) {
      return (
        <Box maxH="10rem" height="100%" overflowY="scroll">
          <SimpleGrid columns={1} spacing="0.4rem">
            {this.state.challenges.map((challenge) => (
              <Challenge key={challenge.challengeUID} {...challenge} />
            ))}
          </SimpleGrid>
        </Box>
      );
    } else {
      return (
        <SimpleGrid columns={1} spacing="0.4rem">
          {this.props.user.challenges.slice(0, 3).map((doNotUse, index) => (
            <Text key={index} as={Skeleton}>
              Placeholder
            </Text>
          ))}
        </SimpleGrid>
      );
    }
  }
}

export default ActiveChallenges;
