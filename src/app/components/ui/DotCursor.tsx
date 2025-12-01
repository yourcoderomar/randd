'use client';

import React, { useEffect, useRef, useState } from "react";

type CursorMode = "hidden" | "normal" | "interactive" | "project";

interface Point {
  x: number;
  y: number;
}

const DESKTOP_MIN_WIDTH = 768;

const DotCursor: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<CursorMode>("hidden");
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });

  const targetRef = useRef<Point>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const prefersReducedMotionRef = useRef(false);

  // Determine if we should enable the custom cursor (desktop / fine pointer only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateIsActive = () => {
      const hasFinePointer =
        typeof window.matchMedia === "function"
          ? window.matchMedia("(pointer: fine)").matches
          : true;
      const isDesktopWidth = window.innerWidth >= DESKTOP_MIN_WIDTH;
      setIsActive(hasFinePointer && isDesktopWidth);
    };

    const updateReducedMotion = () => {
      prefersReducedMotionRef.current =
        typeof window.matchMedia === "function"
          ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
          : false;
    };

    updateIsActive();
    updateReducedMotion();

    const resizeHandler = () => updateIsActive();
    window.addEventListener("resize", resizeHandler);

    let pointerMedia: MediaQueryList | undefined;
    if (typeof window.matchMedia === "function") {
      pointerMedia = window.matchMedia("(pointer: fine)");
      pointerMedia.addEventListener("change", updateIsActive);

      const motionMedia = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );
      motionMedia.addEventListener("change", updateReducedMotion);
    }

    return () => {
      window.removeEventListener("resize", resizeHandler);
      pointerMedia?.removeEventListener("change", updateIsActive);
    };
  }, []);

  // Handle pointer movement and determine cursor mode
  useEffect(() => {
    if (!isActive || typeof window === "undefined") {
      setMode("hidden");
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      targetRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      const target = event.target as HTMLElement | null;
      if (!target) {
        setMode("normal");
        return;
      }

      // ScrollStack project cards (except the \"view all\" card) use data-cursor=\"project\"
      const projectCard = target.closest("[data-cursor=\"project\"]");
      const projectIgnore = target.closest(
        "[data-cursor-project-ignore=\"true\"]"
      );

      if (projectCard && !projectIgnore) {
        setMode("project");
        return;
      }

      // Generic interactive elements -> shrink behavior
      const interactive = target.closest(
        "a, button, [role=\"button\"], [data-cursor=\"interactive\"]"
      );

      if (interactive) {
        setMode("interactive");
        return;
      }

      setMode("normal");
    };

    const handlePointerLeave = () => {
      setMode("hidden");
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [isActive]);

  // Smooth trailing animation
  useEffect(() => {
    if (!isActive) return;

    const animate = () => {
      const target = targetRef.current;

      setPosition((prev) => {
        if (prefersReducedMotionRef.current) {
          // Snap directly to the pointer for reduced motion users
          if (prev.x === target.x && prev.y === target.y) {
            return prev;
          }
          return target;
        }

        const lerpFactor = 0.16;
        const dx = target.x - prev.x;
        const dy = target.y - prev.y;

        const next = {
          x: prev.x + dx * lerpFactor,
          y: prev.y + dy * lerpFactor,
        };

        if (
          Math.abs(next.x - prev.x) < 0.01 &&
          Math.abs(next.y - prev.y) < 0.01
        ) {
          return prev;
        }

        return next;
      });

      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    animationFrameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current != null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive]);

  if (!isActive || mode === "hidden") {
    return null;
  }

  // Base scale larger so the normal state feels more prominent.
  let scale = 1.6;
  if (mode === "interactive") {
    // Slightly smaller on generic interactive elements.
    scale = 1.2;
  } else if (mode === "project") {
    // Enlarged for ScrollStack project cards, but not too extreme.
    scale = 2.6;
  }

  const style: React.CSSProperties = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
  };

  const showText = mode === "project";

  return (
    <div
      className={`dot-cursor ${
        mode === "project"
          ? "dot-cursor--project dot-cursor--with-text"
          : mode === "interactive"
          ? "dot-cursor--interactive"
          : ""
      }`}
      style={style}
      aria-hidden="true"
    >
      {showText && <span className="dot-cursor-text">View project</span>}
    </div>
  );
};

export default DotCursor;


