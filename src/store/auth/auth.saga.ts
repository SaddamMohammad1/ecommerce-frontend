import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  getApiErrorMessage,
  getApiFieldErrors,
} from "@/helpers/api.helper";
import StorageHelper from "@/helpers/storage.helper";
import TokenHelper from "@/helpers/token.helper";
import AuthService from "@/services/auth.service";

import {
  fetchProfileFailure,
  fetchProfileRequest,
  fetchProfileSuccess,
  loginFailure,
  loginRequest,
  loginSuccess,
  registerFailure,
  registerRequest,
  registerSuccess,
} from "./auth.actions";

import {
  LoginResponse,
  ProfileResponse,
  RegisterResponse,
  User,
} from "./auth.types";

const AUTH_USER_KEY = "auth_user";

function* loginWorker(
  action: ReturnType<typeof loginRequest>,
): Generator<any, void, any> {
  try {
    const response = yield call(
      [AuthService, AuthService.login],
      action.payload,
    );

    const data: LoginResponse = response.data;

    TokenHelper.saveTokens(
      data.access,
      data.refresh,
    );

    StorageHelper.set(AUTH_USER_KEY, data.user);

    yield put(
      loginSuccess({
        user: data.user,
        message: data.message ?? "",
      }),
    );
  } catch (error: unknown) {
    yield put(
      loginFailure({
        error: getApiErrorMessage(error),
        fieldErrors: getApiFieldErrors(error),
      }),
    );
  }
}

function* fetchProfileWorker(): Generator<any, void, any> {
  try {
    const response = yield call(
      [AuthService, AuthService.getProfile],
    );

    const data: ProfileResponse = response.data;

    StorageHelper.set(AUTH_USER_KEY, data.user);

    yield put(
      fetchProfileSuccess({
        user: data.user,
      }),
    );
  } catch (error: unknown) {
    yield put(
      fetchProfileFailure(
        getApiErrorMessage(error) ?? "Failed to load profile.",
      ),
    );
  }
}

function* registerWorker(
  action: ReturnType<typeof registerRequest>,
): Generator<any, void, any> {
  try {
    const response = yield call(
      [AuthService, AuthService.register],
      action.payload,
    );

    const data: RegisterResponse = response.data;

    yield put(
      registerSuccess({
        message: data.message ?? "User registered successfully.",
      }),
    );
  } catch (error: unknown) {
    yield put(
      registerFailure({
        error: getApiErrorMessage(error),
        fieldErrors: getApiFieldErrors(error),
      }),
    );
  }
}

export function* authSaga() {
  yield all([
    takeLatest(
      loginRequest.type,
      loginWorker,
    ),
    takeLatest(
      registerRequest.type,
      registerWorker,
    ),
    takeLatest(
      fetchProfileRequest.type,
      fetchProfileWorker,
    ),
  ]);
}
