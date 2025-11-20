import Image from "next/image";
import type { Metadata } from "next";
import { Button } from "../components/ui/button";

const productHighlights = [
  {
    id: "modular-suite",
    title: "Modular Launch Suite",
    description:
      "Drag-and-drop content slices.",
    metric: "8 launch-ready modules",
    imageSrc: "/images/hero.png",
    imageAlt: "Storyboard mockups arranged in a layered hero frame",
  },
  {
    id: "insight-stack",
    title: "Insight Stack",
    description:
      "Drag-and-drop content slices.",
    metric: "320 live signal points",
    imageSrc: "/images/products.png",
    imageAlt: "Data visualizations rendered in product dashboard cards",
  },
  {
    id: "service-layer",
    title: "Service Layer",
    description:
      "Drag-and-drop content slices.",
    metric: "99.96% uptime target",
    imageSrc: "/images/bg.png",
    imageAlt: "Soft gradient background representing resilient infrastructure",
  },
];

export const metadata: Metadata = {
  title: "Products | RandD Responsive Shell",
  description:
    "Explore product-ready systems that preserve mobile-first performance, storytelling, and modular delivery out of the box.",
};

export default function ProductsPage() {
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
            Ready-made building.
          </h1>
          <p className="text-[clamp(1rem,3vw,1.25rem)] text-[var(--foreground)]/82">
            Each product line compresses discovery, design, and QA into a single, mobile-first playbook.
          </p>
        </header>
        <div className="mx-auto mt-[5vh] grid max-w-[min(1400px,95vw)] gap-[3vh] md:grid-cols-3 md:gap-[2.5vw]">
          {productHighlights.map((product) => (
            <article
              key={product.id}
              className="flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-[var(--foreground)]/15 bg-[var(--foreground)]/4 shadow-[0_1.5rem_3rem_-1.5rem_rgba(0,0,0,0.2)]"
            >
              <figure className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 320px"
                  className="object-cover"
                />
              </figure>
              <div className="flex flex-col space-y-[1.5vh] px-[4vw] pt-[2vh] pb-[4vh]">
                <p className="text-[0.8rem] uppercase tracking-[0.3em] text-[var(--foreground)]/60">
                  {product.metric}
                </p>
                <h3 className="text-[clamp(1.45rem,3.2vw,1.9rem)] font-semibold leading-snug">
                  {product.title}
                </h3>
                <p className="text-[clamp(0.95rem,2.6vw,1.1rem)] text-[var(--foreground)]/78">
                  {product.description}
                </p>
                <Button className="mt-[1vh] w-full">Learn More</Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

