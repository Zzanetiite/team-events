import React from 'react';
import { VolumeMute, VolumeUp } from '@mui/icons-material';
import { StyledLoudnessRating } from '../../../config';
import { RatingProps } from '../../../interfaces/types';
import { RatingTypes } from '../../../constants';
import { useRating } from '../../../hooks/useRating';
import RatingBox from './RatingBox';

const LoudnessRating: React.FC<RatingProps> = ({ event }) => {
  const { userRating, submissionStatus, handleRatingChange, disabled } =
    useRating(event, RatingTypes.LOUDNESS);
  return (
    <RatingBox
      eventRating={event.loudnessRating || 0}
      submissionStatus={submissionStatus}
    >
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
