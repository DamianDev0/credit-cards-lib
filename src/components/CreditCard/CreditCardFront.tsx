import type { CreditCardFrontProps } from "../../types/creditCard.types";
import { CARD_PLACEHOLDERS } from "../../constants/creditCard.constants";
import { cn } from "../../utils/cn";
import { CardBrandLogo } from "./CardBrandLogo";
import { ChipIcon, ContactlessIcon } from "./BrandIcons";

const DEFAULT_PLACEHOLDERS = {
  cardNumber: CARD_PLACEHOLDERS.number,
  cardholderName: CARD_PLACEHOLDERS.name,
  expiryDate: CARD_PLACEHOLDERS.expiry,
};

export function CreditCardFront({
  cardNumber,
  cardholderName,
  expiryDate,
  brand,
  bankName,
  size = "lg",
  visibility,
  placeholders,
  classNames,
  animation,
}: CreditCardFrontProps) {
  const mergedPlaceholders = { ...DEFAULT_PLACEHOLDERS, ...placeholders };

  const displayNumber = cardNumber || mergedPlaceholders.cardNumber;
  const displayName = cardholderName || mergedPlaceholders.cardholderName;
  const displayExpiry = expiryDate || mergedPlaceholders.expiryDate;

  const showChip = visibility?.chip ?? true;
  const showContactless = visibility?.contactless ?? true;
  const showBrandLogo = visibility?.brandLogo ?? true;
  const isSmall = size === "sm";

  return (
    <div className="absolute inset-0 w-full h-full p-[5%]" style={{ backfaceVisibility: "hidden" }}>
      {/* Top row: Bank name + Contactless */}
      <div className="flex justify-between items-start">
        {bankName ? (
          <p className={cn(
            isSmall ? "text-[8px]" : "text-xs sm:text-sm md:text-base",
            "font-bold tracking-wide text-white uppercase",
            classNames?.bankName
          )}>
            {bankName}
          </p>
        ) : (
          <div />
        )}
        {showContactless && !isSmall && (
          <div className={cn("rotate-90", classNames?.contactless)}>
            <ContactlessIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 opacity-90 text-white" />
          </div>
        )}
      </div>

      {/* Middle: Chip + Card number */}
      <div className="absolute left-[5%] right-[5%] top-[35%]">
        {showChip && (
          <div className={cn(isSmall ? "mb-0.5" : "mb-1 sm:mb-2", classNames?.chip)}>
            <ChipIcon className={isSmall ? "w-7 h-5" : "w-9 h-6 sm:w-11 sm:h-8 md:w-14 md:h-10"} />
          </div>
        )}
        <p
          className={cn(
            isSmall
              ? "text-xs tracking-[0.08em]"
              : "text-sm sm:text-lg md:text-xl tracking-[0.1em] sm:tracking-[0.15em]",
            "text-white font-medium",
            classNames?.cardNumber
          )}
          style={{ fontFamily: "'Roboto Mono', monospace" }}
        >
          {displayNumber}
        </p>
      </div>

      {/* Bottom row: Name, Expiry + Brand logo */}
      <div className="absolute bottom-[5%] left-[5%] right-[5%] flex justify-between items-end">
        <div className={cn("flex items-center", isSmall ? "gap-2" : "gap-3 sm:gap-5")}>
          <p
            className={cn(
              isSmall
                ? "text-[6px] max-w-16"
                : "text-[8px] sm:text-[10px] md:text-xs max-w-20 sm:max-w-32 md:max-w-40",
              "font-medium tracking-wide text-white uppercase truncate",
              classNames?.cardholderName
            )}
          >
            {displayName}
          </p>
          <p className={cn(
            isSmall ? "text-[6px]" : "text-[8px] sm:text-[10px] md:text-xs",
            "tracking-wide text-white",
            classNames?.expiryDate
          )}>
            {displayExpiry}
          </p>
        </div>
        {showBrandLogo && (
          <div className={classNames?.brandLogo}>
            <CardBrandLogo
              brand={brand}
              size="sm"
              animation={animation}
              className={isSmall ? "w-8 h-5" : "w-12 h-8 sm:w-16 sm:h-10 md:w-20 md:h-14"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
