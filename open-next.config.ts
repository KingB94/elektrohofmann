// ---------------------------------------------------------------
// Übersetzt den Next.js-Build in einen Cloudflare Worker.
//
// Zum incrementalCache: Diese Website hat keine Seiten, die im
// Betrieb neu entstehen — kein ISR, kein revalidate. Alle Inhalte
// werden beim Bauen fertig gerendert.
//
// Trotzdem braucht es hier einen Eintrag: Ohne ihn findet der Worker
// die vorgerenderten Seiten nicht und versucht, sie bei jedem Aufruf
// neu zu bauen. Dabei liest lib/inhalte.ts die JSON-Dateien aus
// /content — im Worker gibt es die nicht, und jede Seite antwortet
// mit „fs.readFile is not implemented".
//
// staticAssetsIncrementalCache legt die vorgerenderten Seiten zu den
// übrigen statischen Dateien und liest sie von dort. Damit bleibt es
// bei einem einzigen Speicherort: kein R2-Bucket, kein KV-Namespace,
// nichts zusätzlich einzurichten. Der Cache ist bewusst nur lesbar —
// passend dazu, dass sich im Betrieb nichts ändern soll.
// ---------------------------------------------------------------
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
