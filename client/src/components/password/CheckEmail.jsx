// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Flex, Text, PseudoBox, Icon } from '@chakra-ui/core';

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
    >
      <Flex direction="column" align="center" justify="center" pt="15%">
        <Text pt="20%" align="center" color="#8B8B8B">
          Check your email
        </Text>
        <Icon pt="8%" name="check-circle" size="150px" color="#F7EEC7" />
        <Text pt="12%" pb="20%" align="center" pl="5%" pr="5%" color="#8B8B8B">
          We have sent you a reset password link.
        </Text>
      </Flex>

      <Flex direction="column" align="center" justify="center" pb="30%">
        <Link to="/login">
          <PseudoBox
            as="button"
            bg="#FFB6BA"
            py={2}
            px={4}
            ml={3}
            rounded="20px"
            fontWeight="semibold"
            color="white"
            w="80%"
            h="40px"
            color="#373737"
            _hover={{ bg: '#FFB6BA' }}
            _focus={{ boxShadow: 'outline' }}
          >
            Login
          </PseudoBox>
        </Link>
        <Link to="/">
          <PseudoBox
            as="button"
            bg="#FFB6BA"
            py={2}
            px={4}
            ml={3}
            rounded="20px"
            fontWeight="semibold"
            color="white"
            w="80%"
            h="40px"
            color="#373737"
            _hover={{ bg: '#FFB6BA' }}
            _focus={{ boxShadow: 'outline' }}
          >
            Home
          </PseudoBox>
        </Link>
      </Flex>
    </Box>
  );
};

export default CheckEmail;
