import { useMemo } from "react";

interface NoiseOverlayProps {
  intensity?: number;
  blendMode?: React.CSSProperties["mixBlendMode"];
  className?: string;
}

export function NoiseOverlay({
  intensity = 0.15,
  blendMode = "overlay",
  className,
}: NoiseOverlayProps) {
  const filterId = useMemo(
    () => `noise-filter-${Math.random().toString(36).substr(2, 9)}`,
    []
  );

  const clampedIntensity = Math.max(0, Math.min(1, intensity));

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: clampedIntensity,
        mixBlendMode: blendMode,
        pointerEvents: "none",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        style={{ display: "block" }}
      >
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="saturate"
              values="0"
              in="noise"
              result="monoNoise"
            />
          </filter>
        </defs>
        <rect
          width="100%"
          height="100%"
          filter={`url(#${filterId})`}
          opacity="1"
        />
      </svg>
    </div>
  );
}
