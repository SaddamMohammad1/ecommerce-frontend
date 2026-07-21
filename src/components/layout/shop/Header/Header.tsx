"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  LogOut,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import StorageHelper from "@/helpers/storage.helper";
import TokenHelper from "@/helpers/token.helper";
import { Button, ConfirmDialog } from "@/components/ui";
import {
  logout,
  selectUser,
} from "@/store/auth";

const AUTH_USER_KEY = "auth_user";

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const [showLogoutConfirm, setShowLogoutConfirm] =
    useState(false);

  const displayName =
    user?.first_name ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "Shopper";

  const handleLogoutConfirm = () => {
    TokenHelper.clearTokens();
    StorageHelper.remove(AUTH_USER_KEY);
    dispatch(logout());
    setShowLogoutConfirm(false);
    router.replace("/login");
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
          <Link
            href="/"
            className="shrink-0 text-xl font-bold text-blue-600"
          >
            DayDreamer
          </Link>

          <div className="hidden flex-1 md:block">
            <div className="relative mx-auto max-w-xl">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Search products, brands and more..."
                className="h-10 w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <nav className="ml-auto flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              className="hidden text-sm font-medium text-slate-700 hover:text-blue-600 sm:inline"
            >
              Home
            </Link>
            <Link
              href="#"
              className="hidden text-sm font-medium text-slate-700 hover:text-blue-600 md:inline"
            >
              Products
            </Link>

            <button
              type="button"
              className="relative rounded-full p-2 text-slate-700 transition hover:bg-slate-100"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                0
              </span>
            </button>

            <Link
              href="/profile"
              className="hidden items-center gap-2 rounded-full px-2 py-1 transition hover:bg-slate-100 sm:flex"
            >
              <User className="h-4 w-4 text-slate-500" />
              <span className="max-w-[120px] truncate text-sm font-medium text-slate-700">
                {displayName}
              </span>
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLogoutConfirm(true)}
              className="gap-1.5"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </nav>
        </div>
      </header>

      <ConfirmDialog
        open={showLogoutConfirm}
        title="Logout"
        message="Do you want to logout?"
        confirmLabel="Yes, Logout"
        cancelLabel="Cancel"
        confirmVariant="danger"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </>
  );
}
