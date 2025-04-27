import * as React from 'react';
import Box from '@mui/material/Box';

const Row = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-left',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {children}
    </Box>
  );
};

export default Row;
