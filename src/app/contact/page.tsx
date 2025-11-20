import type { Metadata } from "next";
import { Button } from "../components/ui/button";

export const metadata: Metadata = {
  title: "Contact | RandD Responsive Shell",
  description:
    "Reach the RandD team for partnerships, support, and speaking engagements. Mobile-first contact page with multiple touchpoints.",
};

export default function ContactPage() {
  return (
    <div className="relative">
      <HeroBlock />
      <SocialMediaCards />
    </div>
  );
}

function HeroBlock() {
  return (
    <header className="relative flex min-h-[80vh] items-start justify-center rounded-[30px] border border-[var(--foreground)]/12 bg-gradient-to-b from-[var(--foreground)]/4 to-transparent px-[6vw] pt-[20vh] sm:pt-[15vh] text-center">
      <div className="flex flex-col items-center">
        <h1 className="mx-auto max-w-xl text-[clamp(1.8rem,5vw,2.5rem)] font-medium leading-tight">
          Talk with the RandD team about your next release window
        </h1>
        <div className="mt-[3vh] flex justify-center">
          <Button className="max-w-[280px] bg-white border border-black text-black hover:bg-gray-100">
            Book a discovery slot
          </Button>
        </div>
      </div>
    </header>
  );
}

function SocialMediaCards() {
  const socialPlatforms = [
    { 
      name: "Twitter", 
      icon: "𝕏", 
      href: "https://twitter.com",
      description: "Follow us for updates and announcements",
      linkText: "Visit Twitter"
    },
    { 
      name: "LinkedIn", 
      icon: "in", 
      href: "https://linkedin.com",
      description: "Connect with our professional network",
      linkText: "Visit LinkedIn"
    },
    { 
      name: "Instagram", 
      icon: "IG", 
      href: "https://instagram.com",
      description: "See our latest work and behind the scenes",
      linkText: "Visit Instagram"
    },
  ];

  return (
    <div className="relative -mt-[8vh] z-10 flex flex-row sm:flex-row justify-center gap-[2vw] sm:gap-[3vw] px-[6vw]">
      {socialPlatforms.map((platform) => (
        <a
          key={platform.name}
          href={platform.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 sm:flex-initial flex-col items-center sm:items-start justify-center rounded-[30px] bg-gray-100 p-[2vh] sm:p-[5vh] shadow-lg transition-transform hover:scale-105 min-h-[12vh] sm:min-h-0"
        >
          <div className="flex h-full w-full sm:h-[12vh] sm:w-[12vh] items-center justify-center rounded-[30px] sm:rounded-[20px] bg-gray-200 text-[clamp(1.5rem,4vw,3rem)] font-semibold text-[var(--foreground)]">
            {platform.icon}
          </div>
          <h3 className="hidden sm:block text-left text-[clamp(1.1rem,2.8vw,1.4rem)] font-semibold text-[var(--foreground)] mb-[1vh] mt-[2vh] w-full">
            {platform.name}
          </h3>
          <p className="hidden sm:block text-left text-[clamp(0.85rem,2.2vw,1rem)] text-[var(--foreground)]/70 mb-[2vh] w-full">
            {platform.description}
          </p>
          <span className="hidden sm:block text-left text-[clamp(0.9rem,2.4vw,1.05rem)] font-semibold text-[var(--foreground)] underline underline-offset-4 w-full">
            {platform.linkText}
          </span>
        </a>
      ))}
    </div>
  );
}