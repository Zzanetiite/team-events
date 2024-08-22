import React from 'react';
import { Box, TextField } from '@mui/material';
import { Email } from '@mui/icons-material';
import { InputProps } from '../../interfaces/types';

const EmailInput: React.FC<InputProps> = ({ field, setField }) => {
  return (
    <Box display="flex" alignItems="center">
      <Email style={{ marginRight: '10px' }} />
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        value={field}
        onChange={(e) => setField(e.target.value)}
      />
    </Box>
  );
};

export default EmailInput;
