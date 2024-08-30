import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../common/Logo';
import NavBarLoginButton from '../common/buttons/NavBarLoginButton';
import NavBarEventsButton from '../common/buttons/NavBarEventsButton';
import NavBarUsername from '../common/NavBarUserName';
import SearchBar from '../common/SearchBar';
import NavBarFilterButton from '../common/buttons/NavBarFilterButton';
import { useNavBar } from '../../hooks/useNavBar';

export default function NavBar() {
  const {
    loggedIn,
    user,
    handleLogout,
    handleLogin,
    handleEventsButton,
    handleFilterOpen,
  } = useNavBar();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Logo />
          <SearchBar />
          <NavBarFilterButton handleFilterOpen={handleFilterOpen} />
          <Box sx={{ flexGrow: 1 }} />
          <NavBarUsername username={user.username} isAdmin={user.isAdmin} />
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
