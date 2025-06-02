import React from 'react';
import {
  Celebration,
  DinnerDining,
  Diversity3,
  MilitaryTech,
  NaturePeople,
  SensorDoor,
} from '@mui/icons-material';
import restaurantImage from './assets/restaurant.jpg';
import escapeRoomImage from './assets/escape-room.jpg';
import outdoorActivityImage from './assets/outdoors.jpg';
import teamBuildingImage from './assets/team-building.jpg';
import tournamentImage from './assets/tournament.jpg';
import partyImage from './assets/party.jpg';

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
  GET_EVENT_BY_ID: (id: number | string) => `api/events/${id}/`,
  GET_ALL_EVENTS: 'api/events/',
  GET_LATEST_EVENTS: 'api/events/latest/',
  GET_NEARBY_EVENTS: 'api/events/nearby/',
  CREATE_EVENT: 'api/events/',
  UPDATE_OR_DELETE_EVENT: (event_id: number) => `api/events/${event_id}/`,
  SUBMIT_OR_UPDATE_RATING: 'api/ratings/',
  SUBMIT_COMMENT: 'api/comment/',
};

export const COMMENT_LIMIT = 5;

export enum PlaceTypes {
  RESTAURANT = 'Restaurant',
  ESCAPE_ROOM = 'Escape Room',
  OUTDOOR_ACTIVITY = 'Outdoors',
  TEAM_BUILDING = 'Team Building',
  TOURNAMENT = 'Tournament',
  PARTY = 'Party',
}

export const PlaceTypeIcons: Record<PlaceTypes, React.ComponentType> = {
  [PlaceTypes.RESTAURANT]: DinnerDining,
  [PlaceTypes.ESCAPE_ROOM]: SensorDoor,
  [PlaceTypes.OUTDOOR_ACTIVITY]: NaturePeople,
  [PlaceTypes.TEAM_BUILDING]: Diversity3,
  [PlaceTypes.TOURNAMENT]: MilitaryTech,
  [PlaceTypes.PARTY]: Celebration,
};

export const PlaceTypeColors: Record<PlaceTypes, string> = {
  [PlaceTypes.RESTAURANT]: '#B2560D', // Warm orange — cozy, appetizing
  [PlaceTypes.ESCAPE_ROOM]: '#7851A9', // Deep purple — mystery, intrigue
  [PlaceTypes.OUTDOOR_ACTIVITY]: '#66BB6A', // Nature green — fresh, adventurous
  [PlaceTypes.TEAM_BUILDING]: '#0062CC', // Friendly blue — collaboration, trust
  [PlaceTypes.TOURNAMENT]: '#FBC02D', // Gold/yellow — competition, victory
  [PlaceTypes.PARTY]: '#FF8FAB', // Bright pink — festive, energetic
};

export const PlaceTypeImages: Record<PlaceTypes, string> = {
  [PlaceTypes.RESTAURANT]: restaurantImage,
  [PlaceTypes.ESCAPE_ROOM]: escapeRoomImage,
  [PlaceTypes.OUTDOOR_ACTIVITY]: outdoorActivityImage,
  [PlaceTypes.TEAM_BUILDING]: teamBuildingImage,
  [PlaceTypes.TOURNAMENT]: tournamentImage,
  [PlaceTypes.PARTY]: partyImage,
};

export const MINIMUM_PASSWORD_LENGTH = 8;
export const USER_COOKIE_LENGTH_DAYS = 7;

export enum RatingTypes {
  PLACE = 1,
  LOUDNESS = 2,
}
