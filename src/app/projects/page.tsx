"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../components/ui/button";
import Link from "next/link";
import TextType from "../components/features/TextType";
import Masonry from "../components/features/Masonry";

const projects = [
  {
    id: 1,
    title: "Project Alpha",
    description: "A cutting-edge solution that transforms how teams collaborate and deliver exceptional results. Built with modern technologies and user-centered design principles.",
    image: "/images/bg.png",
    imageAlt: "Project Alpha showcase",
    category: "Web Application",
    year: "2024",
    tags: ["React", "TypeScript", "Next.js"],
  },
  {
    id: 2,
    title: "Project Beta",
    description: "An innovative platform that streamlines workflows and enhances productivity. Designed to scale with your business needs and adapt to changing requirements.",
    image: "/images/products.png",
    imageAlt: "Project Beta showcase",
    category: "Mobile App",
    year: "2024",
    tags: ["React Native", "TypeScript", "Firebase"],
  },
  {
    id: 3,
    title: "Project Gamma",
    description: "A comprehensive system that brings together the best tools and practices. Engineered for performance, reliability, and seamless user experience.",
    image: "/images/bg.png",
    imageAlt: "Project Gamma showcase",
    category: "Platform",
    year: "2023",
    tags: ["Node.js", "PostgreSQL", "AWS"],
  },
  {
    id: 4,
    title: "Project Delta",
    description: "Revolutionary approach to solving complex challenges. Combining data-driven insights with intuitive interfaces for maximum impact.",
    image: "/images/bg.png",
    imageAlt: "Project Delta showcase",
    category: "Data Analytics",
    year: "2023",
    tags: ["Python", "Machine Learning", "D3.js"],
  },
  {
    id: 5,
    title: "Project Epsilon",
    description: "A modern e-commerce solution that delivers seamless shopping experiences across all devices. Built with performance and conversion optimization in mind.",
    image: "/images/products.png",
    imageAlt: "Project Epsilon showcase",
    category: "E-Commerce",
    year: "2024",
    tags: ["Shopify", "React", "Stripe"],
  },
  {
    id: 6,
    title: "Project Zeta",
    description: "An enterprise-grade dashboard that provides real-time insights and analytics. Designed for scalability and ease of use.",
    image: "/images/bg.png",
    imageAlt: "Project Zeta showcase",
    category: "Dashboard",
    year: "2024",
    tags: ["Vue.js", "D3.js", "GraphQL"],
  },
];

export default function ProjectsPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-animate-section]").forEach((section) => {
        gsap.fromTo(
          section,
          { y: 48, opacity: 0 },
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
    <div className="flex flex-col gap-[5vh]">
      <section
        id="projects-hero"
        data-animate-section
        className="rounded-[32px] bg-gradient-to-b from-[var(--foreground)]/8 to-transparent px-[6vw] pt-[9vh] pb-[12vh] min-h-[60vh]"
      >
        <header className="text-left max-w-md space-y-[2vh]">
          <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-semibold leading-tight">
            <TextType
              text="Featured Work & Case Studies"
              typingSpeed={50}
              pauseDuration={2000}
              loop={false}
              startOnVisible={true}
              showCursor={true}
            />
          </h1>
          <div className="flex flex-col sm:flex-row gap-[2vh] pt-[1vh]">
            <Button className="min-w-[180px]">View All Projects</Button>
            <Button variant="ghost" className="min-w-[180px]">Filter Projects</Button>
          </div>
        </header>
      </section>

      <section
        id="projects-grid"
        data-animate-section
        className="w-full min-h-[80vh]"
      >
        <Masonry
          items={projects.map((project, index) => ({
            id: project.id.toString(),
            img: project.image,
            url: `#project-${project.id}`,
            height: 300 + (index % 3) * 100, // Varying heights for visual interest
          }))}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
          colorShiftOnHover={false}
        />
      </section>

      <section
        id="projects-cta"
        data-animate-section
        className="rounded-[28px] border border-[var(--foreground)]/15 bg-[var(--foreground)]/5 px-[6vw] py-[6vh] text-center"
      >
        <h2 className="text-[clamp(1.8rem,4vw,2.4rem)] font-semibold leading-tight">
          Have a project in mind?
        </h2>
        <p className="mt-[2vh] text-[clamp(1rem,2.6vw,1.15rem)] text-[var(--foreground)]/80 max-w-2xl mx-auto">
          Let's collaborate to bring your vision to life. Get in touch to discuss your next project.
        </p>
        <div className="mt-[3vh] flex flex-col sm:flex-row gap-[2vh] justify-center items-center">
          <Button className="min-w-[200px]">Start a Project</Button>
          <Link href="/contact">
            <Button variant="ghost" className="min-w-[200px]">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

