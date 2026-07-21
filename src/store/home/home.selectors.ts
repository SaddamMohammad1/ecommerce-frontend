import { RootState } from "../rootReducer";

export const selectHome =
    (state: RootState) => state.home;

export const selectBanners =
    (state: RootState) =>
        state.home.banners;

export const selectCategories =
    (state: RootState) =>
        state.home.categories;

export const selectFeaturedProducts =
    (state: RootState) =>
        state.home.featuredProducts;

export const selectHomeLoading =
    (state: RootState) =>
        state.home.loading;