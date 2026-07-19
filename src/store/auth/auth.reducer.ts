import { createReducer } from "@reduxjs/toolkit";

import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logout,
} from "./auth.actions";
import { AuthState } from "./auth.types";

const initialState: AuthState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
  fieldErrors: {},
  successMessage: null,
};

const authReducer = createReducer(initialState, (builder) => {
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

    .addCase(logout, (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.fieldErrors = {};
      state.successMessage = null;
    });
});

export default authReducer;