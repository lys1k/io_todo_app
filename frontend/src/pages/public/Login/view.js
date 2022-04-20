import React from 'react';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Button from 'components/Button';
import Input from 'components/Input';

const LoginView = ({ onSubmit }) => {
  const spacing = {
    marginBottom: 20,
  };

  return (
    <Box sx={{ width: 500 }}>
      <Formik initialValues={{ name: '', password: '' }} onSubmit={onSubmit}>
        <Form>
          <Typography variant="h1" sx={spacing}>
            Logowanie
          </Typography>
          <Input name="name" label="Name" sx={spacing} />
          <Input
            type="password"
            name="password"
            label="Password"
            sx={spacing}
          />
          <Button submit>Zaloguj</Button>
        </Form>
      </Formik>
    </Box>
  );
};

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginView;
