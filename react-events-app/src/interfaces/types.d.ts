import { PlaceTypes, RatingTypes } from '../constants';

export interface ShowCommentsButtonProps {
  showAllComments: boolean;
  setShowAllComments: (showAllComments: boolean) => void;
}

export interface NavBarEventsButtonProps {
  loggedIn: boolean;
  handleEventsButton: () => void;
}

export interface NavBarFilterButtonProps {
  handleFilterOpen: () => void;
}

export interface NavBarLoginButtonProps {
  loggedIn: boolean;
  handleLogout: () => void;
  handleLogin: () => void;
}

export interface FetchOptions extends RequestInit {
  body?: any;
}

export interface ApiResponseBody {
  ok: boolean;
  status: number;
  message: string;
}

export interface ValidatePasswordProps {
  title: string;
  successMessageText: ReactNode;
}

export interface CreateUserFormProps {
  title: string;
  apiEndpoint: string;
  successMessageText: ReactNode;
  messageForBadRequest?: string;
  method?: string;
  loginPage?: boolean;
  adminPage?: boolean;
}

export interface LoginPageProps {
  title: string;
  apiEndpoint: string;
  successMessageText: ReactNode;
  messageForBadRequest: string;
  method: string;
}

export interface HandleErrorProps {
  error: any;
  setErrorMessage: (message: string | null) => void;
  setSuccessMessage?: (message: string | null) => void;
  messageForBadRequest?: string;
  overrideErrorHandlers?: {
    [key: number]: (setErrorMessage: (message: string | null) => void) => void;
  };
}

export interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  feedback: string;
}

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

export interface ChooseAddressProps {
  onChange: (location: LocationProps) => void;
  submitClicked: boolean;
  setSubmitClicked: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

export interface CreateUpdateEventInputProps {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  loading: boolean;
}

export interface SelectInputProps {
  value: string;
  onChange: (e: SelectChangeEvent<string>) => void;
  loading: boolean;
}

export interface EventDBProps {
  id: number;
  user: string;
  title: string;
  event_type: string;
  description: string;
  location: {
    id: number;
    address: string;
    longitude: number;
    latitude: number;
  };
  average_rating_event: number | null;
  average_rating_loudness: number | null;
  users_rating_event: number | null;
  users_rating_loudness: number | null;
  comments: CommentDBProps[];
}

export interface EventDBMinimumProps extends EventDBCreateProps {
  id: number;
}

export interface EventDBCreateProps {
  title: string;
  event_type: string;
  description: string;
  location: {
    address: string;
    lng: number;
    lat: number;
  };
}

export interface EventProps {
  id: number;
  user: string;
  eventTitle: string;
  placeType: PlaceTypes;
  location: LocationProps;
  description: string;
  placeRating: number;
  loudnessRating: number;
  usersPlaceRating: number | null;
  usersLoudnessRating: number | null;
  comments: CommentDBProps[];
}

export interface LocationProps {
  address: string;
  location: google.maps.LatLngLiteral;
}

export interface CommentDBProps {
  id: number;
  comment: string;
  event: number;
  user: string;
  date_created: string;
}

export interface CommentCardProps {
  username: string;
  date: string;
  text: string;
}

export interface RatingDBProps {
  event: number;
  rating_type: RatingTypes;
  score: number | null;
}

export interface CreateUpdateEventProps {
  title: string;
  eventType: PlaceTypes;
  location: LocationProps;
  description: string;
}

export interface EditEventModalProps {
  selectedEvent: EventProps | null;
  open: boolean;
  handleClose: () => void;
  setModalUpdated: Dispatch<SetStateAction<boolean>>;
  setDeleteSuccessMessage: Dispatch<SetStateAction<string | null>>;
}

export interface NewEventCreatedProps {
  newEventCreated: boolean;
  setNewEventCreated: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEvent: EventProps | null;
  setSelectedEvent: React.Dispatch<React.SetStateAction<EventProps | null>>;
}

export interface NavBarUsernameProps {
  username: string | null;
  isAdmin: boolean | null;
}

export interface ConfirmActionProps {
  confirmOpen: boolean;
  setConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
  title?: string;
  description?: string;
}

export interface StatusAlertProps {
  message: string | null;
  severity: 'success' | 'error' | 'info' | 'warning';
}

export interface EventFormProps {
  data: EventProps;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSelectChange: (e: SelectChangeEvent<string>) => void;
  submitClicked?: boolean;
  setSubmitClicked?: React.Dispatch<React.SetStateAction<boolean>>;
  handleLocationChange: (location: LocationProps) => void;
  loading: boolean;
}

export interface TableColumnProps {
  userEvents: EventTableProps[] | null;
  setSelectedEvent: (event: any) => void;
}

export interface CreateEventProps {
  setNewEventCreated: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEvent: EventProps | null;
}

export interface RatingProps {
  event: EventProps;
}

export interface PoiMarkerProps {
  events: EventProps[];
}
