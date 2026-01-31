import type { CreditCardBackProps } from "../../types/creditCard.types";
import { CARD_PLACEHOLDERS } from "../../constants/creditCard.constants";
import { getLastFourDigits } from "../../utils/formatCardNumber";

export function CreditCardBack({ cvv, cardNumber }: CreditCardBackProps) {
  const displayCvv = cvv || CARD_PLACEHOLDERS.cvv;
  const lastFourDigits = getLastFourDigits(cardNumber);

  return (
    <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: "hidden" }}>
      <div className="absolute top-3 left-6 right-6 text-center">
        <p className="text-[7px] text-white/60 leading-relaxed">
          This card is property of the issuing bank. If found, please return to any branch.
        </p>
      </div>

      <div className="absolute top-10 left-0 right-0 h-11 bg-zinc-900" />

      <div className="absolute top-26 left-4 right-4">
        <div className="flex items-stretch h-9">
          <div className="flex-1 bg-linear-to-b from-amber-50 to-amber-100 relative overflow-hidden rounded-l">
            <div className="absolute inset-0 flex flex-col justify-evenly py-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="h-px bg-amber-300/60" />
              ))}
            </div>
          </div>

          <div className="w-14 h-9 bg-white flex items-center justify-center">
            <p className="text-xs font-mono text-zinc-700">{lastFourDigits}</p>
          </div>

          <div className="w-12 h-9 bg-white flex items-center justify-center rounded-r border-l border-gray-200">
            <p className="text-xs font-mono font-bold text-zinc-900">{displayCvv}</p>
          </div>
        </div>
      </div>

      <div className="absolute top-36 right-6 left-6">
        <p className="ml-56 text-[6px] text-white/55 leading-relaxed">
          For customer service, call 1-800-XXX-XXXX or visit our website. Report lost or stolen cards immediately. Unauthorized use is prohibited and may be subject to criminal prosecution.
        </p>
      </div>

   

      <div className="absolute bottom-11 left-6">
        <p className="text-[8px] text-white/25 font-mono tracking-widest">
          •••• •••• •••• {lastFourDigits}
        </p>
      </div>

      <div className="absolute bottom-5 left-6 right-6">
        <p className="text-[5px] text-white/30 leading-relaxed">
          By using this card, you agree to the terms and conditions of the cardholder agreement. This card is issued pursuant to a license from the payment network.
        </p>
      </div>
    </div>
  );
}
