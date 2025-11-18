import Link from "next/link";
import { AnchorHTMLAttributes, PropsWithChildren } from "react";

type NavLinkProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    variant?: "primary" | "footer";
    className?: string;
    indicatorStyle?: "push" | "overlay" | "none";
  }
>;

const variantClasses: Record<Required<NavLinkProps>["variant"], string> = {
  primary:
    "rounded-full px-[1.4vw] py-[0.6vh] text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--foreground)]/10 md:text-base",
  footer: "text-inherit opacity-80 transition hover:opacity-100",
};

const footerIndicatorClasses: Record<"push" | "overlay" | "none", string> = {
  push:
    "inline-flex items-center before:mr-0 before:inline-block before:h-[0.45rem] before:w-0 before:rounded-full before:border before:border-current before:bg-transparent before:opacity-0 before:transition-all before:duration-300 before:content-[''] hover:before:mr-[0.45rem] hover:before:w-[0.45rem] hover:before:opacity-100 hover:before:bg-current",
  overlay:
    "relative block pl-[1.1rem] before:absolute before:left-0 before:top-1/2 before:h-[0.45rem] before:w-[0.45rem] before:-translate-y-1/2 before:rounded-full before:border before:border-current before:bg-transparent before:opacity-0 before:transition before:content-[''] hover:before:opacity-100 hover:before:bg-current",
  none: "",
};

export function NavLink({
  variant = "primary",
  className = "",
  indicatorStyle,
  children,
  ...props
}: NavLinkProps) {
  const indicator =
    variant === "footer" ? footerIndicatorClasses[indicatorStyle ?? "push"] : "";

  return (
    <Link
      {...props}
      className={`${variantClasses[variant]}${indicator ? ` ${indicator}` : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </Link>
  );
}

