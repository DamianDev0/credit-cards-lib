import { useState, useCallback, useMemo, useEffect, type ChangeEvent } from "react";
import type { AddressData, CardField, CreditCardWithFormProps } from "../../../types/creditCard.types";
import { useCreditCard } from "../../../hooks/useCreditCard";
import { CARD_LIMITS } from "../../../constants/creditCard.constants";
import { EMPTY_ADDRESS } from "../constants";

interface UseCreditCardFormOptions {
  initialValues?: CreditCardWithFormProps["initialValues"];
  showBankName?: boolean;
  showAddress?: boolean;
  customFields?: CreditCardWithFormProps["customFields"];
  onCardChange?: CreditCardWithFormProps["onCardChange"];
  onSubmit?: CreditCardWithFormProps["onSubmit"];
}

export function useCreditCardForm({
  initialValues,
  showBankName = false,
  showAddress = false,
  customFields = [],
  onCardChange,
  onSubmit,
}: UseCreditCardFormOptions) {
  const creditCard = useCreditCard();
  const { state, validation, detailedValidation, metadata, handlers } = creditCard;

  const [bankName, setBankName] = useState(initialValues?.bankName ?? "");
  const [address, setAddress] = useState<AddressData>({
    ...EMPTY_ADDRESS,
    ...initialValues?.address,
  });
  const [customValues, setCustomValues] = useState<Record<string, string>>(
    initialValues?.customFields ?? {}
  );

  const formData = useMemo(
    () => ({
      cardNumber: state.cardNumber,
      cardholderName: state.cardholderName,
      expiryDate: state.expiryDate,
      cvv: state.cvv,
      brand: state.brand,
      bankName: showBankName ? bankName : undefined,
      address: showAddress ? address : undefined,
      customFields: customFields.length > 0 ? customValues : undefined,
      metadata,
    }),
    [state, bankName, address, customValues, showBankName, showAddress, customFields.length, metadata]
  );

  const getFirstError = useCallback(
    (field: "cardNumber" | "expiryDate" | "cvv" | "cardholderName") => {
      const errors = detailedValidation[field].errors;
      return errors.length > 0 ? errors[0] : null;
    },
    [detailedValidation]
  );

  useEffect(() => {
    onCardChange?.(formData);
  }, [formData, onCardChange]);

  const handleCardNumberInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const cleaned = e.target.value.replace(/\D/g, "").slice(0, CARD_LIMITS.maxCardNumberLength);
      handlers.setCardNumber(cleaned);
    },
    [handlers]
  );

  const handleExpiryInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
      }
      handlers.setExpiryDate(value);
    },
    [handlers]
  );

  const handleCvvInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handlers.setCvv(e.target.value.replace(/\D/g, ""));
    },
    [handlers]
  );

  const handleCardholderNameInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handlers.setCardholderName(e.target.value.slice(0, 22));
    },
    [handlers]
  );

  const handleFocus = useCallback(
    (field: CardField) => () => handlers.setFocusedField(field),
    [handlers]
  );

  const handleBlur = useCallback(() => handlers.setFocusedField(null), [handlers]);

  const handleBankNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setBankName(e.target.value.toUpperCase());
    },
    []
  );

  const handleAddressChange = useCallback(
    (field: keyof AddressData) => (e: ChangeEvent<HTMLInputElement>) => {
      setAddress((prev) => ({ ...prev, [field]: e.target.value }));
    },
    []
  );

  const handleCustomFieldChange = useCallback(
    (id: string) => (value: string) => {
      setCustomValues((prev) => ({ ...prev, [id]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (validation.isValid && onSubmit) {
        await onSubmit(formData);
      }
    },
    [validation.isValid, onSubmit, formData]
  );

  return {
    // Credit card state
    state,
    validation,
    detailedValidation,
    metadata,
    formattedCardNumber: creditCard.formattedCardNumber,

    // Form state
    bankName,
    address,
    customValues,
    formData,

    // Utilities
    getFirstError,

    // Handlers
    handlers: {
      handleCardNumberInput,
      handleExpiryInput,
      handleCvvInput,
      handleCardholderNameInput,
      handleFocus,
      handleBlur,
      handleBankNameChange,
      handleAddressChange,
      handleCustomFieldChange,
      handleSubmit,
    },
  };
}
