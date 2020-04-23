// Dependencies
import React from 'react';
import { useField } from 'formik';
import { Input } from '@chakra-ui/core';

const ValidatedTextField = ({ type, placeholder, ...props }) => {
  const [field, meta] = useField(props);

  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <Input
      variant="flushed"
      placeholder={placeholder}
      type={type}
      {...field}
      isInvalid={!!errorText}
    />
  );
};

export default ValidatedTextField;
