"use client";

import { useState } from "react";
import QuoteForm from "./quote-form";

export default function QuoteShell() {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  return (
    <main className="mx-auto flex w-full max-w-[min(800px,94vw)] flex-col gap-[3vh] pb-[6vh] pt-[4vh]">
      {!hasSubmitted && (
        <div className="text-center">
          <p className="text-[clamp(0.85rem,2.4vw,0.95rem)] uppercase tracking-[0.2em] text-[var(--foreground)]/55">
            Request a quote
          </p>
          <h1 className="mt-[0.8vh] text-[clamp(2rem,5vw,2.8rem)] font-semibold leading-tight">
            Tell us about your build
          </h1>
          <p className="mx-auto mt-[1vh] max-w-[min(520px,90vw)] text-[clamp(1rem,2.8vw,1.1rem)] text-[var(--foreground)]/70">
            A short multi-step form so we can scope timelines, pricing, and the right engineering pod for you.
          </p>
        </div>
      )}

      <QuoteForm onStatusChange={setHasSubmitted} />
    </main>
  );
}

