import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../common/Logo';
import NavBarUsername from '../common/NavBarUserName';
import NavBarFilterButton from '../common/buttons/NavBarFilterButton';
import { useNavBar } from '../../hooks/useNavBar';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  EventNote,
  Home,
  Login,
  Logout,
  PersonAddAlt1,
} from '@mui/icons-material';
import IconCircle from '../common/buttons/IconCircle';

export default function NavBar() {
  const {
    loggedIn,
    user,
    handleLogout,
    handleLogin,
    handleEventsButton,
    handleFilterOpen,
    handleSignUpButton,
    handleHome,
  } = useNavBar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Logo />
          <NavBarFilterButton handleFilterOpen={handleFilterOpen} />
          <Box sx={{ flexGrow: 1 }} />
          <NavBarUsername username={user.username} isAdmin={user.isAdmin} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem
                onClick={() => {
                  handleHome();
                  handleMenuClose();
                }}
              >
                <IconCircle icon={<Home />} /> Home
              </MenuItem>
              {loggedIn && (
                <MenuItem
                  onClick={() => {
                    handleEventsButton();
                    handleMenuClose();
                  }}
                >
                  <IconCircle icon={<EventNote />} /> Your Events
                </MenuItem>
              )}
              {loggedIn ? (
                <MenuItem
                  onClick={() => {
                    handleLogout();
                    handleMenuClose();
                  }}
                >
                  <IconCircle icon={<Logout />} /> Logout
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    handleLogin();
                    handleMenuClose();
                  }}
                >
                  <IconCircle icon={<Login />} /> Login
                </MenuItem>
              )}
              {!loggedIn && (
                <MenuItem
                  onClick={() => {
                    handleSignUpButton();
                    handleMenuClose();
                  }}
                >
                  <IconCircle icon={<PersonAddAlt1 />} /> Sign Up
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
