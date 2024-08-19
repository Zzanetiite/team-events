import React from 'react';
import './App.css';
import CounterButton from './components/common/CounterButton';
import { TokenProvider } from './context/TokenContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './components/common/NotFound';
import PrimarySearchAppBar from './components/layout/NavBar';
import UserForm from './components/profile/UserForm';

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
        apiEndpoint="api/create-admin-user/"
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
        apiEndpoint="api/create-user/"
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
        apiEndpoint="/api/login/"
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
