export type ProductTypeSeed = {
  code: string;
  name: string;
  description: string | null;
};

export type ProductGroupSeed = {
  code: string;
  name: string;
  description: string | null;
};

export type ProductCategorySeed = {
  code: string;
  name: string;
  description: string | null;
  groupCode: string;
};

export type ProductSeed = {
  code: string;
  name: string;
  description: string | null;
  typeCode: string;
  groupCode: string;
  categoryCode: string;
  baseUomCode: string | null;
};

export const productTypes: ProductTypeSeed[] = [
  { code: "stock_item", name: "Stock Item", description: "Inventory stock material" },
  { code: "consumable", name: "Consumable", description: "Consumable material" },
  { code: "service", name: "Service", description: "Service item" },
  { code: "asset", name: "Asset", description: "Fixed asset" },
  { code: "digital", name: "Digital", description: "Digital product or license" },
  { code: "physical", name: "Physical", description: "Physical goods" },
];

export const productGroups: ProductGroupSeed[] = [
  { code: "electrical", name: "Electrical", description: null },
  { code: "mechanical", name: "Mechanical", description: null },
  { code: "instrument", name: "Instrument", description: null },
  { code: "civil", name: "Civil", description: null },
  { code: "spare_part", name: "Spare Part", description: null },
  { code: "plumbing", name: "Plumbing", description: null },
  { code: "fastener", name: "Fastener", description: null },
  { code: "chemical", name: "Chemical", description: null },
  { code: "lubricant", name: "Lubricant", description: null },
  { code: "electronic", name: "Electronic", description: null },
  { code: "furniture", name: "Furniture", description: null },
  { code: "atk", name: "ATK", description: "Office stationery supplies" },
  { code: "networking", name: "Networking", description: null },
  { code: "office_equipment", name: "Office Equipment", description: null },
  { code: "software", name: "Software", description: null },
  { code: "it_service", name: "IT Service", description: null },
];

export const productCategories: ProductCategorySeed[] = [
  { code: "cable", name: "Cable", description: null, groupCode: "electrical" },
  { code: "mccb", name: "MCCB", description: null, groupCode: "electrical" },
  { code: "mcb", name: "MCB", description: null, groupCode: "electrical" },
  { code: "lamp", name: "Lamp", description: null, groupCode: "electrical" },
  { code: "switch", name: "Switch", description: null, groupCode: "electrical" },
  { code: "bearing", name: "Bearing", description: null, groupCode: "mechanical" },
  { code: "valve", name: "Valve", description: null, groupCode: "mechanical" },
  { code: "pump", name: "Pump", description: null, groupCode: "mechanical" },
  { code: "gearbox", name: "Gearbox", description: null, groupCode: "mechanical" },
  { code: "motor", name: "Motor", description: null, groupCode: "mechanical" },
  { code: "bearing_spare", name: "Bearing", description: null, groupCode: "spare_part" },
  { code: "pipe", name: "Pipe", description: null, groupCode: "plumbing" },
  { code: "bolt", name: "Bolt", description: null, groupCode: "fastener" },
  { code: "paint", name: "Paint", description: null, groupCode: "chemical" },
  { code: "engine_oil", name: "Engine Oil", description: null, groupCode: "lubricant" },
  { code: "laptop", name: "Laptop", description: null, groupCode: "electronic" },
  { code: "mouse", name: "Mouse", description: null, groupCode: "electronic" },
  { code: "printer", name: "Printer", description: null, groupCode: "electronic" },
  { code: "office_suite", name: "Office Suite", description: null, groupCode: "software" },
  { code: "installation", name: "Installation", description: null, groupCode: "it_service" },
];

export const products: ProductSeed[] = [
  {
    code: "bearing_skf",
    name: "Bearing SKF",
    description: null,
    typeCode: "stock_item",
    groupCode: "spare_part",
    categoryCode: "bearing_spare",
    baseUomCode: "pcs",
  },
  {
    code: "pipa_pvc",
    name: "Pipa PVC",
    description: null,
    typeCode: "stock_item",
    groupCode: "plumbing",
    categoryCode: "pipe",
    baseUomCode: "m",
  },
  {
    code: "baut_m12",
    name: "Baut M12",
    description: null,
    typeCode: "stock_item",
    groupCode: "fastener",
    categoryCode: "bolt",
    baseUomCode: "pcs",
  },
  {
    code: "cat_nippon",
    name: "Cat Nippon",
    description: null,
    typeCode: "stock_item",
    groupCode: "chemical",
    categoryCode: "paint",
    baseUomCode: "l",
  },
  {
    code: "oli_shell",
    name: "Oli Shell",
    description: null,
    typeCode: "consumable",
    groupCode: "lubricant",
    categoryCode: "engine_oil",
    baseUomCode: "l",
  },
  {
    code: "asus_vivobook",
    name: "ASUS Vivobook",
    description: null,
    typeCode: "physical",
    groupCode: "electronic",
    categoryCode: "laptop",
    baseUomCode: "pcs",
  },
  {
    code: "logitech_g102",
    name: "Logitech G102",
    description: null,
    typeCode: "physical",
    groupCode: "electronic",
    categoryCode: "mouse",
    baseUomCode: "pcs",
  },
  {
    code: "canon_g3770",
    name: "Canon G3770",
    description: null,
    typeCode: "physical",
    groupCode: "electronic",
    categoryCode: "printer",
    baseUomCode: "pcs",
  },
  {
    code: "office_365",
    name: "Office 365 License",
    description: null,
    typeCode: "digital",
    groupCode: "software",
    categoryCode: "office_suite",
    baseUomCode: null,
  },
  {
    code: "instalasi_windows",
    name: "Instalasi Windows",
    description: null,
    typeCode: "service",
    groupCode: "it_service",
    categoryCode: "installation",
    baseUomCode: null,
  },
];
