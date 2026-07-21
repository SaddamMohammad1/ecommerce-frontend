"use client";

import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import StorageHelper from "@/helpers/storage.helper";
import TokenHelper from "@/helpers/token.helper";
import {
  authInitialized,
  selectIsAuthInitialized,
} from "@/store/auth";
import type { User } from "@/store/auth/auth.types";

const AUTH_USER_KEY = "auth_user";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(selectIsAuthInitialized);

  useEffect(() => {
    if (isInitialized) return;

    const token = TokenHelper.getAccessToken();
    const user = StorageHelper.get<User>(AUTH_USER_KEY);

    dispatch(
      authInitialized({
        isAuthenticated: Boolean(token),
        user: token ? user : null,
      }),
    );
  }, [dispatch, isInitialized]);

  return children;
}
