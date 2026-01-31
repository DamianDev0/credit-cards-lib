import { cn } from "../../utils/cn";
import type { CreditCardWithFormProps } from "../../types/creditCard.types";

type FormProps = CreditCardWithFormProps["formProps"];

export function getFormStyles(formProps?: FormProps) {
  return {
    inputWrapper: cn(
      "flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 border border-gray-200 rounded-xl overflow-hidden",
      formProps?.classNames?.inputWrapper
    ),
    input: cn(
      "flex-1 min-w-0 text-sm bg-transparent outline-none placeholder:text-gray-400",
      formProps?.classNames?.input
    ),
    label: cn("text-sm font-medium", formProps?.classNames?.label),
    hint: cn("text-xs text-gray-500", formProps?.classNames?.hint),
    field: cn("space-y-1.5 min-w-0", formProps?.classNames?.field),
    submitButton: (isValid: boolean, isSubmitting: boolean) =>
      cn(
        "w-full h-10 sm:h-12 rounded-xl font-medium text-white transition-colors",
        isValid && !isSubmitting
          ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
          : "bg-gray-300 cursor-not-allowed",
        formProps?.classNames?.submitButton
      ),
  };
}
