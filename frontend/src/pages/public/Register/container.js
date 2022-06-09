import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RegisterView from './view';

const RegisterContainer = () => {
  const navigate = useNavigate();

  const onSubmit = async (values, { setFieldError }) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/authentication/signup`,
        values
      );
      navigate('/application/signin');
    } catch (err) {
      if (err.response.status === 400) {
        const error = 'Podany nick, email lub hasło są nieprawidłowe!';
        setFieldError('username', error);
        setFieldError('email', error);
        setFieldError('password', error);
      }
    }
  };

  const onBackToLogin = () => {
    navigate('/public/login');
  };

  return <RegisterView onSubmit={onSubmit} onBackToLogin={onBackToLogin} />;
};

export default RegisterContainer;
