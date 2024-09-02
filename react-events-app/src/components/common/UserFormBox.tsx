import { Box } from '@mui/material';
import React from 'react';

const UserFormBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        {children}
      </Box>
    </>
  );
};

export default UserFormBox;
