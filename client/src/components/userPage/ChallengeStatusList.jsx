import React from 'react';

import { ThemeProvider, CSSReset, Box, Flex, IconButton, Avatar, Text, Stack, Input, Divider, Button, PseudoBox, Icon, Grid} from "@chakra-ui/core";
import customTheme from '../../theme.js';

const ChallengeStatusList = () => {
    const members = [{alias:"JaneDope", streaks: 13, duration: 14}, {alias:"EverEric", streaks: 5, duration: 14}, {alias:"EvelynCats", streaks: 10, duration: 14}, {alias:"Jaredderaj", streaks: 8, duration: 14}];
   

    return (
        <>
        <ThemeProvider theme={customTheme}>
           <CSSReset />
             {members.map((member, i) => (<Grid templateColumns="1fr 2fr 1fr" gap={6} key={i} pl="5%" pr="5%" pb="2%">
             <Box textAlign="center"><Text>{member.alias}</Text></Box>
                 <Box w="100%" bg="blue.500" h="4" mt="5px"><Box w={(member.streaks/member.duration * 100) + "%"} h="4" bg="red.400" /></Box>
                   <Box textAlign="center"><Text>{member.streaks + '/' + member.duration}</Text></Box>
             </Grid>
             )
           

             )}

        </ThemeProvider>
      </>
       
    )
}

export default ChallengeStatusList;