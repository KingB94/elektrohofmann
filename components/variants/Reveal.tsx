"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Verzögerung in Sekunden — für gestaffelte Reihen. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

// Blendet den Inhalt ein, sobald er ins Sichtfeld scrollt. Läuft genau
// einmal. Bei „Bewegung reduzieren“ ist der Inhalt sofort sichtbar
// (siehe .reveal in globals.css).
export default function Reveal({ children, delay = 0, className = "", as }: Props) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
