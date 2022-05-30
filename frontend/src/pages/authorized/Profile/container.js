import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useUnauthorizedHandler from 'hooks/useUnauthorizedHandler';
import UserManager from 'managers/UserManager';
import ProfileView from './view';

const Profile = () => {
  const navigate = useNavigate();
  const { handleUnauthorized } = useUnauthorizedHandler();
  const [tags, setTags] = useState([]);

  const onTagSubmit = async (value, { resetForm }) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/tag`,
        value
      );
      setTags([...tags, res.data]);
      resetForm();
    } catch (err) {
      handleUnauthorized(err);
    }
  };

  const onTagDelete = async (tagId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/tag/${tagId}`);
      setTags(tags.filter((tag) => tag.id != tagId));
    } catch (err) {
      handleUnauthorized(err);
    }
  };

  const onLogout = () => {
    UserManager.clear();
    navigate('/public/login');
  };

  useEffect(() => {
    const getTags = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/tags`);
        const tags = res.data;
        setTags(tags);
      } catch (err) {
        handleUnauthorized(err);
      }
    };
    getTags();
  }, []);

  return (
    <ProfileView
      onSubmit={onTagSubmit}
      onDelete={onTagDelete}
      onLogout={onLogout}
      tags={tags}
    />
  );
};

export default Profile;
