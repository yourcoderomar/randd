"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FooterMarkProps {
  text?: string;
  className?: string;
}

export function FooterMark({ text = "R & D Engineering", className = "" }: FooterMarkProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const characters = useMemo(
    () =>
      text.split("").map((char, index) => (
        <span key={index} data-footer-letter className="inline-block overflow-hidden leading-none">
          <span className="inline-block">{char === " " ? "\u00A0" : char}</span>
        </span>
      )),
    [text]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = containerRef.current?.querySelectorAll("[data-footer-letter] > span");
      if (!letters || letters.length === 0) return;

      gsap.fromTo(
        letters,
        {
          yPercent: 100
        },
        {
          yPercent: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <p
      ref={containerRef}
      className={`absolute -bottom-[clamp(2rem,8vw,5rem)] left-1/2 -translate-x-1/2 z-0 w-full max-w-full overflow-hidden text-center text-[clamp(2rem,12vw,7rem)] font-black uppercase tracking-tight text-white/10 whitespace-nowrap px-4 scale-y-[2.2] ${className}`}
    >
      {characters}
    </p>
  );
}

