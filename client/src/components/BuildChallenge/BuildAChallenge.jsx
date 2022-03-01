// Dependencies + Functionality
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  auth,
  createChallengeProfileDocument,
  setUserChallenges
} from '../../firebase.js';

// Chakra
import styled from 'styled-components';
import {
  Input,
  Select,
  IconButton,
  Box,
  Flex,
  Textarea
} from '@chakra-ui/core';

// Components
import ConfirmDetailsPage from './ConfirmDeet.jsx';

const BuildChallengeWrapper = styled.div`
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
    box-shadow: 5px 5px 5px #888888;
    height: 10vw;
    font-size: 5vw;
    border-radius: 0px;
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
    box-shadow: 5px 5px 5px #888888;
    height: 10rem;
    font-size: 5vw;
    border-radius: 0px;
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
    box-shadow: 5px 5px 5px #888888;
    height: 10vw;
    font-size: 5vw;
    border-radius: 0px;
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
    box-shadow: 5px 5px 5px #888888;
    height: 10vw;
    font-size: 5vw;
    border-radius: 0px;
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
  }
  .duration-box-wrapper {
    padding-left: 5px;
  }
  .duration-box {
    width: 100%;
    text-align: center;
    background-color: #f6eec7;
    display: inline-block;
    height: 10vw;
    font-size: 5vw;
  }
  .add {
    background-color: #f4dada;
    color: black;
    display: inline-block;
    box-shadow: 2px 2px 5px #888888;
    margin: 0px 5px;
  }
  .subtract {
    background-color: #f4dada;
    color: black;
    display: inline-block;
    box-shadow: 2px 2px 5px #888888;
    margin: 0px 5px;
  }
`;

export default class challengeViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      challengeName: '',
      task: '',
      numberOfChecks: 0,
      typeOfChecks: 'daily',
      duration: 0,
      page: 1,
      CUID: ''
    };
  }

  // handleSubmit
  handleButton = async (event) => {
    event.preventDefault();

    if (this.state.page === 1) {
      this.setState({ page: 2 });
    } else if (this.state.page === 2) {
      const CUID = await createChallengeProfileDocument(this.state);

      await setUserChallenges(CUID, auth.currentUser.uid);

      this.setState({ page: 3, CUID });
    }
  };

  // handleChange
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleEditButton = (event) => {
    event.preventDefault();
    if (this.state.page === 2) {
      this.setState({ page: 1 });
    }
  };

  // handle duration
  handleDurationChange = (event) => {
    if (event.target.name === 'minus') {
      this.setState({ duration: this.state.duration - 1 });
    } else if (event.target.name === 'add') {
      this.setState({ duration: this.state.duration + 1 });
    }
  };

  render() {
    // return this if they are first creating the challenge or edit has been clicked

    if (this.state.page === 1) {
      return (
        <BuildChallengeWrapper>
          <div className="title">Build A Challenge</div>
          <div className="underbar"></div>

          <form>
            <div className="name-container">
              <label htmlFor="challengeName" className="name-label">
                Challenge Name:
              </label>
              <Input
                className="name-box"
                name="challengeName"
                value={this.state.challengeName}
                onChange={(e) => this.handleInputChange(e)}
              />
            </div>

            <div className="task-container">
              <label htmlFor="task" className="task-label">
                Task:
              </label>
              <Textarea
                className="task-box"
                name="task"
                value={this.state.task}
                onChange={(e) => this.handleInputChange(e)}
              />
            </div>

            <div className="frequency-container">
              <div className="checkin-container">
                <label htmlFor="numberOfChecks" className="checkin-label">
                  Check in
                </label>
                <Input
                  className="checkin-box"
                  name="numberOfChecks"
                  value={this.state.numberOfChecks}
                  onChange={(e) => this.handleInputChange(e)}
                />
              </div>

              <div className="typeOfChecks-container">
                <label htmlFor="typeOfChecks" className="typeOfChecks-label">
                  times
                </label>
                <div className="typeOfChecks-dropdown-wrapper">
                  <Select
                    placeholder=""
                    className="typeOfChecks-dropdown"
                    name="typeOfChecks"
                    value={this.state.typeOfChecks}
                    onChange={(e) => this.handleInputChange(e)}
                  >
                    <option value="daily">daily</option>
                    <option value="weekly">weekly</option>
                  </Select>
                </div>
              </div>
            </div>

            <div className="duration-container">
              <label htmlFor="duration" className="duration-label">
                Duration:
              </label>
              <IconButton
                className="subtract"
                icon="minus"
                size="sm"
                isRound="true"
                variantColor="red"
                width={{ md: 40 }}
                name="minus"
                onClick={(e) => this.handleDurationChange(e)}
              ></IconButton>
              <div className="duration-box-wrapper">
                <Input
                  className="duration-box"
                  name="duration"
                  value={this.state.duration}
                  onChange={(e) => this.handleInputChange(e)}
                />
              </div>
              <IconButton
                className="add"
                icon="add"
                size="sm"
                isRound="true"
                variantColor="red"
                width={{ md: 40 }}
                name="add"
                onClick={(e) => this.handleDurationChange(e)}
              ></IconButton>
              <label htmlFor="duration" className="duration-label">
                Days
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
              <Flex
                align="center"
                justify="center"
                justifyContent="space-between"
              >
                <IconButton
                  icon="arrow-left"
                  as={Link}
                  to="/profile"
                  variant="solid"
                  bg="#F7EEC7"
                />

                <IconButton
                  icon="arrow-right"
                  variant="solid"
                  bg="#F7EEC7"
                  onClick={(e) => this.handleButton(e)}
                />
              </Flex>
            </Box>
          </form>
        </BuildChallengeWrapper>
      );
    } else if (this.state.page === 2) {
      // return this if they have clicked "next"
      return (
        <ConfirmDetailsPage
          challengeName={this.state.challengeName}
          task={this.state.task}
          numberOfChecks={this.state.numberOfChecks}
          typeOfChecks={this.state.typeOfChecks}
          duration={this.state.duration}
          handleButton={this.handleButton}
          handleEditButton={this.handleEditButton}
        />
      );
    } else {
      // return this if they have clicked "submit"
      return <Navigate to={`/challenge/view/${this.state.CUID}`} />;
    }
  }
}

