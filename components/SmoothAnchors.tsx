"use client";

import { useEffect } from "react";

// ---------------------------------------------------------------
// Sanftes Scrollen zu Sprungmarken (#leistungen, #kontakt …).
//
// Ersetzt das frühere `html { scroll-behavior: smooth }`. Das galt
// nämlich auch für den Sprung nach oben, den Next.js nach jeder
// Navigation auslöst, und machte daraus auf dem Handy eine mehrere
// Sekunden lange Fahrt über die ganze Seite (siehe Kommentar in
// globals.css).
//
// Wichtig: Hier werden ausschließlich reine Sprungmarken behandelt —
// Links, die tatsächlich die Seite wechseln, werden nicht angefasst.
// Ein Klick-Interceptor, der auch Router-Links abfängt, degradiert die
// Client-Navigation von Next.js zum vollen Seiten-Reload.
// ---------------------------------------------------------------

export default function SmoothAnchors() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      // Nur seiteninterne Sprungmarken. Alles andere (auch "/pfad#marke")
      // bleibt Sache des Routers.
      if (!href || !href.startsWith("#") || href.length < 2) return;

      const target = document.getElementById(href.slice(1));
      if (!target) return;

      event.preventDefault();

      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;
      // `block: "start"` berücksichtigt `scroll-margin-top` — dadurch
      // bleiben die Abschnitte unter den klebenden Kopfzeilen sichtbar.
      target.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "start",
      });

      // Adresszeile mitziehen, ohne einen zweiten Sprung auszulösen.
      window.history.replaceState(null, "", href);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
