import { Button } from '@mui/material';
import React from 'react';

const FilledSubmitButton = () => {
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      style={{ marginTop: '10px' }}
    >
      Submit
    </Button>
  );
};

export default FilledSubmitButton;
