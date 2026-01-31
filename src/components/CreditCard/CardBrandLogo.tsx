import { AnimatePresence, motion } from "framer-motion";
import type { CardBrandLogoProps, CardBrand } from "../../types/creditCard.types";
import { cn } from "../../utils/cn";

// Import SVGs directly so they're bundled
import visaLogo from "../../assets/brands/visa.svg";
import mastercardLogo from "../../assets/brands/master_card.svg";
import discoverLogo from "../../assets/brands/discover.svg";
import dinersLogo from "../../assets/brands/diners.svg";
import jcbLogo from "../../assets/brands/jbc.svg";

// Only brands with available logos - others will show nothing
const BRAND_LOGOS: Partial<Record<CardBrand, string>> = {
  visa: visaLogo,
  mastercard: mastercardLogo,
  discover: discoverLogo,
  diners: dinersLogo,
  jcb: jcbLogo,
};

const SIZE_CLASSES = {
  sm: "w-12 h-8",
  md: "w-18 h-12",
  lg: "w-24 h-16",
};

export function CardBrandLogo({ brand, className, size = "md", animation }: CardBrandLogoProps) {
  const logoSrc = BRAND_LOGOS[brand];
  const sizeClass = SIZE_CLASSES[size];
  const disableAnimations = animation?.disableAnimations ?? false;
  const duration = animation?.logoTransitionDuration ?? 0.2;

  return (
    <div className={cn(sizeClass, "relative", className)}>
      <AnimatePresence mode="wait">
        {logoSrc && (
          <motion.img
            key={brand}
            src={logoSrc}
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
