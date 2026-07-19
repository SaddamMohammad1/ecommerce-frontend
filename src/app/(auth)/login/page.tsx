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
  selectAuthFieldErrors,
  selectAuthSuccessMessage,
  selectIsAuthenticated,
} from "@/store/auth";
import { Button, Card, Input } from "@/components/ui";
import {
  getPasswordRuleStatuses,
  isPasswordValid,
} from "@/utils/password.validation";

type FieldErrors = {
  login?: string;
  password?: string;
};

function validateLoginForm(
  login: string,
  password: string,
): FieldErrors {
  const errors: FieldErrors = {};

  if (!login.trim()) {
    errors.login = "Username or email cannot be blank.";
  }

  if (!password.trim()) {
    errors.password = "Password cannot be blank.";
  } else if (!isPasswordValid(password)) {
    errors.password =
      "Password must meet all requirements below.";
  }

  return errors;
}

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const loading = useAppSelector(selectLoading);

  const isAuthenticated =
    useAppSelector(selectIsAuthenticated);

  const error =
    useAppSelector(selectAuthError);

  const apiFieldErrors =
    useAppSelector(selectAuthFieldErrors);

  const successMessage =
    useAppSelector(selectAuthSuccessMessage);

  const [login, setLogin] = useState("");

  const [password, setPassword] = useState("");

  const [clientFieldErrors, setClientFieldErrors] =
    useState<FieldErrors>({});

  const loginError =
    clientFieldErrors.login ?? apiFieldErrors.login;

  const passwordError =
    clientFieldErrors.password ?? apiFieldErrors.password;

  const passwordRules = getPasswordRuleStatuses(password);

  const unmetPasswordRules = passwordRules.filter(
    (rule) => !rule.met,
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(
      login,
      password,
    );

    if (Object.keys(validationErrors).length > 0) {
      setClientFieldErrors(validationErrors);
      return;
    }

    setClientFieldErrors({});

    dispatch(
      loginRequest({
        login,
        password,
      }),
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (successMessage) {
        toast.success(successMessage);
      }

      router.replace("/dashboard");
    }
  }, [isAuthenticated, router, successMessage]);

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
            noValidate
          >
            <Input
              id="login"
              label="Username / Email"
              name="login"
              placeholder="Enter username or email"
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);

                setClientFieldErrors((prev) => ({
                  ...prev,
                  login: undefined,
                }));
              }}
              error={loginError}
            />

            <Input
              id="password"
              label="Password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);

                setClientFieldErrors((prev) => ({
                  ...prev,
                  password: undefined,
                }));
              }}
              error={passwordError}
            />

            {password.length > 0 &&
              unmetPasswordRules.length > 0 && (
              <ul
                className="space-y-1 text-sm"
                aria-live="polite"
              >
                {unmetPasswordRules.map((rule) => (
                  <li
                    key={rule.key}
                    className="text-red-500"
                  >
                    {rule.label}
                  </li>
                ))}
              </ul>
            )}

            {error && (
              <p className="text-sm text-red-500" role="alert">
                {error}
              </p>
            )}

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
