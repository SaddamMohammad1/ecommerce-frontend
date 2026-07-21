"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAppSelector } from "@/hooks/redux";
import { Spinner } from "@/components/ui";
import {
  selectIsAuthenticated,
  selectIsAuthInitialized,
} from "@/store/auth";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({
  children,
}: AuthGuardProps) {
  const router = useRouter();
  const isInitialized = useAppSelector(selectIsAuthInitialized);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isInitialized) return;

    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isInitialized, router]);

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <Spinner className="h-8 w-8 text-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
