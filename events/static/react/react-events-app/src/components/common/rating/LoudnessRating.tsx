import React from 'react';
import { VolumeMute, VolumeUp } from '@mui/icons-material';
import { StyledLoudnessRating } from '../../../config';
import { RatingProps } from '../../../interfaces/types';
import { RatingTypes } from '../../../constants';
import { usePlaceRating } from '../../../hooks/useRating';
import RatingBox from './RatingBox';

const LoudnessRating: React.FC<RatingProps> = ({ event }) => {
  const {
    userRating,
    submissionStatus,
    eventRating,
    handleRatingChange,
    disabled,
  } = usePlaceRating(event, RatingTypes.LOUDNESS);
  return (
    <RatingBox eventRating={eventRating} submissionStatus={submissionStatus}>
      <StyledLoudnessRating
        name="loudness-rating"
        defaultValue={event.loudnessRating}
        icon={<VolumeUp fontSize="inherit" />}
        emptyIcon={<VolumeMute fontSize="inherit" />}
        size="small"
        disabled={disabled}
        value={userRating}
        onChange={handleRatingChange}
      />
    </RatingBox>
  );
};

export default LoudnessRating;
