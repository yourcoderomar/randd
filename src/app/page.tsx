"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CircleImageCarousel from "./components/features/circle-img-slideshow";
import ProjectCarousel from "./components/features/project-carousel";
import LogoLoop from "./components/features/LogoLoop";
import { Button } from "./components/ui/button";
import CountUp from "./components/features/CountUp";

function HeroSection() {
  const [statsReady, setStatsReady] = useState(false);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLElement>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const heroStatsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroSectionRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const statsCards = heroStatsRef.current
        ? (gsap.utils.toArray<HTMLElement>(
            heroStatsRef.current.querySelectorAll("[data-hero-stat]"),
          ) as HTMLElement[])
        : [];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      if (heroImageRef.current) {
        tl.from(heroImageRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.9,
          ease: "power3.out",
        });
      }

      if (heroHeadingRef.current) {
        tl.from(
          heroHeadingRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power3.out",
          },
          heroImageRef.current ? "-=0.25" : undefined,
        );
      }

      if (statsCards.length > 0) {
        tl.from(
          statsCards,
          {
            opacity: 0,
            y: 36,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.15,
          },
          heroHeadingRef.current ? "-=0.15" : undefined,
        );
      }

      tl.add(() => setStatsReady(true));
    }, heroSectionRef);

    return () => {
      ctx.revert();
      setStatsReady(false);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroSectionRef}
      className="relative rounded-[32px] px-0 py-[5vh]"
    >
      <header className="space-y-[2vh] pr-[6vw]">
        <h1
          ref={heroHeadingRef}
          className="text-[clamp(2.1rem,7vw,3.6rem)] font-bold leading-[1.05] text-[var(--foreground)]"
        >
          YOUR FUTURE, OUR MISSION
        </h1>

        <figure
          ref={heroImageRef}
          className="mt-[1vh] w-[calc(100%+6vw)] -mr-[6vw] overflow-hidden rounded-[22px] ring-1 ring-[var(--foreground)]/10"
        >
          <div className="relative aspect-[30/9] min-h-[90px] w-full">
            <Image
              src="/images/hero-bg.jpg"
              alt="Modern landscape view of architectural towers"
              fill
              sizes="(max-width: 768px) 92vw, (max-width: 1280px) 88vw, 1200px"
              className="object-cover"
              priority
            />
          </div>
        </figure>

        <div
          ref={heroStatsRef}
          className="mt-[2vh] w-[calc(100%+6vw)] -mr-[6vw] grid gap-[2vw] text-left sm:grid-cols-3"
        >
          {[
            { label: "Projects Delivered", value: 120 },
            { label: "Clients Worldwide", value: 85 },
            { label: "Awards & Recognitions", value: 48, dark: true },
          ].map((item) => (
            <div
              key={item.label}
              data-hero-stat
              className={`flex flex-col rounded-[18px] px-[2rem] py-[1.5rem] sm:w-full ${
                item.dark
                  ? "bg-[var(--foreground)]/90 text-[var(--background)]"
                  : "bg-[var(--foreground)]/5 text-[var(--foreground)]"
              }`}
            >
              <CountUp
                to={item.value}
                duration={1.4}
                startWhen={statsReady}
                className={`text-[clamp(1.4rem,3vw,2rem)] font-semibold ${
                  item.dark ? "text-[var(--background)]" : "text-[var(--foreground)]"
                }`}
                separator=","
              />
              <span
                className={`text-[0.85rem] uppercase tracking-[0.15em] ${
                  item.dark ? "text-[var(--background)]/70" : "text-[var(--foreground)]/65"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </header>
    </section>
  );
}

function ContentShowcaseSection() {
  return (
    <section
      id="showcase"
      className="rounded-[28px] bg-[var(--background)] px-[6vw] py-[6vh]"
    >
      <div className="flex flex-col gap-[6vh]">
        <article className="flex flex-col gap-[3vh] md:flex-row md:items-center md:gap-[4vw]">
          <div className="md:w-1/2">
            <p className="text-[0.9rem] uppercase tracking-[0.2em] text-[var(--foreground)]/60">
              Building Maintenance Units
            </p>
            <h2 className="mt-[1vh] text-[clamp(1.8rem,4vw,2.5rem)] font-semibold leading-tight">
              Deploy façade access systems that keep towers mission-ready
            </h2>
            <p className="mt-[2vh] text-[clamp(1rem,2.6vw,1.2rem)] text-[var(--foreground)]/75">
              We engineer Building Maintenance Units end-to-end—from cradle arms and cradles to smart control rooms—so crews can inspect, clean, and repair superstructures safely year-round.
            </p>
            <Button className="mt-[2vh] w-full max-w-[220px]" href="/products">
              Explore BMU Systems
            </Button>
          </div>
          <div className="md:w-1/2">
            <div className="h-[45vh] w-full rounded-[24px] bg-[var(--muted)] sm:h-[60vh] overflow-hidden">
              <img
                src="/images/palazani.jpg"
                alt="BMU product console with live pack telemetry"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </article>

        <article className="flex flex-col gap-[3vh] md:flex-row md:flex-row-reverse md:items-center md:gap-[4vw]">
          <div className="md:w-1/2">
            <p className="text-[0.9rem] uppercase tracking-[0.2em] text-[var(--foreground)]/60">
              BMU Maintenance
            </p>
            <h3 className="mt-[1vh] text-[clamp(1.6rem,3.8vw,2.25rem)] font-semibold leading-tight">
              Keep every cradle, hoist, and rail in spec
            </h3>
            <p className="mt-[2vh] text-[clamp(1rem,2.6vw,1.2rem)] text-[var(--foreground)]/75">
              Our maintenance teams service Building Maintenance Units end-to-end—conducting statutory inspections, lubricating hoists, tensioning wire ropes, replacing worn rollers, and coordinating emergency call-outs before downtime hits.
            </p>
            <Button className="mt-[2vh] w-full max-w-[220px]">See Maintenance Plans</Button>
          </div>
          <div className="md:w-1/2">
            <img
              src="/images/bg.png"
              alt="Maintenance team reviewing live diagnostics"
              className="h-[45vh] w-full rounded-[24px] object-cover sm:h-[60vh]"
              loading="lazy"
            />
          </div>
        </article>
      </div>
    </section>
  );
}

function InfoSplitSection() {
  const signalLogos = [
    {
      src: "/images/logoloop/tmg.png",
      alt: "TMG Holdings logo",
      width: 170,
      height: 60,
    },
    {
      src: "/images/logoloop/hassan-allam.png",
      alt: "Hassan Allam Construction logo",
      width: 300,
      height: 90,
    },
  ];

  return (
    <section
      id="insight"
      className="rounded-[28px] px-[6vw] py-[5vh] space-y-[4vh]"
    >
      <div className="flex w-full justify-center">
        <span className="inline-flex w-auto items-center rounded-full border border-[var(--foreground)]/35 bg-[var(--background)]/70 px-[0.8rem] py-[0.35rem] text-[0.65rem] uppercase tracking-[0.11em] text-[var(--foreground)]/75">
          Trusted by Thousands
        </span>
      </div>

      <LogoLoop
        logos={signalLogos}
        speed={70}
        gap={48}
        logoHeight={32}
        pauseOnHover
        scaleOnHover
        fadeOut
        ariaLabel="Partner ecosystems in motion"
        width="calc(100% + 12vw)"
        className="mt-[4vh] -mx-[6vw]"
      />
    </section>
  );
}

type Faq = {
  question: string;
  answer: string;
};

function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: Faq;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const updateHeight = () => setHeight(el.scrollHeight);
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <li className="border-b border-[var(--foreground)]/20 pb-[1.5vh]">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-[3vw] py-[1.8vh] text-left text-[clamp(1.05rem,3vw,1.25rem)] font-semibold"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${faq.question}`}
      >
        <span className="flex-1 text-left">{faq.question}</span>
        <span className="inline-flex h-[clamp(32px,4vw,44px)] w-[clamp(32px,4vw,44px)] items-center justify-center rounded-full border border-[var(--foreground)]/30 text-[var(--foreground)] transition-transform duration-300">
          <svg
            viewBox="0 0 24 24"
            className={`h-[1.1rem] w-[1.1rem] transform transition-transform duration-300 ${
              isOpen ? "rotate-0" : "-rotate-90"
            }`}
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M6 9l6 6 6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div
        id={`faq-panel-${faq.question}`}
        style={{ height: isOpen ? height : 0 }}
        className="overflow-hidden transition-[height] duration-400 ease-out"
      >
        <div
          ref={contentRef}
          className={`space-y-[1vh] pb-[2.5vh] text-[clamp(0.95rem,2.4vw,1.1rem)] text-[var(--foreground)]/80 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <p>{faq.answer}</p>
        </div>
      </div>
    </li>
  );
}

function FaqSection() {
  const faqs = [
    {
      question: "How do you scope a new engagement?",
      answer:
        "We start with a 48-hour discovery sprint to map goals, blockers, and success metrics so every workstream stays measurable and transparent.",
    },
    {
      question: "Can our internal team co-build?",
      answer:
        "Absolutely. We pair one lead with your core stakeholders while async pods handle execution, ensuring knowledge transfer along the way.",
    },
    {
      question: "What does ramp-up look like?",
      answer:
        "Most programs are production-ready within two weeks, including design system alignment, integration checklists, and QA automation hooks.",
    },
  ] satisfies Faq[];
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleFaq = (question: string) =>
    setOpenItems((prev) => ({
      ...prev,
      [question]: !prev[question],
    }));

  return (
    <section
      id="faq"
      className="rounded-[28px] bg-[var(--background)] px-[6vw] py-[6vh]"
    >
      <div className="flex flex-col gap-[4vh] md:flex-row md:gap-[6vw]">
        <header className="md:w-[40%]">
          <p className="text-[0.85rem] uppercase tracking-[0.2em] text-[var(--foreground)]/60">FAQ</p>
          <h2 className="mt-[1vh] text-[clamp(1.9rem,4vw,2.4rem)] font-semibold leading-tight">
            Answers for teams moving fast
          </h2>
        </header>
        <div className="md:w-[60%]">
          <ul className="space-y-[2vh]">
            {faqs.map((faq) => (
              <FaqItem
                key={faq.question}
                faq={faq}
                isOpen={!!openItems[faq.question]}
                onToggle={() => toggleFaq(faq.question)}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ProjectCarouselSection() {
  const projects = [
    {
      id: 1,
      title: "Project Alpha",
      description: "A cutting-edge solution that transforms how teams collaborate and deliver exceptional results. Built with modern technologies and user-centered design principles.",
      image: "/images/bg.png",
      imageAlt: "Project Alpha showcase",
      overlayText: "Auto-playing Pinball Machine",
    },
    {
      id: 2,
      title: "Project Beta",
      description: "An innovative platform that streamlines workflows and enhances productivity. Designed to scale with your business needs and adapt to changing requirements.",
      image: "/images/products.png",
      imageAlt: "Project Beta showcase",
      overlayText: "Flight Tracker Extension",
    },
    {
      id: 3,
      title: "Project Gamma",
      description: "A comprehensive system that brings together the best tools and practices. Engineered for performance, reliability, and seamless user experience.",
      image: "/images/bg.png",
      imageAlt: "Project Gamma showcase",
      overlayText: "Smart Analytics Dashboard",
    },
    {
      id: 4,
      title: "Project Delta",
      description: "Revolutionary approach to solving complex challenges. Combining data-driven insights with intuitive interfaces for maximum impact.",
      image: "/images/bg.png",
      imageAlt: "Project Delta showcase",
      overlayText: "AI-Powered Solutions",
    },
  ];

  return (
    <section
      id="projects"
      className="w-full bg-[var(--background)] py-[6vh]"
    >
      <header className="mb-[4vh] pl-[2vw] pr-[2vw] relative">
        <div className="max-w-xl">
          <p className="text-[0.85rem] uppercase tracking-[0.2em] text-[var(--foreground)]/60">Projects</p>
          <h2 className="mt-[1vh] text-left text-[clamp(1.8rem,4vw,2.4rem)] font-semibold leading-tight">
            Featured Work & Case Studies
          </h2>
        </div>
        <div className="mt-[4vh] flex justify-end pr-[2vw]">
          <p className="max-w-md text-left text-[clamp(1rem,2.6vw,1.15rem)] text-[var(--foreground)]/75">
            Click on any project to explore the next one and discover our portfolio of innovative solutions.
          </p>
        </div>
      </header>
      <ProjectCarousel projects={projects} ariaLabel="Featured projects carousel" />
    </section>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="rounded-[28px] bg-[var(--foreground)]/90 px-[6vw] py-[6vh] text-[var(--background)]"
    >
      <div className="flex flex-col items-center text-center gap-[2vh]">
        <h2 className="text-[clamp(2rem,5vw,2.8rem)] font-semibold leading-tight">
          Ready for your next launch window?
        </h2>
        <p className="max-w-2xl text-[clamp(1rem,2.6vw,1.15rem)] text-[var(--background)]/80">
          Share your objectives, tooling stack, and release pressure. We'll reply within 24 hours with a tailored plan, pod availability, and transparent pricing.
        </p>
        <Button className="mt-[1vh] w-full max-w-[240px] bg-white text-[var(--foreground)] hover:bg-white/90">
          Talk to an expert
        </Button>
      </div>
    </section>
  );
}

function ContextHeaderSection() {
  const contextImages = [
    { src: "/images/hero.png", alt: "Preview of product hero layout" },
    { src: "/images/products.png", alt: "Grid of highlighted product shots" },
    { src: "/images/bg.png", alt: "Soft gradient background texture" },
  ];

  const distributedBrands = [
    {
      name: "TMG Holdings",
      logo: "/images/logoloop/tmg.png",
      alt: "TMG Holdings logo",
    },
    {
      name: "Hassan Allam Construction",
      logo: "/images/logoloop/hassan-allam.png",
      alt: "Hassan Allam Construction logo",
    },
    {
      name: "Facade Services",
      logo: "/images/logoloop/facade.png",
      alt: "Facade Services logo",
    },
  ];

  return (
    <section
      id="context"
      data-animate-section
      className="rounded-[28px] px-[6vw] py-[6vh]"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-[4vh] text-center">
        <article>
          <p className="text-[clamp(1.25rem,4vw,2rem)] font-semibold leading-tight text-[var(--foreground)]/90">
            This header-only block acts like a teaser paragraph—just enough context before the next experiment loads in.
          </p>
        </article>

        <aside className="flex flex-col gap-[1.5vh]">
          <div className="flex flex-row flex-wrap justify-center gap-[4vw]">
            {distributedBrands.map((brand) => (
              <figure
                key={brand.name}
                className="flex flex-col items-center"
              >
                <Image
                  src={brand.logo}
                  alt={brand.alt}
                  width={180}
                  height={80}
                  className="h-[8vh] w-auto object-contain"
                  sizes="(max-width: 480px) 60vw, 220px"
                />
              </figure>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

export default function Home() {
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
    <div className="flex flex-col gap-[4vh]">
      <HeroSection />
      <ContextHeaderSection />
      <ContentShowcaseSection />
      <ProjectCarouselSection />
      <InfoSplitSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
}
