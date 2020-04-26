import React from 'react';
import { Formik, Form } from 'formik';
import { Input, Button, Select, IconButton } from '@chakra-ui/core';
import styled from 'styled-components';
import ChangeButton from './changeButton.jsx';

const BuildChallengeWrapper = styled.div`
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
    box-shadow: 5px 5px 5px #888888;
    height: 10vw;
    font-size: 5vw;
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
    height: 10vw;
    font-size: 5vw;
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

  /* ///////////////////////////// */
  /* ////////// BUTTON /////////// */
  /* ///////////////////////////// */
  .button {
    text-align: center;
    margin-bottom: 3rem;
  }

  /* /////////////////////////// */
  /* ////////// MENU /////////// */
  /* /////////////////////////// */
  .menu {
    width: 100%;
    height: 65px;
    background-color: #ffb6b9;
  }
`;

export default class challengeViewer extends React.Component {
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
  // handleViewer

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
              <Input className="name-box" name="challengeName" />
            </div>

            <div className="task-container">
              <label htmlFor="task" className="task-label">
                Task:
              </label>
              <Input className="task-box" name="task" />
            </div>

            <div className="frequency-container">
              <div className="checkin-container">
                <label htmlFor="numberOfChecks" className="checkin-label">
                  Check in
                </label>
                <Input className="checkin-box" name="numberOfChecks" />
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
                variantColor="#red 2"
                width={{ md: 40 }}
              ></IconButton>
              <div className="duration-box-wrapper">
                <Input className="duration-box" name="duration" />
              </div>
              <IconButton
                className="add"
                icon="add"
                size="sm"
                isRound="true"
                variantColor="#ffb6b9"
                width={{ md: 40 }}
              ></IconButton>
              <label htmlFor="duration" className="duration-label">
                Days
              </label>
            </div>
          </form>

          <div className="button">
            <ChangeButton text="Next" submit={this.handleButton} />
          </div>
          <div className="menu"></div>
        </BuildChallengeWrapper>
      );
    } else if (this.state.page === 2) {
      // return this if they have clicked "next"
      return <div>page 2</div>;
    } else if (this.state.page === 3) {
      // return this if they have clicked "submit"
      return <div>page 3</div>;
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
