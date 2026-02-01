import { lazy, Suspense, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
// Font: Roboto Mono - consumers should load this font themselves
// Option 1: npm install @fontsource/roboto-mono && import "@fontsource/roboto-mono"
// Option 2: Add to HTML: <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap" rel="stylesheet">
import type { CreditCardProps, CardSize } from "../../types/creditCard.types";
import { cn } from "../../utils/cn";
import { CreditCardFront } from "./CreditCardFront";
import { CreditCardBack } from "./CreditCardBack";
import { NoiseOverlay } from "./NoiseOverlay";
import { BRAND_GRADIENTS, CSS_FALLBACKS } from "./gradients";
import { LEVEL_EFFECTS, getLevelOverlayStyle, getLevelGradientColors } from "./levelEffects";

const MeshGradient = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.MeshGradient }))
);

const GrainGradient = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.GrainGradient }))
);

// Responsive size presets - scales up on larger screens
const SIZE_PRESETS: Record<CardSize, string> = {
  sm: "max-w-64 sm:max-w-72",
  md: "max-w-72 sm:max-w-80 md:max-w-96",
  lg: "max-w-80 sm:max-w-96 md:max-w-[420px]",
  xl: "max-w-96 sm:max-w-[420px] md:max-w-[480px] lg:max-w-[520px]",
};

const DEFAULT_VISIBILITY = {
  chip: true,
  contactless: true,
  brandLogo: true,
  bankName: true,
  magneticStripe: true,
  signatureStrip: true,
  legalText: true,
};

const DEFAULT_ANIMATION = {
  flipDuration: 0.6,
  gradientTransitionDuration: 0.5,
  logoTransitionDuration: 0.2,
  disableAnimations: false,
};

const DEFAULT_STYLE = {
  borderRadius: "1rem",
  shadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  aspectRatio: "1.586 / 1",
};

