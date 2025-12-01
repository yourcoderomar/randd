"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Button } from "../../components/ui/button";

const projects = [
  {
    id: 1,
    title: "Project Alpha",
    description:
      "A cutting-edge solution that transforms how teams collaborate and deliver exceptional results. Built with modern technologies and user-centered design principles.",
    image: "/images/bg.png",
    imageAlt: "Project Alpha showcase",
    category: "Web Application",
    year: "2024",
    tags: ["React", "TypeScript", "Next.js"],
  },
  {
    id: 2,
    title: "Project Beta",
    description:
      "An innovative platform that streamlines workflows and enhances productivity. Designed to scale with your business needs and adapt to changing requirements.",
    image: "/images/products.png",
    imageAlt: "Project Beta showcase",
    category: "Mobile App",
    year: "2024",
    tags: ["React Native", "TypeScript", "Firebase"],
  },
  {
    id: 3,
    title: "Project Gamma",
    description:
      "A comprehensive system that brings together the best tools and practices. Engineered for performance, reliability, and seamless user experience.",
    image: "/images/bg.png",
    imageAlt: "Project Gamma showcase",
    category: "Platform",
    year: "2023",
    tags: ["Node.js", "PostgreSQL", "AWS"],
  },
  {
    id: 4,
    title: "Project Delta",
    description:
      "Revolutionary approach to solving complex challenges. Combining data-driven insights with intuitive interfaces for maximum impact.",
    image: "/images/bg.png",
    imageAlt: "Project Delta showcase",
    category: "Data Analytics",
    year: "2023",
    tags: ["Python", "Machine Learning", "D3.js"],
  },
  {
    id: 5,
    title: "Project Epsilon",
    description:
      "A modern e-commerce solution that delivers seamless shopping experiences across all devices. Built with performance and conversion optimization in mind.",
    image: "/images/products.png",
    imageAlt: "Project Epsilon showcase",
    category: "E-Commerce",
    year: "2024",
    tags: ["Shopify", "React", "Stripe"],
  },
  {
    id: 6,
    title: "Project Zeta",
    description:
      "An enterprise-grade dashboard that provides real-time insights and analytics. Designed for scalability and ease of use.",
    image: "/images/bg.png",
    imageAlt: "Project Zeta showcase",
    category: "Dashboard",
    year: "2024",
    tags: ["Vue.js", "D3.js", "GraphQL"],
  },
];

export default function AllProjectsPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>("[data-animate-section]")
        .forEach((section) => {
          gsap.fromTo(
            section,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
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
    <main className="flex flex-col gap-[5vh]">
      <section
        id="all-projects-hero"
        data-animate-section
        className="rounded-[32px] bg-gradient-to-b from-[var(--foreground)]/8 to-transparent px-[6vw] pt-[9vh] pb-[6vh] min-h-[40vh]"
      >
        <header className="max-w-2xl space-y-[2vh]">
          <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-semibold leading-tight">
            All projects
          </h1>
          <p className="text-[clamp(1rem,2.6vw,1.15rem)] text-[var(--foreground)]/80">
            Explore the full collection of our work, from experimental concepts to
            fully shipped products across different platforms and industries.
          </p>
        </header>
      </section>

      <section
        id="all-projects-grid"
        data-animate-section
        className="px-[4vw] pb-[8vh]"
        aria-labelledby="all-projects-grid-heading"
      >
        <header className="mb-[3vh] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[2vh]">
          <h2
            id="all-projects-grid-heading"
            className="text-[clamp(1.4rem,3vw,2rem)] font-semibold"
          >
            Our work
          </h2>
          <Link href="/projects">
            <Button variant="ghost" className="min-w-[180px]">
              Back to projects overview
            </Button>
          </Link>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[3vh] sm:gap-[3vw]">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group rounded-2xl border border-[var(--foreground)]/10 bg-[var(--background)]/60 p-5 sm:p-6 shadow-[0_18px_40px_-18px_rgba(15,23,42,0.45)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_-20px_rgba(15,23,42,0.6)] cursor-pointer"
            >
              <div
                className="mb-4 aspect-[16/10] w-full overflow-hidden rounded-xl bg-cover bg-center"
                style={{ backgroundImage: `url(${project.image})` }}
                aria-label={project.imageAlt}
              />
              <header className="space-y-1">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--foreground)]/70">
                  {project.category} • {project.year}
                </p>
                <h3 className="text-[clamp(1.05rem,2.3vw,1.3rem)] font-semibold leading-snug">
                  {project.title}
                </h3>
              </header>
              <p className="mt-3 text-sm text-[var(--foreground)]/80">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[var(--foreground)]/5 px-3 py-1 text-xs font-medium text-[var(--foreground)]/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}


