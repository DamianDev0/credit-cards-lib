import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import "@fontsource/roboto-mono/400.css";
import "@fontsource/roboto-mono/500.css";
import "@fontsource/roboto-mono/700.css";
import type { CreditCardProps } from "../../types/creditCard.types";
import { ANIMATION_CONFIG } from "../../constants/creditCard.constants";
import { cn } from "../../utils/cn";
import { CreditCardFront } from "./CreditCardFront";
import { CreditCardBack } from "./CreditCardBack";
import { BRAND_GRADIENTS, CSS_FALLBACKS } from "./gradients";

const MeshGradient = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.MeshGradient }))
);

export function CreditCard({
  cardNumber,
  cardholderName,
  expiryDate,
  cvv,
  brand,
  isFlipped,
  focusedField,
  bankName,
  className,
}: CreditCardProps) {
  const gradientColors = BRAND_GRADIENTS[brand];
  const cssFallback = CSS_FALLBACKS[brand];

  return (
    <div className={cn("w-full max-w-[420px] mx-auto", className)} style={{ perspective: "1000px" }}>
      <motion.div
        className="relative w-full cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          aspectRatio: "1.586 / 1",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={ANIMATION_CONFIG.flip}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* CSS Fallback */}
          <div className={cn("absolute inset-0 bg-gradient-to-br", cssFallback)} />

          {/* MeshGradient */}
          <Suspense fallback={null}>
            <MeshGradient
              className="!absolute !inset-0 !w-full !h-full"
              colors={gradientColors}
              speed={0.15}
            />
          </Suspense>

          {/* Overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

          <CreditCardFront
            cardNumber={cardNumber}
            cardholderName={cardholderName}
            expiryDate={expiryDate}
            brand={brand}
            focusedField={focusedField}
            bankName={bankName}
          />
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* CSS Fallback */}
          <div className={cn("absolute inset-0 bg-gradient-to-br", cssFallback)} />

          {/* MeshGradient */}
          <Suspense fallback={null}>
            <MeshGradient
              className="!absolute !inset-0 !w-full !h-full"
              colors={gradientColors}
              speed={0.15}
            />
          </Suspense>

          {/* Overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

          <CreditCardBack cvv={cvv} cardNumber={cardNumber} />
        </div>
      </motion.div>
    </div>
  );
}
