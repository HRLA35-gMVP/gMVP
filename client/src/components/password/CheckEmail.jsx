// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Flex, Text, Button, Icon } from '@chakra-ui/core';

const CheckEmail = () => {
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
      pl="10%" pr="10%" pt="10%"
    >
      <Flex direction="column" align="center" justify="center" pt="10%">
        <Text pt="18%" textAlign="center" color="#8B8B8B">
          Check your email
        </Text>
        <Icon pt="15%" name="check-circle" size="150px" color="#F7EEC7" />
        <Text pt="15%" pb="18%" align="center" pl="5%" pr="5%" color="#5D5D5D">
          We have sent you a reset password link.
        </Text>
      </Flex>

      {/* <Flex direction="column" align="center" justify="center" pb="20%"> */}
        <Link to="/login">
          <Button
            bg="#FFB6BA"
            rounded="20px"
            fontWeight="semibold"
            color="white"
            w="100%"
            h="40px"
            color="#373737"
            _hover={{ bg: '#FFB6BA' }}
            _focus={{ boxShadow: 'outline' }}
          >
            Log In
          </Button>
        </Link>
        <Box pb="10%"></Box>
        <Link to="/">
          <Button
            bg="#FFB6BA"
            rounded="20px"
            fontWeight="semibold"
            color="white"
            w="100%"
            h="40px"
            color="#373737"
            _hover={{ bg: '#FFB6BA' }}
            _focus={{ boxShadow: 'outline' }}
          >
            Home
          </Button>
        </Link>
        <Box mb="35%"></Box>
      {/* </Flex> */}
    </Box>
  );
};

export default CheckEmail;
