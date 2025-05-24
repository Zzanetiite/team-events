import React from 'react';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import NavBar from './components/layout/NavBar';
import { DataProvider } from './context/DataContext';
import { APIProvider } from '@vis.gl/react-google-maps';
import { REACT_APP_GOOGLE_MAPS_API_KEY } from './constants';
import { libraries } from './config';

const App: React.FC = () => {
  console.log('Google Maps API key:', REACT_APP_GOOGLE_MAPS_API_KEY);
  return (
    <APIProvider
      libraries={libraries}
      apiKey={REACT_APP_GOOGLE_MAPS_API_KEY || ''}
    >
      <AuthProvider>
        <DataProvider>
          <NavBar />
          <RouterProvider router={router} />
        </DataProvider>
      </AuthProvider>
    </APIProvider>
  );
};

export default App;
