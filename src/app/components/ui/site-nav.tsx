import Link from "next/link";
import Image from "next/image";
import { Button } from "./button";
import { NavLink } from "./nav-link";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--background)]/90 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-[min(1120px,92vw)] flex-wrap items-center gap-x-[2vw] gap-y-[0.75vh] py-[1.5vh]">
        <Link
          href="/"
          className="flex min-w-[180px] flex-1 items-center gap-[0.5vw] text-sm font-semibold tracking-tight text-[var(--foreground)] sm:text-base md:flex-none"
          aria-label="R & D Engineering Home"
        >
          <Image
            src="/images/bg.png"
            alt="R & D Engineering Logo"
            width={32}
            height={32}
            className="h-[4vh] w-[4vh] min-h-[32px] min-w-[32px] rounded-full object-cover"
            priority
          />
          <span>
            <span className="font-bold">R & D</span>{" "}
            <span className="font-normal">Engineering</span>
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
          <Button className="max-w-[180px] text-xs sm:text-sm px-[3vw] sm:px-4 py-[0.6vh] sm:py-[0.5rem]" fullWidth>
            Request a Quote
          </Button>
        </div>
      </div>
    </header>
  );
}

