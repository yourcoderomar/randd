"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../components/ui/button";

type ProductCategoryId =
  | "modular-range"
  | "digital-systems"
  | "service-infrastructure";

type ProductHighlight = {
  id: string;
  title: string;
  categoryId: ProductCategoryId;
  categoryLabel: string;
  description: string;
  metric: string;
  imageSrc: string;
  imageAlt: string;
};

const categories: {
  id: ProductCategoryId;
  label: string;
  summary: string;
}[] = [
  {
    id: "modular-range",
    label: "Modular Range",
    summary:
      "Modular crane and access systems with configurable outreach, track gauge, and cradle lengths.",
  },
  {
    id: "digital-systems",
    label: "Digital Systems",
    summary:
      "Signal, monitoring, and dashboard layers that sit on top of your physical equipment.",
  },
  {
    id: "service-infrastructure",
    label: "Service Infrastructure",
    summary:
      "Service, inspection, and lifecycle programs that keep your installed base running safely.",
  },
];

const productHighlights: ProductHighlight[] = [
  {
    id: "modular-suite",
    title: "Modular Range Type 6.2 Series",
    categoryId: "modular-range",
    categoryLabel: "Modular Range",
    description:
      "Typical data, outreach, and options for 6.2 Series modular crane configurations.",
    metric:
      "Outreach 3000–30000 mm • Track gauge 2500–5000 mm • Cradle length 2000–6000 mm",
    imageSrc: "/images/palazani.jpg",
    imageAlt: "Modular range crane system on an outdoor test site",
  },
  {
    id: "insight-stack",
    title: "Insight Stack",
    categoryId: "digital-systems",
    categoryLabel: "Digital Systems",
    description:
      "Telemetry, dashboards, and alerting patterns designed to wrap your installed mechanical systems.",
    metric: "Up to 320 live signal points per system",
    imageSrc: "/images/products.png",
    imageAlt: "Data visualizations rendered in product dashboard cards",
  },
  {
    id: "service-layer",
    title: "Service Layer",
    categoryId: "service-infrastructure",
    categoryLabel: "Service Infrastructure",
    description:
      "Modular service, maintenance, and inspection bundles for high-duty-cycle installations.",
    metric: "Target uptime 99.96% with defined service windows",
    imageSrc: "/images/bg.png",
    imageAlt:
      "Soft gradient background representing resilient infrastructure",
  },
];

export default function ProductsClient() {
  const [activeCategory, setActiveCategory] =
    useState<ProductCategoryId | "all">("all");

  const filteredProducts =
    activeCategory === "all"
      ? productHighlights
      : productHighlights.filter(
          (product) => product.categoryId === activeCategory,
        );

  return (
    <div className="flex flex-col gap-[5vh]">
      <section
        id="products-hero"
        className="rounded-[32px] bg-gradient-to-b from-[var(--foreground)]/8 to-transparent px-[6vw] py-[9vh]"
      >
        <header className="mx-auto max-w-3xl text-center space-y-[2vh]">
          <p className="text-[0.9rem] uppercase tracking-[0.25em] text-[var(--foreground)]/65">
            Product Systems
          </p>
          <h1 className="text-[clamp(2.4rem,6vw,3.8rem)] font-semibold leading-tight">
            Products by category.
          </h1>
          <p className="text-[clamp(1rem,3vw,1.25rem)] text-[var(--foreground)]/82">
            Browse modular equipment, digital systems, and service infrastructure
            with a consistent, mobile-first spec layout.
          </p>
        </header>
        <div className="mt-[4vh] flex flex-wrap justify-center gap-[1vh] sm:gap-[0.75vw]">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`rounded-full border px-[3vw] py-[0.65vh] text-[clamp(0.85rem,2.4vw,0.95rem)] sm:px-4 ${
              activeCategory === "all"
                ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                : "border-[var(--foreground)]/25 bg-[var(--background)]/90 text-[var(--foreground)]/80 hover:border-[var(--foreground)]/40"
            }`}
          >
            All products
          </button>
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full border px-[3vw] py-[0.65vh] text-[clamp(0.85rem,2.4vw,0.95rem)] sm:px-4 ${
                  isActive
                    ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                    : "border-[var(--foreground)]/25 bg-[var(--background)]/90 text-[var(--foreground)]/80 hover:border-[var(--foreground)]/40"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-[5vh] grid max-w-[min(1400px,95vw)] gap-[3vh]">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="flex flex-col overflow-hidden rounded-[28px] border border-[var(--foreground)]/15 bg-[var(--foreground)]/4 shadow-[0_1.5rem_3rem_-1.5rem_rgba(0,0,0,0.2)] md:flex-row"
            >
              <figure className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/10] md:max-w-[40%]">
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 420px"
                  className="object-cover"
                />
              </figure>
              <div className="flex flex-1 flex-col justify-between px-[5vw] py-[3vh] sm:px-[3vw]">
                <div className="space-y-[1vh]">
                  <p className="text-[0.78rem] uppercase tracking-[0.28em] text-[var(--foreground)]/65">
                    {product.categoryLabel}
                  </p>
                  <h3 className="text-[clamp(1.4rem,3vw,1.8rem)] font-semibold leading-snug">
                    {product.title}
                  </h3>
                  <p className="text-[clamp(0.96rem,2.4vw,1.05rem)] text-[var(--foreground)]/80">
                    {product.description}
                  </p>
                  <p className="text-[clamp(0.86rem,2.2vw,0.98rem)] text-[var(--foreground)]/75">
                    {product.metric}
                  </p>
                </div>
                <div className="mt-[2vh] flex flex-col gap-[1vh] sm:flex-row sm:items-center sm:gap-[1vw]">
                  <Button
                    fullWidth
                    href={
                      product.id === "modular-suite"
                        ? "/products/modular-launch"
                        : "/products"
                    }
                  >
                    Learn more
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}


