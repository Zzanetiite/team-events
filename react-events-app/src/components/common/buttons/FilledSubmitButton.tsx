import { Button } from '@mui/material';
import React from 'react';

interface Props {
  style?: React.CSSProperties;
  disabled?: boolean;
}

const FilledSubmitButton: React.FC<Props> = ({ style, disabled = false }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      style={style}
      disabled={disabled}
    >
      Submit
    </Button>
  );
};

export default FilledSubmitButton;
