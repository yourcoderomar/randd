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
      </div>
      <FullWidthImageSection
        src="/images/bg.png"
        alt="Our team and workspace"
        overlayText="Building Excellence"
      />
      <div className="relative flex flex-col gap-[4vh]">
        <ContentSection />
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

function ContentSection() {
  return (
    <section
      className="relative rounded-[28px] border border-[var(--foreground)]/12 bg-[var(--background)] px-[6vw] py-[6vh]"
      data-animate-section
    >
      <div className="flex flex-col gap-[4vh] md:flex-row md:items-center md:gap-[5vw]">
        <div className="md:w-1/2">
          <p className="text-[0.85rem] uppercase tracking-[0.2em] text-[var(--foreground)]/60">
            Our Mission
          </p>
          <h2 className="mt-[1vh] text-[clamp(1.8rem,4vw,2.5rem)] font-semibold leading-tight">
            Driving Innovation Through Collaboration
          </h2>
          <p className="mt-[2vh] text-[clamp(1rem,2.6vw,1.2rem)] text-[var(--foreground)]/75">
            We believe in the power of collaboration and innovation. Our team works together to create solutions that not only meet today's challenges but anticipate tomorrow's opportunities.
          </p>
          <Button className="mt-[2vh] w-full max-w-[220px]">Learn More</Button>
        </div>
        <div className="md:w-1/2">
          <img
            src="/images/products.png"
            alt="Our team collaboration"
            className="h-[50vh] w-full rounded-[24px] object-cover"
            loading="lazy"
          />
        </div>
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
          <Button className="max-w-[280px] bg-white border border-black text-black hover:bg-gray-100">
            Learn more about our story
          </Button>
        </div>
      </div>
    </header>
  );
}

