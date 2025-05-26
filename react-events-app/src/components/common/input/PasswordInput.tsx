import React from 'react';
import { Box, TextField } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import { InputProps } from '../../../interfaces/types';

interface PasswordInputProps extends InputProps {
  label?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  label,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <KeyIcon style={{ marginRight: '10px' }} />
      <TextField
        label={label ?? 'Password'}
        type="password"
        variant="outlined"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </Box>
  );
};

export default PasswordInput;
