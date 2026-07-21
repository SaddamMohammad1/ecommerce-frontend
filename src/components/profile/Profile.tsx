"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Mail,
  Phone,
  Shield,
  User as UserIcon,
} from "lucide-react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Button, Card, Spinner } from "@/components/ui";
import { buttonVariants } from "@/components/ui/Button/Button";
import { cn } from "@/utils/cn";
import {
  fetchProfileRequest,
  selectAuthError,
  selectProfileLoading,
  selectUser,
} from "@/store/auth";

function ProfileField({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="mt-0.5 text-slate-400">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <p className="mt-1 text-sm font-medium text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function Profile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectProfileLoading);
  const error = useAppSelector(selectAuthError);

  useEffect(() => {
    dispatch(fetchProfileRequest());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const fullName = [user?.first_name, user?.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();

  const displayName =
    fullName || user?.username || "User";

  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (loading && !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner className="h-8 w-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          My Profile
        </h1>
        <p className="mt-2 text-slate-600">
          Manage your account details and preferences.
        </p>
      </div>

      <Card>
        <Card.Content className="space-y-6 pt-6">
          <div className="flex flex-col items-center gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-start">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
              {initials}
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-slate-900">
                {displayName}
              </h2>
              <p className="mt-1 text-slate-600">
                @{user?.username}
              </p>

              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  <Shield className="h-3.5 w-3.5" />
                  {user?.role ?? "Customer"}
                </span>

                {user?.email_verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Email Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <ProfileField
              label="Username"
              value={user?.username ?? "-"}
              icon={<UserIcon className="h-5 w-5" />}
            />
            <ProfileField
              label="Email"
              value={user?.email ?? "-"}
              icon={<Mail className="h-5 w-5" />}
            />
            <ProfileField
              label="First Name"
              value={user?.first_name || "-"}
              icon={<UserIcon className="h-5 w-5" />}
            />
            <ProfileField
              label="Last Name"
              value={user?.last_name || "-"}
              icon={<UserIcon className="h-5 w-5" />}
            />
            <ProfileField
              label="Phone Number"
              value={user?.phone_number || "Not provided"}
              icon={<Phone className="h-5 w-5" />}
            />
          </div>

          <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-6">
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Back to Home
            </Link>
            <Button
              variant="outline"
              onClick={() => dispatch(fetchProfileRequest())}
              loading={loading}
            >
              Refresh Profile
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
