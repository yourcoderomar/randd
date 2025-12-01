import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Modular Range Type 6.2 Series | Products",
  description:
    "Typical data, options, and technical table for the Modular Range Type 6.2 Series.",
};

export default function ModularLaunchPage() {
  return (
    <div className="flex flex-col gap-[5vh]">
      <header className="rounded-[32px] bg-gradient-to-b from-[var(--foreground)]/8 to-transparent px-[6vw] py-[6vh]">
        <p className="text-[0.9rem] uppercase tracking-[0.25em] text-[var(--foreground)]/65">
          Products
        </p>
        <h1 className="mt-[1vh] text-[clamp(2rem,5.5vw,3.2rem)] font-semibold leading-tight">
          Modular Range Type 6.2 Series
        </h1>
      </header>

      <section className="rounded-[28px] border border-[var(--foreground)]/10 bg-[var(--background)] px-[6vw] py-[4vh]">
        <div className="grid gap-[3vh] md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-start md:gap-[3vw]">
          <figure className="relative w-full overflow-hidden rounded-[24px] border border-[var(--foreground)]/10 bg-[var(--foreground)]/5">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/images/palazani.jpg"
                alt="Modular range crane system on an outdoor test site"
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 55vw, 560px"
                className="object-cover"
              />
            </div>
          </figure>

          <div className="space-y-[2vh]">
            <div>
              <h2 className="text-[clamp(1.4rem,3.6vw,2rem)] font-semibold">
                Typical data for this series
              </h2>
            </div>
            <dl className="space-y-[1vh] text-[clamp(0.96rem,2.5vw,1.05rem)]">
              <div className="flex items-baseline justify-between gap-[1vw]">
                <dt className="text-[var(--foreground)]/80">Outreach</dt>
                <dd className="font-semibold">3000 – 30000 mm</dd>
              </div>
              <div className="flex items-baseline justify-between gap-[1vw]">
                <dt className="text-[var(--foreground)]/80">Track gauge</dt>
                <dd className="font-semibold">2500 – 5000 mm</dd>
              </div>
              <div className="flex items-baseline justify-between gap-[1vw]">
                <dt className="text-[var(--foreground)]/80">Cradle length</dt>
                <dd className="font-semibold">2000 – 6000 mm</dd>
              </div>
            </dl>

            <div className="pt-[2vh]">
              <h3 className="text-[clamp(1.1rem,2.8vw,1.4rem)] font-semibold">
                Options
              </h3>
              <ul className="mt-[1vh] list-disc space-y-[0.4vh] pl-5 text-[clamp(0.95rem,2.4vw,1.05rem)]">
                <li>Auxiliary hoist</li>
                <li>Longer / special platform</li>
                <li>Luffing jib</li>
                <li>Telescopic mast</li>
                <li>Additional custom modifications as necessary</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-[var(--foreground)]/10 bg-[var(--foreground)]/2 px-[3vw] py-[3.5vh]">
        <h2 className="px-[3vw] text-[clamp(1.3rem,3.2vw,1.8rem)] font-semibold">
          Technical data table
        </h2>
        <div className="mt-[2vh] overflow-x-auto">
          <table className="min-w-[720px] w-full border-collapse text-[clamp(0.85rem,2.2vw,0.95rem)]">
            <thead>
              <tr className="bg-[var(--background)]">
                <th className="border border-[var(--foreground)]/20 px-3 py-2 text-left font-semibold">
                  Hoist mechanism
                </th>
                <th className="border border-[var(--foreground)]/20 px-3 py-2 text-left font-semibold">
                  Single-layer
                </th>
                <th className="border border-[var(--foreground)]/20 px-3 py-2 text-left font-semibold">
                  Multi-layer
                </th>
                <th className="border border-[var(--foreground)]/20 px-3 py-2 text-left font-semibold">
                  Multi-layer
                </th>
                <th className="border border-[var(--foreground)]/20 px-3 py-2 text-left font-semibold">
                  Multi-layer
                </th>
                <th className="border border-[var(--foreground)]/20 px-3 py-2 text-left font-semibold">
                  Multi-layer
                </th>
              </tr>
            </thead>
            <tbody className="bg-[var(--background)]/95">
              <tr>
                <td className="border border-[var(--foreground)]/15 px-3 py-2">
                  Rated working load (standard)
                </td>
                <td className="border border-[var(--foreground)]/15 px-3 py-2">
                  240 kg
                </td>
                <td className="border border-[var(--foreground)]/15 px-3 py-2">
                  240 kg
                </td>
                <td className="border border-[var(--foreground)]/15 px-3 py-2">
                  240 kg
                </td>
                <td className="border border-[var(--foreground)]/15 px-3 py-2">
                  240 kg
                </td>
                <td className="border border-[var(--foreground)]/15 px-3 py-2">
                  240 kg
                </td>
              </tr>
              <tr>
                <td className="border border-[var(--foreground)]/15 px-3 py-2">
                  Height coverage (standard)
                </td>
                <td className="border border-[var(--foreground)]/15 px-3 py-2">
                  39 m
                </td>
                <td className="border border-[var(--foreground)]/15 px-3 py-2">
                  125 m
                </td>
                <td className="border border-[var(--foreground)]/15 px-3 py-2">
                  280 m / 220 m
                </td>
                <td className="border border-[var(--foreground)]/15 px-3 py-2">
                  420 m
                </td>
                <td className="border border-[var(--foreground)]/15 px-3 py-2">
                  635 m / 760 m
                </td>
              </tr>
              {/* Additional rows (rope diameter, safety factor, speeds, etc.)
                  can be filled in here following the same pattern as your
                  source table. */}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}



