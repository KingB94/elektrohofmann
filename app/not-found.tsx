import { business } from "@/data/business";
import EnergyArrow from "@/components/EnergyArrow";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-night px-5 text-center text-paper">
      <EnergyArrow className="pointer-events-none absolute left-1/2 top-1/2 w-[60%] max-w-[420px] -translate-x-1/2 -translate-y-1/2 opacity-[0.08]" />
      <div className="relative">
        <span className="plate-badge text-blue">404</span>
        <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Hier ist die Leitung unterbrochen.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-paper/70">
          Die gesuchte Seite gibt es nicht (mehr). Zurück zur Startseite von {business.name}
          oder rufen Sie uns direkt an.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/">Zur Startseite</Button>
          <Button href={business.phoneHref} variant="outline">
            {business.phoneDisplay}
          </Button>
        </div>
      </div>
    </div>
  );
}
