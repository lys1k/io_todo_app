import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthorizedLayout from 'layouts/AuthorizedLayout';
import PublicLayout from 'layouts/PublicLayout';
import Profile from 'pages/authorized/Profile';
import TaskAddEdit from 'pages/authorized/Task/AddEdit';
import TaskDetails from 'pages/authorized/Task/Details';
import TaskList from 'pages/authorized/Task/List';
import Login from 'pages/public/Login';
import Register from 'pages/public/Register';

const DEFAULT_ROUTE = '/public/login';

const Routing = () => (
  <Routes>
    <Route path="public" element={<PublicLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
    <Route path="application" element={<AuthorizedLayout />}>
      <Route path="dashboard" element="TODO: Dashboard" />
      <Route path="settings" element="TODO: Settings" />
      <Route path="profile" element={<Profile />} />
      <Route path="tasks">
        <Route path="add" element={<TaskAddEdit />} />
        <Route path="list" element={<TaskList />} />
        <Route path=":taskId" element={<TaskDetails />} />
        <Route path="edit/:taskId" element={<TaskAddEdit isEdit />} />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to={DEFAULT_ROUTE} replace />} />
  </Routes>
);

export default Routing;
