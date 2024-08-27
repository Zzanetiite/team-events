import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useApi } from '../../hooks/useApi';
import { useTokens } from '../../context/TokenContext';
import { ApiEndpoints } from '../../constants';
import Logo from '../common/Logo';
import NavBarLoginButton from '../common/NavBarLoginButton';
import NavBarEventsButton from '../common/NavBarEventsButton';
import NavBarUsername from '../common/NavBarUserName';

export default function NavBar() {
  const { fetchWithTokens } = useApi();
  const { setUserToken, setLoggedIn, loggedIn, username, isAdmin, setIsAdmin } =
    useTokens();

  const handleLogout = React.useCallback(async () => {
    try {
      const response = await fetchWithTokens(ApiEndpoints.LOGOUT, {
        method: 'POST',
      });
      if (response) {
        setUserToken(null);
        setLoggedIn(false);
        setIsAdmin(null);
        window.location.href = '/login';
      } else {
        console.error('Logout failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      setUserToken(null);
      setLoggedIn(false);
      setIsAdmin(null);
    }
  }, [fetchWithTokens, setUserToken, setLoggedIn, setIsAdmin]);

  const handleLogin = React.useCallback(() => {
    window.location.href = '/login';
  }, []);

  const handleEventsButton = React.useCallback(() => {
    window.location.href = '/myevents';
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Logo />
          <Box sx={{ flexGrow: 1 }} />
          <NavBarUsername username={username} isAdmin={isAdmin} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavBarEventsButton
              loggedIn={loggedIn}
              handleEventsButton={handleEventsButton}
            />
            <NavBarLoginButton
              loggedIn={loggedIn}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