///////////////////////////////////////////// ORIGINAL FORMIK CODE //////////////////////////////////
// const buildChallenge = (props) => {
//   return (
//     <BuildChallengeWrapper>
//       {/* <div className="title">Build A Challenge</div>
//       <div className="underbar"></div>

//       <Formik
//         initialValues={{
//           challengeName: '',
//           task: '',
//           checkIn: 0,
//           timeSpan: 0,
//           duration: 0
//         }}
//         onSubmit={(data) => {
//           console.log(data);
//         }}
//       > */}
//         {({ values, handleChange, handleBlur, handleSubmit }) => (
//           <Form onSubmit={handleSubmit}>
//             {/* <div className="basic-container">
//               <label htmlFor="challengeName" className="input-label">
//                 Challenge Name:
//               </label>
//               <Input
//                 className="input-box"
//                 name="challengeName"
//                 value={values.challengeName}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//             </div> */}
// {/*
//             <div className="basic-container">
//               <label htmlFor="task" className="input-label">
//                 Task:
//               </label>
//               <Input
//                 className="input-box"
//                 name="task"
//                 value={values.task}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//             </div> */}

//             {/* <div className="basic-container">
//               <label htmlFor="checkIn" className="input-label">
//                 Check in:
//               </label>
//               <Input
//                 className="input-box"
//                 name="checkIn"
//                 value={values.checkIn}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//             </div> */}

//             {/* <div className="basic-container">
//               <label htmlFor="timeSpan" className="input-label">
//                 times
//               </label>
//               <Input
//                 className="input-box"
//                 name="timeSpan"
//                 value={values.timeSpan}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//             </div>

//             <div className="duration-container">
//               <label htmlFor="timeSpan" className="input-label">
//                 Duration:
//               </label>
//               <IconButton
//                 className="subtract"
//                 icon="minus"
//                 size="sm"
//                 isRound="true"
//                 variantColor="#red 2"
//                 width={{ md: 40 }}
//               ></IconButton>
//               <Input
//                 className="input-box"
//                 name="duration"
//                 value={values.timeSpan}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 id="duration-input-box-id"
//               />
//               <IconButton
//                 className="add"
//                 icon="add"
//                 size="sm"
//                 isRound="true"
//                 variantColor="#ffb6b9"
//                 width={{ md: 40 }}
//               ></IconButton>
//               <label htmlFor="duration" className="input-label">
//                 Days
//               </label>
//             </div> */}

//             <Button type="submit" className="next-button">
//               Next
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </BuildChallengeWrapper>
//   );
// };

// export default buildChallenge;
