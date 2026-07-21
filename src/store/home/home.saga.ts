import { call, put, takeLatest } from "redux-saga/effects";
import HomeService from "@/services/home/home.service";

import {
    loadHomeFailure,
    loadHomeRequest,
    loadHomeSuccess,
} from "./home.actions";
import type { HomeState } from "./home.types";

function* loadHomeWorker(): Generator<any, void, any> {
    try {
        const response: Pick<
            HomeState,
            "banners" | "categories" | "featuredProducts"
        > = yield call(
            [HomeService, HomeService.getHomeData],
        );

        yield put(loadHomeSuccess(response));

    } catch (error) {
        yield put(loadHomeFailure("Failed to load home."));
    }
}

export function* homeSaga() {
    yield takeLatest(
        loadHomeRequest.type,
        loadHomeWorker
    );
}