// Dependencies
import styled from 'styled-components';
import {
  Stack,
  Text,
  Box,
  AccordionItem,
  AccordionHeader,
  PopoverContent,
  Button,
  IconButton
} from '@chakra-ui/core';

const StyledStack = styled(Stack)`
  background: #beebe9;
  padding: 1rem 1rem 0 1rem;
  text-align: center;
`;

const StyledAccItem = styled(AccordionItem)`
  background: #f7fafc;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
`;

const StyleAccHeader = styled(AccordionHeader)`
  :hover {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    background: #f7fafc;
  }
  :focus {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    outline: 0 !important;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
  }

  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: transparent;
  -webkit-user-select: transparent;
  -khtml-user-select: transparent;
  -moz-user-select: transparent;
  -ms-user-select: transparent;
  user-select: transparent;
`;

const StyledBox = styled(Box)`
  background: #9be3de;
  border-radius: 0.5rem;
  padding: 0.75rem;
`;

const StyledText = styled(Text)`
  background: #f7fafc;
  border-radius: 0.5rem;
`;

const StyledPopoverContent = styled(PopoverContent)`
  :focus {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    outline: 0 !important;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
  }
`;

const StyledButton = styled(Button)`
  :focus {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    outline: 0 !important;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
  }
`;

const StyledIconButton = styled(IconButton)`
  :focus {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    outline: 0 !important;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
  }
`;

export {
  StyledStack,
  StyledAccItem,
  StyleAccHeader,
  StyledBox,
  StyledText,
  StyledPopoverContent,
  StyledButton,
  StyledIconButton
};
