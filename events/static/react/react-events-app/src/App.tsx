import React from 'react';
import './App.css';
import CounterButton from './components/common/CounterButton';
import { TokenProvider } from './context/TokenContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './components/common/NotFound';
import PrimarySearchAppBar from './components/layout/NavBar';
import UserForm from './components/profile/UserForm';
import { ApiEndpoints } from './constants';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CounterButton counterId={1} />,
  },
  {
    path: '/createadmin',
    element: (
      <UserForm
        title="Create Admin User"
        apiEndpoint={ApiEndpoints.CREATE_ADMIN_USER}
        hasEmail={true}
        successMessageText={
          <span>
            Success! Admin user created successfully.{' '}
            <a href="/login">Go to Login</a>
          </span>
        }
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
