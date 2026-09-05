import { Phone, Smartphone, Printer, Mail, MapPin, Clock } from "lucide-react";
import { business } from "@/data/business";
import Reveal from "@/components/variants/Reveal";
import VariantContactForm from "@/components/variants/VariantContactForm";
import VariantMap from "@/components/variants/VariantMap";

export default function KontaktC() {
  const rows = [
    { icon: Phone, label: "Telefon", value: business.phoneDisplay, href: business.phoneHref },
    { icon: Smartphone, label: "Mobil", value: business.mobileDisplay, href: business.mobileHref },
    { icon: Printer, label: "Fax", value: business.faxDisplay, href: undefined },
    { icon: Mail, label: "E-Mail", value: business.email, href: `mailto:${business.email}` },
    { icon: MapPin, label: "Anschrift", value: business.address.full, href: business.googleMapsUrl },
  ];

  return (
    <section id="kontakt" className="scroll-mt-28 border-t border-bone-line bg-bone-raised py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-copper" />
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-copper">
                  Kontakt
                </span>
              </div>
              <h2 className="mt-7 font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.01em] text-soot sm:text-5xl">
                Rufen Sie an — das
                <br />
                geht am schnellsten.
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <dl className="mt-12 divide-y divide-bone-line border-y border-bone-line">
                {rows.map((r) => {
                  const Icon = r.icon;
                  const content = (
                    <>
                      <dt className="flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-soot/45">
                        <Icon size={14} strokeWidth={1.8} className="text-copper" />
                        {r.label}
                      </dt>
                      <dd className="mt-0 break-all text-right text-[0.98rem] text-soot">
                        {r.value}
                      </dd>
                    </>
                  );
                  return r.href ? (
                    <a
                      key={r.label}
                      href={r.href}
                      {...(r.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="flex items-center justify-between gap-6 py-4 transition-colors hover:text-copper"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={r.label} className="flex items-center justify-between gap-6 py-4">
                      {content}
                    </div>
                  );
                })}
                <div className="flex items-start justify-between gap-6 py-4">
                  <dt className="flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-soot/45">
                    <Clock size={14} strokeWidth={1.8} className="text-copper" />
                    Zeiten
                  </dt>
                  <dd className="space-y-1 text-right">
                    {business.hours.map((h) => (
                      <div key={h.days} className="text-[0.92rem] text-soot">
                        <span className="text-soot/55">{h.days}</span>{" "}
                        <span className="font-mono">{h.time}</span>
                      </div>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden border border-bone-line">
                <VariantMap
                  lat={business.geo.lat}
                  lng={business.geo.lng}
                  title={`Karte: ${business.name}, ${business.address.full}`}
                  tone="warm"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="border border-bone-line bg-bone p-8 md:p-11">
              <h3 className="font-serif text-2xl font-semibold text-soot">
                Oder schreiben Sie kurz.
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-soot/60">
                Ein paar Sätze zu Ihrem Anliegen genügen. Wir melden uns zeitnah
                zurück und sagen Ihnen, was der nächste sinnvolle Schritt ist.
              </p>
              <div className="mt-9">
                <VariantContactForm tone="warm" email={business.email} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
