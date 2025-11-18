import { FooterMark } from "./footer-mark";
import { NavLink } from "./nav-link";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-black/30 bg-black text-white">
      <div className="relative z-10 mx-auto flex w-full max-w-[min(1120px,92vw)] flex-col gap-[3vh] px-[2vw] py-[4vh] pb-[clamp(8rem,20vw,12rem)] sm:px-0 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-[2vw] text-[clamp(0.9rem,2.4vw,1rem)] md:self-start">
          <p className="text-[clamp(1rem,2.8vw,1.2rem)] font-semibold">R &amp; D</p>
          <span className="block h-[4vh] w-px bg-white/30" aria-hidden="true" />
          <p className="text-white/70">Fluid-first templates.</p>
        </div>
        <div className="grid gap-[1.2vh] text-[clamp(0.85rem,2.2vw,0.95rem)] uppercase tracking-[0.05em] text-white/75 md:grid-cols-2 md:gap-[2vw]">
          <div className="space-y-[0.5vh]">
            <NavLink variant="footer" indicatorStyle="overlay" href="#hero">
              Back to top
            </NavLink>
            <NavLink variant="footer" indicatorStyle="overlay" href="#context">
              Context
            </NavLink>
            <NavLink variant="footer" indicatorStyle="overlay" href="#insight">
              Insights
            </NavLink>
          </div>
          <div className="space-y-[0.5vh]">
            <NavLink variant="footer" indicatorStyle="overlay" href="#faq">
              FAQ
            </NavLink>
            <NavLink variant="footer" indicatorStyle="overlay" href="#contact">
              Contact
            </NavLink>
            <span className="block">© {new Date().getFullYear()} RandD</span>
          </div>
        </div>
      </div>
      <FooterMark />
    </footer>
  );
}

