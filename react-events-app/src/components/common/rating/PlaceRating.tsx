import React from 'react';
import { Rating, Tooltip } from '@mui/material';
import { RatingProps } from '../../../interfaces/types';
import { useRating } from '../../../hooks/useRating';
import { RatingTypes } from '../../../constants';
import RatingBox from './RatingBox';

const PlaceRating: React.FC<RatingProps> = ({ event }) => {
  const { userRating, submissionStatus, handleRatingChange, disabled } =
    useRating(event, RatingTypes.PLACE);
  return (
    <RatingBox
      eventRating={event.placeRating || 0}
      submissionStatus={submissionStatus}
    >
      <Tooltip
        title={
          disabled
            ? "You've already voted"
            : 'Rate the overall experience of this place for a team event.'
        }
      >
        <span style={{ display: 'inline-block', cursor: 'not-allowed' }}>
          <Rating
            name="place-rating"
            defaultValue={event.placeRating}
            max={5}
            size="small"
            disabled={disabled}
            value={userRating}
            onChange={handleRatingChange}
          />
        </span>
      </Tooltip>
    </RatingBox>
  );
};

export default PlaceRating;
