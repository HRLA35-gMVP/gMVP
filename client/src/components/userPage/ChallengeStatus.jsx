// Dependencies
import { challengeCheckIn } from '../../firebase.js';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../providers/UsersProvider.jsx';
import { ChallengeContext } from '../../providers/ChallengeProvider.jsx';

// ChakraUI
import {
  Box,
  IconButton,
  Heading,
  Flex,
  SimpleGrid,
  Stack,
  Textarea
} from '@chakra-ui/core';
import styled from '@emotion/styled';
import { StyledText } from '../../styledComponents/ericStyles.js';
import { FiPlus, FiUser, FiEdit3 } from 'react-icons/fi';

// Components
import ChallengeStatusList from './ChallengeStatusList.jsx';

const ChallengeStatus = () => {
  const challenge = useContext(ChallengeContext);
  const user = useContext(UserContext);

  return (
    <Flex
      position="absolute"
      top="0"
      height="100%"
      width="100%"
      bg="#BEEBE9"
      justifyContent="center"
      overflowY="hidden"
    >
      <Box width="100%">
        <Flex
          direction="column"
          align="center"
          justify="center"
          paddingTop="4%"
        >
          <Stack
            width="100%"
            align="center"
            justify="center"
            justifyContent="center"
            spacing="0.5rem"
          >
            <Heading as="h2" textAlign="center">
              Challenge Status
            </Heading>

            <Box
              bg="#F7EEC7"
              width="85%"
              textAlign="center"
              paddingTop="0.35rem"
            />

            <Wrapper>
              <Textarea
                className="areaOfText"
                bg="#F7EEC7"
                size="lg"
                value={challenge.challengeName}
                isDisabled
              />
            </Wrapper>

            <Wrapper2>
              <Textarea
                className="areaOfText"
                bg="#F7EEC7"
                size="sm"
                value={challenge.task}
                isDisabled
              />
            </Wrapper2>

            <Heading
              as="h4"
              size="md"
              textAlign="center"
              paddingBottom="0.25rem"
            >
              Longest Streaks!
            </Heading>
          </Stack>
        </Flex>
        <SimpleGrid
          columns={3}
          width="100%"
          paddingLeft="1rem"
          paddingRight="1rem"
        >
          <Box width="100%" h="1" textAlign="center">
            <Heading as="h6" size="sm">
              Members
            </Heading>
            <Box
              bg="#F7EEC7"
              width="100%"
              textAlign="center"
              paddingTop="0.35rem"
            />
          </Box>
          <Box width="100%" h="10" bg="#BEEBE9" />
          <Box width="100%" h="1" textAlign="center">
            <Heading as="h6" size="sm">
              Streaks
            </Heading>
            <Box
              bg="#F7EEC7"
              width="100%"
              textAlign="center"
              paddingTop="0.35rem"
            />
          </Box>
        </SimpleGrid>
        <ChallengeStatusList challenge={challenge} />
        <Flex direction="column" align="center" justify="center" mb="10%">
          <Box
            rounded="lg"
            mt="8%"
            bg="#B0DDDB"
            width="50%"
            textAlign="center"
            boxShadowidth="1px 2px 2px #8B8B8B"
            padding="0.7rem"
          >
            <Stack spacing="0.45rem">
              <Box>
                <Heading as="h6" size="sm">
                  Time Remaining
                </Heading>
                <StyledText>{challenge.duration} Day(s)</StyledText>
              </Box>
              <Box>
                <Heading as="h6" size="sm">
                  First Place
                </Heading>
                <StyledText>{challenge.firstPlace}</StyledText>
              </Box>
            </Stack>
          </Box>
        </Flex>
      </Box>
      <Box
        position="absolute"
        bottom="0"
        width="100%"
        paddingLeft="1rem"
        paddingRight="1rem"
        bg="#F7EEC7"
      >
        <Flex align="center" justify="center" justifyContent="space-between">
          <IconButton
            as={Link}
            to={`/challenge/invite/${challenge.CUID}`}
            icon={FiPlus}
            variant="solid"
            bg="#F7EEC7"
          />

          <IconButton
            as={Link}
            icon={FiUser}
            to="/profile"
            variant="solid"
            bg="#F7EEC7"
          />

          <IconButton
            icon={FiEdit3}
            variant="solid"
            bg="#F7EEC7"
            onClick={async () => {
              await challengeCheckIn(challenge.CUID, user.uid);
            }}
          >
            Check-In
          </IconButton>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ChallengeStatus;

const Wrapper = styled(Box)`
  background: #f7eec7;
  width: 70%;
  text-align: center;

  .areaOfText {
    text-align: center;
  }

  .areaOfText:disabled {
    opacity: 1;
    cursor: default;
  }
`;

const Wrapper2 = styled(Box)`
  background: #f7eec7;
  width: 50%;
  text-align: center;

  .areaOfText {
    text-align: center;
  }

  .areaOfText:disabled {
    opacity: 1;
    cursor: default;
  }
`;
