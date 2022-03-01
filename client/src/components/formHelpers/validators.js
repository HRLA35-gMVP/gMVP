// Dependencies
import * as yup from 'yup';

// HTML tag regex
const containsHTML = (string) => /(<(\w)+>|<\/(\w)+>|<\/>)/.test(string);

// Declarations
const errorHTML = 'No HTML. Thanks my dude.';
const errorRequired = 'This is a required field.';
const errorMin = (num) => `Minimum character length of ${num}.`;
const errorMax = (num) => `Maximum character length of ${num}.`;

const validateEmailPasswordFormat = yup.object().shape({
  email: yup
    .string()
    .required(errorRequired)
    .test(errorHTML, errorHTML, (value) => !containsHTML(value))
    .email('Must be a valid email.')
    .max(64, errorMax(64)),
  password: yup
    .string()
    .required(errorRequired)
    .min(6, errorMin(6))
    .max(20, errorMax(20))
});

const registerValid = yup.object().shape({
  email: yup
    .string()
    .required(errorRequired)
    .test(errorHTML, errorHTML, (value) => !containsHTML(value))
    .email('Must be a valid email.')
    .max(64, errorMax(64)),
  password: yup
    .string()
    .required(errorRequired)
    .min(6, errorMin(6))
    .max(20, errorMax(20)),
  displayName: yup
    .string()
    .required(errorRequired)
    .test(errorHTML, errorHTML, (value) => !containsHTML(value))
    .max(64, errorMax(64))
});

const friendCodeValid = yup.object().shape({
  friendCode: yup
    .string()
    .test(errorHTML, errorHTML, (value) => !containsHTML(value))
    .length(28, 'Friend codes are 28 characters long.')
});

const emailValid = yup.object().shape({
  email: yup
    .string()
    .required(errorRequired)
    .test(errorHTML, errorHTML, (value) => !containsHTML(value))
    .email('Must be a valid email.')
    .max(64, errorMax(64))
});

const displayNameValid = yup.object().shape({
  displayName: yup
    .string()
    .required(errorRequired)
    .test(errorHTML, errorHTML, (value) => !containsHTML(value))
    .max(64, errorMax(64))
});

export {
  validateEmailPasswordFormat,
  registerValid,
  friendCodeValid,
  emailValid,
  displayNameValid
};
