export interface LoginPayload {
  login: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  password: string;
  confirm_password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  uid: string;
  token: string;
  password: string;
  confirm_password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  role: string;
  email_verified: boolean;
}

export interface LoginFailurePayload {
  error: string | null;
  fieldErrors: Record<string, string>;
}

export interface LoginSuccessPayload {
  user: User;
  message: string;
}

export interface RegisterSuccessPayload {
  message: string;
}

export interface AuthInitializedPayload {
  isAuthenticated: boolean;
  user: User | null;
}

export interface AuthState {
  loading: boolean;
  profileLoading: boolean;
  isAuthenticated: boolean;
  isInitialized: boolean;
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

export interface ProfileResponse {
  message: string;
  user: User;
}

export interface MessageResponse {
  message: string;
}

export interface RegisterResponse {
  message: string;
  data: User;
}
