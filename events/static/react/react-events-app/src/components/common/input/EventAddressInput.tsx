import React from 'react';
import { Box, TextField } from '@mui/material';
import { CreateUpdateEventInputProps } from '../../../interfaces/types';

const EventAddressInput: React.FC<CreateUpdateEventInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <TextField
        label="Address"
        name="address"
        value={value}
        onChange={onChange}
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
    </Box>
  );
};

export default EventAddressInput;
