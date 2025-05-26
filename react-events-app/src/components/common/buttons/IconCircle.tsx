import { Box } from '@mui/material';
import React from 'react';

const IconCircle = ({ icon }: { icon: React.ReactElement }) => (
  <Box
    sx={{
      width: 32,
      height: 32,
      borderRadius: '50%',
      backgroundColor: 'primary.main',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mr: 1,
    }}
  >
    {icon}
  </Box>
);

export default IconCircle;
