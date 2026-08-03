"use client";

import { useState, FormEvent } from "react";
import { Send } from "lucide-react";
import { business } from "@/data/business";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Anfrage über die Website von ${name || "—"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nTelefon/E-Mail: ${contact}\n\nAnliegen:\n${message}`
    );
    window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`;
  }

  const inputClasses =
    "w-full rounded-sm border border-paper-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-blue-deep";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink/60">
          Name
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClasses}
          placeholder="Ihr Name"
        />
      </div>
      <div>
        <label htmlFor="contact" className="mb-1.5 block font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink/60">
          Telefon oder E-Mail
        </label>
        <input
          id="contact"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className={inputClasses}
          placeholder="Wie erreichen wir Sie?"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink/60">
          Ihr Anliegen
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClasses}
          placeholder="Installation, Photovoltaik, Reparatur…"
        />
      </div>
      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-night px-6 py-3.5 font-mono text-[0.8rem] uppercase tracking-[0.1em] text-paper transition-colors hover:bg-blue-deep"
      >
        Anfrage senden
        <Send size={14} />
      </button>
      <p className="text-xs leading-relaxed text-ink/50">
        Öffnet Ihr E-Mail-Programm mit vorausgefüllter Nachricht. Für dringende Anliegen rufen Sie uns
        am besten direkt an.
      </p>
    </form>
  );
}
