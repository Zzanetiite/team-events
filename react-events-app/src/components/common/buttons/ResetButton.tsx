import { Button } from '@mui/material';
import React from 'react';

const ResetButton = ({ handleReset }: { handleReset: () => void }) => {
  return (
    <Button variant="outlined" color="secondary" onClick={handleReset}>
      Reset
    </Button>
  );
};

export default ResetButton;
