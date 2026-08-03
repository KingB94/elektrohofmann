type IconProps = {
  className?: string;
};

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function InstallIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...base}>
      <rect x="9" y="9" width="22" height="14" rx="1.5" />
      <path d="M14 23v3M26 23v3M11 29h18M15 9V6M25 9V6" />
      <path d="M16 16h3l-2 4h4l-2 4" />
    </svg>
  );
}

export function SolarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...base}>
      <path d="M8 15l6-7h12l6 7z" />
      <path d="M6 15h28M8 15l-2 15h28l-2-15" />
      <path d="M14 15v15M20 15v15M26 15v15M7 22.5h26" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...base}>
      <rect x="10" y="7" width="20" height="26" rx="2" />
      <path d="M15 7V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1" />
      <path d="M14.5 20l3.5 3.5 7.5-8" />
    </svg>
  );
}

export function RepairIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...base}>
      <rect x="10" y="6" width="14" height="24" rx="2" />
      <circle cx="17" cy="11" r="1.3" fill="currentColor" stroke="none" />
      <path d="M14 17h6M14 21h6M14 25h3" />
      <path d="M24 22a6 6 0 1 0 6 6" />
      <path d="M30 22l1.8 1.8-3.6 3.6L26.4 25.6z" />
    </svg>
  );
}

export function MediaIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...base}>
      <rect x="6" y="10" width="20" height="14" rx="1.5" />
      <path d="M12 28h8" />
      <path d="M27 30c3-8 3-16 6-19M30 24a8 8 0 0 1 4 4M28 27a4 4 0 0 1 2.2 2.2" />
      <circle cx="33.3" cy="10.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LedIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...base}>
      <path d="M20 6c5.5 0 9 4 9 8.5 0 3.4-2 5.6-3.8 7.5-1.3 1.4-1.7 2.4-1.7 4H16.5c0-1.6-.4-2.6-1.7-4C13 20.1 11 17.9 11 14.5 11 10 14.5 6 20 6z" />
      <path d="M16.5 30h7M17.5 33.5h5" />
      <path d="M20 11v7M17 15h6" />
    </svg>
  );
}
