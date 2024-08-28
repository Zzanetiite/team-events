import React from 'react';
import { FilterAlt } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { NavBarFilterButtonProps } from '../../../interfaces/types';

const NavBarFilterButton: React.FC<NavBarFilterButtonProps> = ({
  handleFilterOpen,
}) => {
  return (
    <>
      <IconButton
        size="large"
        aria-label="events-list"
        color="inherit"
        onClick={handleFilterOpen}
      >
        <FilterAlt />
      </IconButton>
    </>
  );
};

export default NavBarFilterButton;
