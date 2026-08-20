import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "@/keystatic.config";

// Schreibt im lokalen Modus die Inhalte direkt auf die Festplatte.
// Läuft nur unter Node, nicht auf der Edge Runtime.
export const { POST, GET } = makeRouteHandler({ config });
