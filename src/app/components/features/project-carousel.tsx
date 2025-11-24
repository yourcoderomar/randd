"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TextType from "./TextType";

interface ProjectItem {
  id: string | number;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  overlayText?: string | string[];
  content?: React.ReactNode;
}

interface ProjectCarouselProps {
  projects: ProjectItem[];
  className?: string;
  ariaLabel?: string;
}

export default function ProjectCarousel({
  projects,
  className = "",
  ariaLabel = "Project carousel",
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const NavigationButtons = ({ wrapperClassName = "" }: { wrapperClassName?: string }) => (
    <div
      className={`flex items-center justify-end gap-[3vw] md:gap-[1vw] flex-wrap ${wrapperClassName}`}
      aria-label="Carousel navigation"
    >
      <span className="text-[clamp(0.9rem, 2vw, 1rem)] tracking-[0.2em] text-[var(--foreground)]/60 uppercase">
        {String(currentIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
      </span>
      <div className="inline-flex items-center gap-[2vw] md:gap-[0.8vw]">
        <button
          onClick={handlePrevious}
          className="group h-[12vw] w-[12vw] md:h-[3.2vw] md:w-[3.2vw] max-h-[48px] max-w-[48px] min-h-[42px] min-w-[42px] rounded-full border border-[var(--foreground)]/25 bg-[var(--background)]/80 text-[var(--foreground)] transition-all duration-200 hover:border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]"
          aria-label="Previous project"
        >
          <svg
            className="h-[1.6rem] w-[1.6rem] mx-auto"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5L8 12L15 19"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="group h-[12vw] w-[12vw] md:h-[3.2vw] md:w-[3.2vw] max-h-[48px] max-w-[48px] min-h-[42px] min-w-[42px] rounded-full border border-[var(--foreground)]/25 bg-[var(--background)]/80 text-[var(--foreground)] transition-all duration-200 hover:border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]"
          aria-label="Next project"
        >
          <svg
            className="h-[1.6rem] w-[1.6rem] mx-auto"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 5L16 12L9 19"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  if (projects.length === 0) return null;

  const itemWidth = isMobile ? 100 : 60; // Percentage width for each item

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      aria-label={ariaLabel}
      role="region"
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * itemWidth}%)`,
        }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="flex-shrink-0 w-full md:w-[60%] px-0 md:px-[1.5vw]"
            aria-hidden={index !== currentIndex}
          >
            <div
              className="rounded-[40px] border border-[var(--foreground)]/12 bg-[var(--background)] overflow-hidden transition-all duration-300 hover:border-[var(--foreground)]/25 hover:shadow-lg"
            >
              {project.content ? (
                project.content
              ) : (
                project.image && (
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.imageAlt || project.title || `Project ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, 60vw"
                    />
                    {/* TextType overlay - only animate when this is the active div */}
                    {project.overlayText && index === currentIndex && (
                      <div className="absolute inset-0 flex items-center justify-center p-[4vw] z-10">
                        <div className="text-[clamp(1.5rem, 4vw, 2.5rem)] font-semibold text-white leading-none [&_span]:text-[inherit] [&_span]:text-[clamp(1.5rem,4vw,2.5rem)]">
                          <TextType
                            key={`${project.id}-${currentIndex}`}
                            text={project.overlayText}
                            typingSpeed={50}
                            pauseDuration={2000}
                            loop={false}
                            className="font-semibold text-white"
                            showCursor={true}
                            startOnVisible={true}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Project details below carousel */}
      {projects[currentIndex] && (
        <div className="mt-[4vh] pl-[2vw] pr-[6vw] transition-opacity duration-500">
          <div className="text-left relative">
            <div className="flex flex-col gap-[1.5vh] md:flex-row md:items-center md:justify-between md:pr-[10vw]">
              {projects[currentIndex].title && (
                <h3 className="text-[clamp(1.5rem, 4vw, 2.25rem)] font-medium leading-tight">
                  {projects[currentIndex].title}
                </h3>
              )}
            </div>

            {/* Navigation buttons fixed to the right of the section */}
            <NavigationButtons wrapperClassName="hidden md:flex md:mt-0 md:absolute md:top-1/2 md:right-0 md:-translate-y-1/2" />
            
            {projects[currentIndex].description && (
              <p className="max-w-xl text-[clamp(1rem, 2.5vw, 1.2rem)] text-[var(--foreground)]/80 leading-relaxed">
                {projects[currentIndex].description}
              </p>
            )}

            {/* Mobile navigation positioned after the description */}
            <NavigationButtons wrapperClassName="mt-[2vh] md:hidden w-full justify-between" />
          </div>
        </div>
      )}
    </div>
  );
}

