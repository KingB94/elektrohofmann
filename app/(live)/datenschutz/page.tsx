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
            Diese Website wird bei Vercel Inc. gehostet. Dabei können technisch bedingt
            Server-Logdaten (z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene
            Seite, Browsertyp) verarbeitet werden, um die Website sicher und stabil
            auszuliefern. [Bitte prüfen, ob mit Vercel ein Auftragsverarbeitungsvertrag (DPA)
            abgeschlossen wurde bzw. werden muss, und diesen Abschnitt entsprechend ergänzen.]
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
            Unser Kontaktformular öffnet Ihr eigenes E-Mail-Programm mit einer
            vorausgefüllten Nachricht (sogenannter „mailto&rdquo;-Link). Die eingegebenen
            Daten werden dabei nicht an einen Server dieser Website übertragen, sondern erst
            versendet, wenn Sie die E-Mail in Ihrem E-Mail-Programm tatsächlich abschicken.
            Ihre Angaben verarbeiten wir dann ausschließlich, um Ihre Anfrage zu beantworten.
            [Falls stattdessen ein serverseitiges Formular eingebunden wird, muss dieser
            Abschnitt entsprechend angepasst werden.]
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-carbon">6. Cookies &amp; Tracking</h2>
          <p className="mt-2">
            Diese Website verwendet aktuell keine Analyse-, Marketing- oder Tracking-Cookies
            und keine vergleichbaren Dienste (z. B. Google Analytics). Es werden nur
            technisch notwendige Funktionen des Browsers genutzt. [Bitte ergänzen, falls
            zukünftig Analyse- oder Marketing-Tools eingebunden werden — in diesem Fall ist
            in der Regel ein Cookie-Consent-Banner erforderlich.]
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
