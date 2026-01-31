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

  return (
    <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: "hidden" }}>
      {bankName && (
        <div className="absolute top-5 left-6">
          <p className={cn("text-base font-bold tracking-wide text-white uppercase", classNames?.bankName)}>
            {bankName}
          </p>
        </div>
      )}

      {showChip && (
        <div className={cn("absolute top-24 left-6", classNames?.chip)}>
          <ChipIcon className="w-14 h-10" />
        </div>
      )}

      {showContactless && (
        <div className={cn("absolute top-5 right-6 rotate-90", classNames?.contactless)}>
          <ContactlessIcon className="w-10 h-10 opacity-90 text-white" />
        </div>
      )}

      <div className="absolute bottom-20 left-6 right-6">
        <p
          className={cn(
            "text-xl sm:text-xl tracking-[0.15em] text-white font-medium whitespace-nowrap",
            classNames?.cardNumber
          )}
          style={{ fontFamily: "'Roboto Mono', monospace" }}
        >
          {displayNumber}
        </p>
      </div>

      <div className="absolute bottom-6 left-6 flex items-center gap-6">
        <p
          className={cn(
            "text-[10px] sm:text-xs font-medium tracking-wide text-white uppercase truncate max-w-35 sm:max-w-40",
            classNames?.cardholderName
          )}
        >
          {displayName}
        </p>
        <p className={cn("text-[10px] sm:text-xs tracking-wide text-white", classNames?.expiryDate)}>
          {displayExpiry}
        </p>
      </div>

      {showBrandLogo && (
        <div className={cn("absolute bottom-4 right-6", classNames?.brandLogo)}>
          <CardBrandLogo brand={brand} animation={animation} />
        </div>
      )}
    </div>
  );
}
