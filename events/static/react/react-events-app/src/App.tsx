import React from 'react';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import NavBar from './components/layout/NavBar';
import { DataProvider } from './context/DataContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <NavBar />
        <RouterProvider router={router} />
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
