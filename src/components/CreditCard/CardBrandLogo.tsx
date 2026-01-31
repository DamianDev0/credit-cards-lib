import { AnimatePresence, motion } from "framer-motion";
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

const SIZE_CLASSES = {
  sm: "w-12 h-8",
  md: "w-18 h-12",
  lg: "w-24 h-16",
};

export function CardBrandLogo({ brand, className, size = "md", animation }: CardBrandLogoProps) {
  const logoPath = BRAND_LOGO_PATHS[brand];
  const sizeClass = SIZE_CLASSES[size];
  const disableAnimations = animation?.disableAnimations ?? false;
  const duration = animation?.logoTransitionDuration ?? 0.2;

  return (
    <div className={cn(sizeClass, "relative", className)}>
      <AnimatePresence mode="wait">
        {logoPath && (
          <motion.img
            key={brand}
            src={logoPath}
            alt={`${brand} logo`}
            className="w-full h-full object-contain absolute inset-0"
            initial={disableAnimations ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={disableAnimations ? undefined : { opacity: 0, scale: 0.8 }}
            transition={{ duration: disableAnimations ? 0 : duration, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
