import React from 'react';
import './App.css';
import { TokenProvider } from './context/TokenContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './components/common/NotFound';
import PrimarySearchAppBar from './components/layout/NavBar';
import UserForm from './components/profile/UserForm';
import { ApiEndpoints } from './constants';
import ValidateAdminPasswordForm from './components/profile/ValidateAdminPassword';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/createadmin',
    element: (
      <UserForm
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
        apiEndpoint={ApiEndpoints.VALIDATE_ADMIN_PAGE_PASSWORD}
        successMessageText={<span>Success! Password correct.</span>}
      />
    ),
  },
  {
    path: '/signup',
    element: (
      <UserForm
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
      <UserForm
        title="Login"
        apiEndpoint={ApiEndpoints.LOGIN}
        method="POST"
        successMessageText={<span>Login success! Redirecting ...</span>}
        messageForBadRequest="Invalid credentials. Please try again."
        loginPage={true}
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

const App: React.FC = () => {
  return (
    <TokenProvider>
      <PrimarySearchAppBar />
      <RouterProvider router={router} />
    </TokenProvider>
  );
};

export default App;
