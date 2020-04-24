import React from 'react';

import { ThemeProvider, CSSReset, Box, Flex, IconButton, Avatar, Text, Stack, Input, Divider, Button} from "@chakra-ui/core";


const EditProfile = () => {

    return (
        <>
        <ThemeProvider>
         <CSSReset />
            <Stack isInline bg='#FFB6BA'pl="4%" pr="4%"width={[
                "100%", // base
                "50%", // 480px upwards
                "25%", // 768px upwards
                "15%", // 992px upwards
            ]} justifyContent="space-between"> 
                    <Button align="center" variant="link" color="#E8E8E8" pb="4%" pt="4%">Cancel</Button>
                    <Text variant="link" color="#fff" fontSize="18px" fontWeight="bold" pb="4%" pt="4%">Edit Profile</Text>
                    <Button variant="link" color="#E8E8E8" pb="4%" pt="4%" >Save</Button>
                    
               
            </Stack>
            <Box bg='#BEEBE9'  p={[2, 4, 6, 8]} height="full"  width={[
                "100%", // base
                "50%", // 480px upwards
                "25%", // 768px upwards
                "15%", // 992px upwards
            ]}>
            <Flex direction="column" align="center" justify="center">
               <Box pt="10%" >
                <Avatar size="xl" /> </Box>
               <Text pt="2%" fontSize={["sm", "md", "lg", "xl"]} color="##373737" align="center" justify="center">user@email.com</Text>
            </Flex>
               <Stack spacing={.25} pt="15%" pb="5%" align="left" pl="5%" pr="5%">
                  <Text fontSize="10px" pb="0" >Alias</Text>
                  <Input variant="unstyled" letterSpacing="wide" lineHeight="1" placeholder="placeholder" mt="0"></Input>
                  <Divider borderColor="#6F6F6F"></Divider>
               </Stack>

               <Stack spacing={.25} pt="8%" pb="20%" align="left" pl="5%" pr="5%">
                  <Text fontSize="10px"  >Password</Text>
                  <Input variant="unstyled" letterSpacing="wide" lineHeight="1" placeholder="********" mt="0"></Input>
                  <Divider borderColor="#6F6F6F"></Divider>
               </Stack>

               <Flex direction="column" align="center" justify="center" pb="30%">
                    <Button variantColor="red" rounded="20px"variant="solid" w="80%">Delete Account</Button>
              </Flex>
            </Box>
            
        </ThemeProvider>
      </>
       
    )
}

export default EditProfile;