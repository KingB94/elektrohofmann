import { Star } from "lucide-react";

export default function StarRating({
  value = 5,
  className = "",
  // Voreinstellung bleibt Blau, weil die archivierten Entwürfe A und C
  // sie so verwenden. Die Live-Seite reicht das Google-Gold durch.
  starClassName = "text-blue",
  size = 16,
}: {
  value?: number;
  className?: string;
  starClassName?: string;
  size?: number;
}) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${value} von 5 Sternen`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={starClassName}
          fill={i < Math.round(value) ? "currentColor" : "none"}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}
