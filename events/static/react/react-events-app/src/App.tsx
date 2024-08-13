import React from 'react';
import './App.css';
import CounterButton from './components/common/CounterButton';
import { CSRFProvider } from './context/CsrfContext';
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
      />
    ),
  },
  {
    path: '/signup',
    element: <UserForm title="Sign Up" apiEndpoint="api/create-user/" />,
  },
  {
    path: '/login',
    element: <UserForm title="Login" apiEndpoint="api/login/" method="POST" />,
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
    <CSRFProvider>
      <PrimarySearchAppBar />
      <RouterProvider router={router} />
    </CSRFProvider>
  );
};

export default App;
