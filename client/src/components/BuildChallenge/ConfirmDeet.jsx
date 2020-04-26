import React from 'react';
import { Formik, Form } from 'formik';
import { Input, Button, Select, IconButton } from '@chakra-ui/core';
import styled from 'styled-components';
import ChangeButton from './ChangeButton.jsx';

const ConfirmDetailsWrapper = styled.div`
  /* ////////////////////////////////// */
  /* ////////// GENERAL CSS /////////// */
  /* ////////////////////////////////// */
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
    margin: 3rem auto;
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

  /* ///////////////////////////// */
  /* ////////// BUTTON /////////// */
  /* ///////////////////////////// */

  .button {
    text-align: center;
    margin-bottom: 10rem;
  }

  /* ///////////////////////////// */
  /* /////////// EDIT //////////// */
  /* ///////////////////////////// */
  .edit {
    position: fixed;
    left: 5%;
    margin-bottom: 10rem;
    display: block;
    bottom: 3%;
  }

  .edit-button {
    background-color: #f4dada;
    color: black;
    padding: 10px;
    box-shadow: 2px 2px 5px #888888;
  }

  /* /////////////////////////// */
  /* ////////// MENU /////////// */
  /* /////////////////////////// */
  .menu {
    width: 100%;
    height: 65px;
    background-color: #ffb6b9;
    position: fixed;
    bottom: 0px;
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
      duration: 0
    };
  }

  // handleSubmit
  handleButton = (event) => {
    if (this.state.page === 1) {
      this.setState({
        page: 2
      });
      console.log(this.state);
    }

    event.preventDefault();
  };
  // handleChange
  handleInputChange = (event) => {
    const target = event.target;
    const value = event.target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  // handle duration
  handleDurationChange = (event) => {
    const target = event.target;
    const value = event.target.value;
    const name = target.name;
    console.log(target);

    if (name === 'minus') {
      this.setState({
        duration: this.state.duration - 1
      });
    } else if (name === 'add') {
      this.setState({
        duration: this.state.duration + 1
      });
    }
  };
  // handleViewer

  render() {
    // return this if they are first creating the challenge or edit has been clicked

    console.log(this.props);
    return (
      <ConfirmDetailsWrapper>
        <div className="title">Confirm Details</div>
        <div className="underbar"></div>

        <div className="name-container">
          <label htmlFor="challengeName" className="name-label">
            Challenge Name:
          </label>
          <div className="name-box">{this.props.challengeName}</div>
        </div>

        <div className="task-container">
          <label htmlFor="task" className="task-label">
            Task:
          </label>
          <div className="task-box">{this.props.task}</div>
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

        <div className="button">
          <ChangeButton text="Submit" submit={this.props.handleButton} />
        </div>

        <div className="edit">
          <Button
            className="edit-button"
            variantColor="red"
            onClick={(e) => this.props.handleEditButton(e)}
          >
            Edit
          </Button>
        </div>

        <div className="menu"></div>
      </ConfirmDetailsWrapper>
    );
  }
}
