import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingWithTextProps {
  height?: string | number;
  width?: string | number;
}

const LoadingWithText: React.FC<LoadingWithTextProps> = ({
  height = '100vh',
  width = '100vw',
}) => {
  return (
    <Box
      sx={{
        height,
        width,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress color="secondary" />
      <Typography variant="h6" sx={{ color: 'text.primary', padding: 2 }}>
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingWithText;
