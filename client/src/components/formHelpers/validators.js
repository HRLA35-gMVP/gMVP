import * as yup from 'yup';

const containsXSS = (string) => /(<(\w)+>|<\/(\w)+>|<\/>)/.test(string);

const loginValidation = yup.object({
  email: yup
    .string()
    .required()
    .test(
      'Should not contain a substring with the HTML tag structure.',
      'Should not contain a substring with the HTML tag structure.',
      (value) => !containsXSS(value)
    )
    .email()
    .max(64),
  password: yup.string().required().min(6).max(20)
});

const registerValidation = yup.object({
  displayName: yup
    .string()
    .required()
    .test(
      'Should not contain a substring with the HTML tag structure.',
      'Should not contain a substring with the HTML tag structure.',
      (value) => !containsXSS(value)
    )
    .max(64),
  email: yup
    .string()
    .required()
    .test(
      'Should not contain a substring with the HTML tag structure.',
      'Should not contain a substring with the HTML tag structure.',
      (value) => !containsXSS(value)
    )
    .email()
    .max(64),
  password: yup.string().required().min(6).max(20)
});

const friendCodeValidation = yup.object({
  friendCode: yup
    .string()
    .required()
    .test(
      'Should not contain a substring with the HTML tag structure.',
      'Should not contain a substring with the HTML tag structure.',
      (value) => !containsXSS(value)
    )
    .length(28)
    .max(28)
});

export { loginValidation, registerValidation, friendCodeValidation };
