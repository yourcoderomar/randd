"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./button";

type BurgerMenuProps = {
  navLinks: Array<{ href: string; label: string }>;
};

export function BurgerMenu({ navLinks }: BurgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Burger Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span
          className={`block w-6 h-0.5 bg-[var(--foreground)] transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-[var(--foreground)] transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-[var(--foreground)] transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile Menu - Full Page */}
      <div 
        className={`fixed inset-0 z-[100] md:hidden transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#ffffff' }}
      >
        <div className="flex flex-col h-screen w-screen px-[6vw] py-[2vh] items-start justify-start relative bg-white gap-[3vh]">
          {/* Close Button - positioned same as burger menu button */}
          <button
            onClick={closeMenu}
            className={`absolute top-[1.5vh] right-[6vw] w-8 h-8 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)] z-10 transition-all duration-300 ${
              isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            aria-label="Close menu"
          >
            <span className="block w-6 h-0.5 bg-[var(--foreground)] rotate-45 absolute" />
            <span className="block w-6 h-0.5 bg-[var(--foreground)] -rotate-45 absolute" />
          </button>

          {/* Logo */}
          <div className="w-full" style={{ animation: isOpen ? "fadeInUp 0.4s ease-out 0.1s both" : "none" }}>
            <Link
              href="/"
              onClick={closeMenu}
              className="flex min-w-[180px] items-center gap-3 text-[var(--foreground)]"
              aria-label="R & D Engineering Home"
            >
              <Image
                src="/images/bg.png"
                alt="R & D Engineering Logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
                priority
              />
              <span className="text-2xl font-semibold leading-tight">
                <span className="font-bold">R & D</span>{" "}
                <span className="font-normal">Engineering</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col items-start w-full" aria-label="Mobile navigation">
            {navLinks.map(({ href, label }, index) => (
              <div 
                key={href} 
                className="w-full"
                style={{
                  animation: isOpen ? `fadeInUp 0.4s ease-out ${index * 0.1 + 0.2}s both` : 'none'
                }}
              >
                <Link
                  href={href}
                  onClick={closeMenu}
                  className="block text-4xl font-bold text-[var(--foreground)] opacity-90 transition hover:opacity-100 py-4 text-left"
                >
                  {label}
                </Link>
                {index < navLinks.length - 1 && (
                  <div className="w-full h-[2px] bg-[var(--foreground)]/30" />
                )}
              </div>
            ))}
          </nav>

          {/* Button */}
          <div 
            className="w-full mt-auto pb-8 flex justify-center"
            style={{
              animation: isOpen ? `fadeInUp 0.4s ease-out ${navLinks.length * 0.1 + 0.6}s both` : 'none'
            }}
          >
            <Button
              href="/request-quote"
              onClick={closeMenu}
              className="w-full max-w-[320px] !text-xl py-6"
              fullWidth
            >
              Request a Quote
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

