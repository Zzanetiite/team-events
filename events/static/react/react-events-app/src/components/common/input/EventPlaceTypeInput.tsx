import React from 'react';
import { Box, MenuItem, Select } from '@mui/material';
import { SelectInputProps } from '../../../interfaces/types';
import { PlaceTypes } from '../../../constants';

const EventPlaceTypeInput: React.FC<SelectInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <Select
        label="Place Type"
        name="placeType"
        value={value}
        onChange={onChange}
        fullWidth
        margin="dense"
        required
        displayEmpty
      >
        <MenuItem value="" disabled>
          <em>Select place type</em>
        </MenuItem>
        {Object.values(PlaceTypes).map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default EventPlaceTypeInput;
