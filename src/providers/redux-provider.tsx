"use client";

import { Provider } from "react-redux";

import { AuthInitializer } from "@/components/auth";
import { store } from "@/store/store";

type Props = {
  children: React.ReactNode;
};

export default function ReduxProvider({
  children,
}: Props) {
  return (
    <Provider store={store}>
      <AuthInitializer>
        {children}
      </AuthInitializer>
    </Provider>
  );
}