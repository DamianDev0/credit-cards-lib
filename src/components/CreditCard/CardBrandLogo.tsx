import type { CardBrandLogoProps, CardBrand } from "../../types/creditCard.types";
import { cn } from "../../utils/cn";

const BRAND_LOGO_PATHS: Record<CardBrand, string> = {
  visa: "/credit/visa.svg",
  mastercard: "/credit/master_card.svg",
  amex: "/credit/amex.svg",
  discover: "/credit/discover.svg",
  diners: "/credit/diners.svg",
  jcb: "/credit/jbc.svg",
  unknown: "",
};

export function CardBrandLogo({ brand, className }: CardBrandLogoProps) {
  const logoPath = BRAND_LOGO_PATHS[brand];

  if (!logoPath) {
    return null;
  }

  return (
    <img
      src={logoPath}
      alt={`${brand} logo`}
      className={cn("w-18 h-12 object-contain", className)}
    />
  );
}
