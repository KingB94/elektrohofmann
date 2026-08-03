import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
import { business } from "@/data/business";
import StarRating from "@/components/StarRating";
import EnergyArrow from "@/components/EnergyArrow";
import Button from "@/components/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-night text-paper">
      <EnergyArrow className="arrow-reveal pointer-events-none absolute -right-[10%] top-[10%] w-[65%] max-w-[560px] opacity-[0.10] md:-right-[2%] md:w-[42%]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-12 md:grid-cols-[1.1fr_0.9fr] md:gap-8 md:px-8 md:pb-24 md:pt-16">
        <div className="flex flex-col justify-center">
          <span className="plate-badge w-fit text-blue">
            Elektro · Meisterbetrieb · Hofmann
          </span>

          <h1 className="mt-6 font-display text-[2.5rem] font-extrabold leading-[1.08] tracking-tight text-paper sm:text-5xl">
            {business.claim}
            <span className="text-blue">.</span>
          </h1>

          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-paper/75">
            Elektroinstallation, Photovoltaik, Gerätereparatur und mehr — als
            Meisterbetrieb aus {business.address.city} sind wir Ihr
            zuverlässiger Ansprechpartner für alle Elektrofragen im Chiemgau.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href={business.phoneHref} icon={<Phone size={14} />}>
              {business.phoneDisplay}
            </Button>
            <Button href={business.googleMapsUrl} variant="outline" external icon={<MapPin size={14} />}>
              Route planen
            </Button>
          </div>

          <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-night-line pt-6">
            <div className="flex items-center gap-2.5">
              <StarRating value={business.rating.value} />
              <span className="font-mono text-xs text-paper/70">
                {business.rating.value.toFixed(1)} auf Google
              </span>
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.1em] text-paper/50">
              Meisterbetrieb seit 2005
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-3 -z-10 rounded-sm border border-blue/40" />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
              <Image
                src="/images/betriebsgelaende-luftbild.jpg"
                alt="Luftbild des Betriebsgeländes von Elektro Hofmann in Wonneberg-Greinachtal"
                fill
                sizes="(max-width: 768px) 90vw, 420px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-sm bg-night-raised px-4 py-3 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-blue shadow-lg">
              Unser Betriebsgelände
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
