import { Phone, Smartphone, MapPin, Clock } from "lucide-react";
import { business } from "@/data/business";
import ContactForm from "@/components/ContactForm";
import Button from "@/components/Button";
import MapEmbed from "@/components/MapEmbed";

export default function Contact() {
  return (
    <section id="kontakt" className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <span className="plate-badge text-blue-deep">Kontakt</span>
        <h2 className="mt-5 max-w-xl font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Sprechen Sie mit uns.
        </h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col gap-6">
            <div className="rounded-sm border border-paper-line bg-paper-raised">
              <div className="flex items-start gap-4 border-b border-paper-line p-6">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-deep" strokeWidth={1.5} />
                <div>
                  <p className="font-medium text-ink">{business.address.full}</p>
                  <Button href={business.googleMapsUrl} variant="ghost" external className="mt-1 !p-0 !text-xs text-blue-deep">
                    Route planen →
                  </Button>
                </div>
              </div>
              <div className="flex items-start gap-4 border-b border-paper-line p-6">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-blue-deep" strokeWidth={1.5} />
                <div>
                  <a href={business.phoneHref} className="font-medium text-ink hover:text-blue-deep">
                    {business.phoneDisplay}
                  </a>
                  <p className="mt-1 text-xs text-ink/55">Festnetz — am schnellsten erreichbar.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 border-b border-paper-line p-6">
                <Smartphone className="mt-0.5 h-5 w-5 shrink-0 text-blue-deep" strokeWidth={1.5} />
                <div>
                  <a href={business.mobileHref} className="font-medium text-ink hover:text-blue-deep">
                    {business.mobileDisplay}
                  </a>
                  <p className="mt-1 text-xs text-ink/55">Mobil, für unterwegs.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-blue-deep" strokeWidth={1.5} />
                <table className="w-full text-sm">
                  <tbody>
                    {business.hours.map((h) => (
                      <tr key={h.days}>
                        <td className="py-0.5 pr-4 text-ink/70">{h.days}</td>
                        <td className="py-0.5 font-mono text-ink">{h.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-paper-line">
              <MapEmbed
                lat={business.geo.lat}
                lng={business.geo.lng}
                title={`Karte: ${business.name}, ${business.address.full}`}
              />
            </div>
          </div>

          <div className="rounded-sm border border-paper-line bg-paper-raised p-7 md:p-9">
            <h3 className="font-display text-xl font-bold text-ink">Kurze Anfrage</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              Beschreiben Sie kurz Ihr Anliegen — wir melden uns zeitnah zurück.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
