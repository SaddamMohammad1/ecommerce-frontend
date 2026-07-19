"use client";

import { forwardRef } from "react";

import { cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

import { Spinner } from "../";
import { ButtonProps } from "./Button.types";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-600 text-white hover:bg-blue-700",

        secondary:
          "bg-slate-700 text-white hover:bg-slate-800",

        outline:
          "border border-slate-300 bg-white hover:bg-slate-100",

        danger:
          "bg-red-600 text-white hover:bg-red-700",
      },

      size: {
        sm: "h-9 px-4 text-sm",

        md: "h-11 px-5",

        lg: "h-12 px-6 text-lg",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      children,
      className,
      loading = false,
      fullWidth = false,
      variant,
      size,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          buttonVariants({
            variant,
            size,
          }),
          fullWidth && "w-full",
          className,
        )}
        {...props}
      >
        {loading && (
          <Spinner className="mr-2 h-4 w-4" />
        )}

        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;