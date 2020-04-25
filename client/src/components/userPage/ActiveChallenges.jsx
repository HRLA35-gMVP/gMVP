// Dependencies
import React, { Component } from 'react';

// Chakra
import { Text, SimpleGrid, Skeleton } from '@chakra-ui/core';
import { getChallenge } from '../../firebase.js';
import Challenge from './Challenge.jsx';

class ActiveChallenges extends Component {
  state = {
    challenges: []
  };

  componentDidMount = async () => {
    for (let challengeUID of Object.keys(this.props.user.challenges)) {
      let challengeData = await getChallenge(challengeUID);

      challengeData = {
        challengeUID,
        ...challengeData
      };

      this.setState({ challenges: [...this.state.challenges, challengeData] });
    }
  };

  render() {
    if (
      Object.keys(this.props.user.challenges).length ===
      this.state.challenges.length
    ) {
      return (
        <SimpleGrid columns={1} spacing="0.4rem">
          {this.state.challenges.slice(0, 3).map((challenge) => (
            <Challenge key={challenge.challengeUID} {...challenge} />
          ))}
        </SimpleGrid>
      );
    } else {
      return (
        <SimpleGrid columns={1} spacing="0.4rem">
          {Object.keys(this.props.user.challenges)
            .slice(0, 3)
            .map((doNotUse, index) => (
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
