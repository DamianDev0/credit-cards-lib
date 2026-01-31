import type { CardBrand, GradientColors } from "../../types/creditCard.types";

const DEFAULT_GRADIENT: GradientColors = ["#18181b", "#27272a", "#3f3f46", "#09090b"];
const DEFAULT_CSS_FALLBACK = "from-zinc-800 via-zinc-700 to-zinc-900";

export const BRAND_GRADIENTS: Record<CardBrand, GradientColors> = {
  visa: ["#1a1f71", "#4169e1", "#00008b", "#1e3a8a"],
  mastercard: ["#eb001b", "#f79e1b", "#ff5f00", "#1a1a2e"],
  amex: ["#006fcf", "#00aeef", "#0077c8", "#1a1a2e"],
  discover: ["#ff6000", "#ff8c00", "#ffa500", "#1a1a2e"],
  diners: ["#0079be", "#00b4d8", "#0096c7", "#1a1a2e"],
  jcb: ["#0e4c96", "#e41d2d", "#007940", "#1a1a2e"],
  // Regional/other brands use default gradient
  unionpay: ["#1a4789", "#e21836", "#00447c", "#1a1a2e"],
  maestro: ["#0066cc", "#cc0000", "#00447c", "#1a1a2e"],
  mir: ["#0f754e", "#1a9f6c", "#0d5c3f", "#1a1a2e"],
  elo: ["#ffcb05", "#00a4e0", "#ef4123", "#1a1a2e"],
  hipercard: ["#822124", "#b52a2d", "#6b1a1c", "#1a1a2e"],
  hiper: ["#f37021", "#faa61a", "#e65c00", "#1a1a2e"],
  verve: ["#00425f", "#e31837", "#003049", "#1a1a2e"],
  unknown: DEFAULT_GRADIENT,
};

export const CSS_FALLBACKS: Record<CardBrand, string> = {
  visa: "from-[#1a1f71] via-[#4169e1] to-[#00008b]",
  mastercard: "from-[#eb001b] via-[#f79e1b] to-[#ff5f00]",
  amex: "from-[#006fcf] via-[#00aeef] to-[#0077c8]",
  discover: "from-[#ff6000] via-[#ff8c00] to-[#ffa500]",
  diners: "from-[#0079be] via-[#00b4d8] to-[#0096c7]",
  jcb: "from-[#0e4c96] via-[#e41d2d] to-[#007940]",
  // Regional/other brands
  unionpay: "from-[#1a4789] via-[#e21836] to-[#00447c]",
  maestro: "from-[#0066cc] via-[#cc0000] to-[#00447c]",
  mir: "from-[#0f754e] via-[#1a9f6c] to-[#0d5c3f]",
  elo: "from-[#ffcb05] via-[#00a4e0] to-[#ef4123]",
  hipercard: "from-[#822124] via-[#b52a2d] to-[#6b1a1c]",
  hiper: "from-[#f37021] via-[#faa61a] to-[#e65c00]",
  verve: "from-[#00425f] via-[#e31837] to-[#003049]",
  unknown: DEFAULT_CSS_FALLBACK,
};
