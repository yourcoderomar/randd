import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "ghost";
  fullWidth?: boolean;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full text-sm font-semibold tracking-tight transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-60";

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  solid:
    "bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90",
  ghost:
    "border border-[var(--foreground)]/30 text-[var(--foreground)] hover:bg-[var(--foreground)]/10",
};

export function Button({
  variant = "solid",
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const widthStyles = fullWidth
    ? "w-full"
    : "min-w-[120px]";
  const paddingStyles = "px-[5vw] sm:px-8 py-[1.1vh] sm:py-[0.85rem]";

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles} ${widthStyles} ${className}`}
      {...props}
    />
  );
}

