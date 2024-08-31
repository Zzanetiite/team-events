import { PlaceTypes, RatingTypes } from '../constants';

export interface CounterButtonProps {
  counterId: number;
}

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

export interface ChooseAddressProps extends CreateUpdateEventInputProps {
  submitClicked: boolean;
  setSubmitClicked: React.Dispatch<React.SetStateAction<boolean>>;
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
  id: number;
  eventTitle: string;
  placeType: PlaceTypes;
  address: string;
  description: string;
  placeRating: number;
  loudnessRating: number;
  usersPlaceRating: number | null;
  usersLoudnessRating: number | null;
  comments: CommentDBProps[];
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
  user: number;
  rating_type: RatingTypes;
  score: number | null;
}

export interface EventDBProps extends EventDBMinimumProps {
  user: string;
  address: string;
  average_rating_event: number | null;
  average_rating_loudness: number | null;
  users_rating_event: number | null;
  users_rating_loudness: number | null;
  comments: CommentDBProps[];
}

export interface EventDBMinimumProps {
  id: number;
  title: string;
  event_type: string;
  description: string;
}

export interface EventTableProps extends CreateUpdateEventProps {
  id: number;
  user: string;
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

export interface NavBarUsernameProps {
  username: string | null;
  isAdmin: boolean | null;
}

export interface ConfirmActionProps {
  confirmOpen: boolean;
  setConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
}

export interface StatusAlertProps {
  message: string | null;
  severity: 'success' | 'error' | 'info' | 'warning';
}

export interface EventFormProps {
  data: EventTableProps;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSelectChange: (e: SelectChangeEvent<string>) => void;
  submitClicked?: boolean;
  setSubmitClicked?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TableColumnProps {
  userEvents: EventTableProps[];
  setSelectedEvent: (event: any) => void;
  setModalOpen: (open: boolean) => void;
}

export interface CreateEventProps {
  setNewEventCreated: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface RatingProps {
  event: EventProps;
}
