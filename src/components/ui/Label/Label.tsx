import { LabelHTMLAttributes } from "react";

import { cn } from "@/utils/cn";

interface LabelProps
  extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label = ({
  children,
  required = false,
  className,
  ...props
}: LabelProps) => {
  return (
    <label
      className={cn(
        "mb-2 block text-sm font-medium text-slate-700",
        className,
      )}
      {...props}
    >
      {children}

      {required && (
        <span className="ml-1 text-red-500">*</span>
      )}
    </label>
  );
};

export default Label;