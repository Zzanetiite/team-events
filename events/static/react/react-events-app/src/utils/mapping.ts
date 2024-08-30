import { PlaceTypes, RatingTypes } from '../constants';
import {
  EventDBMinimumProps,
  EventDBProps,
  EventProps,
  EventTableProps,
  RatingDBProps,
} from '../interfaces/types';

export const mapEventTypeToPlaceType = (eventTypeName: string): PlaceTypes => {
  const placeType = Object.values(PlaceTypes).find(
    (type) => type === eventTypeName
  );
  return placeType || PlaceTypes.TEAM_BUILDING;
};

export const mapEventData = (apiData: EventDBProps[]): EventProps[] => {
  console.log('API data:', apiData);
  return apiData.map((event) => ({
    id: event.id,
    eventTitle: event.title,
    placeType: mapEventTypeToPlaceType(event.event_type),
    address: event.address,
    description: event.description,
    comments: [
      'Short comment!',
      'Great service. A lovely place to eat and hang out with friends. Great ambiance and food!',
      'Will visit again! A lovely place to eat and hang out with friends. Great ambiance and food!',
    ],
    placeRating: event.average_rating_event || 0,
    loudnessRating: event.average_rating_loudness || 0,
    usersPlaceRating: event.users_rating_event || null,
    usersLoudnessRating: event.users_rating_loudness || null,
  }));
};

export const mapEventTableData = (
  apiData: EventDBProps[]
): EventTableProps[] => {
  return apiData.map((event) => ({
    id: event.id,
    title: event.title,
    eventType: mapEventTypeToPlaceType(event.event_type),
    address: event.address,
    description: event.description,
    user: event.user,
  }));
};

export const mapEventToDBFormat = (
  event: EventTableProps
): EventDBMinimumProps => {
  return {
    id: event.id,
    title: event.title,
    event_type: event.eventType,
    description: event.description,
  };
};

export const mapEventToRatingDBFormat = (
  event: EventProps,
  rating: number,
  votingUserID: number,
  ratingType: RatingTypes
): RatingDBProps => {
  return {
    event: event.id,
    user: votingUserID, // TODO: Add user ID to context
    rating_type: ratingType,
    score: rating,
  };
};
