import type { Metadata } from "next";
import { getBetrieb } from "@/lib/inhalte";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false, follow: true },
};

// ---------------------------------------------------------------
// Erstellt am 05.09.2026 mit dem Generator der activeMind AG, danach
// um die Punkte ergänzt, nach denen der Generator nicht fragt:
// Hoster, Kartendarstellung, Schriftarten, Bauart des Formulars.
//
// WICHTIG: Vor dem endgültigen Freigeben anwaltlich prüfen lassen.
//
// Offene Punkte, die eine Entscheidung oder Bestätigung brauchen —
// bewusst hier als Kommentar und nicht als sichtbarer Text:
//
//   1. Auftragsverarbeitungsvertrag mit Cloudflare annehmen und
//      aufbewahren (Abschnitt 3). Für das Kontaktformular wird
//      keiner gebraucht: Es überträgt nichts an uns.
//   2. ⚠️ Der Drittlandbezug in Abschnitt 4 beruht auf einer
//      Messung der DNS-Einträge von hofmann-wonneberg.de: Der
//      SPF-Eintrag enthält include:spf.protection.outlook.com, die
//      Postfächer laufen also über Microsoft 365. Die Domain wird
//      nicht von uns verwaltet. Vom Mail-Administrator bestätigen
//      lassen, bevor man sich darauf verlässt.
//   3. Der Generator behauptet bei telefonischer Kontaktaufnahme
//      Protokolldaten samt Gesprächsdauer. Das ist hier gestrichen,
//      weil keine Telefonanlage im Einsatz ist, die das mitschreibt.
//      Ändert sich das, gehört der Satz zurück.
//   4. Werden später Analyse- oder Marketing-Werkzeuge eingebunden,
//      ist Abschnitt 7 anzupassen und ein Einwilligungsbanner nötig.
// ---------------------------------------------------------------

