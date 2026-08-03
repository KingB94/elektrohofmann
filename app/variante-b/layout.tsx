import type { Metadata } from "next";
import HeaderB from "@/components/variants/b/HeaderB";
import FooterB from "@/components/variants/b/FooterB";
import VariantSwitcher from "@/components/variants/VariantSwitcher";

// Entwurf, noch nicht die öffentliche Seite — deshalb ausdrücklich
// nicht für Suchmaschinen freigegeben.
export const metadata: Metadata = {
  title: "Entwurf B – Hell & Premium",
  robots: { index: false, follow: false },
};

export default function VarianteBLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col bg-void text-paper">
      <HeaderB />
      <main className="flex-1">{children}</main>
      <FooterB />
      <VariantSwitcher current="b" />
    </div>
  );
}
