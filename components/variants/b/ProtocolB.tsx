"use client";

import { useEffect, useRef } from "react";
import { PhoneCall, PencilRuler, ClipboardCheck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    n: "01",
    icon: PhoneCall,
    title: "Anruf und Ortstermin",
    body: "Sie schildern uns Ihr Anliegen am Telefon. Wo es sinnvoll ist, schauen wir uns die Sache vor Ort an — bei einer Störung so schnell wie möglich, bei einem geplanten Projekt in Ruhe.",
    aside: "Anruf genügt",
  },
  {
    n: "02",
    icon: PencilRuler,
    title: "Angebot und Planung",
    body: "Sie bekommen ein Angebot mit nachvollziehbaren Positionen und einen Terminvorschlag. Bei größeren Vorhaben stimmen wir uns mit den anderen Gewerken ab, damit auf der Baustelle niemand aufeinander wartet.",
    aside: "Feste Positionen",
  },
  {
    n: "03",
    icon: ClipboardCheck,
    title: "Ausführung und Abnahme",
    body: "Wir arbeiten sauber, räumen hinter uns auf und übergeben Ihnen zum Schluss die Anlage samt Prüfprotokoll. Fragen danach beantworten wir selbstverständlich auch noch in einem Jahr.",
    aside: "Mit Protokoll",
  },
];

export default function ProtocolB() {
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
    <section id="ablauf" className="scroll-mt-24 relative bg-frost-base pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-blue">
          Ablauf
        </span>
        <h2 className="mt-5 max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-[-0.025em] text-carbon sm:text-5xl">
          Drei Schritte, keine Überraschungen.
        </h2>
      </div>

      <div ref={root} className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mt-16">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="protocol-card sticky top-28 mb-6 will-change-transform">
                {/* Schatten trägt auf hellem Grund die Staffelung — sonst
                    sähe die obenauf liegende Karte flach aus. */}
                <div className="overflow-hidden rounded-sm border border-frost-line bg-frost shadow-xl shadow-carbon/8">
                  <div className="grid gap-8 p-8 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-12 md:p-12">
                    <span className="font-mono text-5xl font-medium leading-none text-blue/25 md:text-7xl">
                      {s.n}
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
        {/* Scrollstrecke, damit die Karten übereinander stapeln können. */}
        <div className="h-[40vh] md:h-[70vh]" />
      </div>
    </section>
  );
}
