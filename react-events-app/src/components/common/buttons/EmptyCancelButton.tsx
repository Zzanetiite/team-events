import React from 'react';
import { Button } from '@mui/material';

const EmptyCancelButton = ({
  handleClose,
  text,
}: {
  handleClose: () => void;
  text: string;
}) => {
  return (
    <Button onClick={handleClose} color="secondary" size="small">
      {text}
    </Button>
  );
};

export default EmptyCancelButton;
