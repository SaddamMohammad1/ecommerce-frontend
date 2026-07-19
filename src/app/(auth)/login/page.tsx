"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  useAppDispatch,
  useAppSelector,
} from "@/hooks/redux";

import {
  loginRequest,
  selectLoading,
  selectAuthError,
  selectIsAuthenticated,
} from "@/store/auth";
import { Button, Card, Input } from "@/components/ui";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const loading = useAppSelector(selectLoading);

  const isAuthenticated =
    useAppSelector(selectIsAuthenticated);

  const error =
    useAppSelector(selectAuthError);

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

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login successful.");

      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">

      <Card className="w-full max-w-md">
        <Card.Header className="space-y-3 text-center">
          <Card.Title>
            Welcome Back 👋
          </Card.Title>

          <Card.Description>
            Sign in to your account to continue.
          </Card.Description>
        </Card.Header>

        <Card.Content>
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <Input
              id="login"
              label="Username / Email"
              name="login"
              placeholder="Enter username or email"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />

            <Input
              id="password"
              label="Password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              loading={loading}
              fullWidth
            >
              Sign In
            </Button>
          </form>
        </Card.Content>

        <Card.Footer>
          <p className="text-sm text-slate-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Register
            </a>
          </p>
        </Card.Footer>
      </Card>

    </div>
  );
}