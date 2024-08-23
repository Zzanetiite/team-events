import React from 'react';
import './App.css';
import { TokenProvider } from './context/TokenContext';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import NavBar from './components/layout/NavBar';

const App: React.FC = () => {
  return (
    <TokenProvider>
      <NavBar />
      <RouterProvider router={router} />
    </TokenProvider>
  );
};

export default App;
