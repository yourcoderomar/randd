"use client";

import Image from "next/image";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CircleImageCarousel from "./components/features/circle-img-slideshow";
import { Button } from "./components/ui/button";

function HeroSection() {
  return (
    <section
      id="hero"
      data-animate-section
      className="relative overflow-hidden rounded-t-[32px] bg-gradient-to-b from-[var(--foreground)]/6 to-transparent px-[6vw] pt-[6.5vh] pb-[5vh] text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[18vh] bg-gradient-to-t from-[var(--background)] to-transparent"
      />
      <h1 className="mx-auto max-w-3xl text-[clamp(2.5rem,7vw,4rem)] font-bold leading-tight">
        Design forward. Mobile
      </h1>
      <p className="mx-auto mt-[2vh] max-w-2xl text-[clamp(1rem,3vw,1.25rem)] text-[var(--foreground)]/80">
        Centered hero copy keeps the primary message readable at every breakpoint and funnels visitors straight to the CTA without distractions.
      </p>
      <Button className="mx-auto mt-[3vh] min-w-[180px] w-auto">
        Explore the system
      </Button>
      <figure className="relative mx-auto mt-[5vh] aspect-[16/9] w-full max-w-[480px] overflow-hidden rounded-[22px]">
        <Image
          src="/images/hero.png"
          alt="Hero interface mockups framed within a gradient shell"
          fill
          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 55vw, 480px"
          className="object-cover"
          priority
        />
      </figure>
    </section>
  );
}

function ContentShowcaseSection() {
  return (
    <section
      id="showcase"
      data-animate-section
      className="rounded-[28px] border border-[var(--foreground)]/12 bg-[var(--background)] px-[6vw] py-[6vh]"
    >
      <div className="flex flex-col gap-[6vh]">
        <article className="flex flex-col gap-[3vh] md:flex-row md:items-center md:gap-[4vw]">
          <div className="md:w-1/2">
            <p className="text-[0.9rem] uppercase tracking-[0.2em] text-[var(--foreground)]/60">
              Playbook
            </p>
            <h2 className="mt-[1vh] text-[clamp(1.8rem,4vw,2.5rem)] font-semibold leading-tight">
              Ship product stories that flex across viewports
            </h2>
            <p className="mt-[2vh] text-[clamp(1rem,2.6vw,1.2rem)] text-[var(--foreground)]/75">
              Keep copy blocks concise and fluid so layouts can swing from stacked on handhelds to side-by-side on desktops without refactoring.
            </p>
            <Button className="mt-[2vh] w-full max-w-[220px]">View Playbook</Button>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80"
              alt="Product mockups displayed on layered cards"
              className="h-[70vh] w-full rounded-[24px] object-cover"
              loading="lazy"
            />
          </div>
        </article>

        <article className="flex flex-col gap-[3vh] md:flex-row md:flex-row-reverse md:items-center md:gap-[4vw]">
          <div className="md:w-1/2">
            <p className="text-[0.9rem] uppercase tracking-[0.2em] text-[var(--foreground)]/60">
              Ops snapshot
            </p>
            <h3 className="mt-[1vh] text-[clamp(1.6rem,3.8vw,2.25rem)] font-semibold leading-tight">
              Visual anchors help new sections feel trustworthy
            </h3>
            <p className="mt-[2vh] text-[clamp(1rem,2.6vw,1.2rem)] text-[var(--foreground)]/75">
              Pair each narrative block with photography or product UI captures so the content feels grounded and immediately scannable.
            </p>
            <Button className="mt-[2vh] w-full max-w-[220px]">See Ops Workflow</Button>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80"
              alt="Hands collaborating over design sketches"
              className="h-[70vh] w-full rounded-[24px] object-cover"
              loading="lazy"
            />
          </div>
        </article>
      </div>
    </section>
  );
}

function InfoSplitSection() {
  return (
    <section
      id="insight"
      data-animate-section
      className="rounded-[28px] border border-[var(--foreground)]/15 bg-[var(--foreground)]/3 px-[6vw] py-[5vh] space-y-[4vh]"
    >
      <div className="flex flex-col gap-[3vh] md:flex-row md:items-start md:gap-[5vw]">
        <header className="md:w-[58%]">
          <p className="text-[0.85rem] uppercase tracking-[0.18em] text-[var(--foreground)]/65">Signal</p>
          <h2 className="mt-[1vh] text-[clamp(1.5rem,3.2vw,2.1rem)] font-semibold leading-tight">
            Trusted by Thousands, Engineered by Excellence
          </h2>
        </header>
        <article className="md:w-[42%] md:self-end">
          <p className="text-[clamp(1rem,2.8vw,1.2rem)] leading-relaxed text-[var(--foreground)]/80">
            Giving readers a directional headline on the left and supporting explanation on the right
          </p>
        </article>
      </div>
      <div className="mt-[10vh] grid gap-[2.5vh] md:grid-cols-3 md:gap-[2vw]">
        <article className="space-y-[1vh]">
          <h3 className="text-[clamp(1.15rem,2.2vw,1.6rem)] font-semibold">810+ launches shipped</h3>
          <p className="text-[clamp(0.9rem,2vw,1.05rem)] text-[var(--foreground)]/75">
            Number of projects we have guided from first sprint through post-launch optimizations.
          </p>
        </article>
        <article className="space-y-[1vh]">
          <h3 className="text-[clamp(1.15rem,2.2vw,1.6rem)] font-semibold">4.9 / 5 average rating</h3>
          <p className="text-[clamp(0.9rem,2vw,1.05rem)] text-[var(--foreground)]/75">
            Product, brand, and platform teams score collaboration quality and measurable impact.
          </p>
        </article>
        <article className="space-y-[1vh]">
          <h3 className="text-[clamp(1.15rem,2.2vw,1.6rem)] font-semibold">26 countries activated</h3>
          <p className="text-[clamp(0.9rem,2vw,1.05rem)] text-[var(--foreground)]/75">
            Contributors in every timezone keep launches localized, inclusive, and always-on.
          </p>
        </article>
      </div>
    </section>
  );
}

