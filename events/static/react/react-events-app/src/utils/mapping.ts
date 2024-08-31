import { PlaceTypes, RatingTypes } from '../constants';
import {
  EventDBCreateProps,
  EventDBMinimumProps,
  EventDBProps,
  EventProps,
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
    user: event.user,
    eventTitle: event.title,
    placeType: mapEventTypeToPlaceType(event.event_type),
    location: {
      address: event.location.address,
      location: {
        lat: event.location.lat || 0,
        lng: event.location.lng || 0,
      },
    },
    description: event.description,
    comments: event.comments,
    placeRating: event.average_rating_event || 0,
    loudnessRating: event.average_rating_loudness || 0,
    usersPlaceRating: event.users_rating_event || null,
    usersLoudnessRating: event.users_rating_loudness || null,
  }));
};

export const mapUpdateEventToDBFormat = (
  event: EventProps
): EventDBMinimumProps => {
  return {
    id: event.id,
    title: event.eventTitle,
    description: event.description,
    event_type: event.placeType,
    location: {
      address: event.location.address,
      lng: event.location.location.lng,
      lat: event.location.location.lat,
    },
  };
};

export const mapCreateEventToDBFormat = (
  event: EventProps
): EventDBCreateProps => {
  return {
    title: event.eventTitle,
    description: event.description,
    event_type: event.placeType,
    location: {
      address: event.location.address,
      lng: event.location.location.lng,
      lat: event.location.location.lat,
    },
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
    user: votingUserID,
    rating_type: ratingType,
    score: rating,
  };
};
