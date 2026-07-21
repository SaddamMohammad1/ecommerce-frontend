import { createReducer } from "@reduxjs/toolkit";
import {
    loadHomeFailure,
    loadHomeRequest,
    loadHomeSuccess,
} from "./home.actions";
import type { HomeState } from "./home.types";

const initialState: HomeState = {
    loading: false,
    banners: [],
    categories: [],
    featuredProducts: [],
    error: null,
};

export const homeReducer = createReducer(
    initialState,
    (builder) => {
        builder

            .addCase(loadHomeRequest, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(loadHomeSuccess, (state, action) => {
                state.loading = false;

                state.banners = action.payload.banners;
                state.categories = action.payload.categories;
                state.featuredProducts =
                    action.payload.featuredProducts;
            })

            .addCase(loadHomeFailure, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
);