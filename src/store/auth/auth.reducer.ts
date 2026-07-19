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
};

const authReducer = createReducer(initialState, (builder) => {
  builder

    .addCase(loginRequest, (state) => {
      state.loading = true;
      state.error = null;
    })

    .addCase(loginSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })

    .addCase(loginFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(logout, (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    });
});

export default authReducer;