import React from 'react';
import { Box, MenuItem, Select } from '@mui/material';
import { SelectInputProps } from '../../../interfaces/types';
import { PlaceTypes } from '../../../constants';

const EventPlaceTypeInput: React.FC<SelectInputProps> = ({
  value,
  onChange,
  loading,
}) => {
  return (
    <Box display="flex" alignItems="center" marginTop={2}>
      <Select
        label="Place Type"
        name="placeType"
        autoComplete="place-type"
        value={value}
        onChange={onChange}
        fullWidth
        margin="dense"
        required
        displayEmpty
        disabled={loading}
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
