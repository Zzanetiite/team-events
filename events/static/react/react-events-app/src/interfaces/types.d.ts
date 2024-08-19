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
  buttonText?: string;
  method?: string;
  hasEmail?: boolean; // Applicable to Admin only
  loginPage?: boolean;
}
