import { Button } from '@mui/material';
import React from 'react';

const FilledSubmitButton = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <Button type="submit" variant="contained" color="primary" style={style}>
      Submit
    </Button>
  );
};

export default FilledSubmitButton;
