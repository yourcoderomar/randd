"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface CircleImageCarouselProps {
  images: { src: string; alt: string }[];
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  interval?: number; // milliseconds between image changes
  className?: string;
  ariaLabel?: string;
}

const sizeClasses = {
  xs: "w-10 h-10",
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-24 h-24",
  xl: "w-32 h-32",
};

export default function CircleImageCarousel({
  images,
  size = "md",
  interval = 2000,
  className = "",
  ariaLabel = "Image carousel",
}: CircleImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (images.length === 0) return null;

  return (
    <span
      className={`inline-flex relative rounded-full overflow-hidden shadow-lg ${sizeClasses[size]} ${className}`}
      aria-label={ariaLabel}
      role="img"
      aria-live="polite"
      aria-atomic="true"
    >
      {images.map((image, index) => (
        <picture
          key={index}
          className={`absolute inset-0 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== currentIndex}
        >
          <Image
            src={image.src}
            alt={index === currentIndex ? image.alt : ""}
            fill
            className="object-cover"
            sizes={
              size === "xs"
                ? "40px"
                : size === "sm"
                  ? "48px"
                  : size === "md"
                    ? "64px"
                    : size === "lg"
                      ? "96px"
                      : "128px"
            }
          />
        </picture>
      ))}
    </span>
  );
}

