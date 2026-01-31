import type { CreditCardBackProps } from "../../types/creditCard.types";
import { CARD_PLACEHOLDERS } from "../../constants/creditCard.constants";
import { getLastFourDigits } from "../../utils/formatCardNumber";
import { cn } from "../../utils/cn";
import { HologramIcon, BarcodeIcon } from "./CardBackIcons";

const DEFAULT_LABELS = {
  bankDisclaimer: "This card is property of the issuing bank. Misuse is criminal offense. If found, please return to any branch or mail to the address on back.",
  customerService: "For customer service, account information, or to report lost/stolen cards call 1-800-XXX-XXXX (available 24 hours a day, 7 days a week). For international calls, contact +1-XXX-XXX-XXXX. TTY users call 1-800-XXX-XXXX. Visit us online at www.yourbank.com for account access, payments, and support.",
  termsAndConditions: "Use of this card is subject to the credit card agreement. The card remains property of the issuing bank and must be returned upon request. Unauthorized use of this card is fraud and may result in criminal prosecution. By using this card you agree to all terms and conditions.",
  authorizedSignature: "AUTHORIZED SIGNATURE — NOT VALID UNLESS SIGNED",
  securityNotice: "For your protection, this card features multiple security elements including holographic imaging and UV-reactive ink.",
};

const TEXT_SHADOW = "0 1px 2px rgba(0,0,0,0.8)";

export function CreditCardBack({
  cvv,
  cardNumber,
  visibility,
  placeholders,
  labels,
  classNames,
}: CreditCardBackProps) {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const displayCvv = cvv || placeholders?.cvv || CARD_PLACEHOLDERS.cvv;
  const lastFourDigits = getLastFourDigits(cardNumber);

  const showMagneticStripe = visibility?.magneticStripe ?? true;
  const showSignatureStrip = visibility?.signatureStrip ?? true;
  const showLegalText = visibility?.legalText ?? true;
  const showHologram = visibility?.hologram ?? true;
  const showBarcode = visibility?.barcode ?? true;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ backfaceVisibility: "hidden" }}>
      {showLegalText && (
        <div className="absolute top-[2%] left-[4%] right-[4%] text-center">
          <p className="text-[3px] sm:text-[4px] md:text-[5px] text-white/70 leading-tight" style={{ textShadow: TEXT_SHADOW }}>
            {mergedLabels.bankDisclaimer}
          </p>
        </div>
      )}

      {showMagneticStripe && (
        <div className={cn("absolute top-[9%] left-0 right-0 h-[15%] bg-zinc-900", classNames?.magneticStripe)} />
      )}

      <div className="absolute top-[28%] left-[4%] right-[4%] flex items-start gap-2">
        {showHologram && (
          <div className={cn("shrink-0 mt-2 sm:mt-2.5", classNames?.hologram)}>
            <HologramIcon className="w-10 h-7 sm:w-12 sm:h-8 md:w-14 md:h-9" />
          </div>
        )}

        {showSignatureStrip && (
          <div className="flex-1">
            <p className="text-[3px] sm:text-[4px] text-white/50 mb-0.5 tracking-wide" style={{ textShadow: TEXT_SHADOW }}>
              {mergedLabels.authorizedSignature}
            </p>

            <div className={cn("flex items-stretch", classNames?.signatureStrip)}>
              <div className="flex items-stretch h-7 sm:h-8 md:h-9 w-full">
                <div className="flex-1 bg-linear-to-b from-amber-50 to-amber-100 relative overflow-hidden rounded-l">
                  <div className="absolute inset-0 flex flex-col justify-evenly py-0.5">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-px bg-amber-300/50" />
                    ))}
                  </div>
                </div>

                <div className="w-7 sm:w-8 md:w-10 bg-white flex items-center justify-center shrink-0 border-l border-gray-200">
                  <p className="text-[7px] sm:text-[8px] md:text-[10px] font-mono text-zinc-500">{lastFourDigits}</p>
                </div>

                <div className="w-7 sm:w-8 md:w-10 bg-white flex flex-col items-center justify-center rounded-r border-l border-gray-200 shrink-0">
                  <p className="text-[3px] sm:text-[4px] text-zinc-400 font-medium">CVV</p>
                  <p className={cn("text-[8px] sm:text-[10px] md:text-xs font-mono font-bold text-zinc-900", classNames?.cvv)}>
                    {displayCvv}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showLegalText && (
        <div className="absolute top-[48%] left-[4%] right-[4%]">
          <p className="text-[3px] sm:text-[4px] md:text-[5px] text-white/60 leading-relaxed" style={{ textShadow: TEXT_SHADOW }}>
            {mergedLabels.customerService}
          </p>
        </div>
      )}

      {showLegalText && (
        <div className="absolute top-[62%] left-[4%] right-[4%]">
          <p className="text-[3px] sm:text-[4px] text-white/50 leading-tight italic" style={{ textShadow: TEXT_SHADOW }}>
            {mergedLabels.securityNotice}
          </p>
        </div>
      )}

      <div className="absolute bottom-[14%] left-[4%] right-[4%] flex items-center justify-between">
        <div>
          <p className="text-[3px] sm:text-[4px] text-white/40 mb-0.5" style={{ textShadow: TEXT_SHADOW }}>CARD NUMBER</p>
          <p className="text-[5px] sm:text-[6px] md:text-[7px] text-white/70 font-mono tracking-wider" style={{ textShadow: TEXT_SHADOW }}>
            •••• •••• •••• {lastFourDigits}
          </p>
        </div>

        {showBarcode && (
          <div className={cn("bg-white rounded-sm p-0.5", classNames?.barcode)}>
            <BarcodeIcon className="w-14 sm:w-16 md:w-20 h-3 sm:h-4 md:h-5" />
          </div>
        )}
      </div>

      {showLegalText && (
        <div className="absolute bottom-[2%] left-[4%] right-[4%]">
          <p className="text-[3px] sm:text-[4px] text-white/40 leading-tight text-center" style={{ textShadow: TEXT_SHADOW }}>
            {mergedLabels.termsAndConditions}
          </p>
        </div>
      )}
    </div>
  );
}
