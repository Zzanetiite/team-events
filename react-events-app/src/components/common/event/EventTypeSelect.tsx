import React from 'react';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import {
  PlaceTypeColors,
  PlaceTypeIcons,
  PlaceTypes,
} from '../../../constants';

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
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(150px, 1fr))"
        gap={0}
        mb={0}
        sx={{
          maxHeight: 100,
          overflowY: 'auto',
          padding: 1,
          border: '1px solid #ccc',
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        {Object.keys(PlaceTypes).map((key) => {
          const type = PlaceTypes[key as keyof typeof PlaceTypes];
          const Icon = PlaceTypeIcons[type];
          const color = PlaceTypeColors[type];

          return (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  size="small"
                  checked={!!selectedTypes[type]}
                  onChange={() => handleCheckboxChange(type)}
                  icon={
                    <Typography>
                      <Icon />
                    </Typography>
                  }
                  checkedIcon={
                    <Typography color={color}>
                      <Icon />
                    </Typography>
                  }
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
