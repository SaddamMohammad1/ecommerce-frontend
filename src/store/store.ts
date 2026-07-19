import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

/**
 * Redux Saga middleware intercepts dispatched actions
 * to perform asynchronous side effects (API calls, delays,
 * background tasks, etc.).
 *
 * Example:
 * dispatch(loginRequest(payload))
 *        ↓
 *     rootSaga
 *        ↓
 *   call(loginApi)
 *        ↓
 * dispatch(loginSuccess(user))
 */
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  /**
   * Combine all feature reducers into a single Redux store.
   *
   * Example state:
   * {
   *   auth: { ... },
   *   products: { ... },
   *   cart: { ... }
   * }
   */
  reducer: rootReducer,

  /**
   * Redux Toolkit includes default middleware (immutability,
   * serializable value checks, etc.).
   *
   * Saga middleware is appended so it can listen for dispatched
   * actions and handle asynchronous workflows.
   */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Disable serializable warnings since Saga and some
      // libraries may use non-serializable values internally.
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

/**
 * Start the root saga.
 * All watcher sagas begin listening for their respective actions.
 */
sagaMiddleware.run(rootSaga);

/**
 * Typed dispatch for useAppDispatch().
 *
 * Example:
 * const dispatch = useAppDispatch();
 * dispatch(loginRequest({ login, password }));
 */
export type AppDispatch = typeof store.dispatch;