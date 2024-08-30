import React from 'react';
import { Button } from '@mui/material';

const EmptySubmitButton = ({ handleSubmit }: { handleSubmit: () => void }) => {
  return (
    <Button onClick={handleSubmit} color="primary" size="small">
      Submit
    </Button>
  );
};

export default EmptySubmitButton;
