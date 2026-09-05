import type { Metadata } from "next";
import { getBetrieb } from "@/lib/inhalte";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false, follow: true },
};

// ---------------------------------------------------------------
// WICHTIG: Diese Datenschutzerklärung ist eine strukturelle
// Vorlage. Bitte vor dem Live-Schalten von einem Anwalt oder
// Datenschutzbeauftragten prüfen lassen. Sie beschreibt den
// aktuellen technischen Stand dieser Website (kein Cookie-Banner
// nötig, da aktuell keine Analyse- oder Tracking-Tools eingebunden
// sind).
//
// Offene Punkte, die eine Entscheidung des Betriebs brauchen —
// bewusst hier als Kommentar und nicht als sichtbarer Text auf der
// Seite. Siehe auch LAUNCH.md, „Vor dem Switch":
//
//   1. Zwei Auftragsverarbeitungsverträge. Cloudflare (Hosting,
//      Abschnitt 2) und Resend (E-Mail-Versand des Kontaktformulars,
//      Abschnitt 5) stellen beide einen bereit; beide müssen
//      angenommen und aufbewahrt werden.
//   2. Werden später Analyse- oder Marketing-Werkzeuge eingebunden,
//      ist Abschnitt 6 anzupassen und in aller Regel ein
//      Einwilligungsbanner nötig.
//   3. Abschnitt „Verbraucherschlichtung" im Impressum: Die Aussage,
//      nicht an Streitbeilegungsverfahren teilzunehmen, ist die
//      übliche, aber sie sollte bestätigt werden.
// ---------------------------------------------------------------

export default async function DatenschutzPage() {
  const business = await getBetrieb();

  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">
      <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-blue">
        Rechtliches
      </span>
      <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-carbon">
        Datenschutzerklärung
      </h1>

      <div className="mt-10 max-w-none space-y-8 text-[0.98rem] leading-relaxed text-carbon/80">
        <section>
          <h2 className="font-display text-lg font-bold text-carbon">1. Verantwortlicher</h2>
          <p className="mt-2">
            {business.owner}
            <br />
            {business.name} — {business.legalSuffix}
            <br />
            {business.address.street}, {business.address.zip} {business.address.city}
            <br />
            Telefon: {business.phoneDisplay} · E-Mail: {business.email}
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-carbon">2. Hosting</h2>
          <p className="mt-2">
            Diese Website wird bei Cloudflare gehostet (Cloudflare, Inc., 101 Townsend St.,
            San Francisco, CA 94107, USA). Die Auslieferung erfolgt über das weltweite
            Servernetz des Anbieters, in aller Regel aus einem Rechenzentrum in Ihrer Nähe.
            Dabei werden technisch bedingt Server-Logdaten verarbeitet — etwa IP-Adresse,
            Datum und Uhrzeit des Zugriffs, aufgerufene Seite und Browsertyp —, um die
            Website sicher und stabil auszuliefern. Rechtsgrundlage ist unser berechtigtes
            Interesse am sicheren Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO). Da der
            Anbieter seinen Sitz in den USA hat, kann dabei eine Übermittlung
            personenbezogener Daten in ein Drittland stattfinden.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-carbon">3. Schriftarten</h2>
          <p className="mt-2">
            Alle Schriftarten sind lokal auf dem Server dieser Website eingebunden
            (Self-Hosting). Es findet keine Verbindung zu Google Fonts oder anderen
            externen Schriftarten-Diensten statt — Ihre IP-Adresse wird beim Laden der
            Website also nicht an Dritte zu diesem Zweck übermittelt.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-carbon">4. Google Maps (Kartenausschnitt)</h2>
          <p className="mt-2">
            Im Kontaktbereich bieten wir die Möglichkeit, einen Kartenausschnitt von Google
            Maps zu laden, um die Anfahrt zu unserem Betrieb zu erleichtern. Die Karte wird
            erst geladen, nachdem Sie aktiv auf „Karte laden&rdquo; geklickt haben. Erst dann
            wird eine Verbindung zu Servern der Google Ireland Limited (bzw. Google LLC)
            hergestellt und Ihre IP-Adresse an Google übermittelt. Näheres entnehmen Sie der
            Datenschutzerklärung von Google:{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue underline"
            >
              policies.google.com/privacy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-carbon">5. Kontaktformular</h2>
          <p className="mt-2">
            Wenn Sie unser Kontaktformular abschicken, werden die von Ihnen eingegebenen
            Angaben — Name, Ihre Kontaktmöglichkeit und Ihre Nachricht — an unseren Server
            übertragen und uns unmittelbar per E-Mail zugestellt. Für den Versand dieser
            E-Mail nutzen wir den Dienst Resend (Resend, Inc., 2261 Market Street, San
            Francisco, CA 94114, USA), der dabei als Auftragsverarbeiter für uns handelt;
            auch hier kann eine Übermittlung in ein Drittland stattfinden. Eine dauerhafte
            Speicherung Ihrer Angaben auf der Website findet nicht statt — sie liegen
            danach nur noch in unserem E-Mail-Postfach. Wir verwenden Ihre Angaben
            ausschließlich, um Ihre Anfrage zu bearbeiten und zu beantworten.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage der
            Anbahnung oder Durchführung eines Vertrages dient, sonst unser berechtigtes
            Interesse an der Beantwortung von Anfragen (Art. 6 Abs. 1 lit. f DSGVO). Zum
            Schutz vor automatisierten Zusendungen enthält das Formular ein für Sie
            unsichtbares Feld, das von Menschen nicht ausgefüllt wird.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-carbon">6. Cookies &amp; Tracking</h2>
          <p className="mt-2">
            Diese Website verwendet aktuell keine Analyse-, Marketing- oder Tracking-Cookies
            und keine vergleichbaren Dienste (z. B. Google Analytics). Es werden nur
            technisch notwendige Funktionen des Browsers genutzt. Ein Einwilligungsbanner
            ist deshalb nicht erforderlich.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-carbon">7. Ihre Rechte</h2>
          <p className="mt-2">
            Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung oder
            Einschränkung der Verarbeitung Ihrer personenbezogenen Daten sowie ein Recht auf
            Datenübertragbarkeit und Widerspruch. Wenden Sie sich hierzu an die oben genannte
            Kontaktadresse. Ihnen steht zudem ein Beschwerderecht bei der zuständigen
            Datenschutzaufsichtsbehörde zu, z. B. dem Bayerischen Landesamt für
            Datenschutzaufsicht (BayLDA).
          </p>
        </section>
      </div>
    </div>
  );
}
