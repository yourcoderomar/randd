import type { ReactNode } from "react";

type RequestQuoteLayoutProps = {
  children: ReactNode;
};

export default function RequestQuoteLayout({ children }: RequestQuoteLayoutProps) {
  return (
    <div className="min-h-[100vh] bg-[var(--background)] px-[4vw] py-[4vh] sm:px-[6vw]">
      {children}
    </div>
  );
}

