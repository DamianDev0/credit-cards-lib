import { AnimatePresence, motion } from "framer-motion";
import type { CardBrandLogoProps, CardBrand } from "../../types/creditCard.types";
import { cn } from "../../utils/cn";
import {
  VisaIcon,
  MastercardIcon,
  DiscoverIcon,
  DinersIcon,
  JcbIcon,
  AmexIcon,
  MaestroIcon,
  UnionPayIcon,
  GenericCardIcon,
} from "./BrandIcons";
import type { ComponentType, SVGProps } from "react";

const BRAND_ICONS: Partial<Record<CardBrand, ComponentType<SVGProps<SVGSVGElement>>>> = {
  visa: VisaIcon,
  mastercard: MastercardIcon,
  amex: AmexIcon,
  discover: DiscoverIcon,
  diners: DinersIcon,
  jcb: JcbIcon,
  maestro: MaestroIcon,
  unionpay: UnionPayIcon,
};

const SIZE_CLASSES = {
  sm: "w-12 h-8",
  md: "w-18 h-12",
  lg: "w-24 h-16",
};

interface ExtendedCardBrandLogoProps extends CardBrandLogoProps {
  showFallback?: boolean;
}

export function CardBrandLogo({ brand, className, size = "md", animation, showFallback = false }: ExtendedCardBrandLogoProps) {
  const IconComponent = BRAND_ICONS[brand];
  const FallbackIcon = showFallback && !IconComponent ? GenericCardIcon : null;
  const DisplayIcon = IconComponent || FallbackIcon;
  const sizeClass = SIZE_CLASSES[size];
  const disableAnimations = animation?.disableAnimations ?? false;
  const duration = animation?.logoTransitionDuration ?? 0.2;

  return (
    <div className={cn(sizeClass, "relative", className)}>
      <AnimatePresence mode="wait">
        {DisplayIcon && (
          <motion.div
            key={brand}
            className="w-full h-full absolute inset-0"
            initial={disableAnimations ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={disableAnimations ? undefined : { opacity: 0, scale: 0.8 }}
            transition={{ duration: disableAnimations ? 0 : duration, ease: "easeOut" }}
          >
            <DisplayIcon className={cn("w-full h-full", !IconComponent && "text-white/60")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
