export const UOM_TYPE_VALUES = [
  "WEIGHT",
  "VOLUME",
  "LENGTH",
  "COUNT",
  "OTHER",
] as const;

export const UOM_TYPE_LABELS: Record<(typeof UOM_TYPE_VALUES)[number], string> =
  {
    WEIGHT: "Weight",
    VOLUME: "Volume",
    LENGTH: "Length",
    COUNT: "Count",
    OTHER: "Other",
  };
