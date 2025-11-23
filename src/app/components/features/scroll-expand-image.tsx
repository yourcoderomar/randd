"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollExpandImageProps {
  src: string;
  alt: string;
  initialWidth?: number;
  initialHeight?: number;
  leftText?: string;
  rightText?: string;
  overlayText?: string;
}

export default function ScrollExpandImage({
  src,
  alt,
  initialWidth,
  initialHeight,
  leftText = "Our Journey",
  rightText = "Begins Here",
  overlayText,
}: ScrollExpandImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const image = imageRef.current;
    const leftText = leftTextRef.current;
    const rightText = rightTextRef.current;
    const overlayText = overlayTextRef.current;

    if (!container || !image) return;

    const ctx = gsap.context(() => {
      // Get viewport dimensions
      const getViewportSize = () => ({
        vw: window.innerWidth,
        vh: window.innerHeight,
      });

      const { vw, vh } = getViewportSize();
      
      // Calculate initial dimensions - rectangular with aspect ratio
      // Make smaller on mobile to fit between text (text has 8vw margin on each side)
      const isMobile = vw < 768;
      const mobileWidthMultiplier = isMobile ? 0.1 : 0.12;
      const mobileHeightMultiplier = isMobile ? 0.08 : 0.1;
      const maxWidth = isMobile ? 120 : 140;
      const maxHeight = isMobile ? 80 : 100;
      
      const startWidth = initialWidth || Math.min(vw * mobileWidthMultiplier, maxWidth);
      const startHeight = initialHeight || Math.min(vh * mobileHeightMultiplier, maxHeight);
      const startBorderRadius = 56; // Initial border radius in pixels
      
      // Set initial size - rectangular shape with border radius
      // Set transform origin to center for expansion from center
      gsap.set(image, {
        width: startWidth,
        height: startHeight,
        borderRadius: `${startBorderRadius}px`,
        transformOrigin: "center center",
      });

      // Create scroll trigger animation with pinning
      // For full screen, use full viewport width and height
      const scrollDistance = vh * 1.5; // 1.5 viewport heights of scroll
      
      // Create scroll trigger with onUpdate to handle both image and text
      const scrollTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Two-phase expansion:
          // Phase 1 (0-40%): Expand downward until bottom reaches viewport bottom
          // Phase 2 (40-100%): Expand equally up and down so top and bottom reach edges simultaneously
          const phase1End = 0.4;
          let currentWidth, currentHeight, currentY, currentBorderRadius;
          
          // Calculate height needed to reach bottom from initial position
          // Initial top is at paddingTop (40vh), so distance to bottom is vh - 40vh = 60vh
          const initialTopOffset = vh * 0.4; // 40vh padding
          const distanceToBottom = vh - initialTopOffset;
          
          if (progress <= phase1End) {
            // Phase 1: Expand downward (top stays in place, bottom reaches viewport bottom)
            const phase1Progress = progress / phase1End;
            currentWidth = gsap.utils.interpolate(startWidth, vw, phase1Progress);
            currentHeight = gsap.utils.interpolate(startHeight, distanceToBottom, phase1Progress);
            currentY = 0; // Top stays in place
            currentBorderRadius = gsap.utils.interpolate(startBorderRadius, startBorderRadius * 0.6, phase1Progress);
          } else {
            // Phase 2: Expand equally up and down to fill full viewport
            const phase2Progress = (progress - phase1End) / (1 - phase1End);
            currentWidth = vw; // Already full width
            currentHeight = gsap.utils.interpolate(distanceToBottom, vh, phase2Progress);
            // Move up to center vertically (expand equally up and down)
            const heightDifference = vh - distanceToBottom;
            currentY = gsap.utils.interpolate(0, -heightDifference / 2, phase2Progress);
            currentBorderRadius = gsap.utils.interpolate(startBorderRadius * 0.6, 0, phase2Progress);
          }
          
          gsap.set(image, {
            width: currentWidth,
            height: currentHeight,
            borderRadius: `${currentBorderRadius}px`,
            x: 0,
            y: currentY,
          });
          
          // Fade out side text as image expands (fade out in first 8% of progress)
          const sideTextOpacity = Math.max(0, 1 - progress * 12.5);
          if (leftText && rightText) {
            gsap.set([leftText, rightText], {
              opacity: sideTextOpacity,
              pointerEvents: sideTextOpacity === 0 ? "none" : "auto",
            });
          }
          
          // Fade in overlay text on image (fade in after 20% of progress)
          if (overlayText) {
            const overlayTextOpacity = Math.max(0, Math.min(1, (progress - 0.2) * 2.5));
            gsap.set(overlayText, {
              opacity: overlayTextOpacity,
              pointerEvents: overlayTextOpacity === 0 ? "none" : "auto",
            });
          }
        },
      });

      // Handle window resize
      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, container);

    return () => ctx.revert();
  }, [initialWidth, initialHeight]);

  return (
    <section
      ref={containerRef}
      className="relative flex items-start justify-center overflow-visible"
      style={{ minHeight: "150vh", paddingTop: "40vh" }}
      data-animate-section
    >
      <div className="relative w-full h-full flex items-start justify-center overflow-visible" style={{ paddingTop: "0" }}>
        <div
          ref={leftTextRef}
          className="absolute text-[clamp(1.2rem,3vw,1.8rem)] font-semibold text-[var(--foreground)]/80 whitespace-nowrap z-10"
          style={{ right: "50%", marginRight: "8vw", marginTop: "1.5vh" }}
        >
          {leftText}
        </div>
        <div
          ref={imageRef}
          className="relative z-20 mx-auto"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
          }}
          role="img"
          aria-label={alt}
        >
          {overlayText && (
            <div
              ref={overlayTextRef}
              className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
              style={{ opacity: 0 }}
            >
              <p className="text-[clamp(2rem,5vw,4rem)] font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] text-center px-[4vw]">
                {overlayText}
              </p>
            </div>
          )}
        </div>
        <div
          ref={rightTextRef}
          className="absolute text-[clamp(1.2rem,3vw,1.8rem)] font-semibold text-[var(--foreground)]/80 whitespace-nowrap z-10"
          style={{ left: "50%", marginLeft: "8vw", marginTop: "1.5vh" }}
        >
          {rightText}
        </div>
      </div>
    </section>
  );
}

