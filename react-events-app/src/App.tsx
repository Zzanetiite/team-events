import React from 'react';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import NavBar from './components/layout/NavBar';
import { DataProvider } from './context/DataContext';
import { APIProvider } from '@vis.gl/react-google-maps';
import { libraries } from './config';
import { useReactEnv } from './hooks/useReactEnv';
import { Box, CircularProgress } from '@mui/material';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
};

const InnerApp: React.FC = () => {
  const { envVars } = useReactEnv();

  if (!envVars) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <APIProvider
      libraries={libraries}
      apiKey={envVars.REACT_APP_GOOGLE_MAPS_API_KEY || ''}
    >
      <DataProvider>
        <NavBar />
        <RouterProvider router={router} />
      </DataProvider>
    </APIProvider>
  );
};

export default App;
