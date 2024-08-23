import React from 'react';
import './App.css';
import { TokenProvider } from './context/TokenContext';
import { RouterProvider } from 'react-router-dom';
import PrimarySearchAppBar from './components/layout/NavBar';
import router from './router';

const App: React.FC = () => {
  return (
    <TokenProvider>
      <PrimarySearchAppBar />
      <RouterProvider router={router} />
    </TokenProvider>
  );
};

export default App;
