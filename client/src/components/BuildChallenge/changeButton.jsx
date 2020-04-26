import React from 'react';
import { Button } from '@chakra-ui/core';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  .button {
    background-color: #f4dada;
    border-radius: 25px;
    width: 50%;
    height: 50px;
    color: black;
    box-shadow: 2px 2px 5px #888888;
  }
`;

export default function changeButton(props) {
  console.log(props.submit);
  return (
    <ButtonWrapper>
      <Button
        className="button"
        variantColor="#ffb6b9"
        onClick={(e) => props.submit(e)}
      >
        {props.text}
      </Button>
    </ButtonWrapper>
  );
}
