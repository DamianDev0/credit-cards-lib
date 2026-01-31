import type { CardLevel, GradientColors } from "../../types/creditCard.types";

export interface LevelEffect {
  overlayColors?: GradientColors;
  overlayClass: string;
  containerClass?: string;
  blendMode: string;
  opacity: number;
  displayName: string;
}

export const LEVEL_EFFECTS: Record<CardLevel, LevelEffect> = {
  classic: {
    overlayClass: "",
    blendMode: "normal",
    opacity: 0,
    displayName: "",
  },

  gold: {
    overlayColors: ["#D4AF37", "#C9A961", "#E8D9B8", "#B8941E"],
    overlayClass:
      "bg-gradient-to-br from-amber-200/20 via-yellow-100/15 to-amber-300/20",
    blendMode: "overlay",
    opacity: 0.3,
    displayName: "Gold",
  },

  platinum: {
    overlayColors: ["#C0C0C0", "#D8D8D8", "#A8A8A8", "#E8E8E8"],
    overlayClass:
      "bg-gradient-to-br from-gray-200/25 via-slate-100/20 to-gray-300/25",
    blendMode: "overlay",
    opacity: 0.3,
    displayName: "Platinum",
  },

  signature: {
    overlayColors: ["#8B5CF6", "#A78BFA", "#7C3AED", "#6D28D9"],
    overlayClass:
      "bg-gradient-to-br from-violet-500/25 via-purple-400/20 to-indigo-600/25",
    blendMode: "overlay",
    opacity: 0.3,
    displayName: "Signature",
  },

  infinite: {
    overlayColors: ["#1a1a2e", "#16213e", "#0f0f23", "#FFD700"],
    overlayClass:
      "bg-gradient-to-br from-slate-900/40 via-gray-900/30 to-amber-500/15",
    blendMode: "multiply",
    opacity: 0.5,
    displayName: "Infinite",
  },

  black: {
    overlayColors: ["#18181b", "#52525b", "#09090b", "#3f3f46"],
    overlayClass:
      "bg-gradient-to-br from-zinc-800/30 via-zinc-600/20 to-zinc-900/30",
    containerClass: "ring-1 ring-white/5",
    blendMode: "overlay",
    opacity: 0.25,
    displayName: "Black",
  },

  business: {
    overlayColors: ["#1E40AF", "#3B82F6", "#1D4ED8", "#2563EB"],
    overlayClass:
      "bg-gradient-to-br from-blue-800/20 via-blue-600/15 to-blue-900/20",
    blendMode: "overlay",
    opacity: 0.25,
    displayName: "Business",
  },

  corporate: {
    overlayColors: ["#374151", "#4B5563", "#1F2937", "#6B7280"],
    overlayClass:
      "bg-gradient-to-br from-gray-700/25 via-slate-600/20 to-gray-800/25",
    blendMode: "overlay",
    opacity: 0.3,
    displayName: "Corporate",
  },

  unknown: {
    overlayClass: "",
    blendMode: "normal",
    opacity: 0,
    displayName: "",
  },
};

export function getLevelOverlayStyle(level: CardLevel): React.CSSProperties {
  const effect = LEVEL_EFFECTS[level];
  if (!effect || effect.opacity === 0) return {};

  return {
    mixBlendMode: effect.blendMode as React.CSSProperties["mixBlendMode"],
    opacity: effect.opacity,
  };
}

export function getLevelGradientColors(
  brandColors: GradientColors,
  level: CardLevel
): GradientColors {
  if (level === "classic" || level === "unknown") {
    return brandColors;
  }

  const effect = LEVEL_EFFECTS[level];

  if (effect.overlayColors) {
    return effect.overlayColors;
  }

  return brandColors;
}

export function getLevelBadge(level: CardLevel): string | null {
  const effect = LEVEL_EFFECTS[level];
  if (!effect.displayName || level === "classic" || level === "unknown") {
    return null;
  }
  return effect.displayName.toUpperCase();
}
