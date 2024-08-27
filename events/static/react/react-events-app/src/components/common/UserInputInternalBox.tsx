import { Box } from '@mui/material';
import React from 'react';

const UserInputInternalBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        alignItems="center"
        height="50vh"
      >
        {children}
      </Box>
    </>
  );
};

export default UserInputInternalBox;
