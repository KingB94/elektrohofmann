import HeroB from "@/components/variants/b/HeroB";
import PillarsB from "@/components/variants/b/PillarsB";
import ServicesB from "@/components/variants/b/ServicesB";
import ProtocolB from "@/components/variants/b/ProtocolB";
import BetriebB from "@/components/variants/b/BetriebB";
import ContactB from "@/components/variants/b/ContactB";
import {
  getBetrieb,
  getHero,
  getZahlen,
  getLeistungen,
  getAblauf,
  getUeberUns,
  getKontakt,
} from "@/lib/inhalte";

// Die Startseite. Sämtliche Texte und Bilder kommen aus dem
// Redaktionssystem unter /keystatic — hier wird nur verteilt.
export default async function Startseite() {
  const [betrieb, hero, zahlen, leistungen, ablauf, ueberUns, kontakt] =
    await Promise.all([
      getBetrieb(),
      getHero(),
      getZahlen(),
      getLeistungen(),
      getAblauf(),
      getUeberUns(),
      getKontakt(),
    ]);

  return (
    <>
      <HeroB betrieb={betrieb} hero={hero} />
      <PillarsB zahlen={zahlen} />
      <ServicesB leistungen={leistungen} />
      <ProtocolB ablauf={ablauf} />
      <BetriebB betrieb={betrieb} ueberUns={ueberUns} />
      <ContactB betrieb={betrieb} kontakt={kontakt} />
    </>
  );
}
