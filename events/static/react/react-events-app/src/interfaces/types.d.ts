import { PlaceTypes } from '../constants';

export interface Counter {
  id: number;
  value: number;
}

export interface CounterButtonProps {
  counterId: number;
}

export interface FetchOptions extends RequestInit {
  body?: any;
}

export interface ApiResponseBody {
  ok: boolean;
  status: number;
  message: string;
}

export interface CreateUserFormProps {
  title: string;
  apiEndpoint: string;
  successMessageText: ReactNode;
  messageForBadRequest?: string;
  buttonText?: string;
  method?: string;
  loginPage?: boolean;
  adminPage?: boolean;
}

interface HandleErrorProps {
  error: any;
  setErrorMessage: (message: string | null) => void;
  setSuccessMessage: (message: string | null) => void;
  messageForBadRequest?: string;
  overrideErrorHandlers?: {
    [key: number]: (setErrorMessage: (message: string | null) => void) => void;
  };
}

interface InputProps {
  field: string;
  setField: (password: string) => void;
}

interface EventProps {
  eventTitle: string;
  placeType: PlaceTypes;
  address: string;
  description: string;
  comments: string[];
  placeRating: number; // Scale 1-5
  loudnessRating: number; // Scale 1-5
}

interface EventDBProps {
  id: number;
  title: string;
  event_type: { id: number; name: string };
  description: string;
  average_rating: number;
  user: string;
}
