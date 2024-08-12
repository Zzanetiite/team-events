import React from 'react';
import './App.css';
import CounterButton from './components/common/CounterButton';
import { CSRFProvider } from './context/CsrfContext';
import CreateUserForm from './components/profile/CreateUserForm';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './components/common/NotFound';
import PrimarySearchAppBar from './components/layout/NavBar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CounterButton counterId={1} />,
  },
  {
    path: '/createadmin',
    element: <CreateUserForm />,
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
