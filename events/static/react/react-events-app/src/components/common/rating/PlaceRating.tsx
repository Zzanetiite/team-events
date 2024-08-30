import React from 'react';
import { Rating } from '@mui/material';
import { RatingProps } from '../../../interfaces/types';
import { usePlaceRating } from '../../../hooks/useRating';
import { RatingTypes } from '../../../constants';
import RatingBox from './RatingBox';

const PlaceRating: React.FC<RatingProps> = ({ event }) => {
  const {
    userRating,
    submissionStatus,
    eventRating,
    handleRatingChange,
    disabled,
  } = usePlaceRating(event, RatingTypes.PLACE);
  return (
    <RatingBox eventRating={eventRating} submissionStatus={submissionStatus}>
      <Rating
        name="place-rating"
        defaultValue={event.placeRating}
        max={5}
        size="small"
        disabled={disabled}
        value={userRating}
        onChange={handleRatingChange}
      />
    </RatingBox>
  );
};

export default PlaceRating;
