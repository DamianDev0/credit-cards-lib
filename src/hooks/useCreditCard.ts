import { useState, useMemo, useCallback } from "react";
import type {
  CardField,
  CreditCardState,
  CreditCardValidation,
  UseCreditCardReturn,
} from "../types/creditCard.types";
import { CARD_LIMITS } from "../constants/creditCard.constants";
import { detectBrand, validateCardNumber, validateExpiryDate, validateCvv } from "../utils/detectBrand";
import { formatCardNumber, cleanCardNumber } from "../utils/formatCardNumber";

const INITIAL_STATE: CreditCardState = {
  cardNumber: "",
  cardholderName: "",
  expiryDate: "",
  cvv: "",
  brand: "unknown",
  isFlipped: false,
  focusedField: null,
};

export function useCreditCard(): UseCreditCardReturn {
  const [state, setState] = useState<CreditCardState>(INITIAL_STATE);

  const setCardNumber = useCallback((value: string) => {
    const cleaned = cleanCardNumber(value).slice(0, CARD_LIMITS.maxCardNumberLength);
    const brand = detectBrand(cleaned);

    setState((prev) => ({
      ...prev,
      cardNumber: cleaned,
      brand,
    }));
  }, []);

  const setCardholderName = useCallback((value: string) => {
    setState((prev) => ({
      ...prev,
      cardholderName: value.toUpperCase(),
    }));
  }, []);

  const setExpiryDate = useCallback((value: string) => {
    let cleaned = value.replace(/\D/g, "");

    if (cleaned.length >= 2) {
      cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }

    setState((prev) => ({
      ...prev,
      expiryDate: cleaned.slice(0, CARD_LIMITS.maxExpiryLength),
    }));
  }, []);

  const setCvv = useCallback((value: string) => {
    const cleaned = value.replace(/\D/g, "");

    setState((prev) => ({
      ...prev,
      cvv: cleaned.slice(0, CARD_LIMITS.maxCvvLength),
    }));
  }, []);

  const setFocusedField = useCallback((field: CardField | null) => {
    setState((prev) => ({
      ...prev,
      focusedField: field,
      isFlipped: field === "cvv",
    }));
  }, []);

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const validation = useMemo<CreditCardValidation>(() => {
    const cardNumberValid = validateCardNumber(state.cardNumber);
    const cardholderNameValid = state.cardholderName.trim().length >= 2;
    const expiryDateValid = validateExpiryDate(state.expiryDate);
    const cvvValid = validateCvv(state.cvv, state.brand);

    return {
      cardNumber: cardNumberValid,
      cardholderName: cardholderNameValid,
      expiryDate: expiryDateValid,
      cvv: cvvValid,
      isValid: cardNumberValid && cardholderNameValid && expiryDateValid && cvvValid,
    };
  }, [state.cardNumber, state.cardholderName, state.expiryDate, state.cvv, state.brand]);

  const formattedCardNumber = useMemo(
    () => formatCardNumber(state.cardNumber),
    [state.cardNumber]
  );

  return {
    state,
    validation,
    handlers: {
      setCardNumber,
      setCardholderName,
      setExpiryDate,
      setCvv,
      setFocusedField,
      reset,
    },
    formattedCardNumber,
  };
}
