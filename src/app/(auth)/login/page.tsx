"use client";

import { FormEvent, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "@/hooks/redux";

import {
  loginRequest,
  selectLoading,
} from "@/store/auth";

export default function LoginPage() {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectLoading);

  const [login, setLogin] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(
      loginRequest({
        login,
        password,
      }),
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded border p-6"
      >
        <h1 className="text-2xl font-bold">
          Login
        </h1>

        <input
          type="email"
          placeholder="Enter usernmae or email"
          value={login}
          onChange={(e) =>
            setLogin(e.target.value)
          }
          className="w-full rounded border p-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full rounded border p-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 p-2 text-white"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

    </div>
  );
}