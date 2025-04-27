import * as React from 'react';
import { RatingProps } from '../../../interfaces/types';
import { Star, VolumeUp } from '@mui/icons-material';
import { Box, Tooltip } from '@mui/material';
import Row from '../../base/Row';
import { COLOR_SCHEME } from '../../../constants/Color';

const AverageRatings: React.FC<RatingProps> = ({ event }) => {
  const ratingItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '1px 8px',
    borderRadius: '8px',
    backgroundColor: COLOR_SCHEME.LightGrey,
    userSelect: 'none',
    cursor: 'default',
  };

  return (
    <Row>
      <Tooltip key="volume" title="Average loudness rating for this place">
        <Box sx={ratingItemStyle} color={COLOR_SCHEME.MediumBlue}>
          <VolumeUp fontSize="small" color="inherit" />
          <Box ml={0.5} color="text.primary">
            {event.loudnessRating.toFixed(1)}
          </Box>
        </Box>
      </Tooltip>
      <Tooltip key="place" title="Average experience rating for this place">
        <Box sx={ratingItemStyle} color={COLOR_SCHEME.BrightYellow}>
          <Star fontSize="small" color="inherit" />
          <Box ml={0.5} color="text.primary">
            {event.placeRating.toFixed(1)}
          </Box>
        </Box>
      </Tooltip>
    </Row>
  );
};

export default AverageRatings;
