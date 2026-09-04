// ---------------------------------------------------------------
// ACHTUNG: Diese Datei versorgt nur noch die archivierten Entwürfe
// A (/variante-a) und C (/variante-c).
//
// Die öffentliche Website liegt unter "/" und bezieht ihre Inhalte
// aus dem Redaktionssystem — siehe /content und lib/inhalte.ts.
// Änderungen hier wirken sich NICHT auf die Live-Seite aus.
// ---------------------------------------------------------------

// ---------------------------------------------------------------
// Alle Inhalte der Entwürfe A und C an einem Ort.
// Ändern Sie Texte, Zahlen und Öffnungszeiten einfach hier —
// der Rest der Seite aktualisiert sich automatisch.
//
// Die meisten Angaben stammen aus der alten, archivierten Website
// des Betriebs (elektrohofmann.info) sowie aus Branchenverzeichnissen.
// WICHTIG: Bitte vor dem Live-Schalten insbesondere die mit
// "// TODO" markierten Werte prüfen — vieles kann sich seit der
// letzten Aktualisierung der alten Seite geändert haben (u. a.
// Teamgröße, Öffnungszeiten).
// ---------------------------------------------------------------

export const business = {
  name: "Elektro Hofmann",
  legalSuffix: "Elektrotechnik – Meisterbetrieb",
  claim: "Elektrotechnik mit Energie",
  phoneDisplay: "08681 478397",
  phoneHref: "tel:+498681478397",
  mobileDisplay: "0170 3550919",
  mobileHref: "tel:+491703550919",
  faxDisplay: "08681 478398",
  email: "info@hofmann-wonneberg.de",
  address: {
    street: "Greinachtal 7",
    zip: "83379",
    city: "Wonneberg",
    full: "Greinachtal 7, 83379 Wonneberg",
  },
  geo: {
    lat: 47.8994536,
    lng: 12.7325377,
  },
  owner: "Florian Hofmann",
  ownerRole: "Inhaber & Elektromeister",
  legalForm: "Einzelunternehmen",
  vatId: "DE244185087",
  profession:
    "Elektrotechnikermeister für Energie- und Gebäudetechnik",
  chamber: "Handwerkskammer für München und Oberbayern",
  founded: "15. August 2005",
  // TODO: Bitte tatsächliche Öffnungszeiten bestätigen/anpassen.
  hours: [
    { days: "Montag – Freitag", time: "08:00 – 18:00 Uhr" },
    { days: "Samstag / Sonntag", time: "geschlossen" },
  ],
  // TODO: Aktuelle Bewertungsanzahl bei Google prüfen und anpassen.
  rating: {
    value: 5.0,
    countLabel: "4",
  },
  googleMapsUrl:
    "https://www.google.com/maps/place/Florian+Hofmann/@47.8994536,12.7325377,17z",
} as const;

// Jahreszahlen werden gerechnet statt fest eingetragen, damit die
// Seite nicht mit jedem Jahreswechsel veraltet.
export const yearsInBusiness = (() => {
  const start = new Date("2005-08-15");
  const now = new Date();
  const anniversaryPassed =
    now.getMonth() > start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() >= start.getDate());
  return now.getFullYear() - start.getFullYear() - (anniversaryPassed ? 0 : 1);
})();

export const yearsInTrade = new Date().getFullYear() - 1991;

export const timeline = [
  { year: "1991", label: "Ausbildung zum Elektroinstallateur bei Elektro Rehrl in Lauter" },
  { year: "2004", label: "Meisterprüfung für Energie- und Gebäudetechnik" },
  { year: "2005", label: "Gründung der Firma Elektro Hofmann" },
  { year: "2012", label: "Neubau von Betriebsgelände und Büro in Greinachtal" },
  { year: "heute", label: "Familienbetrieb mit eingespieltem Team im Chiemgau" },
];

export type Service = {
  title: string;
  description: string;
  icon: "install" | "solar" | "check" | "repair" | "media" | "led";
};

export const services: Service[] = [
  {
    title: "Elektroinstallation",
    description:
      "Neubau, Sanierung und Erweiterung — von der Garage über das Mehrfamilienhaus bis zum Gewerbebau. Kein Auftrag ist uns zu klein.",
    icon: "install",
  },
  {
    title: "Photovoltaik & Solartechnik",
    description:
      "Planung und Montage moderner PV-Anlagen. Die Arbeiten am Dach übernehmen wir mit dem eigenen Teleskoplader — bis 10 Meter Hubhöhe, ohne fremde Hebebühne.",
    icon: "solar",
  },
  {
    title: "VDE-Prüfungen & E-Check",
    description:
      "E-Check mit Besichtigung, nötigen Reparaturen und Anlagenprüfung samt Protokoll. Geräteprüfungen nach VDE 0701/0702 und DGUV Vorschrift 3 — auf Wunsch mit Erinnerung an fällige Fristen.",
    icon: "check",
  },
  {
    title: "Geräteverkauf & Reparatur",
    description:
      "Markengeräte aus dem Elektrogroßhandel, geliefert und auf Wunsch aufgestellt. Reparatur vom Kleingerät bis zur Waschmaschine in der eigenen Werkstatt — zum normalen Stundenlohn, nicht zum Kundendiensttarif.",
    icon: "repair",
  },
  {
    title: "TV-, SAT- & Telefonanlagen",
    description:
      "Sat- und Kabelanlagen von Kathrein, Fuba und Hirschmann, exakt eingemessen — vom Einfamilienhaus bis zu 50 Teilnehmern. Dazu Telefonanlagen von Agfeo und Auerswald.",
    icon: "media",
  },
  {
    title: "LED- & Beleuchtungstechnik",
    description:
      "Umrüstung alter Beleuchtung auf LED. In einer Montagehalle ersetzt heute eine 57-Watt-Leuchte die alte Wannenleuchte mit 2 × 58 Watt — mehr Licht am Boden bei halber Leistung.",
    icon: "led",
  },
];
