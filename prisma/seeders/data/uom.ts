export type UomTypeSeed =
  | "WEIGHT"
  | "VOLUME"
  | "LENGTH"
  | "COUNT"
  | "OTHER";

export type UomSeed = {
  code: string;
  name: string;
  symbol: string | null;
  description: string | null;
  uomType: UomTypeSeed;
  decimalPlaces: number;
};

export type UomGlobalConversionSeed = {
  fromCode: string;
  toCode: string;
  conversionFactor: number;
  description: string | null;
};

export const uoms: UomSeed[] = [
  {
    code: "kg",
    name: "Kilogram",
    symbol: "kg",
    description: "Metric unit of mass",
    uomType: "WEIGHT",
    decimalPlaces: 3,
  },
  {
    code: "g",
    name: "Gram",
    symbol: "g",
    description: "Metric unit of mass",
    uomType: "WEIGHT",
    decimalPlaces: 0,
  },
  {
    code: "mg",
    name: "Milligram",
    symbol: "mg",
    description: "Metric unit of mass",
    uomType: "WEIGHT",
    decimalPlaces: 0,
  },
  {
    code: "ton",
    name: "Metric Ton",
    symbol: "t",
    description: "Metric ton (1000 kg)",
    uomType: "WEIGHT",
    decimalPlaces: 3,
  },
  {
    code: "l",
    name: "Liter",
    symbol: "L",
    description: "Metric unit of volume",
    uomType: "VOLUME",
    decimalPlaces: 3,
  },
  {
    code: "ml",
    name: "Milliliter",
    symbol: "mL",
    description: "Metric unit of volume",
    uomType: "VOLUME",
    decimalPlaces: 0,
  },
  {
    code: "m",
    name: "Meter",
    symbol: "m",
    description: "Metric unit of length",
    uomType: "LENGTH",
    decimalPlaces: 3,
  },
  {
    code: "cm",
    name: "Centimeter",
    symbol: "cm",
    description: "Metric unit of length",
    uomType: "LENGTH",
    decimalPlaces: 2,
  },
  {
    code: "mm",
    name: "Millimeter",
    symbol: "mm",
    description: "Metric unit of length",
    uomType: "LENGTH",
    decimalPlaces: 0,
  },
  {
    code: "pcs",
    name: "Piece",
    symbol: "pcs",
    description: "Count-based unit",
    uomType: "COUNT",
    decimalPlaces: 0,
  },
];

export const uomGlobalConversions: UomGlobalConversionSeed[] = [
  {
    fromCode: "kg",
    toCode: "g",
    conversionFactor: 1000,
    description: "1 kg = 1000 g",
  },
  {
    fromCode: "g",
    toCode: "mg",
    conversionFactor: 1000,
    description: "1 g = 1000 mg",
  },
  {
    fromCode: "ton",
    toCode: "kg",
    conversionFactor: 1000,
    description: "1 ton = 1000 kg",
  },
  {
    fromCode: "l",
    toCode: "ml",
    conversionFactor: 1000,
    description: "1 L = 1000 mL",
  },
  {
    fromCode: "m",
    toCode: "cm",
    conversionFactor: 100,
    description: "1 m = 100 cm",
  },
  {
    fromCode: "cm",
    toCode: "mm",
    conversionFactor: 10,
    description: "1 cm = 10 mm",
  },
];
