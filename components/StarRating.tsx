import { Star } from "lucide-react";

export default function StarRating({ value = 5, className = "" }: { value?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${value} von 5 Sternen`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className="text-blue"
          fill={i < Math.round(value) ? "currentColor" : "none"}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}
