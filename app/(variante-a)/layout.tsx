import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VariantSwitcher from "@/components/variants/VariantSwitcher";

// Rahmen (Kopf- und Fußzeile) für Variante A — die aktuelle Version.
// Die Alternativentwürfe unter /variante-b und /variante-c bringen ihren
// eigenen Rahmen mit und liegen deshalb außerhalb dieser Gruppe.
export default function VarianteALayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* Nur für die Abstimmung mit dem Kunden — vor dem Live-Schalten
          diese Zeile löschen (siehe README). */}
      <VariantSwitcher current="a" />
    </div>
  );
}
