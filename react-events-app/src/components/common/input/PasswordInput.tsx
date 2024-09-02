import React from 'react';
import { Box, TextField } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import { InputProps } from '../../../interfaces/types';

const PasswordInput: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <Box display="flex" alignItems="center">
      <KeyIcon style={{ marginRight: '10px' }} />
      <TextField
        label="Password"
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
