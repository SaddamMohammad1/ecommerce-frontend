import { createAction } from "@reduxjs/toolkit";

import {
  LoginFailurePayload,
  LoginPayload,
  LoginSuccessPayload,
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

export const logout = createAction(
  "auth/logout",
);