import { createAction } from "@reduxjs/toolkit";

import { LoginPayload, User } from "./auth.types";

export const loginRequest = createAction<LoginPayload>(
  "auth/loginRequest",
);

export const loginSuccess = createAction<User>(
  "auth/loginSuccess",
);

export const loginFailure = createAction<string>(
  "auth/loginFailure",
);

export const logout = createAction(
  "auth/logout",
);