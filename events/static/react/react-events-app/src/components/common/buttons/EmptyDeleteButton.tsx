import React from 'react';
import { Button } from '@mui/material';

const EmptyDeleteButton = ({ handleDelete }: { handleDelete: () => void }) => {
  return (
    <Button onClick={handleDelete} color="warning" size="small">
      Delete
    </Button>
  );
};

export default EmptyDeleteButton;
