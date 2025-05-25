import React from 'react';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import NavBar from './components/layout/NavBar';
import { DataProvider } from './context/DataContext';
import { APIProvider } from '@vis.gl/react-google-maps';
import { libraries } from './config';
import { Box, CircularProgress, Typography } from '@mui/material';
import StatusAlert from './components/common/StatusAlert';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
};

const InnerApp: React.FC = () => {
  const { reactEnvVars } = useAuth();

  if (reactEnvVars === undefined) {
    return (
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ color: 'text.primary', padding: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <APIProvider
      libraries={libraries}
      apiKey={reactEnvVars?.REACT_APP_GOOGLE_MAPS_API_KEY || ''}
    >
      <DataProvider>
        <NavBar />
        {reactEnvVars == null && (
          <StatusAlert
            message={'Failed to load Google Map credentials.'}
            severity="error"
          />
        )}
        <RouterProvider router={router} />
      </DataProvider>
    </APIProvider>
  );
};

export default App;
