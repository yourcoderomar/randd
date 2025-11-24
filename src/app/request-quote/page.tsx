import type { Metadata } from "next";
import QuoteShell from "./quote-shell";

export const metadata: Metadata = {
  title: "Request a Quote | R & D Engineering",
  description:
    "Tell us about your product roadmap and receive a bespoke engineering quote with delivery milestones and pricing clarity.",
};

export default function RequestQuotePage() {
  return <QuoteShell />;
}

