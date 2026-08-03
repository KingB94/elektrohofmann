// ---------------------------------------------------------------
// Alle Inhalte der Website an einem Ort.
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
  email: "hofmanngreinach@t-online.de",
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
  { year: "1991", label: "Beginn der Ausbildung zum Elektroinstallateur" },
  { year: "2004", label: "Abschluss zum Elektromeister für Energie- und Gebäudetechnik" },
  { year: "2005", label: "Gründung der Firma Elektro Hofmann" },
  { year: "2012", label: "Neubau des Betriebsgeländes in Wonneberg-Greinachtal" },
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
      "Neubau, Sanierung und Erweiterung — vom Garagenanschluss bis zum Gewerbebau, kein Auftrag ist uns zu klein.",
    icon: "install",
  },
  {
    title: "Photovoltaik & Solartechnik",
    description:
      "Planung und Montage moderner PV-Anlagen, inklusive Dacharbeiten mit eigenem Teleskoplader.",
    icon: "solar",
  },
  {
    title: "VDE-Prüfungen & E-Check",
    description:
      "Sicherheitsprüfungen nach VDE 0701/0702 und BGV A3 inklusive Protokollierung und Fristenkontrolle.",
    icon: "check",
  },
  {
    title: "Geräteverkauf & Reparatur",
    description:
      "Haushaltsgeräte namhafter Marken sowie Reparatur vom Kleingerät bis zur Waschmaschine in eigener Werkstatt.",
    icon: "repair",
  },
  {
    title: "TV-, SAT- & Telefonanlagen",
    description:
      "Installation und Einmessung von Sat- und Kabelanlagen sowie Telefonanlagen von Agfeo und Auerswald.",
    icon: "media",
  },
  {
    title: "LED- & Beleuchtungstechnik",
    description:
      "Umrüstung auf energiesparende LED-Technik für Zuhause, Betrieb und Gewerbehalle.",
    icon: "led",
  },
];
