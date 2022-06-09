import React from 'react';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Button from 'components/Button';
import Input from 'components/Input';
import validation from './validation';

const RegisterView = ({ onSubmit, onBackToLogin }) => {
  const spacing = {
    marginBottom: 20,
  };

  return (
    <Box sx={{ width: 500 }}>
      <Formik
        validationSchema={validation}
        initialValues={{ username: '', password: '', email: '' }}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <Form>
          <Typography variant="h1" sx={spacing}>
            Rejestracja
          </Typography>
          <Input name="username" label="Nick" sx={spacing} />
          <Input name="email" label="E-mail" sx={spacing} />
          <Input type="password" name="password" label="Hasło" sx={spacing} />
          <Button submit>Zarejestruj</Button>
          <Button sx={{ marginLeft: 20 }} onClick={onBackToLogin}>
            Wróć do logowania
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

RegisterView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onBackToLogin: PropTypes.func.isRequired,
};

export default RegisterView;
