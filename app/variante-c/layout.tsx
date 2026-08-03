import type { Metadata } from "next";
import HeaderC from "@/components/variants/c/HeaderC";
import FooterC from "@/components/variants/c/FooterC";
import VariantSwitcher from "@/components/variants/VariantSwitcher";

// Entwurf, noch nicht die öffentliche Seite — deshalb ausdrücklich
// nicht für Suchmaschinen freigegeben.
export const metadata: Metadata = {
  title: "Entwurf C – Warm & Handwerklich",
  robots: { index: false, follow: false },
};

export default function VarianteCLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col bg-bone text-soot">
      <HeaderC />
      <main className="flex-1">{children}</main>
      <FooterC />
      <VariantSwitcher current="c" />
    </div>
  );
}
