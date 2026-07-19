export interface LoginPayload {
  login: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface LoginFailurePayload {
  error: string | null;
  fieldErrors: Record<string, string>;
}

export interface LoginSuccessPayload {
  user: User;
  message: string;
}

export interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
  fieldErrors: Record<string, string>;
  successMessage: string | null;
}

export interface LoginResponse {
  message: string;
  access: string;
  refresh: string;
  user: User;
}