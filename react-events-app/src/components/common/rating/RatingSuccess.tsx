import React from 'react';
import { CheckCircle } from '@mui/icons-material';

const RatingSuccess = ({
  submissionStatus,
}: {
  submissionStatus: 'success' | 'error' | null;
}) => {
  return (
    <>
      {submissionStatus === 'success' && (
        <CheckCircle sx={{ color: 'green', ml: 1 }} fontSize="small" />
      )}
    </>
  );
};

export default RatingSuccess;
