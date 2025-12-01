import type { Metadata } from "next";
import ProductsClient from "./products-client";

export const metadata: Metadata = {
  title: "Products | RandD Responsive Shell",
  description:
    "Explore modular equipment, digital systems, and service infrastructure with a consistent, mobile-first spec layout.",
};

export default function ProductsPage() {
  return <ProductsClient />;
}


