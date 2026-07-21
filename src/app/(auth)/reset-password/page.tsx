"use client";

import {
  FormEvent,
  Suspense,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import AuthService from "@/services/auth.service";
import {
  getApiErrorMessage,
  getApiFieldErrors,
} from "@/helpers/api.helper";
import { Button, Card, Input, Spinner } from "@/components/ui";
import { buttonVariants } from "@/components/ui/Button/Button";
import { cn } from "@/utils/cn";
import {
  getPasswordRuleStatuses,
  isPasswordValid,
} from "@/utils/password.validation";

type FieldErrors = {
  password?: string;
  confirm_password?: string;
  uid?: string;
  token?: string;
};

function validateForm(
  password: string,
  confirmPassword: string,
): FieldErrors {
  const errors: FieldErrors = {};

  if (!password.trim()) {
    errors.password = "Password cannot be blank.";
  } else if (!isPasswordValid(password)) {
    errors.password =
      "Password must meet all requirements below.";
  }

  if (!confirmPassword.trim()) {
    errors.confirm_password = "Please confirm your password.";
  } else if (password !== confirmPassword) {
    errors.confirm_password = "Passwords do not match.";
  }

  return errors;
}

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const uid = searchParams.get("uid") ?? "";
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientFieldErrors, setClientFieldErrors] =
    useState<FieldErrors>({});
  const [apiFieldErrors, setApiFieldErrors] =
    useState<FieldErrors>({});

  const passwordError =
    clientFieldErrors.password ?? apiFieldErrors.password;

  const confirmPasswordError =
    clientFieldErrors.confirm_password ??
    apiFieldErrors.confirm_password;

  const passwordRules = getPasswordRuleStatuses(password);

  const unmetPasswordRules = passwordRules.filter(
    (rule) => !rule.met,
  );

  const hasValidLink = Boolean(uid && token);

  useEffect(() => {
    if (!hasValidLink) {
      toast.error("Invalid or missing reset link.");
    }
  }, [hasValidLink]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!hasValidLink) {
      toast.error("Invalid reset link. Please request a new one.");
      return;
    }

    const validationErrors = validateForm(
      password,
      confirmPassword,
    );

    if (Object.keys(validationErrors).length > 0) {
      setClientFieldErrors(validationErrors);
      return;
    }

    setClientFieldErrors({});
    setApiFieldErrors({});
    setLoading(true);

    try {
      const response = await AuthService.resetPassword({
        uid,
        token,
        password,
        confirm_password: confirmPassword,
      });

      toast.success(
        response.data.message ??
          "Password reset successfully.",
      );
      router.replace("/login");
    } catch (error: unknown) {
      const fieldErrors = getApiFieldErrors(error);
      setApiFieldErrors(fieldErrors);

      toast.error(
        getApiErrorMessage(error) ??
          "Failed to reset password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!hasValidLink) {
    return (
      <Card className="w-full max-w-md">
        <Card.Header className="space-y-3 text-center">
          <Card.Title>Invalid Reset Link</Card.Title>
          <Card.Description>
            This password reset link is invalid or has expired.
            Please request a new one.
          </Card.Description>
        </Card.Header>

        <Card.Content className="space-y-3">
          <Link
            href="/forgot-password"
            className={cn(buttonVariants(), "w-full")}
          >
            Request New Link
          </Link>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full",
            )}
          >
            Back to Login
          </Link>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <Card.Header className="space-y-3 text-center">
        <Card.Title>Reset Password</Card.Title>
        <Card.Description>
          Enter your new password below.
        </Card.Description>
      </Card.Header>

      <Card.Content>
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          noValidate
        >
          <Input
            id="password"
            label="New Password"
            name="password"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setClientFieldErrors((prev) => ({
                ...prev,
                password: undefined,
              }));
              setApiFieldErrors((prev) => ({
                ...prev,
                password: undefined,
              }));
            }}
            error={passwordError}
          />

          <Input
            id="confirm_password"
            label="Confirm Password"
            name="confirm_password"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setClientFieldErrors((prev) => ({
                ...prev,
                confirm_password: undefined,
              }));
              setApiFieldErrors((prev) => ({
                ...prev,
                confirm_password: undefined,
              }));
            }}
            error={confirmPasswordError}
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

          <Button
            type="submit"
            loading={loading}
            fullWidth
          >
            Reset Password
          </Button>
        </form>
      </Card.Content>

      <Card.Footer>
        <p className="text-sm text-slate-600">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </Card.Footer>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <Suspense
        fallback={
          <Spinner className="h-8 w-8 text-blue-600" />
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
