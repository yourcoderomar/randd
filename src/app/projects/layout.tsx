import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | RandD Responsive Shell",
  description:
    "Explore our portfolio of innovative projects showcasing expertise in design, development, and problem-solving across various industries and technologies.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

