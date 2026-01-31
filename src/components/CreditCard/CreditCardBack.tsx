import type { CreditCardBackProps } from "../../types/creditCard.types";
import { CARD_PLACEHOLDERS } from "../../constants/creditCard.constants";
import { getLastFourDigits } from "../../utils/formatCardNumber";
import { cn } from "../../utils/cn";

const DEFAULT_LABELS = {
  bankDisclaimer: "This card is property of the issuing bank. If found, please return to any branch.",
  customerService:
    "For customer service, call 1-800-XXX-XXXX or visit our website. Report lost or stolen cards immediately. Unauthorized use is prohibited and may be subject to criminal prosecution.",
  termsAndConditions:
    "By using this card, you agree to the terms and conditions of the cardholder agreement. This card is issued pursuant to a license from the payment network.",
};

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

  // Text style with shadow for visibility on any background
  const textShadow = "0 1px 2px rgba(0,0,0,0.8)";

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ backfaceVisibility: "hidden" }}>
      {/* Bank disclaimer - top */}
      {showLegalText && (
        <div className="absolute top-[3%] left-[5%] right-[5%] text-center">
          <p className="text-[5px] sm:text-[6px] md:text-[7px] text-white leading-tight" style={{ textShadow }}>
            {mergedLabels.bankDisclaimer}
          </p>
        </div>
      )}

      {/* Magnetic stripe */}
      {showMagneticStripe && (
        <div className={cn("absolute top-[12%] left-0 right-0 h-[18%] bg-zinc-900", classNames?.magneticStripe)} />
      )}

      {/* Signature strip with CVV */}
      {showSignatureStrip && (
        <div className={cn("absolute top-[38%] left-[4%] right-[4%]", classNames?.signatureStrip)}>
          <div className="flex items-stretch h-7 sm:h-8 md:h-9">
            <div className="flex-1 bg-linear-to-b from-amber-50 to-amber-100 relative overflow-hidden rounded-l">
              <div className="absolute inset-0 flex flex-col justify-evenly py-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-px bg-amber-300/60" />
                ))}
              </div>
            </div>

            <div className="w-10 sm:w-12 md:w-14 bg-white flex items-center justify-center shrink-0">
              <p className="text-[10px] sm:text-xs font-mono text-zinc-700">{lastFourDigits}</p>
            </div>

            <div className="w-8 sm:w-10 md:w-12 bg-white flex items-center justify-center rounded-r border-l border-gray-200 shrink-0">
              <p className={cn("text-[10px] sm:text-xs font-mono font-bold text-zinc-900", classNames?.cvv)}>{displayCvv}</p>
            </div>
          </div>
        </div>
      )}

      {/* Card number at bottom */}
      <div className="absolute bottom-[18%] left-[5%]">
        <p className="text-[6px] sm:text-[7px] md:text-[8px] text-white/70 font-mono tracking-wider" style={{ textShadow }}>
          •••• •••• •••• {lastFourDigits}
        </p>
      </div>

      {/* Terms at very bottom */}
      {showLegalText && (
        <div className="absolute bottom-[4%] left-[5%] right-[5%]">
          <p className="text-[4px] sm:text-[5px] text-white/60 leading-tight" style={{ textShadow }}>
            {mergedLabels.termsAndConditions}
          </p>
        </div>
      )}
    </div>
  );
}
