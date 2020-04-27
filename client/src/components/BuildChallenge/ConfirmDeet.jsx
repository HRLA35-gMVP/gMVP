import React from 'react';
import styled from 'styled-components';
import { IconButton, Box, Flex, Textarea } from '@chakra-ui/core';

const ConfirmDetailsWrapper = styled.div`
  /* ////////////////////////////////// */
  /* ////////// GENERAL CSS /////////// */
  /* ////////////////////////////////// */
  position: absolute;
  top: 0;
  height: 100%;
  background-color: #beebe9;
  box-sizing: border-box;

  /* ////////////////////////////////// */
  /* ////////// PAGE HEADER /////////// */
  /* ////////////////////////////////// */
  .title {
    text-align: center;
    background-color: #beebe9;
    font-size: 2rem;
    padding-top: 0.5rem;
  }
  .underbar {
    width: 85%;
    height: 10px;
    background-color: #f6eec7;
    margin-left: auto;
    margin-right: auto;
  }

  /* ///////////////////////////////////// */
  /* ////////// CHALLENGE NAME /////////// */
  /* ///////////////////////////////////// */
  .name-container {
    grid-template-columns: 1fr 1fr;
    padding: 0.5rem;
    margin: 3rem auto;
    padding: 0% 5%;
    display: grid;
  }
  .name-label {
    display: inline-block;
    font-size: 6vw;
    text-align: left;
  }
  .name-box {
    background-color: #f6eec7;
    display: inline-block;
    width: 90%;
    margin-left: 10px;
    font-size: 5vw;
    text-align: center;
    line-height: 2rem;
  }

  .name-box:disabled {
    opacity: 1;
    cursor: default;
  }
  /* /////////////////////////// */
  /* ////////// TASK /////////// */
  /* /////////////////////////// */
  .task-container {
    grid-template-columns: 1fr 3fr;
    padding: 0.5rem;
    margin: 3rem auto;
    padding: 0% 5%;
    display: grid;
  }
  .task-label {
    display: inline-block;
    font-size: 6vw;
    text-align: left;
  }
  .task-box {
    background-color: #f6eec7;
    display: inline-block;
    width: 90%;
    margin-left: 10px;
    font-size: 5vw;
    text-align: center;
    line-height: 2rem;
  }

  .task-box:disabled {
    opacity: 1;
    cursor: default;
  }
  /* //////////////////////////////////////// */
  /* ////////// CHECKIN & DRPDOWN /////////// */
  /* //////////////////////////////////////// */
  .frequency-container {
    grid-template-columns: 1fr 1fr;
    display: grid;
    margin: 3rem auto;
  }

  /* /////////////////////////////// */
  /* ////////// CHECK-IN /////////// */
  /* /////////////////////////////// */
  .checkin-container {
    grid-template-columns: 1fr 1fr;
    padding: 0rem 0rem 0rem 1rem;
  }
  .checkin-label {
    display: inline-block;
    font-size: 6vw;
  }
  .checkin-box {
    background-color: #f6eec7;
    display: inline-block;
    width: 35%;
    margin-left: 10px;
    font-size: 5vw;
    text-align: center;
    line-height: 2rem;
  }

  /* /////////////////////////////// */
  /* ////////// DROPDOWN /////////// */
  /* /////////////////////////////// */
  .typeOfChecks-container {
    grid-template-columns: 1fr 2fr;
    padding: 0rem 1rem 0rem 0rem;
    display: grid;
  }
  .typeOfChecks-label {
    display: inline-block;
    font-size: 6vw;
  }
  .typeOfChecks-dropdown-wrapper {
    grid-template-columns: 1fr;
    width: 100%;
    display: grid;
  }
  .typeOfChecks-dropdown {
    background-color: #f6eec7;
    display: inline-block;
    font-size: 5vw;
    text-align: center;
    line-height: 2rem;
  }

  /* /////////////////////////////// */
  /* ////////// DURATION /////////// */
  /* /////////////////////////////// */
  .duration-container {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    padding: 0% 5%;
    display: grid;
  }
  .duration-label {
    display: inline-block;
    font-size: 6vw;
    text-align: left;
    margin-left: 8px;
  }
  .duration-box-wrapper {
    padding-left: 5px;
  }
  .duration-box {
    width: 100%;
    text-align: center;
    background-color: #f6eec7;
    display: inline-block;
    font-size: 5vw;
    text-align: center;
    line-height: 2rem;
  }
  .add {
    background-color: #f4dada;
    color: black;
    display: inline-block;
    margin: 0px 5px;
  }
  .subtract {
    background-color: #f4dada;
    color: black;
    display: inline-block;
    margin: 0px 5px;
  }
`;

export default class confirmDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeName: '',
      task: '',
      numberOfChecks: 0,
      typeOfChecks: '',
      duration: 0,
      page: 1
    };
  }

  render() {
    // return this if they are first creating the challenge or edit has been clicked

    return (
      <ConfirmDetailsWrapper>
        <div className="title">Confirm Details</div>
        <div className="underbar"></div>
        <div className="name-container">
          <label htmlFor="challengeName" className="name-label">
            Challenge Name:
          </label>
          <Textarea className="name-box" isDisabled opacity="1">
            {this.props.challengeName}
          </Textarea>
        </div>
        <div className="task-container">
          <label htmlFor="task" className="task-label">
            Task:
          </label>
          <Textarea className="task-box" isDisabled opacity="1">
            {this.props.task}
          </Textarea>
        </div>
        <div className="frequency-container">
          <div className="checkin-container">
            <label htmlFor="numberOfChecks" className="checkin-label">
              Check in
            </label>
            <div className="checkin-box">{this.props.numberOfChecks}</div>
          </div>

          <div className="typeOfChecks-container">
            <label htmlFor="typeOfChecks" className="typeOfChecks-label">
              times
            </label>
            <div className="typeOfChecks-dropdown-wrapper">
              <div className="typeOfChecks-dropdown">
                {this.props.typeOfChecks}
              </div>
            </div>
          </div>
        </div>
        <div className="duration-container">
          <label htmlFor="duration" className="duration-label">
            Duration:
          </label>

          <div className="duration-box-wrapper">
            <div className="duration-box">{this.props.duration}</div>
          </div>

          <label htmlFor="duration" className="duration-label">
            {`Day(s)`}
          </label>
        </div>
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
              icon="arrow-left"
              variant="solid"
              bg="#F7EEC7"
              onClick={(e) => this.props.handleEditButton(e)}
            />

            <IconButton
              icon="arrow-right"
              variant="solid"
              bg="#F7EEC7"
              onClick={(e) => this.props.handleButton(e)}
            />
          </Flex>
        </Box>
      </ConfirmDetailsWrapper>
    );
  }
}
