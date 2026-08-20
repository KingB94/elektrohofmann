import { Phone, Smartphone, Mail, MapPin, Clock } from "lucide-react";
import type { Betrieb, Kontakt } from "@/lib/inhalte";
import Reveal from "@/components/variants/Reveal";
import VariantContactForm from "@/components/variants/VariantContactForm";
import VariantMap from "@/components/variants/VariantMap";

export default function ContactB({
  betrieb,
  kontakt,
}: {
  betrieb: Betrieb;
  kontakt: Kontakt;
}) {
  return (
    <section id="kontakt" className="scroll-mt-24 relative bg-frost py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-blue">
            {kontakt.kicker}
          </span>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-[-0.025em] text-carbon sm:text-5xl">
            {kontakt.headline}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="flex flex-col gap-6">
              <div className="grid gap-px overflow-hidden rounded-sm border border-frost-line bg-frost-line sm:grid-cols-2">
                <a
                  href={betrieb.phoneHref}
                  className="group flex flex-col gap-2 bg-frost-base p-6 transition-colors hover:bg-frost"
                >
                  <Phone size={18} className="text-blue" strokeWidth={1.8} />
                  <span className="mt-2 font-display text-lg font-bold text-carbon">
                    {betrieb.phoneDisplay}
                  </span>
                  <span className="text-xs text-carbon/50">Festnetz — am schnellsten</span>
                </a>
                <a
                  href={betrieb.mobileHref}
                  className="group flex flex-col gap-2 bg-frost-base p-6 transition-colors hover:bg-frost"
                >
                  <Smartphone size={18} className="text-blue" strokeWidth={1.8} />
                  <span className="mt-2 font-display text-lg font-bold text-carbon">
                    {betrieb.mobileDisplay}
                  </span>
                  <span className="text-xs text-carbon/50">Mobil, für unterwegs</span>
                </a>
                {/* E-Mail und Zeiten über die volle Breite — sonst wird die
                    Adresse mitten im Wort umgebrochen. */}
                <a
                  href={`mailto:${betrieb.email}`}
                  className="group flex flex-col gap-2 bg-frost-base p-6 transition-colors hover:bg-frost sm:col-span-2"
                >
                  <Mail size={18} className="text-blue" strokeWidth={1.8} />
                  <span className="mt-2 break-words font-display text-base font-bold text-carbon">
                    {betrieb.email}
                  </span>
                  <span className="text-xs text-carbon/50">Für Angebote und Unterlagen</span>
                </a>
                <div className="flex flex-col gap-2 bg-frost-base p-6 sm:col-span-2">
                  <Clock size={18} className="text-blue" strokeWidth={1.8} />
                  <div className="mt-2 space-y-1.5">
                    {betrieb.hours.map((h) => (
                      <div
                        key={h.days}
                        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5 text-sm"
                      >
                        <span className="text-carbon/60">{h.days}</span>
                        <span className="font-mono text-carbon/85">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-sm border border-frost-line bg-frost-base p-6">
                <MapPin size={18} className="mt-0.5 shrink-0 text-blue" strokeWidth={1.8} />
                <div>
                  <p className="font-medium text-carbon">{betrieb.address.full}</p>
                  <a
                    href={betrieb.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-blue hover:underline"
                  >
                    Route planen →
                  </a>
                </div>
              </div>

              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-frost-line">
                <VariantMap
                  lat={betrieb.geo.lat}
                  lng={betrieb.geo.lng}
                  title={`Karte: ${betrieb.name}, ${betrieb.address.full}`}
                  tone="light"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-sm border border-frost-line bg-frost-base p-8 md:p-10">
              <h3 className="font-display text-xl font-bold text-carbon">
                {kontakt.formTitel}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-carbon/60">
                {kontakt.formText}
              </p>
              <div className="mt-8">
                <VariantContactForm tone="light" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
