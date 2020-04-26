// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Chakra
import { Text, SimpleGrid } from '@chakra-ui/core';
import { StyledBoxC } from '../../styledComponents/ericStyles.js';

const Challenge = ({ CUID, challengeName, memberCount, duration }) => {
  return (
    <Link to={`/challenge/view/${CUID}`}>
      <StyledBoxC>
        <SimpleGrid columns="3">
          <Text>{challengeName}</Text>
          <Text>{memberCount}</Text>
          <Text>{`${duration} day(s)`}</Text>
        </SimpleGrid>
      </StyledBoxC>
    </Link>
  );
};

export default Challenge;
