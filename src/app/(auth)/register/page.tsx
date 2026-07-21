"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  clearAuthFeedback,
  registerRequest,
  selectAuthError,
  selectAuthFieldErrors,
  selectAuthSuccessMessage,
  selectIsAuthenticated,
  selectIsAuthInitialized,
  selectLoading,
} from "@/store/auth";
import { Button, Card, Input } from "@/components/ui";
import {
  getPasswordRuleStatuses,
  isPasswordValid,
} from "@/utils/password.validation";
import {
  EMPTY_REGISTER_FORM,
  RegisterFieldErrors,
  RegisterFormValues,
  validateRegisterForm,
} from "@/utils/register.validation";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const loading = useAppSelector(selectLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAuthInitialized = useAppSelector(selectIsAuthInitialized);
  const error = useAppSelector(selectAuthError);
  const apiFieldErrors = useAppSelector(selectAuthFieldErrors);
  const successMessage = useAppSelector(selectAuthSuccessMessage);

  const [form, setForm] = useState<RegisterFormValues>(
    EMPTY_REGISTER_FORM,
  );
  const [clientFieldErrors, setClientFieldErrors] =
    useState<RegisterFieldErrors>({});

  const getFieldError = (
    field: keyof RegisterFormValues,
  ) => clientFieldErrors[field] ?? apiFieldErrors[field];

  const passwordRules = getPasswordRuleStatuses(form.password);
  const unmetPasswordRules = passwordRules.filter(
    (rule) => !rule.met,
  );

  const confirmPasswordError =
    getFieldError("confirm_password") ??
    (form.confirm_password.length > 0 &&
    form.password !== form.confirm_password
      ? "Passwords do not match."
      : undefined);

  const updateField = (
    field: keyof RegisterFormValues,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setClientFieldErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const payload: RegisterFormValues = {
      username: form.username.trim(),
      email: form.email.trim(),
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      phone_number: form.phone_number.trim(),
      password: form.password,
      confirm_password: form.confirm_password,
    };

    const validationErrors = validateRegisterForm(
      payload,
      isPasswordValid,
    );

    if (Object.keys(validationErrors).length > 0) {
      setClientFieldErrors(validationErrors);
      return;
    }

    setClientFieldErrors({});
    dispatch(registerRequest(payload));
  };

  useEffect(() => {
    if (!isAuthInitialized) return;

    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isAuthInitialized, router]);

  useEffect(() => {
    if (!successMessage || loading) return;

    toast.success(successMessage);
    dispatch(clearAuthFeedback());
    router.replace("/login");
  }, [dispatch, loading, router, successMessage]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (!isAuthInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <Card className="w-full max-w-2xl">
        <Card.Header className="space-y-3 text-center">
          <Card.Title>Create Your Account</Card.Title>
          <Card.Description>
            Join DayDreamer to shop smarter. All fields are required.
          </Card.Description>
        </Card.Header>

        <Card.Content>
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                id="first_name"
                label="First Name"
                name="first_name"
                placeholder="Md"
                value={form.first_name}
                onChange={(e) =>
                  updateField("first_name", e.target.value)
                }
                error={getFieldError("first_name")}
                required
                autoComplete="given-name"
              />

              <Input
                id="last_name"
                label="Last Name"
                name="last_name"
                placeholder="Saddam"
                value={form.last_name}
                onChange={(e) =>
                  updateField("last_name", e.target.value)
                }
                error={getFieldError("last_name")}
                required
                autoComplete="family-name"
              />
            </div>

            <Input
              id="phone_number"
              label="Phone Number"
              name="phone_number"
              type="tel"
              inputMode="numeric"
              placeholder="9876543210"
              value={form.phone_number}
              onChange={(e) =>
                updateField(
                  "phone_number",
                  e.target.value.replace(/\D/g, ""),
                )
              }
              error={getFieldError("phone_number")}
              required
              autoComplete="tel"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                id="username"
                label="Username"
                name="username"
                placeholder="saddam"
                value={form.username}
                onChange={(e) =>
                  updateField("username", e.target.value)
                }
                error={getFieldError("username")}
                required
                autoComplete="username"
              />

              <Input
                id="email"
                label="Email Address"
                name="email"
                type="email"
                placeholder="saddam@gmail.com"
                value={form.email}
                onChange={(e) =>
                  updateField("email", e.target.value)
                }
                error={getFieldError("email")}
                required
                autoComplete="email"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                id="password"
                label="Password"
                name="password"
                type="password"
                placeholder="Password@123"
                value={form.password}
                onChange={(e) =>
                  updateField("password", e.target.value)
                }
                error={getFieldError("password")}
                required
                autoComplete="new-password"
              />

              <Input
                id="confirm_password"
                label="Confirm Password"
                name="confirm_password"
                type="password"
                placeholder="Password@123"
                value={form.confirm_password}
                onChange={(e) =>
                  updateField(
                    "confirm_password",
                    e.target.value,
                  )
                }
                error={confirmPasswordError}
                required
                autoComplete="new-password"
              />
            </div>

            {form.password.length > 0 &&
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
              size="lg"
            >
              Create Account
            </Button>
          </form>
        </Card.Content>

        <Card.Footer>
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
}
