import React from 'react';
import { Box, Typography } from '@mui/material';
import RatingSuccess from './RatingSuccess';
import RatingForbidden from './RatingForbidden';

interface RatingBoxProps {
  eventRating: number;
  submissionStatus: 'success' | 'error' | null;
  children: React.ReactNode;
}

const RatingBox = ({
  eventRating,
  submissionStatus,
  children,
}: React.PropsWithChildren<RatingBoxProps>) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {children}
      <Typography
        variant="body2"
        sx={{ fontWeight: 'bold', marginTop: '2px', ml: 1 }}
      >
        {eventRating}
      </Typography>
      <RatingSuccess submissionStatus={submissionStatus} />
      <RatingForbidden submissionStatus={submissionStatus} />
    </Box>
  );
};

export default RatingBox;
