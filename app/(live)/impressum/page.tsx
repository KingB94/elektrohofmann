import type { Metadata } from "next";
import { getBetrieb } from "@/lib/inhalte";

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

export default async function ImpressumPage() {
  const business = await getBetrieb();

  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">
      <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-blue">
        Rechtliches
      </span>
      <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-carbon">
        Impressum
      </h1>
      <p className="mt-3 text-sm text-carbon/55">Angaben gemäß § 5 TMG</p>

      <div className="mt-10 max-w-none space-y-8 text-[0.98rem] leading-relaxed text-carbon/80">
        <section>
          <h2 className="font-display text-lg font-bold text-carbon">Verantwortlich für den Inhalt</h2>
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
          <h2 className="font-display text-lg font-bold text-carbon">Kontakt</h2>
          <p className="mt-2">
            Telefon: {business.phoneDisplay}
            <br />
            Fax: {business.faxDisplay}
            <br />
            E-Mail: {business.email}
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-carbon">Rechtsform &amp; Berufsangaben</h2>
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
          <h2 className="font-display text-lg font-bold text-carbon">EU-Streitschlichtung</h2>
          <p className="mt-2">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue underline"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            . Unsere E-Mail-Adresse finden Sie oben in diesem Impressum. Wir sind nicht verpflichtet
            und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-carbon">Haftung für Inhalte</h2>
          <p className="mt-2">
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach
            den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
            jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
            überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
            hinweisen.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-carbon">Haftung für Links</h2>
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
