import creditCardType from "credit-card-type";
import type {
  CardBrand,
  CardMetadata,
  CardFormat,
  CardDetectionResult,
  DetectOptions,
  CardRegion,
} from "./types";
import { LATAM_BRANDS, INSTALLMENT_SUPPORT, REGIONAL_BRANDS } from "./types";

const TYPE_MAP: Record<string, CardBrand> = {
  visa: "visa",
  mastercard: "mastercard",
  "american-express": "amex",
  "diners-club": "diners",
  discover: "discover",
  jcb: "jcb",
  unionpay: "unionpay",
  maestro: "maestro",
  mir: "mir",
  elo: "elo",
  hipercard: "hipercard",
  hiper: "hiper",
  verve: "verve",
};

// BIN database for card metadata detection
// Format: prefix -> { type, level, region, bank, country }
const BIN_DATABASE: Record<string, Partial<CardMetadata>> = {
  // === VISA ===
  // Classic
  "4000": { type: "credit", level: "classic" },
  "4012": { type: "credit", level: "classic" },
  "4111": { type: "credit", level: "classic" },
  // Gold
  "4147": { type: "credit", level: "gold" },
  "4242": { type: "credit", level: "gold" },
  "4532": { type: "credit", level: "gold" },
  // Platinum
  "4539": { type: "credit", level: "platinum" },
  "4556": { type: "credit", level: "platinum" },
  "4716": { type: "credit", level: "platinum" },
  // Signature
  "4917": { type: "credit", level: "signature" },
  "4929": { type: "credit", level: "signature" },
  // Infinite
  "4916": { type: "credit", level: "infinite" },
  "4844": { type: "credit", level: "infinite" },
  // Business
  "4815": { type: "credit", level: "business" },
  "4818": { type: "credit", level: "business" },
  // Debit
  "4026": { type: "debit", level: "classic" },
  "4508": { type: "debit", level: "classic" },
  // Prepaid
  "4213": { type: "prepaid", level: "classic" },
  "4400": { type: "prepaid", level: "classic" },

  // === MASTERCARD ===
  // Classic
  "5100": { type: "credit", level: "classic" },
  "5111": { type: "credit", level: "classic" },
  "5123": { type: "credit", level: "classic" },
  "5105": { type: "credit", level: "classic" },
  "51": { type: "credit", level: "classic" },
  "52": { type: "credit", level: "classic" },
  // Gold
  "5200": { type: "credit", level: "gold" },
  "5212": { type: "credit", level: "gold" },
  "5324": { type: "credit", level: "gold" },
  "53": { type: "credit", level: "gold" },
  // Platinum
  "5400": { type: "credit", level: "platinum" },
  "5425": { type: "credit", level: "platinum" },
  "5431": { type: "credit", level: "platinum" },
  "54": { type: "credit", level: "platinum" },
  // World
  "5500": { type: "credit", level: "signature" },
  "5512": { type: "credit", level: "signature" },
  "55": { type: "credit", level: "platinum" },
  // World Elite / Black
  "5555": { type: "credit", level: "black" },
  "5556": { type: "credit", level: "black" },
  // Business
  "5520": { type: "credit", level: "business" },
  "5580": { type: "credit", level: "corporate" },
  // Debit
  "5018": { type: "debit", level: "classic" },
  "5020": { type: "debit", level: "classic" },
  "5038": { type: "debit", level: "classic" },
  "5893": { type: "debit", level: "classic" },
  // Prepaid
  "5300": { type: "prepaid", level: "classic" },

  // === MASTERCARD 2-series ===
  "2221": { type: "credit", level: "classic" },
  "2223": { type: "credit", level: "gold" },
  "2320": { type: "credit", level: "platinum" },
  "2500": { type: "credit", level: "signature" },
  "2720": { type: "credit", level: "black" },

  // === AMEX ===
  // Gold
  "3400": { type: "credit", level: "gold" },
  "3411": { type: "credit", level: "gold" },
  "34": { type: "credit", level: "gold" },
  // Platinum
  "3700": { type: "credit", level: "platinum" },
  "3714": { type: "credit", level: "platinum" },
  "3782": { type: "credit", level: "platinum" },
  "37": { type: "credit", level: "platinum" },
  // Centurion (Black)
  "3742": { type: "credit", level: "black" },
  "3787": { type: "credit", level: "black" },
  // Business
  "3715": { type: "credit", level: "business" },
  "3743": { type: "credit", level: "corporate" },

  // === DISCOVER ===
  "6011": { type: "credit", level: "classic" },
  "6221": { type: "credit", level: "classic" },
  "6445": { type: "credit", level: "gold" },
  "6500": { type: "credit", level: "platinum" },

  // === DINERS ===
  "3000": { type: "credit", level: "classic" },
  "3050": { type: "credit", level: "gold" },
  "3095": { type: "credit", level: "platinum" },
  "36": { type: "credit", level: "classic" },
  "38": { type: "credit", level: "gold" },

  // === JCB ===
  "3528": { type: "credit", level: "classic" },
  "3540": { type: "credit", level: "gold" },
  "3569": { type: "credit", level: "platinum" },

  // === LATAM Cards ===
  // Elo
  "4011": { type: "credit", level: "classic", region: "latam" },
  "4312": { type: "credit", level: "gold", region: "latam" },
  "5067": { type: "credit", level: "platinum", region: "latam" },
  "6362": { type: "credit", level: "classic", region: "latam" },
  "636297": { type: "credit", level: "classic", region: "latam" },
  "636368": { type: "credit", level: "gold", region: "latam" },
  // Hipercard
  "6062": { type: "credit", level: "classic", region: "latam" },
  "3841": { type: "credit", level: "gold", region: "latam" },

  // === Prepaid common ===
  "4917300": { type: "prepaid", level: "classic" },
  "438935": { type: "prepaid", level: "classic" },
  "451416": { type: "prepaid", level: "classic" },
  "504175": { type: "prepaid", level: "classic" },
  "627780": { type: "prepaid", level: "classic" },
};

