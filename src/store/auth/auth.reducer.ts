import { createReducer } from "@reduxjs/toolkit";

import {
  authInitialized,
  clearAuthFeedback,
  fetchProfileFailure,
  fetchProfileRequest,
  fetchProfileSuccess,
  loginFailure,
  loginRequest,
  loginSuccess,
  logout,
  registerFailure,
  registerRequest,
  registerSuccess,
} from "./auth.actions";
import { AuthState } from "./auth.types";

const initialState: AuthState = {
  loading: false,
  profileLoading: false,
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  error: null,
  fieldErrors: {},
  successMessage: null,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginRequest, (state) => {
      state.loading = true;
      state.error = null;
      state.fieldErrors = {};
      state.successMessage = null;
    })

    .addCase(loginSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.successMessage = action.payload.message;
    })

    .addCase(loginFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.fieldErrors = action.payload.fieldErrors;
    })

    .addCase(registerRequest, (state) => {
      state.loading = true;
      state.error = null;
      state.fieldErrors = {};
      state.successMessage = null;
    })

    .addCase(registerSuccess, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
    })

    .addCase(registerFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.fieldErrors = action.payload.fieldErrors;
    })

    .addCase(clearAuthFeedback, (state) => {
      state.error = null;
      state.fieldErrors = {};
      state.successMessage = null;
    })

    .addCase(logout, (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.fieldErrors = {};
      state.successMessage = null;
    })

    .addCase(authInitialized, (state, action) => {
      state.isInitialized = true;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    })

    .addCase(fetchProfileRequest, (state) => {
      state.profileLoading = true;
      state.error = null;
    })

    .addCase(fetchProfileSuccess, (state, action) => {
      state.profileLoading = false;
      state.user = action.payload.user;
    })

    .addCase(fetchProfileFailure, (state, action) => {
      state.profileLoading = false;
      state.error = action.payload;
    });
});