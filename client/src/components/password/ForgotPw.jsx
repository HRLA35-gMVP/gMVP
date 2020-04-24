import React from 'react';

import { ThemeProvider, CSSReset, Box, Flex, IconButton, Avatar, Text, Stack, Input, Divider, Button, PseudoBox, Icon} from "@chakra-ui/core";
import customTheme from '../../theme.js';

const ForgotPassword = ({ children }) => {

    return (
        <>
        <ThemeProvider theme={customTheme}>
         <CSSReset />
            <Stack isInline bg='#F7EEC7'pl="4%" pr="4%"width={[
                "100%", // base
                "50%", // 480px upwards
                "25%", // 768px upwards
                "15%", // 992px upwards
            ]} justifyContent="space-between"> 
                    <Button align="center" variant="link" color="#8B8B8B" pb="4%" pt="4%">Cancel</Button>
                    <Text variant="link" color="#464646" fontSize="18px" fontWeight="bold" pb="4%" pt="4%">Forgot Password</Text>
                    <Button variant="link" color="#E8E8E8" pb="4%" pt="4%" ></Button>
            </Stack>

            <Box bg='#BEEBE9'  p={[2, 4, 6, 8]} height="full"  width={[
                "100%", // base
                "50%", // 480px upwards
                "25%", // 768px upwards
                "15%", // 992px upwards
            ]}>
            <Flex direction="column" align="center" justify="center">
               <Icon pt="20%"name="lock" size="200px" color="#F7EEC7" />
            </Flex>


               <Stack spacing={.25} pt="30%" pb="20%" align="left" pl="5%" pr="5%">
                  <Input variant="unstyled" letterSpacing="wide" lineHeight="1" placeholder="Type your email" mt="0"></Input>
                  <Divider borderColor="#6F6F6F"></Divider>
               </Stack>

               <Flex direction="column" align="center" justify="center" pb="30%">
                    {/* <Button variantColor={customTheme.colors.brand[700]} rounded="20px"variant="solid" w="80%">Send</Button> */}
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
                    _hover={{ bg: "#FFB6BA" }}
                    _focus={{ boxShadow: "outline" }}>Send
                    </PseudoBox>
              </Flex>
            </Box>
            
        </ThemeProvider>
      </>
       
    )
}

export default ForgotPassword;