import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useApi } from '../../hooks/useApi';
import { useTokens } from '../../context/TokenContext';
import { ApiEndpoints } from '../../constants';
import Logo from '../common/Logo';
import NavBarLoginButton from '../common/buttons/NavBarLoginButton';
import NavBarEventsButton from '../common/buttons/NavBarEventsButton';
import NavBarUsername from '../common/NavBarUserName';
import SearchBar from '../common/SearchBar';
import { useDataContext } from '../../context/DataContext';
import NavBarFilterButton from '../common/buttons/NavBarFilterButton';

export default function NavBar() {
  const { fetchWithTokens } = useApi();
  const {
    setUserToken,
    setLoggedIn,
    loggedIn,
    username,
    isAdmin,
    setIsAdmin,
    setUsername,
  } = useTokens();
  const { homePageFilterOpen, setHomePageFilterOpen } = useDataContext();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const data = await fetchWithTokens(ApiEndpoints.GET_USERNAME);
        setUsername(data.username);
        if (data.is_admin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {}
    };

    if (loggedIn && !username) {
      fetchUsername();
    }
  }, [loggedIn, username, setIsAdmin, setUsername]);

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

  const handleFilterOpen = React.useCallback(() => {
    setHomePageFilterOpen(!homePageFilterOpen);
  }, [homePageFilterOpen, setHomePageFilterOpen]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Logo />
          <SearchBar />
          <NavBarFilterButton handleFilterOpen={handleFilterOpen} />
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
