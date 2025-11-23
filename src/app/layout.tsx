import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteNav } from "./components/ui/site-nav";
import { Footer } from "./components/ui/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RandD Responsive Shell",
  description:
    "Navigation prototype showcasing mobile-first, fluid UI patterns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${inter.variable} antialiased overflow-x-hidden`}>
        <div className="flex min-h-svh flex-col bg-[var(--background)] text-[var(--foreground)] overflow-x-hidden">
          <SiteNav />
          <main className="flex-1">
            <div className="mx-auto w-full max-w-[min(1120px,92vw)] px-[2vw] py-[4vh] sm:px-0">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
