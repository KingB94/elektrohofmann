import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VariantSwitcher from "@/components/variants/VariantSwitcher";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entwurf A – Hell & Sachlich",
  robots: { index: false, follow: false },
};

// Rahmen für den archivierten Entwurf A. Nicht die öffentliche
// Seite — die liegt unter "/" und nutzt Entwurf B.
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
      <VariantSwitcher current="a" />
    </div>
  );
}
