import { createAction } from "@reduxjs/toolkit";

import {
  AuthInitializedPayload,
  LoginFailurePayload,
  LoginPayload,
  LoginSuccessPayload,
  RegisterPayload,
  RegisterSuccessPayload,
  User,
} from "./auth.types";

export const loginRequest = createAction<LoginPayload>(
  "auth/loginRequest",
);

export const loginSuccess = createAction<LoginSuccessPayload>(
  "auth/loginSuccess",
);

export const loginFailure = createAction<LoginFailurePayload>(
  "auth/loginFailure",
);

export const registerRequest = createAction<RegisterPayload>(
  "auth/registerRequest",
);

export const registerSuccess = createAction<RegisterSuccessPayload>(
  "auth/registerSuccess",
);

export const registerFailure = createAction<LoginFailurePayload>(
  "auth/registerFailure",
);

export const clearAuthFeedback = createAction(
  "auth/clearAuthFeedback",
);

export const logout = createAction(
  "auth/logout",
);

export const authInitialized = createAction<AuthInitializedPayload>(
  "auth/authInitialized",
);

export const fetchProfileRequest = createAction(
  "auth/fetchProfileRequest",
);

export const fetchProfileSuccess = createAction<{ user: User }>(
  "auth/fetchProfileSuccess",
);

export const fetchProfileFailure = createAction<string>(
  "auth/fetchProfileFailure",
);