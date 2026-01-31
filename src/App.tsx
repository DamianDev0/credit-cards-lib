import { useState } from "react";
import "./index.css";
import { CreditCard, CreditCardForm, useCreditCard } from "./index";

function App() {
  const { state, validation, handlers, formattedCardNumber } = useCreditCard();
  const [bankName, setBankName] = useState("BBVA");

  const handleSubmit = () => {
    console.log("Card submitted:", {
      cardNumber: state.cardNumber,
      cardholderName: state.cardholderName,
      expiryDate: state.expiryDate,
      cvv: state.cvv,
      brand: state.brand,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-xl mx-auto space-y-8">
        <CreditCard
          cardNumber={formattedCardNumber}
          cardholderName={state.cardholderName}
          expiryDate={state.expiryDate}
          cvv={state.cvv}
          brand={state.brand}
          isFlipped={state.isFlipped}
          focusedField={state.focusedField}
          bankName={bankName}
        />

        <CreditCardForm
          cardNumber={state.cardNumber}
          cardholderName={state.cardholderName}
          expiryDate={state.expiryDate}
          cvv={state.cvv}
          brand={state.brand}
          validation={validation}
          onCardNumberChange={handlers.setCardNumber}
          onCardholderNameChange={handlers.setCardholderName}
          onExpiryDateChange={handlers.setExpiryDate}
          onCvvChange={handlers.setCvv}
          onFocusChange={handlers.setFocusedField}
          onSubmit={handleSubmit}
          bankName={bankName}
          onBankNameChange={setBankName}
        />
      </div>
    </div>
  );
}

export default App;
