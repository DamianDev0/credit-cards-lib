import type { FormLayout, AddressData } from "../../types/creditCard.types";

export const LAYOUT_CLASSES: Record<FormLayout, string> = {
  vertical: "flex flex-col items-center",
  "horizontal-left": "flex flex-col lg:flex-row-reverse items-center lg:items-start",
  "horizontal-right": "flex flex-col lg:flex-row items-center lg:items-start",
};

export const EMPTY_ADDRESS: AddressData = {
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};
