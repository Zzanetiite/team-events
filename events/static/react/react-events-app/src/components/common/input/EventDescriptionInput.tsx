import React from 'react';
import { Box, TextField } from '@mui/material';
import { CreateUpdateEventInputProps } from '../../../interfaces/types';

const EventDescriptionInput: React.FC<CreateUpdateEventInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <TextField
        label="Description"
        name="description"
        value={value}
        onChange={onChange}
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        required
      />
    </Box>
  );
};

export default EventDescriptionInput;
