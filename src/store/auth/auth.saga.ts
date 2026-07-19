import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  getApiErrorMessage,
  getApiFieldErrors,
} from "@/helpers/api.helper";
import TokenHelper from "@/helpers/token.helper";
import AuthService from "@/services/auth.service";

import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from "./auth.actions";

import {
  LoginResponse,
} from "./auth.types";

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

export default function* authSaga() {
  yield all([
    takeLatest(
      loginRequest.type,
      loginWorker,
    ),
  ]);
}