export function CreditCard({
  cardNumber,
  cardholderName,
  expiryDate,
  cvv,
  brand,
  level = "unknown",
  isFlipped = false,
  focusedField = null,
  bankName,
  className,
  size = "lg",
  width,
  animation,
  gradient,
  visibility,
  placeholders,
  labels,
  style,
  classNames,
}: CreditCardProps) {
  const mergedAnimation = useMemo(
    () => ({ ...DEFAULT_ANIMATION, ...animation }),
    [animation]
  );

  const mergedVisibility = useMemo(
    () => ({ ...DEFAULT_VISIBILITY, ...visibility }),
    [visibility]
  );

  const mergedStyle = useMemo(
    () => ({ ...DEFAULT_STYLE, ...style }),
    [style]
  );

  const brandColors = gradient?.colors ?? BRAND_GRADIENTS[brand];
  const cssFallback = CSS_FALLBACKS[brand];
  const gradientType = gradient?.type ?? "mesh";
  const gradientSpeed = gradient?.speed ?? (gradientType === "grain" ? 1 : 0.15);
  const gradientDisabled = gradient?.disabled ?? false;

  const grainColorBack = gradient?.colorBack ?? "#000000";
  const grainSoftness = gradient?.softness ?? 0.5;
  const grainIntensity = gradient?.intensity ?? 0.5;
  const grainNoise = gradient?.noise ?? 0.25;
  const meshNoiseIntensity = gradientType === "mesh" ? gradient?.noise : undefined;

  const levelEffect = LEVEL_EFFECTS[level];
  const gradientColors = getLevelGradientColors(brandColors, level);
  const levelOverlayStyle = getLevelOverlayStyle(level);
  const hasLevelEffect = levelEffect && levelEffect.opacity > 0;

  const gradientTransition = useMemo(
    () => ({
      duration: mergedAnimation.disableAnimations ? 0 : mergedAnimation.gradientTransitionDuration,
      ease: "easeInOut" as const,
    }),
    [mergedAnimation.gradientTransitionDuration, mergedAnimation.disableAnimations]
  );

  const flipTransition = useMemo(
    () => ({
      duration: mergedAnimation.disableAnimations ? 0 : mergedAnimation.flipDuration,
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    }),
    [mergedAnimation.flipDuration, mergedAnimation.disableAnimations]
  );

  const sizeClass = width ? "" : SIZE_PRESETS[size];
  const widthStyle = width ? { width: typeof width === "number" ? `${width}px` : width } : {};

  const borderRadiusValue = mergedStyle.borderRadius;
  const cardStyle = {
    borderRadius: borderRadiusValue,
    boxShadow: mergedStyle.shadow,
    clipPath: `inset(0 round ${borderRadiusValue})`,
    WebkitClipPath: `inset(0 round ${borderRadiusValue})`,
  };

  return (
    <div
      className={cn("w-full mx-auto", sizeClass, className, classNames?.root)}
      style={{ perspective: "1000px", WebkitPerspective: "1000px", ...widthStyle }}
    >
      <motion.div
        className="relative w-full cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
          aspectRatio: mergedStyle.aspectRatio,
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={flipTransition}
      >
        <div
          className={cn("absolute inset-0 w-full h-full overflow-hidden isolate", classNames?.front)}
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", ...cardStyle }}
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={`fallback-front-${brand}`}
              className={cn("absolute inset-0 bg-linear-to-br", cssFallback)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={gradientTransition}
            />
          </AnimatePresence>

          {!gradientDisabled && (
            <AnimatePresence mode="sync">
              <motion.div
                key={`${brand}-${gradientType}`}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={gradientTransition}
              >
                <Suspense fallback={null}>
                  {gradientType === "grain" ? (
                    <GrainGradient
                      className="absolute! inset-0! w-full! h-full!"
                      colors={gradientColors}
                      colorBack={grainColorBack}
                      softness={grainSoftness}
                      intensity={grainIntensity}
                      noise={grainNoise}
                      speed={gradientSpeed}
                    />
                  ) : (
                    <MeshGradient
                      className="absolute! inset-0! w-full! h-full!"
                      colors={gradientColors}
                      speed={gradientSpeed}
                    />
                  )}
                </Suspense>
              </motion.div>
            </AnimatePresence>
          )}

          <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent" style={{ backfaceVisibility: "hidden" }} />

          {meshNoiseIntensity !== undefined && meshNoiseIntensity > 0 && (
            <NoiseOverlay intensity={meshNoiseIntensity} />
          )}

          {hasLevelEffect && (
            <div
              className={cn("absolute inset-0", levelEffect.overlayClass)}
              style={{ ...levelOverlayStyle, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            />
          )}

          <CreditCardFront
            cardNumber={cardNumber}
            cardholderName={cardholderName}
            expiryDate={expiryDate}
            brand={brand}
            level={level}
            focusedField={focusedField}
            bankName={mergedVisibility.bankName ? bankName : undefined}
            visibility={mergedVisibility}
            placeholders={placeholders}
            classNames={classNames}
            animation={mergedAnimation}
          />
        </div>

        <div
          className={cn("absolute inset-0 w-full h-full overflow-hidden isolate", classNames?.back)}
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)", WebkitTransform: "rotateY(180deg)", ...cardStyle }}
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={`fallback-back-${brand}`}
              className={cn("absolute inset-0 bg-linear-to-br", cssFallback)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={gradientTransition}
            />
          </AnimatePresence>

          {!gradientDisabled && (
            <AnimatePresence mode="sync">
              <motion.div
                key={`${brand}-${gradientType}-back`}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={gradientTransition}
              >
                <Suspense fallback={null}>
                  {gradientType === "grain" ? (
                    <GrainGradient
                      className="absolute! inset-0! w-full! h-full!"
                      colors={gradientColors}
                      colorBack={grainColorBack}
                      softness={grainSoftness}
                      intensity={grainIntensity}
                      noise={grainNoise}
                      speed={gradientSpeed}
                    />
                  ) : (
                    <MeshGradient
                      className="absolute! inset-0! w-full! h-full!"
                      colors={gradientColors}
                      speed={gradientSpeed}
                    />
                  )}
                </Suspense>
              </motion.div>
            </AnimatePresence>
          )}

          <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent" style={{ backfaceVisibility: "hidden" }} />

          {meshNoiseIntensity !== undefined && meshNoiseIntensity > 0 && (
            <NoiseOverlay intensity={meshNoiseIntensity} />
          )}

          {hasLevelEffect && (
            <div
              className={cn("absolute inset-0", levelEffect.overlayClass)}
              style={{ ...levelOverlayStyle, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            />
          )}

          <CreditCardBack
            cvv={cvv}
            cardNumber={cardNumber}
            visibility={mergedVisibility}
            placeholders={placeholders}
            labels={labels}
            classNames={classNames}
          />
        </div>
      </motion.div>
    </div>
  );
}
