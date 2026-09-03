import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "@/keystatic.config";

// Schreibt im lokalen Modus die Inhalte direkt auf die Festplatte.
// Läuft nur unter Node, nicht auf der Edge Runtime.
//
// ⚠️ Keystatic prüft die GitHub-Zugangsdaten schon beim Laden dieses
// Moduls und wirft einen Fehler, wenn im GitHub-Modus welche fehlen.
// Beim Bauen bricht dadurch der gesamte Build ab: Die Website käme wegen
// einer fehlenden Variable des Redaktionssystems gar nicht erst online.
//
// Deshalb dieser Auffangbau. Fehlt etwas, antwortet nur diese eine Route
// mit einer verständlichen Meldung — die Website selbst wird gebaut und
// ausgeliefert wie immer.
let handler: ReturnType<typeof makeRouteHandler>;

try {
  handler = makeRouteHandler({ config });
} catch (fehler) {
  console.error(
    "\n[Keystatic] Der Editor ist nicht einsatzbereit:\n" +
      (fehler instanceof Error ? fehler.message : String(fehler)) +
      "\n"
  );

  const hinweis = async () =>
    new Response(
      "Das Redaktionssystem ist noch nicht fertig eingerichtet: Es fehlen " +
        "KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET oder " +
        "KEYSTATIC_SECRET in den Umgebungsvariablen. Die Website selbst " +
        "ist davon nicht betroffen.",
      { status: 503, headers: { "content-type": "text/plain; charset=utf-8" } }
    );

  handler = { GET: hinweis, POST: hinweis };
}

export const { GET, POST } = handler;
