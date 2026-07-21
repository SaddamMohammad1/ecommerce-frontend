"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import AuthService from "@/services/auth.service";
import {
  getApiErrorMessage,
  getApiFieldErrors,
} from "@/helpers/api.helper";
import { Button, Card, Input } from "@/components/ui";
import { buttonVariants } from "@/components/ui/Button/Button";
import { cn } from "@/utils/cn";

type FieldErrors = {
  email?: string;
};

function validateForm(email: string): FieldErrors {
  const errors: FieldErrors = {};

  if (!email.trim()) {
    errors.email = "Email cannot be blank.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [clientFieldErrors, setClientFieldErrors] =
    useState<FieldErrors>({});
  const [apiFieldErrors, setApiFieldErrors] =
    useState<FieldErrors>({});

  const emailError =
    clientFieldErrors.email ?? apiFieldErrors.email;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(email);

    if (Object.keys(validationErrors).length > 0) {
      setClientFieldErrors(validationErrors);
      return;
    }

    setClientFieldErrors({});
    setApiFieldErrors({});
    setLoading(true);

    try {
      const response = await AuthService.forgotPassword({
        email: email.trim(),
      });

      toast.success(
        response.data.message ??
          "If an account with that email exists, a password reset link has been sent.",
      );
      setSubmitted(true);
    } catch (error: unknown) {
      const fieldErrors = getApiFieldErrors(error);
      setApiFieldErrors(fieldErrors);

      toast.error(
        getApiErrorMessage(error) ??
          "Failed to send reset link. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <Card className="w-full max-w-md">
        <Card.Header className="space-y-3 text-center">
          <Card.Title>Forgot Password</Card.Title>
          <Card.Description>
            Enter your email address and we will send you a
            password reset link.
          </Card.Description>
        </Card.Header>

        <Card.Content>
          {submitted ? (
            <div className="space-y-4 text-center">
              <p className="text-sm text-slate-600">
                Check your inbox for a reset link. If an account
                exists for{" "}
                <span className="font-medium text-slate-900">
                  {email}
                </span>
                , you will receive an email shortly.
              </p>
              <Link
                href="/login"
                className={cn(buttonVariants(), "w-full")}
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              noValidate
            >
              <Input
                id="email"
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setClientFieldErrors({});
                  setApiFieldErrors({});
                }}
                error={emailError}
              />

              <Button
                type="submit"
                loading={loading}
                fullWidth
              >
                Send Reset Link
              </Button>
            </form>
          )}
        </Card.Content>

        {!submitted && (
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
        )}
      </Card>
    </div>
  );
}
