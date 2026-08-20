"use client";

import { useState, type FormEvent } from "react";
import { Send, Check, Loader2, AlertCircle } from "lucide-react";

type Tone = "light" | "warm";
type Status = "idle" | "sending" | "sent" | "error";

// Die Anfrage geht an Netlify Forms und landet dort im Postfach des
// Betriebs — ohne eigenen Server und ohne Datenbank.
//
// Gesendet wird an /__forms.html: eine schlichte Kopie des Formulars
// im public-Ordner, an der Netlify beim Bauen die Felder erkennt.
// Die Feldnamen hier und dort müssen übereinstimmen.
const FORMULARNAME = "anfrage";
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
  // Honigtopf: für Menschen unsichtbar. Füllt ihn etwas aus, war es ein Bot.
  const [firmenname, setFirmenname] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const antwort = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": FORMULARNAME,
          name,
          kontakt: contact,
          nachricht: message,
          firmenname,
        }).toString(),
      });
      if (!antwort.ok) throw new Error(String(antwort.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
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

      {/* Für Menschen unsichtbar, für Bots verlockend. */}
      <p className="hidden" aria-hidden="true">
        <label>
          Firmenname
          <input
            tabIndex={-1}
            autoComplete="off"
            value={firmenname}
            onChange={(e) => setFirmenname(e.target.value)}
          />
        </label>
      </p>

      <button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        className={t.button}
      >
        {(status === "idle" || status === "error") && (
          <>
            Anfrage senden <Send size={14} />
          </>
        )}
        {status === "sending" && (
          <>
            Wird gesendet <Loader2 size={14} className="animate-spin" />
          </>
        )}
        {status === "sent" && (
          <>
            Anfrage ist angekommen <Check size={14} />
          </>
        )}
      </button>

      {status === "error" && (
        <p className="flex items-start gap-2 text-xs leading-relaxed text-red-600">
          <AlertCircle size={14} className="mt-0.5 shrink-0" />
          Das hat leider nicht geklappt. Bitte rufen Sie uns kurz an — oder
          versuchen Sie es in ein paar Minuten noch einmal.
        </p>
      )}

      <p className={`text-xs leading-relaxed ${t.hint}`}>
        Ihre Angaben werden nur verwendet, um Ihre Anfrage zu beantworten. Für
        dringende Anliegen rufen Sie am besten direkt an.
      </p>
    </form>
  );
}
