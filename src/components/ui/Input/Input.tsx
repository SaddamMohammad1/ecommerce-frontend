"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/utils/cn";

import { InputProps } from "./Input.types";
import { Label } from "../";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      required,
      type = "text",
      leftIcon,
      rightIcon,
      className,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
      type === "password"
        ? showPassword
          ? "text"
          : "password"
        : type;

    return (
      <div className="space-y-2">
        {label && (
          <Label
            htmlFor={props.id}
            required={required}
          >
            {label}
          </Label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={inputType}
            className={cn(
              "h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none transition-all",
              "focus:border-blue-600 focus:ring-2 focus:ring-blue-200",
              leftIcon && "pl-10",
              type === "password" && "pr-12",
              error && "border-red-500 focus:ring-red-200",
              className,
            )}
            {...props}
          />

          {type === "password" && (
            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          )}

          {rightIcon && type !== "password" && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;