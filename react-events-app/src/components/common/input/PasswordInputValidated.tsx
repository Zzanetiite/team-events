import React from 'react';
import { Box, TextField } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import { PasswordInputProps } from '../../../interfaces/types';

const PasswordInputValidated: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  feedback,
}) => {
  return (
    <>
      <Box display="flex" alignItems="center">
        <KeyIcon style={{ marginRight: '10px' }} />
        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={value}
          onChange={onChange}
          required
          fullWidth
          error={!!feedback}
        />
      </Box>
    </>
  );
};

export default PasswordInputValidated;
