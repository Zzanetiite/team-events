import React from 'react';
import './App.css';
import CounterButton from './components/common/CounterButton';
import { CSRFProvider } from './context/CsrfContext';
import CreateUserForm from './components/profile/CreateUserForm';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { REACT_BASENAME } from './data/constants';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <CounterButton counterId={1} />,
    },
    {
      path: 'createadmin',
      element: <CreateUserForm />,
    },
    {
      path: '*',
      element: <div>404 Not Found</div>,
    },
  ],
  {
    basename: REACT_BASENAME,
  }
);

const App: React.FC = () => {
  return (
    <CSRFProvider>
      <RouterProvider router={router} />
    </CSRFProvider>
  );
};

export default App;
