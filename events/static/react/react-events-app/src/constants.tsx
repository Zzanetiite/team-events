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

export const DOMAIN = window.DOMAIN || 'http://localhost:8000';

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
  CREATE_USER: 'api/user/create-user/',
  LOGIN: 'api/user/login/',
  LOGOUT: 'api/user/logout/',
  GET_USERNAME: 'api/user/get-username/',
  CREATE_ADMIN_USER: 'api/user/create-admin/',
  VALIDATE_ADMIN_PAGE_PASSWORD: 'api/security/validate-admin-password/',
  GET_USER_EVENTS: (username: string) => `api/events/username/${username}`,
  GET_TYPE_EVENTS: (event_type_id: number) =>
    `api/events/type/${event_type_id}/`,
  GET_LATEST_EVENTS: 'api/events/latest/',
  CREATE_EVENT: 'api/events/',
};

export const COMMENT_LIMIT = 2;

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
