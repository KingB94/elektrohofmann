import type { Metadata } from "next";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: true },
};

// ---------------------------------------------------------------
// WICHTIG: Die Angaben auf dieser Seite (USt-ID, Berufsbezeichnung,
// Kammer) stammen aus einer archivierten, älteren Version der
// eigenen Firmenwebsite (elektrohofmann.info) und wurden nicht
// erneut durch den Betrieb bestätigt. Bitte vor dem Live-Schalten
// prüfen, ob sich seither etwas geändert hat. Dies ist keine
// Rechtsberatung — im Zweifel bitte von einem Steuerberater oder
// Anwalt prüfen lassen.
// ---------------------------------------------------------------

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 md:px-8 md:py-28">
      <span className="plate-badge text-blue-deep">Rechtliches</span>
      <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink">
        Impressum
      </h1>
      <p className="mt-3 text-sm text-ink/55">Angaben gemäß § 5 TMG</p>

      <div className="prose prose-neutral mt-10 max-w-none space-y-8 text-[0.98rem] leading-relaxed text-ink/85">
        <section>
          <h2 className="font-display text-lg font-bold text-ink">Verantwortlich für den Inhalt</h2>
          <p className="mt-2">
            {business.owner}
            <br />
            {business.name} — {business.legalSuffix}
            <br />
            {business.address.street}
            <br />
            {business.address.zip} {business.address.city}
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-ink">Kontakt</h2>
          <p className="mt-2">
            Telefon: {business.phoneDisplay}
            <br />
            Fax: {business.faxDisplay}
            <br />
            E-Mail: {business.email}
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-ink">Rechtsform &amp; Berufsangaben</h2>
          <p className="mt-2">
            Rechtsform: {business.legalForm}
            <br />
            Berufsbezeichnung: {business.profession}
            <br />
            Zuständige Kammer: {business.chamber}
            <br />
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG: {business.vatId}
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-ink">EU-Streitschlichtung</h2>
          <p className="mt-2">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-deep underline"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            . Unsere E-Mail-Adresse finden Sie oben in diesem Impressum. Wir sind nicht verpflichtet
            und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen. [Bitte prüfen und ggf. anpassen.]
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-ink">Haftung für Inhalte</h2>
          <p className="mt-2">
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach
            den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
            jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
            überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
            hinweisen.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-ink">Haftung für Links</h2>
          <p className="mt-2">
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
            Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
            Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
            Seiten verantwortlich.
          </p>
        </section>
      </div>
    </div>
  );
}
