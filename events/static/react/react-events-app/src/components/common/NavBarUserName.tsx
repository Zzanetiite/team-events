import { Typography } from '@mui/material';
import React from 'react';
import { NavBarUsernameProps } from '../../interfaces/types';

const NavBarUsername: React.FC<NavBarUsernameProps> = ({
  username,
  isAdmin,
}) => {
  return (
    <>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ display: { xs: 'none', sm: 'block' } }}
      >
        {username} {isAdmin ? '(Admin)' : ''}
      </Typography>
    </>
  );
};

export default NavBarUsername;
