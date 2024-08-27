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

export interface HandleErrorProps {
  error: any;
  setErrorMessage: (message: string | null) => void;
  setSuccessMessage: (message: string | null) => void;
  messageForBadRequest?: string;
  overrideErrorHandlers?: {
    [key: number]: (setErrorMessage: (message: string | null) => void) => void;
  };
}

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

export interface CreateUpdateEventInputProps {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export interface SelectInputProps {
  value: string;
  onChange: (e: SelectChangeEvent<string>) => void;
}

export interface EventProps {
  eventTitle: string;
  placeType: PlaceTypes;
  address: string;
  description: string;
  comments: string[];
  placeRating: number; // Scale 1-5
  loudnessRating: number; // Scale 1-5
}

export interface EventDBProps {
  id: number;
  title: string;
  event_type: string;
  description: string;
  average_rating: number;
  user: string;
  address: string;
}

export interface EventTableProps extends CreateUpdateEventProps {
  id: number;
}

export interface CreateUpdateEventProps {
  title: string;
  eventType: PlaceTypes;
  address: string;
  description: string;
}

export interface EditEventModalProps {
  open: boolean;
  handleClose: () => void;
  event: EventTableProps | null;
  setModalUpdated: Dispatch<SetStateAction<boolean>>;
  setDeleteSuccessMessage: Dispatch<SetStateAction<string | null>>;
}

export interface NewEventCreatedProps {
  newEventCreated: boolean;
  setNewEventCreated: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NavBarEventsButtonProps {
  loggedIn: boolean;
  handleEventsButton: () => void;
}

export interface NavBarLoginButtonProps {
  loggedIn: boolean;
  handleLogout: () => void;
  handleLogin: () => void;
}

export interface NavBarUsernameProps {
  username: string | null;
  isAdmin: boolean | null;
}

export interface ConfirmActionProps {
  confirmOpen: boolean;
  setConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
}
