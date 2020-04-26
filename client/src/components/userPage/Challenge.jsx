// Dependencies
import React from 'react';

// Chakra
import { Text, SimpleGrid } from '@chakra-ui/core';
import { StyledBoxC } from '../../styledComponents/ericStyles.js';

const Challenge = ({ name, count, duration, repeats }) => {
  var durationConv;
  if (repeats === 'weekly') {
    durationConv = 'week(s)';
  } else {
    durationConv = 'day(s)';
  }
  return (
    <StyledBoxC>
      <SimpleGrid columns="3">
        <Text>{name}</Text>
        <Text>{count}</Text>
        <Text>{`${duration} ${durationConv}`}</Text>
      </SimpleGrid>
    </StyledBoxC>
  );
};

export default Challenge;
