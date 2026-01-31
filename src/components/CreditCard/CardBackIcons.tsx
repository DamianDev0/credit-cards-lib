interface IconProps {
  className?: string;
}

export function HologramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 60 42" className={className}>
      <defs>
        <linearGradient id="hologramBase" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e0e0e0" />
          <stop offset="30%" stopColor="#f2f2f2" />
          <stop offset="60%" stopColor="#d5d5d5" />
          <stop offset="100%" stopColor="#eaeaea" />
        </linearGradient>
        <linearGradient id="rainbowShimmer" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,120,120,0.2)" />
          <stop offset="16%" stopColor="rgba(255,200,120,0.18)" />
          <stop offset="33%" stopColor="rgba(255,255,120,0.18)" />
          <stop offset="50%" stopColor="rgba(120,255,150,0.18)" />
          <stop offset="66%" stopColor="rgba(120,200,255,0.2)" />
          <stop offset="83%" stopColor="rgba(180,120,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,120,200,0.2)" />
        </linearGradient>
        <linearGradient id="shimmer2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(220,240,255,0.12)" />
          <stop offset="50%" stopColor="rgba(255,220,240,0.1)" />
          <stop offset="100%" stopColor="rgba(240,255,220,0.12)" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="58" height="40" rx="2" fill="url(#hologramBase)" />
      <rect x="1" y="1" width="58" height="40" rx="2" fill="url(#rainbowShimmer)" />
      <rect x="1" y="1" width="58" height="40" rx="2" fill="url(#shimmer2)" />
      <rect x="1" y="1" width="58" height="40" rx="2" fill="none" stroke="rgba(170,170,170,0.4)" strokeWidth="0.4" />
      <g fill="rgba(80,80,80,0.4)" transform="translate(3, 5)">
        <path d="M4 10 L6 7 L10 5 L14 4 L17 5 L19 8 L18 11 L15 14 L12 16 L9 15 L6 13 L4 10 Z" />
        <path d="M12 17 L14 16 L16 18 L17 22 L15 26 L12 27 L10 24 L10 20 L12 17 Z" />
        <path d="M28 7 L31 5 L35 6 L37 8 L36 11 L33 12 L29 11 L28 8 L28 7 Z" />
        <path d="M30 13 L34 12 L37 15 L38 20 L36 25 L32 26 L29 24 L28 19 L29 15 L30 13 Z" />
        <path d="M38 5 L43 3 L50 5 L54 8 L53 13 L49 17 L43 18 L39 16 L37 12 L38 7 L38 5 Z" />
        <path d="M47 22 L51 21 L54 23 L53 27 L49 29 L46 27 L47 23 L47 22 Z" />
      </g>
      <g stroke="rgba(255,255,255,0.25)" strokeWidth="0.3">
        <line x1="2" y1="14" x2="58" y2="14" />
        <line x1="2" y1="28" x2="58" y2="28" />
      </g>
      <g stroke="rgba(255,255,255,0.12)" strokeWidth="0.2">
        <line x1="0" y1="42" x2="20" y2="0" />
        <line x1="20" y1="42" x2="40" y2="0" />
        <line x1="40" y1="42" x2="60" y2="0" />
      </g>
    </svg>
  );
}

export function BarcodeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 30" className={className}>
      <g fill="#1a1a1a">
        <rect x="4" y="2" width="1.5" height="24" />
        <rect x="7" y="2" width="1" height="24" />
        <rect x="10" y="2" width="1.5" height="24" />
        <rect x="14" y="2" width="2" height="22" />
        <rect x="18" y="2" width="1" height="22" />
        <rect x="21" y="2" width="3" height="22" />
        <rect x="26" y="2" width="1" height="22" />
        <rect x="29" y="2" width="2" height="22" />
        <rect x="33" y="2" width="1.5" height="22" />
        <rect x="37" y="2" width="1" height="22" />
        <rect x="40" y="2" width="2.5" height="22" />
        <rect x="45" y="2" width="1" height="22" />
        <rect x="48" y="2" width="1.5" height="22" />
        <rect x="52" y="2" width="1" height="24" />
        <rect x="55" y="2" width="1.5" height="24" />
        <rect x="58" y="2" width="1" height="24" />
        <rect x="62" y="2" width="2" height="22" />
        <rect x="66" y="2" width="1" height="22" />
        <rect x="69" y="2" width="2.5" height="22" />
        <rect x="74" y="2" width="1" height="22" />
        <rect x="77" y="2" width="1.5" height="22" />
        <rect x="81" y="2" width="2" height="22" />
        <rect x="85" y="2" width="1" height="22" />
        <rect x="88" y="2" width="3" height="22" />
        <rect x="93" y="2" width="1" height="22" />
        <rect x="96" y="2" width="1.5" height="22" />
        <rect x="100" y="2" width="2" height="22" />
        <rect x="105" y="2" width="1.5" height="24" />
        <rect x="108" y="2" width="1" height="24" />
        <rect x="111" y="2" width="1.5" height="24" />
      </g>
    </svg>
  );
}
