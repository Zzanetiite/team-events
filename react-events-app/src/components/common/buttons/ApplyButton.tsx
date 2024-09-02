import { Button } from '@mui/material';
import React from 'react';

const ApplyButton = ({ handleApply }: { handleApply: () => void }) => {
  return (
    <Button variant="contained" color="primary" onClick={handleApply}>
      Apply
    </Button>
  );
};

export default ApplyButton;
