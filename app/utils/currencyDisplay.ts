import type { Property } from "@/models/Property";

export const getRateDisplay = (rates: {
  nightly?: number;
  weekly?: number;
  monthly?: number;
}) => {
  if (rates.monthly) {
    return `${rates.monthly.toLocaleString()}/mo`;
  } else if (rates.weekly) {
    return `${rates.weekly.toLocaleString()}/wk`;
  } else if (rates.nightly) {
    return `${rates.nightly.toLocaleString()}/night`;
  }
};
