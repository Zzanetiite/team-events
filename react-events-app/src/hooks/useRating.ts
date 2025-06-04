import { useState, useEffect, SyntheticEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApi } from './useApi';
import { ApiEndpoints, RatingTypes } from '../constants';
import { mapEventToRatingDBFormat } from '../utils/mapping';
import { EventProps } from '../interfaces/types';

export const useRating = (event: EventProps, ratingType: RatingTypes) => {
  const [userRating, setUserRating] = useState<number>(
    getStartingUserRating(ratingType, event)
  );
  const [submissionStatus, setSubmissionStatus] = useState<
    'success' | 'error' | null
  >(null);
  const { loggedIn, user } = useAuth();
  const { fetchWithTokens } = useApi();

  const disabled = !loggedIn || userRating > 0;
  const tooltipText = disabled
    ? loggedIn
      ? 'You already voted'
      : 'Please login to vote'
    : 'Click on the highlighted level to leave a rating';

  useEffect(() => {
    if (submissionStatus) {
      const timer = setTimeout(() => {
        setSubmissionStatus(null);
      }, 4000); // 4 seconds

      return () => clearTimeout(timer);
    }
  }, [submissionStatus]);

  const handleRatingChange = async (
    synthethicEvent: SyntheticEvent,
    newValue: number | null
  ) => {
    if (newValue === null || user.userId === null) {
      setSubmissionStatus('error');
      return;
    }
    try {
      const response = await fetchWithTokens(
        ApiEndpoints.SUBMIT_OR_UPDATE_RATING,
        {
          method: 'POST',
          body: JSON.stringify(
            mapEventToRatingDBFormat(event, newValue, user.userId, ratingType)
          ),
        }
      );
      if (response) {
        setUserRating(newValue);
        setSubmissionStatus('success');
      }
    } catch (error: any) {
      setSubmissionStatus('error');
      console.error(error);
    }
  };

  return {
    userRating,
    submissionStatus,
    handleRatingChange,
    disabled: disabled,
    tooltipText,
  };
};

function getStartingUserRating(
  ratingType: RatingTypes,
  event: EventProps
): number {
  if (ratingType === RatingTypes.LOUDNESS) {
    return event.usersLoudnessRating || 0;
  } else if (ratingType === RatingTypes.PLACE) {
    return event.usersPlaceRating || 0;
  } else {
    return 0;
  }
}
