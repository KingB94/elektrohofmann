"use client";

import { useEffect, useRef } from "react";
import { PhoneCall, PencilRuler, ClipboardCheck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Ablauf } from "@/lib/inhalte";

gsap.registerPlugin(ScrollTrigger);

// Die Symbole gehören zur Gestaltung, nicht zum Inhalt — sie werden
// der Reihe nach vergeben. Legt der Kunde einen vierten Schritt an,
// fängt die Reihe wieder von vorne an.
const symbole = [PhoneCall, PencilRuler, ClipboardCheck];

export default function ProtocolB({ ablauf }: { ablauf: Ablauf }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".protocol-card");
      // Jede Karte außer der letzten tritt zurück, während die nächste
      // darüberschiebt: leicht kleiner, unschärfer, blasser.
      cards.slice(0, -1).forEach((card) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top top+=120",
            end: "+=520",
            scrub: 1,
          },
          scale: 0.93,
          filter: "blur(5px)",
          opacity: 0.45,
          ease: "none",
        });
      });
    }, root);

    const refresh = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      clearTimeout(refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section id="ablauf" className="scroll-mt-24 relative bg-frost-base pb-14 md:pb-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-blue">
          {ablauf.kicker}
        </span>
        <h2 className="mt-5 max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-[-0.025em] text-carbon sm:text-5xl">
          {ablauf.headline}
        </h2>
      </div>

      <div ref={root} className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mt-16">
          {ablauf.schritte.map((s, i) => {
            const Icon = symbole[i % symbole.length];
            const nummer = String(i + 1).padStart(2, "0");
            return (
              <div key={nummer} className="protocol-card sticky top-28 mb-6 will-change-transform">
                {/* Schatten trägt auf hellem Grund die Staffelung — sonst
                    sähe die obenauf liegende Karte flach aus. */}
                <div className="overflow-hidden rounded-sm border border-frost-line bg-frost shadow-xl shadow-carbon/8">
                  <div className="grid gap-8 p-8 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-12 md:p-12">
                    <span className="font-mono text-5xl font-medium leading-none text-blue/25 md:text-7xl">
                      {nummer}
                    </span>
                    <div>
                      <div className="flex items-center gap-3">
                        <Icon size={20} className="text-blue" strokeWidth={2} />
                        <h3 className="font-display text-2xl font-bold text-carbon md:text-3xl">
                          {s.title}
                        </h3>
                      </div>
                      <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-carbon/60">
                        {s.body}
                      </p>
                    </div>
                    <span className="hidden whitespace-nowrap rounded-full border border-frost-line px-4 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-carbon/50 md:inline-block">
                      {s.aside}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Scrollstrecke, damit die Karten übereinander stapeln können.
            Knapp bemessen: Sie muss nur reichen, bis die vorletzte Karte
            ihren Rückzug beendet hat. Weil dieser Weg in Pixeln festgelegt
            ist (520 ab dem Andocken), ist es auch die Strecke hier — eine
            Angabe in vh wäre auf großen Schirmen bloß eine leere Fläche
            unter der letzten Karte. */}
        <div className="h-[220px] md:h-[300px]" />
      </div>
    </section>
  );
}
