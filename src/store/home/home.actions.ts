import { createAction } from "@reduxjs/toolkit";
import type { HomeState } from "./home.types";

export const loadHomeRequest =
    createAction("home/loadHomeRequest");

export const loadHomeSuccess =
    createAction<Pick<HomeState,
        "banners" |
        "categories" |
        "featuredProducts"
    >>("home/loadHomeSuccess");

export const loadHomeFailure =
    createAction<string>("home/loadHomeFailure");