"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../components/ui/button";
import ScrollExpandImage from "../components/features/scroll-expand-image";

export default function AboutPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-animate-section]").forEach((section) => {
        gsap.fromTo(
          section,
          { y: 48 },
          {
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="relative flex flex-col gap-[4vh]">
        <HeroBlock />
        <HeaderSection />
        <FullWidthImageSection src="/images/1.png" alt="Our team and workspace" overlayText="Building Excellence" />
        <MissionVisionSection />
        <ImageOnlySection />
      </div>
    </>
  );
}

function FullWidthImageSection({ src, alt, overlayText }: { src: string; alt: string; overlayText?: string }) {
  return (
    <section
      className="relative w-screen -mt-[20vh]"
      style={{
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
      }}
    >
      <ScrollExpandImage src={src} alt={alt} overlayText={overlayText} />
    </section>
  );
}

function HeaderSection() {
  return (
    <section
      className="rounded-[28px] border border-[var(--foreground)]/12 bg-[var(--background)] px-[6vw] pt-[6vh] pb-[2vh] text-center"
      data-animate-section
    >
      <p className="text-[0.85rem] uppercase tracking-[0.2em] text-[var(--foreground)]/60">
        Our Story
      </p>
      <h2 className="mt-[1vh] text-[clamp(1.8rem,4vw,2.5rem)] font-semibold leading-tight">
        Crafting Excellence Through Innovation
      </h2>
      <p className="mx-auto mt-[2vh] max-w-2xl text-[clamp(1rem,2.6vw,1.2rem)] text-[var(--foreground)]/75">
        Discover the journey behind our passion for creating exceptional digital experiences that transform ideas into reality.
      </p>
    </section>
  );
}

function MissionVisionSection() {
  return (
    <section
      className="relative rounded-[28px] border border-[var(--foreground)]/12 bg-[var(--background)] px-[6vw] py-[6vh]"
      data-animate-section
    >
      <div className="flex flex-col gap-[5vh] md:flex-row md:items-start md:gap-[5vw]">
        {/* Mission */}
        <div className="md:w-1/2">
          <p className="text-[0.8rem] uppercase tracking-[0.22em] text-[var(--foreground)]/60">Our Mission</p>
          <h2 className="mt-[1vh] text-[clamp(1.8rem,4vw,2.4rem)] font-semibold leading-tight">
            To turn complex challenges into simple, powerful experiences.
          </h2>
          <p className="mt-[2vh] text-[clamp(0.98rem,2.4vw,1.1rem)] text-[var(--foreground)]/80">
            We exist to help our partners move faster and smarter. By combining strategy, design, and engineering, we
            craft solutions that are not only beautiful and intuitive, but measurable in their impact on people and
            performance.
          </p>
          <p className="mt-[1.5vh] text-[clamp(0.95rem,2.2vw,1.05rem)] text-[var(--foreground)]/70">
            Every project is a collaboration. We listen closely, challenge assumptions, and build with care so that
            what we deliver is robust today and ready for what&apos;s next.
          </p>
        </div>

        {/* Vision */}
        <div className="md:w-1/2">
          <p className="text-[0.8rem] uppercase tracking-[0.22em] text-[var(--foreground)]/60">Our Vision</p>
          <h2 className="mt-[1vh] text-[clamp(1.8rem,4vw,2.4rem)] font-semibold leading-tight">
            A world where technology quietly elevates everyday life.
          </h2>
          <p className="mt-[2vh] text-[clamp(0.98rem,2.4vw,1.1rem)] text-[var(--foreground)]/80">
            We imagine products and spaces that feel effortless to use, respectful of people&apos;s time and attention,
            and responsible toward the environment. Experiences that simply work — so well that the technology fades
            into the background.
          </p>
          <p className="mt-[1.5vh] text-[clamp(0.95rem,2.2vw,1.05rem)] text-[var(--foreground)]/70">
            By investing in sustainable practices, inclusive design, and long-term partnerships, we aim to leave every
            product, place, and community better than we found it.
          </p>
        </div>
      </div>
    </section>
  );
}

function ImageOnlySection() {
  return (
    <section
      className="relative rounded-[28px] bg-[var(--background)] px-[6vw] py-[5vh]"
      data-animate-section
    >
      <div className="mb-[2.5vh] text-left">
        <p className="text-[0.8rem] uppercase tracking-[0.22em] text-[var(--foreground)]/60">
          Our People
        </p>
        <h2 className="mt-[0.8vh] text-[clamp(1.6rem,3.4vw,2.1rem)] font-semibold leading-tight">
          Meet our family
        </h2>
      </div>
      <div className="overflow-hidden rounded-[24px]">
        <img
          src="/images/2.jpg"
          alt="A glimpse into our work and environments"
          className="h-[55vh] w-full object-cover"
          loading="lazy"
        />
      </div>
    </section>
  );
}

function HeroBlock() {
  return (
    <header className="relative flex min-h-[80vh] items-start justify-center rounded-[30px] border border-[var(--foreground)]/12 bg-gradient-to-b from-[var(--foreground)]/4 to-transparent px-[6vw] pt-[20vh] sm:pt-[15vh] text-center">
      <div className="flex flex-col items-center max-w-3xl">
        <h1 className="mx-auto max-w-xl text-[clamp(1.8rem,5vw,2.5rem)] font-medium leading-tight">
          Building the future, one innovation at a time
        </h1>
        <p className="mx-auto mt-[3vh] max-w-2xl text-[clamp(1rem,3vw,1.25rem)] text-[var(--foreground)]/80">
          We're a team of passionate creators, designers, and engineers dedicated to crafting exceptional experiences that make a difference. Our mission is to push boundaries and deliver solutions that inspire.
        </p>
        <div className="mt-[3vh] flex justify-center">
          <Button
            href="/products"
            className="max-w-[280px] bg-white border border-black text-black hover:bg-gray-100"
          >
            Learn more about our story
          </Button>
        </div>
      </div>
    </header>
  );
}

