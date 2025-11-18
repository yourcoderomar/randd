import Link from "next/link";
import { Button } from "./button";
import { NavLink } from "./nav-link";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#work", label: "Work" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--foreground)]/10 bg-[var(--background)]/90 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-[min(1120px,92vw)] flex-wrap items-center gap-x-[2vw] gap-y-[1.25vh] py-[1.5vh]">
        <Link
          href="/"
          className="flex min-w-[180px] flex-1 items-center gap-[2vw] text-base font-semibold tracking-tight text-[var(--foreground)] sm:text-lg md:flex-none"
        >
          <span className="inline-flex h-[6vh] w-[6vh] min-h-[42px] min-w-[42px] items-center justify-center rounded-full bg-[var(--foreground)]/10 text-sm sm:text-base">
            R∧D
          </span>
        </Link>

        <nav
          className="order-3 flex w-full items-center justify-center gap-[min(5vw,1.5rem)] text-[var(--foreground)] md:order-none md:flex-1"
          aria-label="Primary navigation"
        >
          {navLinks.map(({ href, label }) => (
            <NavLink
              key={href}
              href={href}
              variant="footer"
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-1 justify-end md:flex-none">
          <Button className="max-w-[220px]" fullWidth>
            Launch App
          </Button>
        </div>
      </div>
    </header>
  );
}

