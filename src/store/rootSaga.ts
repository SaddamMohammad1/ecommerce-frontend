import { all } from "redux-saga/effects";

import authSaga from "./auth/auth.saga";

/**
 * Root saga registers all feature sagas.
 *
 * Example:
 * authSaga()     → Handles authentication
 * productSaga()  → Handles products
 * cartSaga()     → Handles cart
 */
export default function* rootSaga() {
  yield all([
    authSaga(),
  ]);
}