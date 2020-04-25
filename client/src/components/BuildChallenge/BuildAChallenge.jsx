import React from 'react';
import { Formik, Form } from 'formik';
import { Input, Button } from '@chakra-ui/core';
import styled from 'styled-components';

// const buildChallengeWrapper = styled.div`
//   .modal-view-avg-jr {
//     padding: 10px 0px;
//     position: relative;
//   }
//   .bar {
//     width: 100%;
//     position: absolute;
//     top: calc(50% - 2px);
//     border: solid 2px lightgrey;
//     border-radius: 10px;
//   }
// `;

const buildChallenge = (props) => {
  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default buildChallenge;
