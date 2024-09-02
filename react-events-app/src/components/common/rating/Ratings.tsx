import * as React from 'react';
import Box from '@mui/material/Box';
import { RatingProps } from '../../../interfaces/types';
import LoudnessRating from './LoudnessRating';
import PlaceRating from './PlaceRating';

const Ratings: React.FC<RatingProps> = ({ event }) => {
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
      <PlaceRating event={event} />
      <LoudnessRating event={event} />
    </Box>
  );
};

export default Ratings;
