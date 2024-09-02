import { EventNote } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { NavBarEventsButtonProps } from '../../../interfaces/types';

const NavBarEventsButton: React.FC<NavBarEventsButtonProps> = ({
  loggedIn,
  handleEventsButton,
}) => {
  return (
    <>
      <IconButton
        size="large"
        aria-label="events-list"
        color="inherit"
        onClick={handleEventsButton}
      >
        {loggedIn ? <EventNote /> : null}
      </IconButton>
    </>
  );
};

export default NavBarEventsButton;
