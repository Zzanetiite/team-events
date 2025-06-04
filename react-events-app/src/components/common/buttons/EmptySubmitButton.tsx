import React from 'react';
import { Button } from '@mui/material';

const EmptySubmitButton = ({
  handleSubmit,
  disabled = false,
}: {
  handleSubmit: () => void;
  disabled?: boolean;
}) => {
  return (
    <Button
      onClick={handleSubmit}
      color="primary"
      size="small"
      disabled={disabled}
    >
      Submit
    </Button>
  );
};

export default EmptySubmitButton;
