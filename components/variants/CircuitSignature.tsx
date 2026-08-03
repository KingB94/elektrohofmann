"use client";

import { useEffect, useState } from "react";

type Tone = "light" | "warm";

// Signature-Animation der Alternativentwürfe: eine stromführende
// Leitung, von der Funken auf die Sinuslinie darunter fallen und dort
// als kleine Lichtbögen verlöschen. Zwei Farbstimmungen, damit sich
// beide Entwürfe dasselbe Motiv teilen, ohne gleich auszusehen.

const tones: Record<
  Tone,
  {
    surface: string;
    blob: string;
    conduit: string;
    junction: string;
    boltFrom: string;
    boltTo: string;
    wave: string;
    arc: string;
    frame: string;
    label: string;
    value: string;
    dot: string;
  }
> = {
  light: {
    surface: "linear-gradient(180deg, #ffffff 0%, #eaf1f8 62%, #d8e6f4 100%)",
    blob: "rgba(6, 110, 181, 0.10)",
    conduit: "#9c9c9c",
    junction: "#6b6b6b",
    boltFrom: "#4ba3dd",
    boltTo: "#04507f",
    wave: "rgba(6, 110, 181, 0.5)",
    arc: "rgba(6, 110, 181, 0.6)",
    frame: "border-frost-line",
    label: "text-carbon/45",
    value: "text-carbon/80",
    dot: "text-blue",
  },
  warm: {
    surface: "linear-gradient(180deg, #fdf8ee 0%, #f4e4c6 64%, #ecd2a4 100%)",
    blob: "rgba(255, 255, 255, 0.7)",
    conduit: "#b98c56",
    junction: "#9a6c34",
    boltFrom: "#e0a05a",
    boltTo: "#b0631b",
    wave: "rgba(176, 99, 27, 0.5)",
    arc: "rgba(176, 99, 27, 0.6)",
    frame: "border-bone-line",
    label: "text-soot/45",
    value: "text-soot/80",
    dot: "text-copper",
  },
};

// Fest verdrahtet statt zufällig, damit Server- und Client-Render
// identisch sind (sonst meckert React über abweichendes Markup).
const sparks = [
  { left: 12, delay: 0, scale: 0.72 },
  { left: 26, delay: 0.9, scale: 1 },
  { left: 38, delay: 1.7, scale: 0.6 },
  { left: 51, delay: 0.35, scale: 0.88 },
  { left: 64, delay: 1.25, scale: 0.68 },
  { left: 77, delay: 2.05, scale: 0.95 },
  { left: 89, delay: 0.6, scale: 0.62 },
];

const arcs = [
  { left: 26, delay: 0.9 },
  { left: 51, delay: 0.35 },
  { left: 77, delay: 2.05 },
];

const states = [
  "Netz stabil",
  "Störung gemeldet",
  "Techniker unterwegs",
  "Anlage geprüft",
];

export default function CircuitSignature({
  tone = "light",
  className = "",
}: {
  tone?: Tone;
  className?: string;
}) {
  const t = tones[tone];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % states.length), 2300);
    return () => clearInterval(id);
  }, []);

  const gradientId = `bolt-${tone}`;

  return (
    <div
      className={`relative h-56 w-full overflow-hidden rounded-sm border ${t.frame} ${className}`}
      style={{ background: t.surface }}
      aria-hidden="true"
    >
      {/* Atmosphäre */}
      <div
        className="absolute -left-10 top-6 h-28 w-28 rounded-full blur-2xl"
        style={{ background: t.blob }}
      />
      <div
        className="absolute -right-8 bottom-4 h-24 w-24 rounded-full blur-2xl"
        style={{ background: t.blob }}
      />

      {/* Kopfzeile */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 py-3">
        <span className={`font-mono text-[0.62rem] uppercase tracking-[0.16em] ${t.label}`}>
          Stromkreis 01
        </span>
        <span className={`font-mono text-[0.62rem] tracking-[0.1em] ${t.value}`}>230 V</span>
      </div>

      {/* Leitung mit Abzweigdosen */}
      <svg
        viewBox="0 0 300 22"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-11 h-5 w-full"
      >
        <rect x="0" y="8" width="300" height="6" fill={t.conduit} />
        <rect x="52" y="4" width="16" height="14" rx="1.5" fill={t.junction} />
        <rect x="146" y="4" width="16" height="14" rx="1.5" fill={t.junction} />
        <rect x="240" y="4" width="16" height="14" rx="1.5" fill={t.junction} />
      </svg>

      {/* Fallende Funken */}
      <div className="absolute inset-x-0 top-[3.9rem] h-28">
        {sparks.map((s) => (
          <svg
            key={s.left}
            viewBox="0 0 24 24"
            className="spark-fall absolute top-0"
            style={{
              left: `${s.left}%`,
              width: `${14 * s.scale}px`,
              animationDelay: `${s.delay}s`,
            }}
          >
            <defs>
              <linearGradient id={`${gradientId}-${s.left}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={t.boltFrom} />
                <stop offset="100%" stopColor={t.boltTo} />
              </linearGradient>
            </defs>
            <path
              d="M13 2 L4 14 H11 L9 22 L20 10 H13 L13 2 Z"
              fill={`url(#${gradientId}-${s.left})`}
            />
          </svg>
        ))}
      </div>

      {/* Sinuslinie als „Oberfläche“ */}
      <svg
        viewBox="0 0 300 24"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-11 h-6 w-full"
      >
        <path
          d="M0 12 Q 18.75 0 37.5 12 T 75 12 T 112.5 12 T 150 12 T 187.5 12 T 225 12 T 262.5 12 T 300 12"
          fill="none"
          stroke={t.wave}
          strokeWidth="1.5"
        />
      </svg>

      {/* Lichtbögen auf der Linie */}
      <div className="absolute inset-x-0 bottom-[3.1rem] h-0">
        {arcs.map((a) => (
          <span
            key={a.left}
            className="spark-arc absolute block h-2 w-2 rounded-full"
            style={{
              left: `${a.left}%`,
              border: `1px solid ${t.arc}`,
              animationDelay: `${a.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Fußzeile mit wechselndem Status */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center gap-2 px-4 py-3">
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full bg-current ${t.dot} ring-pulse`} />
        <span
          key={step}
          className={`status-fade font-mono text-[0.62rem] uppercase tracking-[0.14em] ${t.value}`}
        >
          {states[step]}
        </span>
      </div>
    </div>
  );
}
