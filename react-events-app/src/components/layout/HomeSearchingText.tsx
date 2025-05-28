import React from 'react';
import { Box } from '@mui/material';

const HomeSearchingText = ({
  loading,
  currentLocation,
}: {
  loading: boolean;
  currentLocation: string | null;
}) => {
  return (
    <Box
      component="h3"
      sx={{
        mt: 1,
        mb: 0,
        fontWeight: 'bold',
        lineHeight: 1.45,
        textAlign: 'center',
        color: 'primary.main',
      }}
    >
      {loading ? 'Looking for events' : 'Events found'} near{' '}
      {currentLocation ?? ''}
      {loading ? '...' : ''}
    </Box>
  );
};

export default HomeSearchingText;