const H2 = "font-display text-lg font-bold text-carbon";
const H3 = "mt-6 font-display text-[0.95rem] font-bold text-carbon";

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
          <h2 className={H2}>1. Verantwortlicher</h2>
          <p className="mt-2">
            Verantwortlicher im Sinne der Datenschutzgesetze, insbesondere der
            EU-Datenschutz-Grundverordnung (DSGVO), ist:
          </p>
          <p className="mt-2">
            {business.name}
            <br />
            Inhaber: {business.owner}
            <br />
            {business.address.street}
            <br />
            {business.address.zip} {business.address.city}
            <br />
            Deutschland
          </p>
          <p className="mt-2">
            Telefon: {business.phoneDisplay}
            <br />
            E-Mail: {business.email}
          </p>
        </section>

        <section>
          <h2 className={H2}>2. Ihre Betroffenenrechte</h2>
          <p className="mt-2">
            Unter den angegebenen Kontaktdaten können Sie gemäß DSGVO jederzeit folgende
            Rechte ausüben:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung (Art. 15 DSGVO),</li>
            <li>Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO),</li>
            <li>Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO),</li>
            <li>
              Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund
              gesetzlicher Pflichten noch nicht löschen dürfen (Art. 18 DSGVO),
            </li>
            <li>Widerspruch gegen die Verarbeitung Ihrer Daten bei uns (Art. 21 DSGVO) und</li>
            <li>
              Datenübertragbarkeit, sofern Sie in die Datenverarbeitung eingewilligt haben
              oder einen Vertrag mit uns abgeschlossen haben (Art. 20 DSGVO).
            </li>
          </ul>
          <p className="mt-2">
            Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese jederzeit mit
            Wirkung für die Zukunft widerrufen.
          </p>
          <p className="mt-2">
            Sie können sich jederzeit mit einer Beschwerde an eine Aufsichtsbehörde wenden,
            etwa an die zuständige Behörde des Bundeslands Ihres Wohnsitzes oder an die für
            uns zuständige Stelle. Für uns zuständig ist das Bayerische Landesamt für
            Datenschutzaufsicht, Promenade 27, 91522 Ansbach. Eine Liste aller
            Aufsichtsbehörden mit Anschrift finden Sie unter{" "}
            <a
              href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue underline"
            >
              bfdi.bund.de
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className={H2}>3. Erfassung allgemeiner Informationen beim Besuch dieser Website</h2>

          <h3 className={H3}>Art und Zweck der Verarbeitung</h3>
          <p className="mt-2">
            Wenn Sie auf unsere Website zugreifen, werden automatisch Informationen
            allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa
            die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres
            Internet-Service-Providers, Ihre IP-Adresse und Ähnliches.
          </p>
          <p className="mt-2">Sie werden insbesondere zu folgenden Zwecken verarbeitet:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Sicherstellung eines problemlosen Verbindungsaufbaus der Website</li>
            <li>Sicherstellung einer reibungslosen Nutzung der Website</li>
            <li>
              Sicherstellung und Auswertung der Systemsicherheit und -stabilität,
              insbesondere zur Missbrauchserkennung
            </li>
            <li>zur technisch fehlerfreien Darstellung und Optimierung der Website</li>
          </ul>
          <p className="mt-2">
            Wir verwenden Ihre Daten nicht, um Rückschlüsse auf Ihre Person zu ziehen.
            Allerdings behalten wir uns vor, die Server-Logfiles nachträglich zu überprüfen,
            sollten konkrete Anhaltspunkte auf eine rechtswidrige Nutzung hinweisen.
          </p>

          <h3 className={H3}>Rechtsgrundlage und berechtigtes Interesse</h3>
          <p className="mt-2">
            Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres
            berechtigten Interesses an der Stabilität und Funktionalität unserer Website
            sowie der Sicherstellung der Systemsicherheit und Missbrauchserkennung.
          </p>

          <h3 className={H3}>Empfänger: unser Hoster</h3>
          <p className="mt-2">
            Diese Website wird bei der Cloudflare, Inc., 101 Townsend Street, San Francisco,
            CA 94107, USA gehostet. Die Auslieferung erfolgt über das weltweite Servernetz
            des Anbieters, in aller Regel aus einem Rechenzentrum in Ihrer Nähe. Cloudflare
            wird für uns als Auftragsverarbeiter nach Art. 28 DSGVO tätig.
          </p>

          <h3 className={H3}>Speicherdauer</h3>
          <p className="mt-2">
            Daten werden in Server-Logdateien in einer Form, die die Identifizierung der
            betroffenen Personen ermöglicht, maximal für drei Tage gespeichert, es sei denn,
            dass ein sicherheitsrelevantes Ereignis auftritt, etwa ein Überlastungsangriff.
            In einem solchen Fall werden die Logdateien bis zur Beseitigung und
            vollständigen Aufklärung des Ereignisses gespeichert.
          </p>

          <h3 className={H3}>Drittlandtransfer</h3>
          <p className="mt-2">
            Da der Anbieter seinen Sitz in den USA hat, kann eine Übermittlung
            personenbezogener Daten in die <strong>USA</strong> stattfinden. Die Übermittlung
            stützt sich auf den Angemessenheitsbeschluss der Europäischen Kommission vom
            10. Juli 2023 zum EU-US Data Privacy Framework, dem sich der Anbieter unterworfen
            hat. Ergänzend hat der Anbieter EU-Standardvertragsklauseln nach Art. 46 Abs. 2
            lit. c DSGVO abgeschlossen, die eingreifen, sollte die Zertifizierung entfallen.
          </p>

          <h3 className={H3}>Bereitstellung vorgeschrieben oder erforderlich</h3>
          <p className="mt-2">
            Die Bereitstellung der vorgenannten personenbezogenen Daten ist weder gesetzlich
            noch vertraglich vorgeschrieben. Ohne die IP-Adresse ist jedoch die
            Funktionsfähigkeit unserer Website nicht gewährleistet.
          </p>
        </section>

        <section>
          <h2 className={H2}>4. Kontaktaufnahme</h2>

          <h3 className={H3}>Art und Zweck der Verarbeitung</h3>
          <p className="mt-2">
            Eine Kontaktaufnahme ist über die bereitgestellten E-Mail-Adressen möglich. In
            diesem Fall werden die mit der E-Mail übermittelten personenbezogenen Daten
            gespeichert. Hierzu zählen Datum und Uhrzeit des E-Mail-Versands, die
            E-Mail-Adresse, IP-Adressen sowie Informationen zu den an der Kommunikation
            beteiligten Servern.
          </p>
          <p className="mt-2">
            Ebenso können Sie über die bereitgestellten Telefonnummern Kontakt zu uns
            aufnehmen. Unabhängig von der gewählten Kommunikationsart erheben wir den Inhalt
            Ihrer Anfrage. Ihre Daten werden zum Zweck der individuellen Kommunikation mit
            Ihnen gespeichert.
          </p>

          <h3 className={H3}>Das Anfrageformular überträgt keine Daten an uns</h3>
          <p className="mt-2">
            Das Formular im Kontaktbereich ist kein Kontaktformular im technischen Sinne. Es
            überträgt Ihre Eingaben <strong>nicht</strong> an unseren Server. Klicken Sie auf
            &bdquo;Anfrage senden&ldquo;, öffnet Ihr Browser lediglich Ihr eigenes
            E-Mail-Programm mit einer vorausgefüllten Nachricht. Ob und wann Sie diese
            absenden, entscheiden Sie. Bis dahin bleiben Ihre Angaben ausschließlich auf
            Ihrem Gerät. Es gelten die Bedingungen Ihres E-Mail-Anbieters.
          </p>

          <h3 className={H3}>Rechtsgrundlage</h3>
          <p className="mt-2">
            Die Verarbeitung der Daten erfolgt auf der Grundlage eines berechtigten
            Interesses (Art. 6 Abs. 1 lit. f DSGVO). Unser berechtigtes Interesse ist die
            Ermöglichung einer unkomplizierten Kontaktaufnahme. Sofern Sie mit uns Kontakt
            aufnehmen, um ein Angebot zu erfragen, erfolgt die Verarbeitung zur Durchführung
            vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO).
          </p>

          <h3 className={H3}>Speicherdauer</h3>
          <p className="mt-2">
            Daten werden spätestens sechs Monate nach Bearbeitung der Kontaktaufnahme
            gelöscht. Sofern es zu einem Vertragsverhältnis kommt, unterliegen wir den
            gesetzlichen Aufbewahrungsfristen. Diese betragen grundsätzlich sechs oder zehn
            Jahre aus Gründen der ordnungsmäßigen Buchführung und steuerrechtlichen
            Anforderungen.
          </p>

          <h3 className={H3}>Drittlandtransfer</h3>
          <p className="mt-2">
            Unser E-Mail-Postfach wird bei einem Dienstleister betrieben, dessen
            Mutterunternehmen seinen Sitz in den <strong>USA</strong> hat. Bei der
            Bearbeitung von E-Mail-Anfragen kann daher eine Übermittlung dorthin
            stattfinden. Die Übermittlung stützt sich auf den Angemessenheitsbeschluss der
            Europäischen Kommission zum EU-US Data Privacy Framework.
          </p>

          <h3 className={H3}>Bereitstellung vorgeschrieben oder erforderlich</h3>
          <p className="mt-2">
            Die Bereitstellung Ihrer personenbezogenen Daten erfolgt freiwillig. Wir können
            Ihre Anfrage jedoch nur bearbeiten, sofern Sie uns die erforderlichen Daten und
            den Grund der Anfrage mitteilen.
          </p>
        </section>

        <section>
          <h2 className={H2}>5. Kartendarstellung (Google Maps)</h2>
          <p className="mt-2">
            Im Kontaktbereich bieten wir die Möglichkeit, einen Kartenausschnitt des Dienstes
            Google Maps zu laden (Google Ireland Limited, Gordon House, Barrow Street,
            Dublin 4, Irland). Die Karte wird <strong>nicht automatisch geladen</strong>.
            Erst wenn Sie die Schaltfläche &bdquo;Karte laden&ldquo; anklicken, wird eine
            Verbindung zu Servern von Google hergestellt und Ihre IP-Adresse an Google
            übertragen; dabei kann eine Übermittlung in die USA erfolgen.
          </p>
          <p className="mt-2">
            Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO, die Sie
            mit dem Klick erteilen und jederzeit für die Zukunft widerrufen können, indem Sie
            die Karte nicht mehr laden. Ohne diesen Klick werden keine Daten an Google
            übertragen. Näheres unter{" "}
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
          <h2 className={H2}>6. Schriftarten</h2>
          <p className="mt-2">
            Alle Schriftarten werden vom Server dieser Website ausgeliefert. Eine Verbindung
            zu Google Fonts oder anderen externen Schriftarten-Diensten wird dabei nicht
            hergestellt. Ihre IP-Adresse wird zu diesem Zweck also an niemanden übermittelt.
          </p>
        </section>

        <section>
          <h2 className={H2}>7. Cookies, Reichweitenmessung und Tracking</h2>
          <p className="mt-2">
            Diese Website setzt <strong>keine Cookies</strong>. Sie verwendet weder Analyse-
            noch Marketing- oder Tracking-Werkzeuge und misst auch keine Reichweite. Ein
            Einwilligungsbanner ist deshalb nicht erforderlich.
          </p>
          <p className="mt-2">
            Eine automatisierte Entscheidungsfindung einschließlich Profiling nach Art. 22
            DSGVO findet nicht statt.
          </p>
        </section>

        <section>
          <h2 className={H2}>8. Ihr Widerspruchsrecht nach Art. 21 DSGVO</h2>
          <p className="mt-2">
            Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation
            ergeben, jederzeit gegen die Verarbeitung Sie betreffender personenbezogener
            Daten, die aufgrund Art. 6 Abs. 1 lit. f DSGVO erfolgt, Widerspruch einzulegen.
            Dies gilt auch für ein auf diese Bestimmung gestütztes Profiling im Sinne von
            Art. 4 Nr. 4 DSGVO.
          </p>
          <p className="mt-2">
            Legen Sie Widerspruch ein, werden wir Ihre personenbezogenen Daten nicht mehr
            verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die
            Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen,
            oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von
            Rechtsansprüchen.
          </p>
          <p className="mt-2">
            Empfänger eines Widerspruchs ist der oben unter Abschnitt 1 genannte
            Verantwortliche.
          </p>
        </section>

        <section>
          <h2 className={H2}>9. Änderung dieser Datenschutzerklärung</h2>
          <p className="mt-2">
            Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den
            aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer
            Leistungen umzusetzen, etwa bei der Einführung neuer Services. Für Ihren erneuten
            Besuch gilt dann die neue Datenschutzerklärung.
          </p>
        </section>

        <section>
          <h2 className={H2}>10. Fragen zum Datenschutz</h2>
          <p className="mt-2">
            Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail an{" "}
            {business.email} oder wenden Sie sich an den oben genannten Verantwortlichen.
          </p>
        </section>

        <p className="border-t border-frost-line pt-6 text-xs text-carbon/50">
          Stand: September 2026. Diese Datenschutzerklärung wurde mit Hilfe der activeMind AG
          erstellt, den Experten für externe Datenschutzbeauftragte (Version #2024-10-25).
        </p>
      </div>
    </div>
  );
}
