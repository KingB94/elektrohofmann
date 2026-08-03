"use client";

import { useState, type FormEvent } from "react";
import { Send, Check, Loader2 } from "lucide-react";
import { business } from "@/data/business";

type Tone = "light" | "warm";
type Status = "idle" | "sending" | "sent";

// Wie in Variante A wird die Anfrage über das E-Mail-Programm der
// Besucherin oder des Besuchers verschickt — ohne Server und ohne dass
// personenbezogene Daten irgendwo zwischengespeichert werden.
const tones: Record<
  Tone,
  { label: string; input: string; button: string; hint: string; sent: string }
> = {
  light: {
    label: "text-carbon/55",
    input:
      "w-full rounded-sm border border-frost-line bg-frost-base px-4 py-3.5 text-sm text-carbon placeholder:text-carbon/35 transition-colors focus:border-blue focus:outline-none",
    button:
      "mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-blue px-7 py-4 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-white transition-transform duration-200 hover:scale-[1.02] disabled:scale-100 disabled:opacity-70",
    hint: "text-carbon/45",
    sent: "text-blue",
  },
  warm: {
    label: "text-soot/55",
    input:
      "w-full border-b border-bone-line bg-transparent px-0 py-3 text-base text-soot placeholder:text-soot/30 transition-colors focus:border-copper focus:outline-none",
    button:
      "mt-4 inline-flex items-center justify-center gap-2 rounded-sm bg-soot px-7 py-4 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-bone transition-colors hover:bg-copper disabled:opacity-70",
    hint: "text-soot/50",
    sent: "text-copper",
  },
};

export default function VariantContactForm({ tone = "light" }: { tone?: Tone }) {
  const t = tones[tone];
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const subject = encodeURIComponent(`Anfrage über die Website von ${name || "—"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nTelefon/E-Mail: ${contact}\n\nAnliegen:\n${message}`
    );
    window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`;
    setTimeout(() => setStatus("sent"), 900);
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

      <button type="submit" disabled={status === "sending"} className={t.button}>
        {status === "idle" && (
          <>
            Anfrage senden <Send size={14} />
          </>
        )}
        {status === "sending" && (
          <>
            Wird geöffnet <Loader2 size={14} className="animate-spin" />
          </>
        )}
        {status === "sent" && (
          <>
            E-Mail geöffnet <Check size={14} />
          </>
        )}
      </button>

      <p className={`text-xs leading-relaxed ${t.hint}`}>
        Der Knopf öffnet Ihr E-Mail-Programm mit vorausgefüllter Nachricht — es
        werden keine Daten auf dieser Seite gespeichert. Für dringende Anliegen
        rufen Sie am besten direkt an.
      </p>
    </form>
  );
}
