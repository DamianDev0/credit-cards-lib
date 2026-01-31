import { AnimatePresence, motion } from "framer-motion";
import type { CardBrandLogoProps, CardBrand } from "../../types/creditCard.types";
import { cn } from "../../utils/cn";
import {
  VisaIcon,
  MastercardIcon,
  DiscoverIcon,
  DinersIcon,
  JcbIcon,
} from "./BrandIcons";
import type { ComponentType, SVGProps } from "react";

const BRAND_ICONS: Partial<Record<CardBrand, ComponentType<SVGProps<SVGSVGElement>>>> = {
  visa: VisaIcon,
  mastercard: MastercardIcon,
  discover: DiscoverIcon,
  diners: DinersIcon,
  jcb: JcbIcon,
};

const SIZE_CLASSES = {
  sm: "w-12 h-8",
  md: "w-18 h-12",
  lg: "w-24 h-16",
};

export function CardBrandLogo({ brand, className, size = "md", animation }: CardBrandLogoProps) {
  const IconComponent = BRAND_ICONS[brand];
  const sizeClass = SIZE_CLASSES[size];
  const disableAnimations = animation?.disableAnimations ?? false;
  const duration = animation?.logoTransitionDuration ?? 0.2;

  return (
    <div className={cn(sizeClass, "relative", className)}>
      <AnimatePresence mode="wait">
        {IconComponent && (
          <motion.div
            key={brand}
            className="w-full h-full absolute inset-0"
            initial={disableAnimations ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={disableAnimations ? undefined : { opacity: 0, scale: 0.8 }}
            transition={{ duration: disableAnimations ? 0 : duration, ease: "easeOut" }}
          >
            <IconComponent className="w-full h-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
