import React from 'react';
import { Box, TextField } from '@mui/material';
import { Person } from '@mui/icons-material';
import { InputProps } from '../../../interfaces/types';

const UsernameInput: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <Box display="flex" alignItems="center">
      <Person style={{ marginRight: '10px' }} />
      <TextField
        label="Username"
        variant="outlined"
        autoComplete="username"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </Box>
  );
};

export default UsernameInput;
