import KeystaticApp from "./keystatic";

// Keystatic bringt seine gesamte Oberfläche selbst mit und rendert sie
// anstelle der Seite — deshalb wird hier bewusst kein children verwendet.
export default function KeystaticLayout() {
  return <KeystaticApp />;
}
