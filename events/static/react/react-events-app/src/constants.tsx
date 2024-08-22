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

export enum ApiEndpoints {
  GET_CSRF_TOKEN = 'api/get-csrf-token/',
  CREATE_USER = 'api/create-user/',
  LOGIN = 'api/login/',
  LOGOUT = 'api/logout/',
  GET_USERNAME = 'api/get-username/',
  CREATE_ADMIN_USER = 'api/create-admin-user/',
  VALIDATE_ADMIN_PAGE_PASSWORD = 'api/validate-admin-page-password/',
}
