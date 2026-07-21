import { combineReducers } from "@reduxjs/toolkit";

import { authReducer } from "./auth";
import { homeReducer } from "./home";

export const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;