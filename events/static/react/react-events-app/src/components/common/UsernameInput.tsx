import React from 'react';
import { Box, TextField } from '@mui/material';
import { Person } from '@mui/icons-material';
import { InputProps } from '../../interfaces/types';

const UsernameInput: React.FC<InputProps> = ({ field, setField }) => {
  return (
    <Box display="flex" alignItems="center">
      <Person style={{ marginRight: '10px' }} />
      <TextField
        label="Username"
        variant="outlined"
        value={field}
        onChange={(e) => setField(e.target.value)}
        required
      />
    </Box>
  );
};

export default UsernameInput;
