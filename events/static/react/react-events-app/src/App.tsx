import React from 'react';
import './App.css';
import CounterButton from './components/common/CounterButton';
import { CSRFProvider } from './context/CsrfContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './components/common/NotFound';
import PrimarySearchAppBar from './components/layout/NavBar';
import CreateUserForm from './components/profile/CreateUserForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CounterButton counterId={1} />,
  },
  {
    path: '/createadmin',
    element: (
      <CreateUserForm
        title="Create Admin User"
        apiEndpoint="/api/create-admin-user/"
        hasEmail={true}
      />
    ),
  },
  {
    path: '/signup',
    element: <CreateUserForm title="Sign Up" apiEndpoint="/api/create-user/" />,
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
