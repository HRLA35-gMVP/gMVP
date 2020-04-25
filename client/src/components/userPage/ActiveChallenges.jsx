// Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Chakra
import { Stack, Text, SimpleGrid, Skeleton } from '@chakra-ui/core';
import { StyledBoxC } from '../../styledComponents/ericStyles.js';
import { getChallenge } from '../../firebase.js';
import Challenge from './Challenge.jsx';

class ActiveChallenges extends Component {
  state = {
    challenges: []
  };

  componentDidMount = async () => {
    console.log('Active Challenges: componentDidMount');

    for (let challengeUID of Object.keys(this.props.user.challenges)) {
      console.log('Challenge UID:', challengeUID);

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
      console.log('State:');
      console.log(this.state.challenges);
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
            .map(() => (
              <Text as={Skeleton}>Placeholder</Text>
            ))}
        </SimpleGrid>
      );
    }
  }
}

export default ActiveChallenges;
