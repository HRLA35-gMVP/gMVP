// Dependencies
import React from 'react';
import { useField, Field } from 'formik';
import { PseudoBox } from '@chakra-ui/core';
import { Input, FormControl, FormErrorMessage } from '@chakra-ui/core';

const ValidatorField = ({ placeholder, type, callback = false, ...props }) => {
  const [field, meta] = useField(props);

  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <Field name={field.name} validate={callback}>
      {({ form }) => {
        return (
          <FormControl
            width={'100%'}
            isInvalid={form.errors[field.name] && form.touched[field.name]}
          >
            <PseudoBox
              as={Input}
              variant="flushed"
              placeholder={placeholder}
              type={type}
              {...field}
              isInvalid={!!errorText}
            />
            <FormErrorMessage>{form.errors[field.name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default ValidatorField;
