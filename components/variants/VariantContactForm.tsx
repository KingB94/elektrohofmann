"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

type Tone = "light" | "warm";

// Das Formular verschickt nichts selbst. Es sammelt die Angaben und
// öffnet damit das E-Mail-Programm des Besuchers, vorausgefüllt.
//
// Bewusst so gewählt: kein Server, kein Dienstleister, keine
// Zugangsdaten, nichts das ausfallen kann. Der Preis steht darunter
// als Hinweis — wer im Browser Webmail nutzt und kein Mailprogramm
// eingerichtet hat, bei dem passiert beim Klick nichts. Deshalb steht
// die Adresse zusätzlich zum Anklicken und Abschreiben darunter.
const tones: Record<
  Tone,
  { label: string; input: string; button: string; hint: string; link: string }
> = {
  light: {
    label: "text-carbon/55",
    input:
      "w-full rounded-sm border border-frost-line bg-frost-base px-4 py-3.5 text-sm text-carbon placeholder:text-carbon/35 transition-colors focus:border-blue focus:outline-none",
    button:
      "mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-blue px-7 py-4 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-white transition-transform duration-200 hover:scale-[1.02]",
    hint: "text-carbon/45",
    link: "text-blue underline underline-offset-2",
  },
  warm: {
    label: "text-soot/55",
    input:
      "w-full border-b border-bone-line bg-transparent px-0 py-3 text-base text-soot placeholder:text-soot/30 transition-colors focus:border-copper focus:outline-none",
    button:
      "mt-4 inline-flex items-center justify-center gap-2 rounded-sm bg-soot px-7 py-4 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-bone transition-colors hover:bg-copper",
    hint: "text-soot/50",
    link: "text-copper underline underline-offset-2",
  },
};

export default function VariantContactForm({
  tone = "light",
  email,
}: {
  tone?: Tone;
  email: string;
}) {
  const t = tones[tone];
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const betreff = encodeURIComponent(
      `Anfrage über die Website${name ? ` von ${name}` : ""}`
    );
    const text = encodeURIComponent(
      `Name: ${name}\nTelefon/E-Mail: ${contact}\n\nAnliegen:\n${message}`
    );
    window.location.href = `mailto:${email}?subject=${betreff}&body=${text}`;
  }

  const labelClass = `mb-2 block font-mono text-[0.66rem] uppercase tracking-[0.12em] ${t.label}`;
  const idPrefix = `vf-${tone}`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label htmlFor={`${idPrefix}-name`} className={labelClass}>
          Name
        </label>
        <input
          id={`${idPrefix}-name`}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={t.input}
          placeholder="Ihr Name"
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-contact`} className={labelClass}>
          Telefon oder E-Mail
        </label>
        <input
          id={`${idPrefix}-contact`}
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className={t.input}
          placeholder="Wie erreichen wir Sie?"
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-message`} className={labelClass}>
          Ihr Anliegen
        </label>
        <textarea
          id={`${idPrefix}-message`}
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={t.input}
          placeholder="Installation, Photovoltaik, Reparatur…"
        />
      </div>

      <button type="submit" className={t.button}>
        Anfrage senden <Send size={14} />
      </button>

      <p className={`text-xs leading-relaxed ${t.hint}`}>
        Der Knopf öffnet Ihr E-Mail-Programm mit vorausgefüllter Nachricht.
        Öffnet sich nichts, schreiben Sie uns direkt an{" "}
        <a href={`mailto:${email}`} className={t.link}>
          {email}
        </a>{" "}
        — oder rufen Sie einfach an.
      </p>
    </form>
  );
}
