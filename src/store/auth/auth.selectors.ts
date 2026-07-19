import { RootState } from "../rootReducer";

export const selectAuth = (
  state: RootState,
) => state.auth;

export const selectUser = (
  state: RootState,
) => state.auth.user;

export const selectLoading = (
  state: RootState,
) => state.auth.loading;

export const selectIsAuthenticated = (
  state: RootState,
) => state.auth.isAuthenticated;

export const selectAuthError = (
  state: RootState,
) => state.auth.error;