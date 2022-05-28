import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useUnauthorizedHandler from 'hooks/useUnauthorizedHandler';
import UserManager from 'managers/UserManager';
import LoginView from './view';

const LoginContainer = () => {
  const navigate = useNavigate();
  const { handleUnauthorized } = useUnauthorizedHandler();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (UserManager.isLoggedIn()) {
      navigate('/application/tasks/list');
    }
  }, []);

  const onSubmit = async (values) => {
    try {
      setError(null);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/authentication/signin`,
        values
      );
      const bearerToken = `${res.data.type} ${res.data.token}`;
      UserManager.setToken(bearerToken);
      UserManager.setUsername(res.data.username);
      navigate('/application/tasks/list');
    } catch (err) {
      if (err.response.status === 401) {
        setError('Podany email lub hasło są nieprawidłowe!');
      }
      handleUnauthorized(err);
    }
  };

  return <LoginView error={error} onSubmit={onSubmit} />;
};

export default LoginContainer;
