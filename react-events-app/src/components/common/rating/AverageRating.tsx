import * as React from 'react';
import Box from '@mui/material/Box';
import { RatingProps } from '../../../interfaces/types';
import { VolumeMute, VolumeUp } from '@mui/icons-material';

const AverageRatings: React.FC<RatingProps> = ({ event }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-left',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
        padding: 0,
      }}
    >
      <VolumeUp fontSize="inherit" /> {event.loudnessRating}
      <VolumeMute fontSize="inherit" /> {event.placeRating}
    </Box>
  );
};

export default AverageRatings;
