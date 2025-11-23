import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | RandD Responsive Shell",
  description:
    "Learn about RandD's mission, values, and the team behind innovative solutions. Discover our story and commitment to excellence.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

