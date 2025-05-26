import { Button } from '@mui/material';
import React from 'react';
import { NavBarLoginButtonProps } from '../../../interfaces/types';

const NavBarLoginButton: React.FC<NavBarLoginButtonProps> = ({
  loggedIn,
  handleLogout,
  handleLogin,
}) => {
  return (
    <>
      <Button
        color="inherit"
        variant="text"
        sx={{ textTransform: 'none' }}
        onClick={loggedIn ? handleLogout : handleLogin}
      >
        {loggedIn ? 'Logout' : 'Login'}
      </Button>
    </>
  );
};

export default NavBarLoginButton;
