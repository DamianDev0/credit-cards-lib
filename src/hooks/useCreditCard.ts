import { useState, useMemo, useCallback } from "react";
import type {
  CardBrand,
  CardField,
  CardMetadata,
  CreditCardState,
  CreditCardValidation,
  UseCreditCardReturn,
  DetailedValidation,
} from "../types/creditCard.types";
import { CARD_LIMITS } from "../constants/creditCard.constants";
import {
  detectCard,
  validateCardNumber as coreValidateCardNumber,
  validateExpiryDate as coreValidateExpiryDate,
  validateCvv as coreValidateCvv,
  validateCardholderName as coreValidateCardholderName,
} from "../core";
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

const INITIAL_METADATA: CardMetadata = {
  brand: "unknown",
  type: "unknown",
  level: "unknown",
  region: "unknown",
  supportsInstallments: false,
  maxInstallments: undefined,
  isRegional: false,
};

export function useCreditCard(): UseCreditCardReturn {
  const [state, setState] = useState<CreditCardState>(INITIAL_STATE);

  const detection = useMemo(() => {
    return detectCard(state.cardNumber);
  }, [state.cardNumber]);

  const setCardNumber = useCallback((value: string) => {
    const cleaned = cleanCardNumber(value).slice(0, CARD_LIMITS.maxCardNumberLength);
    const result = detectCard(cleaned);

    setState((prev) => ({
      ...prev,
      cardNumber: cleaned,
      brand: result.brand,
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

  const detailedValidation = useMemo<DetailedValidation>(() => {
    const cardResult = coreValidateCardNumber(state.cardNumber);
    const expiryResult = coreValidateExpiryDate(state.expiryDate);
    const cvvResult = coreValidateCvv(state.cvv, detection.brand);
    const nameResult = coreValidateCardholderName(state.cardholderName);

    return {
      cardNumber: {
        isValid: cardResult.isValid,
        errors: cardResult.errors.map((e) => ({
          code: e.code,
          message: e.message,
          hint: e.hint,
        })),
      },
      expiryDate: {
        isValid: expiryResult.isValid,
        errors: expiryResult.errors.map((e) => ({
          code: e.code,
          message: e.message,
          hint: e.hint,
        })),
        isExpired: expiryResult.isExpired,
        expiresThisMonth: expiryResult.expiresThisMonth,
      },
      cvv: {
        isValid: cvvResult.isValid,
        errors: cvvResult.errors.map((e) => ({
          code: e.code,
          message: e.message,
          hint: e.hint,
        })),
      },
      cardholderName: {
        isValid: nameResult.isValid,
        errors: nameResult.errors.map((e) => ({
          code: e.code,
          message: e.message,
          hint: e.hint,
        })),
      },
    };
  }, [state.cardNumber, state.cardholderName, state.expiryDate, state.cvv, detection.brand]);

  const validation = useMemo<CreditCardValidation>(() => {
    return {
      cardNumber: detailedValidation.cardNumber.isValid,
      cardholderName: detailedValidation.cardholderName.isValid,
      expiryDate: detailedValidation.expiryDate.isValid,
      cvv: detailedValidation.cvv.isValid,
      isValid:
        detailedValidation.cardNumber.isValid &&
        detailedValidation.cardholderName.isValid &&
        detailedValidation.expiryDate.isValid &&
        detailedValidation.cvv.isValid,
    };
  }, [detailedValidation]);

  const metadata = useMemo<CardMetadata>(() => {
    if (!state.cardNumber) return INITIAL_METADATA;
    return detection.metadata;
  }, [state.cardNumber, detection]);

  const formattedCardNumber = useMemo(
    () => formatCardNumber(state.cardNumber),
    [state.cardNumber]
  );

  const maskedCardNumber = useMemo(() => detection.masked, [detection.masked]);

  const possibleBrands = useMemo<CardBrand[]>(
    () => detection.possibleBrands,
    [detection.possibleBrands]
  );

  return {
    state,
    validation,
    detailedValidation,
    metadata,
    handlers: {
      setCardNumber,
      setCardholderName,
      setExpiryDate,
      setCvv,
      setFocusedField,
      reset,
    },
    formattedCardNumber,
    maskedCardNumber,
    isComplete: detection.isComplete,
    possibleBrands,
  };
}
