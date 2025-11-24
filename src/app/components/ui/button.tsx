import Link from "next/link";
import * as React from "react";

type BaseButtonProps = {
  variant?: "solid" | "ghost";
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseStyles =
  "inline-flex items-center justify-center rounded-full text-sm font-semibold tracking-tight transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-60 before:hidden sm:before:inline-block sm:before:h-[0.45rem] sm:before:w-0 sm:before:flex-shrink-0 sm:before:rounded-full sm:before:border sm:before:border-current sm:before:bg-transparent sm:before:opacity-0 sm:before:transition-all sm:before:duration-300 sm:before:content-[''] sm:before:mr-0 sm:hover:before:mr-[0.45rem] sm:hover:before:w-[0.45rem] sm:hover:before:opacity-100 sm:hover:before:bg-current";

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
  children,
  ...props
}: ButtonProps) {
  const widthStyles = fullWidth
    ? "w-full"
    : "min-w-[120px]";
  const paddingStyles = "px-[3vw] sm:px-4 py-[0.6vh] sm:py-[0.5rem]";
  const composedClasses = `${baseStyles} ${variantStyles[variant]} ${paddingStyles} ${widthStyles} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;

    return (
      <Link
        href={href}
        className={`${composedClasses} text-center`}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } =
    props as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      type={type}
      className={composedClasses}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

