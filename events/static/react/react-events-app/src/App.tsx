import React from 'react';
import './App.css';
import { TokenProvider } from './context/TokenContext';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import NavBar from './components/layout/NavBar';
import { DataProvider } from './context/DataContext';

const App: React.FC = () => {
  return (
    <TokenProvider>
      <DataProvider>
        <NavBar />
        <RouterProvider router={router} />
      </DataProvider>
    </TokenProvider>
  );
};

export default App;
