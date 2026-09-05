import type { Metadata } from "next";
import KeystaticApp from "./keystatic";

// Das Redaktionssystem gehört nicht in den Suchindex.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Keystatic bringt seine gesamte Oberfläche selbst mit und rendert sie
// anstelle der Seite — deshalb wird hier bewusst kein children verwendet.
export default function KeystaticLayout() {
  return <KeystaticApp />;
}
