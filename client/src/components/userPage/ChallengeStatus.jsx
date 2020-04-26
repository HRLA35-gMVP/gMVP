// Dependencies
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ChallengeStatusList from './ChallengeStatusList.jsx';

// Chakra
import { Box, Flex, Text, Grid } from '@chakra-ui/core';

const ChallengeStatus = () => {
  return (
    <Box
      bg="#BEEBE9"
      p={[2, 4, 6, 8]}
      height="full"
      width={[
        '100%', // base
        '50%', // 480px upwards
        '25%', // 768px upwards
        '15%' // 992px upwards
      ]}
    >
      <Flex direction="column" align="center" justify="center" pt="4%">
        <Text fontSize="3xl"> Challenge Status</Text>
        <Box bg="#F7EEC7" w="75%" textAlign="center" pt="8px" mb="4px">
          {' '}
        </Box>
        <Box bg="#F7EEC7" w="50%" textAlign="center" mt="5px" pt="5px">
          The3Musketeers
        </Box>
        <Box bg="#F7EEC7" w="50%" textAlign="center" mt="5px" pt="3px">
          PieBakeOff
        </Box>
        <Text
          bg="#BEEBE9"
          fontSize="xl"
          w="90%"
          textAlign="center"
          mt="10px"
          pt="3px"
        >
          Longest Streaks!
        </Text>
      </Flex>
      <Grid
        templateColumns="1fr 2fr 1fr"
        gap={6}
        pt="20px"
        pl="5%"
        pr="5%"
        gridTemplateRows="auto"
      >
        <Box w="100%" h="1" textAlign="center">
          {' '}
          Members{' '}
          <Box bg="#F7EEC7" w="100%" textAlign="center" pt="8px">
            {' '}
          </Box>
        </Box>
        <Box w="100%" h="10" bg="#BEEBE9" />
        <Box w="100%" h="1" textAlign="center">
          {' '}
          Streaks{' '}
          <Box bg="#F7EEC7" w="100%" textAlign="center" pt="8px">
            {' '}
          </Box>
        </Box>
      </Grid>
      <ChallengeStatusList />
      <Flex direction="column" align="center" justify="center" mb="10%">
        <Box
          rounded="lg"
          mt="8%"
          bg="#B0DDDB"
          w="50%"
          textAlign="center"
          justify="center"
          alignItems="center"
          boxShadow="1px 2px 2px #8B8B8B"
        >
          <Text pt="5px">Time Remaining:</Text>
          <Box bg="#E8E8E8" w="35%" mb="15px" ml="auto" mr="auto">
            3 Days
          </Box>
          <Text pt="10px">First Place:</Text>
          <Box w="50%" mb="15px" ml="auto" mr="auto">
            <Text bg="#E8E8E8">JaneDope</Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default ChallengeStatus;
