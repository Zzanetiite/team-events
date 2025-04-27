import * as React from 'react';
import { RatingProps } from '../../../interfaces/types';
import { Star, VolumeUp } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import Row from '../../base/Row';

const AverageRatings: React.FC<RatingProps> = ({ event }) => {
  return (
    <Row>
      <Tooltip key="volume" title="Average volume rating for this place=">
        <div>
          <VolumeUp fontSize="inherit" /> {event.loudnessRating}
        </div>
      </Tooltip>
      <Tooltip key="place" title="Average place rating for this place">
        <div>
          <Star fontSize="inherit" /> {event.placeRating}
        </div>
      </Tooltip>
    </Row>
  );
};

export default AverageRatings;
