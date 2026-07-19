import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

import type { RootState } from "@/store/rootReducer";
import type { AppDispatch } from "@/store/store";

export const useAppDispatch =
  useDispatch.withTypes<AppDispatch>();

export const useAppSelector =
  useSelector.withTypes<RootState>();