function normalizeCardNumber(number: string): string {
  return number.replace(/\D/g, "");
}

function formatCardNumber(number: string, gaps: number[]): string {
  const normalized = normalizeCardNumber(number);
  const offsets = [0, ...gaps, normalized.length];
  const parts: string[] = [];

  for (let i = 0; offsets[i] < normalized.length; i++) {
    const start = offsets[i];
    const end = Math.min(offsets[i + 1], normalized.length);
    parts.push(normalized.substring(start, end));
  }

  return parts.join(" ");
}

function maskCardNumber(number: string): string {
  const normalized = normalizeCardNumber(number);
  if (normalized.length <= 4) return normalized;

  const visible = normalized.slice(-4);
  const masked = "•".repeat(normalized.length - 4);
  return masked + visible;
}

function getRegion(brand: CardBrand): CardRegion {
  for (const [region, brands] of Object.entries(REGIONAL_BRANDS)) {
    if (brands.includes(brand)) {
      return region as CardRegion;
    }
  }
  return "unknown";
}

function getMetadataFromBin(normalized: string): Partial<CardMetadata> {
  // Sort by prefix length (longest first) for more specific matching
  const prefixes = Object.keys(BIN_DATABASE).sort((a, b) => b.length - a.length);

  for (const prefix of prefixes) {
    if (normalized.startsWith(prefix)) {
      return BIN_DATABASE[prefix];
    }
  }

  return {};
}

function buildMetadata(brand: CardBrand, normalized: string): CardMetadata {
  const binData = getMetadataFromBin(normalized);
  const installmentData = INSTALLMENT_SUPPORT[brand];
  const region = binData.region ?? getRegion(brand);

  return {
    brand,
    type: binData.type ?? "unknown",
    level: binData.level ?? "unknown",
    country: binData.country,
    bank: binData.bank,
    region,
    supportsInstallments: installmentData?.supported ?? false,
    maxInstallments: installmentData?.max,
    isRegional: LATAM_BRANDS.includes(brand) || !["global"].includes(region),
  };
}

export function detectCard(number: string, _options: DetectOptions = {}): CardDetectionResult {
  const normalized = normalizeCardNumber(number);

  if (!normalized) {
    return {
      brand: "unknown",
      possibleBrands: [],
      metadata: buildMetadata("unknown", ""),
      format: { gaps: [4, 8, 12], lengths: [16], code: { name: "CVV", size: 3 } },
      isComplete: false,
      normalized: "",
      formatted: "",
      masked: "",
    };
  }

  const results = creditCardType(normalized);

  if (results.length === 0) {
    return {
      brand: "unknown",
      possibleBrands: [],
      metadata: buildMetadata("unknown", normalized),
      format: { gaps: [4, 8, 12], lengths: [16], code: { name: "CVV", size: 3 } },
      isComplete: false,
      normalized,
      formatted: formatCardNumber(normalized, [4, 8, 12]),
      masked: maskCardNumber(normalized),
    };
  }

  const primary = results[0];
  const brand = TYPE_MAP[primary.type] ?? "unknown";
  const possibleBrands = results.map((r) => TYPE_MAP[r.type] ?? "unknown").filter((b) => b !== "unknown");

  const format: CardFormat = {
    gaps: primary.gaps,
    lengths: primary.lengths,
    code: primary.code,
  };

  const isComplete = primary.lengths.includes(normalized.length);

  return {
    brand,
    possibleBrands,
    metadata: buildMetadata(brand, normalized),
    format,
    isComplete,
    normalized,
    formatted: formatCardNumber(normalized, primary.gaps),
    masked: maskCardNumber(normalized),
  };
}

export function detectBrand(number: string): CardBrand {
  return detectCard(number).brand;
}

export function detectPossibleBrands(number: string): CardBrand[] {
  return detectCard(number).possibleBrands;
}

export function getCardMetadata(number: string): CardMetadata {
  return detectCard(number).metadata;
}

export function formatCard(number: string): string {
  return detectCard(number).formatted;
}

export function maskCard(number: string): string {
  return detectCard(number).masked;
}

export function isLatamCard(number: string): boolean {
  const { metadata } = detectCard(number);
  return metadata.region === "latam" || metadata.isRegional;
}

export function supportsInstallments(number: string): boolean {
  return detectCard(number).metadata.supportsInstallments;
}

export function getMaxInstallments(number: string): number | undefined {
  return detectCard(number).metadata.maxInstallments;
}
