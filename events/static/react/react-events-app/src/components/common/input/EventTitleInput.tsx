import React from 'react';
import { Box, TextField } from '@mui/material';
import { CreateUpdateEventInputProps } from '../../../interfaces/types';

const EventTitleInput: React.FC<CreateUpdateEventInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <TextField
        label="Event Title"
        name="eventTitle"
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

export default EventTitleInput;
