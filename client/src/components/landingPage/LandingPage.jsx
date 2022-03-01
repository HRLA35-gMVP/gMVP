import React from 'react'
import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';
import {
    Box,Flex,Popover,PopoverTrigger,PopoverHeader,PopoverBody,PopoverArrow,Image,PseudoBox,Button, Text
  } from '@chakra-ui/core';

  // Landing Page
import Login from './Login.jsx';
import Register from './Register.jsx';
import ForgotPassword from '../password/ForgotPw.jsx';
import CheckEmail from '../password/CheckEmail.jsx';

import {
    StyledPopoverContent,
    StyledButton
  } from '../../styledComponents/ericStyles.js';

const LandingPage = () => {

  return (
    <Box
        position="absolute"
        top="0"
        background="#BEEBE9"
        padding={[2, 4, 6, 8]}
        height="100%"
        width={[
        '100%', // base
        '50%', // 480px upwards
        '25%', // 768px upwards
        '15%' // 992px upwards
        ]}
    >
        <Flex direction="column" alignItems="center" height="100%">
        <Image
            rounded="full"
            width="275px"
            height="100px"
            marginTop="3rem"
            src="https://mvp2020.s3-us-west-1.amazonaws.com/streak3.png"
        />

        <Box
            position="relative"
            background="#F7EEC7"
            boxShadow="1px 2px 3px #A2A2A2"
            width="50%"
            fontSize="xlg"
            textAlign="center"
        >
            Welcome!
        </Box>

        <Popover>
            <PopoverTrigger>
            <StyledButton
                as={Box}
                background="#F7EEC7"
                boxShadow="1px 2px 3px #A2A2A2"
                marginTop="1rem"
                width="40%"
                height="20px"
                fontSize="xs"
                textAlign="center"
            >
                Learn More
            </StyledButton>
            </PopoverTrigger>
            <StyledPopoverContent zIndex={4}>
            <PopoverArrow />
            <PopoverHeader textAlign="center" fontSize="md">
                Join. Connect. Achieve
            </PopoverHeader>
            <PopoverBody textAlign="center" fontSize="sm">
                Connect with family and friends to collaborate on 
                any activity.
            </PopoverBody>
            </StyledPopoverContent>
        </Popover>

        <Image
            rounded="full"
            size="200px"
            height="190px"
            marginTop="10%"
            marginBottom="10%"
            src="https://mvp2020.s3-us-west-1.amazonaws.com/bird.png"
        />
        <Link to="/login" style={{ width: '80%' }}>
            <PseudoBox
            as={Button}
            rounded="20px"
            background="#FFB6BA"
            color="#373737"
            width="100%"
            height="40px"
            marginTop="5%"
            marginBottom="10%"
            fontWeight="semibold"
            textAlign="center"
            _hover={{ bg: '#FFB6BA' }}
            _focus={{ boxShadow: 'outline' }}
            >
            Log In
            </PseudoBox>
        </Link>
        <Link to="/register" style={{ width: '80%' }}>
            <PseudoBox
            as={Button}
            background="#FFB6BA"
            color="#373737"
            rounded="20px"
            width="100%"
            height="40px"
            fontWeight="semibold"
            _hover={{ bg: '#FFB6BA' }}
            _focus={{ boxShadow: 'outline' }}
            >
            Register
            </PseudoBox>
        </Link>
        {/* <Outlet /> */}
        </Flex>
    </Box>

  )
}

export default LandingPage