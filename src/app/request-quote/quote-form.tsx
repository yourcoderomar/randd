"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../components/ui/button";

const inputStyles =
  "w-full rounded-[14px] border border-[var(--foreground)]/15 bg-white/90 px-[4vw] sm:px-[1.25rem] py-[1.6vh] text-[clamp(0.95rem,2.4vw,1rem)] text-[var(--foreground)] placeholder:text-[var(--foreground)]/55 focus-visible:ring-2 focus-visible:ring-[var(--foreground)]/30 focus-visible:outline-none transition-shadow";

const timelineOptions = [
  { label: "0–3 months", value: "0-3" },
  { label: "3–6 months", value: "3-6" },
  { label: "6–9 months", value: "6-9" },
  { label: "9+ months", value: "9-plus" },
];

const budgetRanges = [
  { label: "$5K – $15K", value: "5-15k" },
  { label: "$15K – $50K", value: "15-50k" },
  { label: "$50K – $150K", value: "50-150k" },
  { label: "$150K+", value: "150k-plus" },
];

const steps = [
  { id: 1, title: "Contact details" },
  { id: 2, title: "Project basics" },
  { id: 3, title: "Overview & send" },
];

type FormState = {
  name: string;
  email: string;
  company: string;
  timeline: string;
  budget: string;
  description: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  timeline: "0-3",
  budget: "",
  description: "",
};

type QuoteFormProps = {
  onStatusChange?: (submitted: boolean) => void;
};

