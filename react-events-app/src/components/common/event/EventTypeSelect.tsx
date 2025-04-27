import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import React from 'react';
import { PlaceTypeIcons, PlaceTypes } from '../../../constants';

interface EventTypeSelectProps {
  selectedTypes: { [key in PlaceTypes]?: boolean };
  handleCheckboxChange: (type: PlaceTypes) => void;
}

const EventTypeSelect = ({
  selectedTypes,
  handleCheckboxChange,
}: EventTypeSelectProps) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Filter by Type
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(150px, 1fr))"
        gap={2}
        mb={2}
        sx={{
          maxHeight: 250,
          overflowY: 'auto',
          padding: 2,
          border: '1px solid #ccc',
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        {Object.keys(PlaceTypes).map((key) => {
          const type = PlaceTypes[key as keyof typeof PlaceTypes];
          const Icon = PlaceTypeIcons[type];
          return (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={!!selectedTypes[type]}
                  onChange={() => handleCheckboxChange(type)}
                  icon={<Icon />}
                  checkedIcon={<Icon />}
                />
              }
              label={type}
              sx={{ flex: 1 }}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default EventTypeSelect;
