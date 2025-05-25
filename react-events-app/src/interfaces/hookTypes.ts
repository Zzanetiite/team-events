export interface AutoClearErrorProps {
  message: string | null;
  setMessage: (value: string | null) => void;
  timeout?: number;
}

export interface UseUserFormProps {
  title: string;
  apiEndpoint: string;
  successMessageText: string;
  messageForBadRequest: string | undefined;
  method?: string;
  loginPage?: boolean;
  adminPage?: boolean;
}

export interface useEventFilterProps {
  homePageFilterOpen: boolean;
  selectedEventTypes: string[];
}

export interface FetchEventsProps {
  filterOn: boolean;
  selectedEventTypes: string[];
  setErrorMessage: (message: string | null) => void;
  setEventData: (data: any) => void;
  fetchWithTokens: (url: string, options: any) => Promise<any>;
  currentCoordinates: google.maps.LatLngLiteral | null;
}

export interface UseLoginProps {
  apiEndpoint: string;
  successMessageText: string;
  messageForBadRequest: string;
  method?: string;
}

export interface useValidateAdminPasswordProps {
  successMessageText: string;
}
