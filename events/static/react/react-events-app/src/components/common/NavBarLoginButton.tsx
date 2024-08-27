import { Login, Logout } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { NavBarLoginButtonProps } from '../../interfaces/types';

const NavBarLoginButton: React.FC<NavBarLoginButtonProps> = ({
  loggedIn,
  handleLogout,
  handleLogin,
}) => {
  return (
    <>
      <IconButton
        size="large"
        aria-label={loggedIn ? 'logout' : 'login'}
        color="inherit"
        onClick={loggedIn ? handleLogout : handleLogin}
      >
        {loggedIn ? <Logout /> : <Login />}
      </IconButton>
    </>
  );
};

export default NavBarLoginButton;
