import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import ValidateAdminPasswordForm from './pages/ValidateAdminPassword';
import { ApiEndpoints } from './constants';
import UserEvents from './pages/UserEvents';
import Login from './pages/Login';
import CreateUser from './pages/CreateUser';
import NotFound from './components/layout/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/myevents',
    element: <UserEvents />,
  },
  {
    path: '/createadmin',
    element: (
      <CreateUser
        title="Create Admin User"
        apiEndpoint={ApiEndpoints.CREATE_ADMIN_USER}
        adminPage={true}
        successMessageText={
          <span>
            Success! Admin user created successfully.{' '}
            <a href="/login">Go to Login</a>
          </span>
        }
        messageForBadRequest="Admin user already exists. Please choose a different username."
      />
    ),
  },
  {
    path: '/validateadmin',
    element: (
      <ValidateAdminPasswordForm
        title="Please enter secret password"
        successMessageText={<span>Success! Password correct.</span>}
      />
    ),
  },
  {
    path: '/signup',
    element: (
      <CreateUser
        title="Sign Up"
        apiEndpoint={ApiEndpoints.CREATE_USER}
        successMessageText={
          <span>
            Success! User created successfully. <a href="/login">Go to Login</a>
          </span>
        }
        messageForBadRequest="User already exists. Please choose a different username."
      />
    ),
  },
  {
    path: '/login',
    element: (
      <Login
        title="Login"
        apiEndpoint={ApiEndpoints.LOGIN}
        method="POST"
        successMessageText={<span>Login success! Redirecting ...</span>}
        messageForBadRequest="Invalid credentials. Please try again."
      />
    ),
  },
  {
    // Non-existent routes display Not Found page
    path: '/*',
    element: (
      <div>
        <NotFound />
      </div>
    ),
  },
]);

export default router;
