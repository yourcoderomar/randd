import Link from "next/link";
import Image from "next/image";
import { Button } from "./button";
import { NavLink } from "./nav-link";
import { BurgerMenu } from "./burger-menu";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
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
          className="hidden md:order-none md:flex md:flex-1 md:items-center md:justify-center md:gap-[min(5vw,1.5rem)] text-[var(--foreground)]"
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

        <div className="hidden md:flex md:flex-1 md:justify-end md:flex-none">
          <Button
            href="/request-quote"
            className="max-w-[180px] text-xs sm:text-sm px-[3vw] sm:px-4 py-[0.6vh] sm:py-[0.5rem]"
            fullWidth
          >
            Request a Quote
          </Button>
        </div>

        {/* Burger Menu - visible on mobile only */}
        <div className="flex flex-1 justify-end md:hidden">
          <BurgerMenu navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}

