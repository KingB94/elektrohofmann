type Props = {
  className?: string;
};

// Doppel-Chevron-Pfeil, angelehnt an das Blitz-/Pfeilmotiv im
// Hofmann-Logo (grauer Pfeil hinten, blauer Pfeil vorne, leicht
// ansteigend) — wiederkehrendes Signature-Element der Seite.
export default function EnergyArrow({ className }: Props) {
  return (
    <svg
      viewBox="0 0 220 140"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g transform="rotate(-16 110 70)">
        <polygon
          points="10,30 78,30 148,66 78,102 10,102 46,66"
          fill="#9C9C9C"
          transform="translate(-8,-6)"
        />
        <polygon
          points="10,30 78,30 148,66 78,102 10,102 46,66"
          fill="#066EB5"
          transform="translate(18,14)"
        />
      </g>
    </svg>
  );
}
