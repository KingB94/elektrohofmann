import HeroB from "@/components/variants/b/HeroB";
import PillarsB from "@/components/variants/b/PillarsB";
import ServicesB from "@/components/variants/b/ServicesB";
import ProtocolB from "@/components/variants/b/ProtocolB";
import StimmenB from "@/components/variants/b/StimmenB";
import BetriebB from "@/components/variants/b/BetriebB";
import ContactB from "@/components/variants/b/ContactB";
import {
  getBetrieb,
  getHero,
  getZahlen,
  getLeistungen,
  getAblauf,
  getStimmen,
  getUeberUns,
  getKontakt,
} from "@/lib/inhalte";

// Die Startseite. Sämtliche Texte und Bilder kommen aus dem
// Redaktionssystem unter /keystatic — hier wird nur verteilt.
export default async function Startseite() {
  const [betrieb, hero, zahlen, leistungen, ablauf, stimmen, ueberUns, kontakt] =
    await Promise.all([
      getBetrieb(),
      getHero(),
      getZahlen(),
      getLeistungen(),
      getAblauf(),
      getStimmen(),
      getUeberUns(),
      getKontakt(),
    ]);

  return (
    <>
      <HeroB betrieb={betrieb} hero={hero} />
      <PillarsB zahlen={zahlen} />
      <ServicesB leistungen={leistungen} />
      <ProtocolB ablauf={ablauf} />
      <StimmenB betrieb={betrieb} stimmen={stimmen} />
      <BetriebB betrieb={betrieb} ueberUns={ueberUns} />
      <ContactB betrieb={betrieb} kontakt={kontakt} />
    </>
  );
}
