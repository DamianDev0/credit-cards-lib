import type { CreditCardFrontProps } from "../../types/creditCard.types";
import { CARD_PLACEHOLDERS } from "../../constants/creditCard.constants";
import { CardBrandLogo } from "./CardBrandLogo";

export function CreditCardFront({
  cardNumber,
  cardholderName,
  expiryDate,
  brand,
  bankName,
}: CreditCardFrontProps) {
  const displayNumber = cardNumber || CARD_PLACEHOLDERS.number;
  const displayName = cardholderName || CARD_PLACEHOLDERS.name;
  const displayExpiry = expiryDate || CARD_PLACEHOLDERS.expiry;

  return (
    <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: "hidden" }}>

      {bankName && (
        <div className="absolute top-5 left-6">
          <p className="text-base font-bold tracking-wide text-white uppercase">
            {bankName}
          </p>
        </div>
      )}

      <div className="absolute top-24 left-6">
        <img src="/credit/chip.svg" alt="Card chip" className="w-14 h-10" />
      </div>

    
      <div className="absolute top-5 right-6 rotate-90">
        <img src="/credit/contactless.svg" alt="Contactless" className="w-10 h-10 opacity-90 invert" />
      </div>


      <div className="absolute bottom-20 left-6 right-6">
        <p
          className="text-xl sm:text-xl tracking-[0.15em] text-white font-medium whitespace-nowrap"
          style={{ fontFamily: "'Roboto Mono', monospace" }}
        >
          {displayNumber}
        </p>
      </div>

    
      <div className="absolute bottom-6 left-6 flex items-center gap-6">
        <p className="text-[10px] sm:text-xs font-medium tracking-wide text-white uppercase truncate max-w-35 sm:max-w-40">
          {displayName}
        </p>
        <p className="text-[10px] sm:text-xs tracking-wide text-white">
          {displayExpiry}
        </p>
      </div>

 
      <div className="absolute bottom-4 right-6">
        <CardBrandLogo brand={brand} />
      </div>
    </div>
  );
}