export default function QuoteForm({ onStatusChange }: QuoteFormProps) {
  const [step, setStep] = useState(0);
  const [formValues, setFormValues] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    onStatusChange?.(isSubmitted);
  }, [isSubmitted, onStatusChange]);

  const canGoNext = useMemo(() => {
    if (step === 0) {
      return formValues.name.trim() !== "" && formValues.email.trim() !== "";
    }
    if (step === 1) {
      return formValues.budget !== "";
    }
    if (step === 2) {
      return formValues.description.trim().length >= 10;
    }
    return true;
  }, [formValues, step]);

  const handleChange = (
    field: keyof FormState,
    value: string,
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canGoNext) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const goNext = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const goBack = () => setStep((prev) => Math.max(prev - 1, 0));

  if (isSubmitted) {
    return (
      <section className="rounded-[28px] border border-[var(--foreground)]/10 bg-white px-[6vw] py-[4vh] text-center shadow-[0_20px_60px_rgba(15,15,30,0.05)] sm:px-[3vw]">
        <p className="text-[clamp(0.9rem,2.6vw,1rem)] uppercase tracking-[0.25em] text-[var(--foreground)]/60">
          Request sent
        </p>
        <h2 className="mt-[1vh] text-[clamp(1.6rem,4.6vw,2.2rem)] font-semibold text-[var(--foreground)]">
          Thanks for sharing your roadmap
        </h2>
        <p className="mt-[1vh] text-[clamp(0.95rem,2.6vw,1.05rem)] text-[var(--foreground)]/70">
          An engineering lead will respond in under 48 hours with timelines, pricing bands, and suggested next steps.
        </p>
        <Button
          className="mt-[2vh]"
          onClick={() => {
            setFormValues(initialState);
            setStep(0);
            setIsSubmitted(false);
          }}
        >
          Send another project
        </Button>
      </section>
    );
  }

  return (
    <section className="rounded-[28px] border border-[var(--foreground)]/12 bg-white px-[6vw] py-[4vh] shadow-[0_20px_60px_rgba(15,15,30,0.05)] sm:px-[3vw]">
      <header>
        <p className="text-[clamp(0.9rem,2.4vw,1rem)] font-medium text-[var(--foreground)]/70">
          Step {step + 1} of {steps.length}
        </p>
        <h2 className="text-[clamp(1.5rem,4.4vw,2.2rem)] font-semibold text-[var(--foreground)]">
          {steps[step].title}
        </h2>
      </header>

      <ProgressBar activeIndex={step} />

      <form className="mt-[2vh] flex flex-col gap-[1.5vh]" onSubmit={handleSubmit}>
        {step === 0 && (
          <>
            <FormField label="Full name" required>
              <input
                type="text"
                name="name"
                placeholder="Jordan Lee"
                className={inputStyles}
                value={formValues.name}
                onChange={(event) => handleChange("name", event.target.value)}
                required
              />
            </FormField>

            <FormField label="Work email" required>
              <input
                type="email"
                name="email"
                placeholder="name@company.com"
                className={inputStyles}
                value={formValues.email}
                onChange={(event) => handleChange("email", event.target.value)}
                required
              />
            </FormField>

            <FormField label="Company or product">
              <input
                type="text"
                name="company"
                placeholder="Acme Commerce Suite"
                className={inputStyles}
                value={formValues.company}
                onChange={(event) => handleChange("company", event.target.value)}
              />
            </FormField>
          </>
        )}

        {step === 1 && (
          <>
            <FormField label="Target launch window">
              <TimelineSelect
                value={formValues.timeline}
                onChange={(val) => handleChange("timeline", val)}
              />
            </FormField>

            <div className="grid gap-[1vh] rounded-[20px] border border-[var(--foreground)]/12 p-[3vw] sm:p-[1.5rem]">
              <p className="text-[clamp(0.95rem,2.6vw,1.05rem)] font-medium text-[var(--foreground)]">
                Estimated budget
              </p>
              <div className="grid gap-[0.8vh] sm:grid-cols-2">
                {budgetRanges.map((range) => (
                  <label
                    key={range.value}
                    className="flex items-center gap-[0.6vw] rounded-[16px] border border-[var(--foreground)]/15 px-[2.5vw] py-[1vh] text-[clamp(0.9rem,2.4vw,1rem)]"
                  >
                    <input
                      type="radio"
                      name="budget"
                      value={range.value}
                      className="h-[16px] w-[16px] accent-[var(--foreground)]"
                      checked={formValues.budget === range.value}
                      onChange={(event) => handleChange("budget", event.target.value)}
                      required
                    />
                    {range.label}
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <FormField label="Project overview" description="Include goals, integrations, success metrics, and any compliance requirements." required>
              <textarea
                name="description"
                rows={5}
                className={`${inputStyles} min-h-[20vh] resize-vertical`}
                placeholder="Help us understand the scope so we can reply accurately."
                value={formValues.description}
                onChange={(event) => handleChange("description", event.target.value)}
                required
              />
            </FormField>

            <SummaryCard values={formValues} />
          </>
        )}

        <div className="mt-[1vh] flex flex-wrap gap-[1vh]">
          {step > 0 && (
            <Button type="button" variant="ghost" className="flex-1" onClick={goBack}>
              Back
            </Button>
          )}
          {step < steps.length - 1 && (
            <Button type="button" className="flex-1" onClick={goNext} disabled={!canGoNext}>
              Continue
            </Button>
          )}
          {step === steps.length - 1 && (
            <Button type="submit" className="flex-1" disabled={!canGoNext || isSubmitting}>
              {isSubmitting ? "Sending..." : "Send request"}
            </Button>
          )}
        </div>

        <p className="text-center text-[clamp(0.85rem,2.4vw,0.95rem)] text-[var(--foreground)]/60">
          We respond in under 48 hours—sooner if you mention a tight launch window.
        </p>
      </form>
    </section>
  );
}

function ProgressBar({ activeIndex }: { activeIndex: number }) {
  return (
    <ol className="mt-[1.5vh] flex items-center gap-[1vw]" aria-label="Progress">
      {steps.map((stepItem, index) => (
        <li key={stepItem.id} className="flex flex-1 items-center gap-[0.6vw]">
          <span
            className={`flex h-[36px] w-[36px] items-center justify-center rounded-full text-[0.95rem] font-semibold transition-colors ${
              index <= activeIndex
                ? "bg-[var(--foreground)] text-[var(--background)]"
                : "border border-[var(--foreground)]/25 text-[var(--foreground)]/60"
            }`}
          >
            {index + 1}
          </span>
          {index < steps.length - 1 && (
            <span
              aria-hidden="true"
              className={`h-[2px] flex-1 rounded-full ${
                index < activeIndex ? "bg-[var(--foreground)]" : "bg-[var(--foreground)]/20"
              }`}
            />
          )}
        </li>
      ))}
    </ol>
  );
}

type FormFieldProps = {
  label: string;
  children: React.ReactNode;
  description?: string;
  required?: boolean;
};

function FormField({ label, description, required, children }: FormFieldProps) {
  return (
    <label className="flex flex-col gap-[0.6vh]">
      <span className="text-[clamp(0.95rem,2.6vw,1.05rem)] font-medium text-[var(--foreground)]">
        {label}
        {required && <span className="text-[var(--foreground)]/60"> *</span>}
      </span>
      {description && (
        <p className="text-[clamp(0.85rem,2.2vw,0.95rem)] text-[var(--foreground)]/60">
          {description}
        </p>
      )}
      {children}
    </label>
  );
}

function SummaryCard({ values }: { values: FormState }) {
  const summaryItems = [
    { label: "Full name", value: values.name || "—" },
    { label: "Work email", value: values.email || "—" },
    { label: "Company", value: values.company || "—" },
    {
      label: "Timeline",
      value: timelineOptions.find((option) => option.value === values.timeline)?.label ?? "—",
    },
    {
      label: "Budget",
      value: budgetRanges.find((range) => range.value === values.budget)?.label ?? "—",
    },
  ];

  return (
    <section className="rounded-[20px] border border-[var(--foreground)]/12 bg-[var(--foreground)]/3 px-[4vw] py-[2.4vh] sm:px-[2vw]">
      <p className="text-[clamp(0.9rem,2.4vw,1rem)] font-medium text-[var(--foreground)]">
        Quick summary
      </p>
      <dl className="mt-[1vh] grid gap-[0.4vh] text-[clamp(0.9rem,2.4vw,1rem)] text-[var(--foreground)]/85 sm:grid-cols-2">
        {summaryItems.map((item) => (
          <div key={item.label} className="flex flex-col rounded-[14px] bg-white/40 px-[1vw] py-[0.8vh]">
            <dt className="text-[var(--foreground)]/55 text-[0.85em] uppercase tracking-[0.15em]">
              {item.label}
            </dt>
            <dd className="font-semibold text-[var(--foreground)]">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

type TimelineSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

function TimelineSelect({ value, onChange }: TimelineSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = timelineOptions.find((option) => option.value === value);

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  const handleSelect = (newValue: string) => {
    onChange(newValue);
    requestAnimationFrame(() => setIsOpen(false));
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        className={`${inputStyles} relative flex items-center justify-between gap-[2vw] rounded-[12px] pr-[10vw] pl-[4vw] text-left sm:pl-[1.5rem] sm:pr-[3rem]`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={`pointer-events-none absolute right-[4vw] sm:right-[1.5rem] top-1/2 -translate-y-1/2 text-[var(--foreground)] transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="block"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
        <span>{selected?.label ?? "Select a launch window"}</span>
      </button>

      {isOpen && (
        <ul
          className="absolute left-0 right-0 z-20 mt-[0.8vh] overflow-hidden rounded-[12px] border border-[var(--foreground)]/10 bg-white text-[var(--foreground)] shadow-[0_18px_45px_rgba(15,15,30,0.12)]"
          role="listbox"
          aria-label="Target launch window options"
        >
          {timelineOptions.map((option) => {
            const isActive = option.value === value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  className={`flex w-full items-center justify-between rounded-[12px] px-[4vw] py-[1.25vh] text-left text-[clamp(0.95rem,2.4vw,1.05rem)] transition-colors sm:px-[1.5rem] ${
                    isActive
                      ? "bg-[var(--foreground)]/12 text-[var(--foreground)]"
                      : "hover:bg-[var(--foreground)]/8"
                  }`}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    handleSelect(option.value);
                  }}
                  onClick={(event) => {
                    event.preventDefault();
                    handleSelect(option.value);
                  }}
                  role="option"
                  aria-selected={isActive}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

