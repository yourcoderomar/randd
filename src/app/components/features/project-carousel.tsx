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
          <div className="text-left">
            <div className="flex items-center gap-[4vw] md:gap-[50vw] mb-[0.3vh] flex-wrap">
              {projects[currentIndex].title && (
                <h3 className="text-[clamp(1.5rem, 4vw, 2.25rem)] font-medium leading-tight">
                  {projects[currentIndex].title}
                </h3>
              )}
              
              {/* Navigation buttons aligned with header */}
              <div className="inline-flex items-center rounded-2xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 overflow-hidden" aria-label="Carousel navigation">
                <button
                  onClick={handlePrevious}
                  className="px-[1.2vw] py-[0.8vh] hover:bg-[var(--foreground)]/10 transition-all duration-200 flex items-center justify-center text-[clamp(1rem, 2vw, 1.2rem)] text-[var(--foreground)] font-medium"
                  aria-label="Previous project"
                >
                  &lt;
                </button>
                <div className="h-[50%] w-px bg-[var(--foreground)]/20"></div>
                <button
                  onClick={handleNext}
                  className="px-[1.2vw] py-[0.8vh] hover:bg-[var(--foreground)]/10 transition-all duration-200 flex items-center justify-center text-[clamp(1rem, 2vw, 1.2rem)] text-[var(--foreground)] font-medium"
                  aria-label="Next project"
                >
                  &gt;
                </button>
              </div>
            </div>
            
            {projects[currentIndex].description && (
              <p className="max-w-xl text-[clamp(1rem, 2.5vw, 1.2rem)] text-[var(--foreground)]/80 leading-relaxed">
                {projects[currentIndex].description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

