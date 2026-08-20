import HeaderB from "@/components/variants/b/HeaderB";
import FooterB from "@/components/variants/b/FooterB";
import { getBetrieb } from "@/lib/inhalte";

// Rahmen der öffentlichen Website (Gestaltungsentwurf B).
// Bewusst ohne Entwurfs-Umschalter — der gehört nur auf die
// Vergleichsseite unter /designs und die Entwürfe A und C.
export default async function LiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const betrieb = await getBetrieb();

  return (
    <div className="flex min-h-full flex-col bg-frost text-carbon">
      <HeaderB betrieb={betrieb} />
      <main className="flex-1">{children}</main>
      <FooterB betrieb={betrieb} />
    </div>
  );
}
