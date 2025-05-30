import React from 'react';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import NavBar from './components/layout/NavBar';
import { DataProvider } from './context/DataContext';
import { APIProvider } from '@vis.gl/react-google-maps';
import { libraries } from './config';
import { Box } from '@mui/material';
import StatusAlert from './components/common/StatusAlert';
import Footer from './components/layout/Footer';
import LoadingWithText from './components/common/LoadingWithText';

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
    return <LoadingWithText />;
  }

  return (
    <APIProvider
      libraries={libraries}
      apiKey={reactEnvVars?.REACT_APP_GOOGLE_MAPS_API_KEY || ''}
    >
      <DataProvider>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Box component="main" sx={{ flexGrow: 1 }}>
            <NavBar />
            {reactEnvVars == null && (
              <StatusAlert
                message={'Failed to load Google Map credentials.'}
                severity="error"
              />
            )}
            <RouterProvider router={router} />
          </Box>
          <Footer />
        </Box>
      </DataProvider>
    </APIProvider>
  );
};

export default App;
