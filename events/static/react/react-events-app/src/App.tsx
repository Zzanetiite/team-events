import React from 'react';
import './App.css';
import CounterButton from './components/common/CounterButton';
import { CSRFProvider } from './context/CsrfContext';
import CreateUserForm from './components/profile/CreateUserForm';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
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
]);

const App: React.FC = () => {
  return (
    <CSRFProvider>
      <RouterProvider router={router} />
    </CSRFProvider>
  );
};

export default App;
