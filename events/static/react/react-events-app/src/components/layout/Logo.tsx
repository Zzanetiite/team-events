import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';

const Logo = () => {
  return (
    <div>
      <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>TE</Avatar>
        </Box>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          Team Events
        </Typography>
      </a>
    </div>
  );
};

export default Logo;