function NarrativeSpotlightSection() {
  return (
    <section
      id="narrative"
      data-animate-section
      className="rounded-[28px] border border-[var(--foreground)]/12 bg-[var(--background)] px-[6vw] py-[6vh] space-y-[4vh]"
    >
      <div className="flex flex-col gap-[3vh] md:flex-row md:items-start md:gap-[5vw]">
        <header className="md:w-[50%]">
          <p className="text-[0.85rem] uppercase tracking-[0.2em] text-[var(--foreground)]/60">Narrative</p>
          <h2 className="mt-[1vh] text-[clamp(1.8rem,4vw,2.4rem)] font-semibold leading-tight">
            Stories that stretch from sprint rooms to boardrooms
          </h2>
        </header>
        <article className="md:w-[50%]">
          <p className="text-[clamp(1rem,2.8vw,1.2rem)] leading-relaxed text-[var(--foreground)]/80">
            Codify a single story spine, then remix it per audience. Start with headline clarity, add proof
            points, and keep visuals modular so every team can ship on-brand moments without waiting on
            the design queue.
          </p>
        </article>
      </div>
      <figure className="w-full h-[70vh] rounded-[24px] bg-[var(--foreground)]/5 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1400&q=80"
          alt="Team collaborating around product storyboards"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </figure>
    </section>
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
  ];

  return (
    <section
      id="faq"
      data-animate-section
      className="rounded-[28px] border border-[var(--foreground)]/12 bg-[var(--background)] px-[6vw] py-[6vh]"
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
              <li key={faq.question} className="border-b border-[var(--foreground)]/20 pb-[1.5vh]">
                <details className="group">
                  <summary className="cursor-pointer list-none py-[1.8vh] text-left text-[clamp(1.05rem,3vw,1.25rem)] font-semibold">
                    {faq.question}
                  </summary>
                  <p className="pb-[2.5vh] text-[clamp(0.95rem,2.4vw,1.1rem)] text-[var(--foreground)]/80">
                    {faq.answer}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      data-animate-section
      className="rounded-[28px] border border-[var(--foreground)]/15 bg-[var(--foreground)]/5 px-[6vw] py-[6vh]"
    >
      <div className="flex flex-col gap-[4vh] md:flex-row md:items-center md:gap-[6vw]">
        <div className="md:w-[45%]">
          <h2 className="text-[clamp(2rem,5vw,2.8rem)] font-semibold leading-tight">
            Ready for your next launch window?
          </h2>
          <Button className="mt-[2.5vh] w-full max-w-[240px]">Book a strategy call</Button>
        </div>
        <div className="md:w-[55%]">
          <h3 className="text-[clamp(1.2rem,3.2vw,1.6rem)] font-semibold">
            Same-week kickoff, zero ramp drama
          </h3>
          <p className="mt-[1.5vh] text-[clamp(1rem,2.6vw,1.15rem)] text-[var(--foreground)]/80">
            Share your objectives, tooling stack, and release pressure. We’ll respond within 24 hours with a tailored plan, pod availability, and a clear pricing model.
          </p>
        </div>
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

  return (
    <section
      id="context"
      data-animate-section
      className="rounded-[28px] border border-dashed border-[var(--foreground)]/20 px-[6vw] py-[6vh]"
    >
      <article className="mx-auto max-w-3xl text-center">
        <p className="text-[clamp(1.25rem,4vw,2rem)] font-semibold leading-tight text-[var(--foreground)]/90">
        This header-only block acts like a teaser paragraph—just enough{"   "}
        <span className="inline-flex align-middle">
            <CircleImageCarousel
              images={contextImages}
              size="xs"
              interval={2200}
              className="align-middle"
              ariaLabel="Context teaser imagery carousel"
            />
          </span>
        {"   "}context before the next experiment loads in.
        </p>
      </article>
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
      <InfoSplitSection />
      <NarrativeSpotlightSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
}
