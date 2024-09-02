import React from 'react';
import { Cancel } from '@mui/icons-material';

const RatingForbidden = ({
  submissionStatus,
}: {
  submissionStatus: 'success' | 'error' | null;
}) => {
  return (
    <>
      {submissionStatus === 'error' && (
        <Cancel sx={{ color: 'red', ml: 1 }} fontSize="small" />
      )}
    </>
  );
};

export default RatingForbidden;
