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
//   1. Auftragsverarbeitungsvertrag mit Cloudflare (Hosting,
//      Abschnitt 2) annehmen und aufbewahren. Für das Kontaktformular
//      wird keiner gebraucht: Es überträgt nichts an uns, sondern
//      öffnet nur das E-Mail-Programm des Besuchers (Abschnitt 5).
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
            Das Kontaktformular auf dieser Website überträgt Ihre Eingaben <strong>nicht</strong>
            an uns. Wenn Sie auf &bdquo;Anfrage senden&ldquo; klicken, öffnet Ihr Browser lediglich Ihr
            eigenes E-Mail-Programm mit einer vorausgefüllten Nachricht. Ob und wann Sie
            diese absenden, entscheiden Sie. Bis dahin bleiben Ihre Angaben ausschließlich
            auf Ihrem Gerät — es findet keine Übertragung an unseren Server und keine
            Verarbeitung durch Dritte statt.
          </p>
          <p className="mt-2">
            Senden Sie die E-Mail ab, erhalten wir sie wie jede andere Nachricht in unserem
            Postfach. Wir verwenden Ihre Angaben ausschließlich, um Ihre Anfrage zu
            bearbeiten und zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO,
            soweit Ihre Anfrage der Anbahnung oder Durchführung eines Vertrages dient,
            sonst unser berechtigtes Interesse an der Beantwortung von Anfragen
            (Art. 6 Abs. 1 lit. f DSGVO).
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
