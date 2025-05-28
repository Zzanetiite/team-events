import { Button } from '@mui/material';
import React from 'react';

interface Props {
  name?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  text?: string;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
}

const FilledSubmitButton: React.FC<Props> = ({
  name = 'submit',
  style,
  disabled = false,
  text = 'Submit',
  color = 'primary',
}) => {
  return (
    <Button
      type="submit"
      variant="contained"
      color={color}
      style={style}
      disabled={disabled}
      name={name}
    >
      {text}
    </Button>
  );
};

export default FilledSubmitButton;
