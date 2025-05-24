import React from 'react';
import {
  Brush,
  Celebration,
  DinnerDining,
  Diversity3,
  Fastfood,
  MilitaryTech,
  NaturePeople,
  Paid,
  School,
  SensorDoor,
  Signpost,
} from '@mui/icons-material';

export const DOMAIN = process.env.REACT_APP_DOMAIN || window.location.origin;

export const MAP_ID = 'TEAM_EVENTS_MAP';

export enum ErrorMessages {
  NETWORK_ERROR = 'Network error, please try again later.',
  NOT_FOUND = 'The requested resource was not found.',
  UNAUTHORIZED = 'Unauthorized. Please make sure you are logged in.',
  BAD_REQUEST = 'There was an issue with your request.',
  FORBIDDEN = 'You do not have permission to access this resource.',
  INVALID_INPUT = 'Invalid input. Please check your input and try again.',
  USER_EXISTS = 'User already exists. Please choose a different username.',
  SERVER_ERROR = 'Internal server error. Please try again later.',
  UNKNOWN_ERROR = 'Sorry, something went wrong. If this continues, please contact the administrator.',
  INVALID_CREDENTIALS = 'Invalid credentials. Please try again.',
}

export const ApiEndpoints = {
  GET_CSRF_TOKEN: 'api/security/get-csrf-token/',
  GET_REACT_ENV: 'api/get-react-env/',
  CREATE_USER: 'api/user/create-user/',
  LOGIN: 'api/user/login/',
  LOGOUT: 'api/user/logout/',
  GET_USERNAME: 'api/user/get-username/',
  CREATE_ADMIN_USER: 'api/user/create-admin/',
  GET_USER_EVENTS: (username: string) => `api/events/username/${username}/`,
  GET_EVENTS_BY_TYPE: (event_types: string) =>
    `api/events/by-type/${event_types}/`,
  GET_ALL_EVENTS: 'api/events/',
  GET_LATEST_EVENTS: 'api/events/latest/',
  CREATE_EVENT: 'api/events/',
  UPDATE_OR_DELETE_EVENT: (event_id: number) => `api/events/${event_id}/`,
  SUBMIT_OR_UPDATE_RATING: 'api/ratings/',
  SUBMIT_COMMENT: 'api/comment/',
};

export const COMMENT_LIMIT = 1;

export enum PlaceTypes {
  RESTAURANT = 'Restaurant',
  FAST_FOOD = 'Fast Food',
  ESCAPE_ROOM = 'Escape Room',
  OUTDOOR_ACTIVITY = 'Outdoor Activity',
  CLASSES = 'Classes',
  TEAM_BUILDING = 'Team Building',
  OFFSITE_RETREAT = 'Offsite Retreat',
  TOURNAMENT = 'Tournament',
  FUNDRAISER = 'Fundraiser',
  PARTY = 'Party',
  ART = 'Art',
}

export const PlaceTypeIcons: Record<PlaceTypes, React.ComponentType> = {
  [PlaceTypes.RESTAURANT]: DinnerDining,
  [PlaceTypes.FAST_FOOD]: Fastfood,
  [PlaceTypes.ESCAPE_ROOM]: SensorDoor,
  [PlaceTypes.OUTDOOR_ACTIVITY]: NaturePeople,
  [PlaceTypes.CLASSES]: School,
  [PlaceTypes.TEAM_BUILDING]: Diversity3,
  [PlaceTypes.OFFSITE_RETREAT]: Signpost,
  [PlaceTypes.TOURNAMENT]: MilitaryTech,
  [PlaceTypes.FUNDRAISER]: Paid,
  [PlaceTypes.PARTY]: Celebration,
  [PlaceTypes.ART]: Brush,
};

export const MINIMUM_PASSWORD_LENGTH = 8;
export const USER_COOKIE_LENGTH_DAYS = 7;

export enum RatingTypes {
  PLACE = 1,
  LOUDNESS = 2,
}
