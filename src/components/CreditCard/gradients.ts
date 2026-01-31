import type { CardBrand, GradientColors } from "../../types/creditCard.types";

export const BRAND_GRADIENTS: Record<CardBrand, GradientColors> = {
  visa: ["#1a1f71", "#4169e1", "#00008b", "#1e3a8a"],
  mastercard: ["#eb001b", "#f79e1b", "#ff5f00", "#1a1a2e"],
  amex: ["#006fcf", "#00aeef", "#0077c8", "#1a1a2e"],
  discover: ["#ff6000", "#ff8c00", "#ffa500", "#1a1a2e"],
  diners: ["#0079be", "#00b4d8", "#0096c7", "#1a1a2e"],
  jcb: ["#0e4c96", "#e41d2d", "#007940", "#1a1a2e"],
  unknown: ["#18181b", "#27272a", "#3f3f46", "#09090b"],
};

export const CSS_FALLBACKS: Record<CardBrand, string> = {
  visa: "from-[#1a1f71] via-[#4169e1] to-[#00008b]",
  mastercard: "from-[#eb001b] via-[#f79e1b] to-[#ff5f00]",
  amex: "from-[#006fcf] via-[#00aeef] to-[#0077c8]",
  discover: "from-[#ff6000] via-[#ff8c00] to-[#ffa500]",
  diners: "from-[#0079be] via-[#00b4d8] to-[#0096c7]",
  jcb: "from-[#0e4c96] via-[#e41d2d] to-[#007940]",
  unknown: "from-zinc-800 via-zinc-700 to-zinc-900",
};
