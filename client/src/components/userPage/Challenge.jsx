// Dependencies
import React from 'react';

// Chakra
import { Text, SimpleGrid } from '@chakra-ui/core';
import { StyledBoxC } from '../../styledComponents/ericStyles.js';

const Challenge = ({ challengeName, members, duration }) => {
  return (
    <StyledBoxC>
      <SimpleGrid columns="3">
        <Text>{challengeName}</Text>
        <Text>{Object.keys(members).length}</Text>
        <Text>{`${duration} day(s)`}</Text>
      </SimpleGrid>
    </StyledBoxC>
  );
};

export default Challenge;
