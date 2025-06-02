import React from 'react';
import { Box } from '@mui/material';
import RatingSuccess from './RatingSuccess';
import RatingForbidden from './RatingForbidden';

interface RatingBoxProps {
  eventRating: number;
  submissionStatus: 'success' | 'error' | null;
  children: React.ReactNode;
}

const RatingBox = ({
  submissionStatus,
  children,
}: React.PropsWithChildren<RatingBoxProps>) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {children}
      <RatingSuccess submissionStatus={submissionStatus} />
      <RatingForbidden submissionStatus={submissionStatus} />
    </Box>
  );
};

export default RatingBox;
